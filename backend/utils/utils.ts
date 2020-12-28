import * as crypto from "crypto";
import * as fs from "fs";
import {Response} from "express";
import IHash from "../types/Hash";

export default class Utils{
    public key: string;
    public algorithm: string;
    public iv:Buffer;
    
    constructor(secret: string){
        // Secret by user 
        this.key = secret;
        // Algorithm AES 128 
        this.algorithm = 'aes-128-cbc';
        // Create 16 digit random bytes buffer
        this.iv = crypto.randomBytes(16);
    }
    // Encrypt data
    public encryptData(data:string): IHash {
        const key = this.getKey();

        const cipher = crypto.createCipheriv(this.algorithm, key, this.iv);

        const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

        return {
            iv: this.iv.toString('hex'),
            content: encrypted.toString('hex')
        };
    }
    // Decrypt Data
    public decryptData(hash:IHash): string{
        const key = this.getKey();

        const decipher = crypto.createDecipheriv(this.algorithm, key , Buffer.from(hash.iv, 'hex'));

        const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

        return decrpyted.toString();
    }

    // We convert the user entered secret into 16 digit to create a key as per crypto requirement
    public getKey(): Buffer{

        const hash = crypto.createHash("sha1");
        hash.update(this.key);

        let key = Buffer.from(hash.digest("hex").substring(0, 16), "binary");

        return key;
    }

    public encryptFile = (buffer : Buffer) => {
        
        const cipher = crypto.createCipheriv(this.algorithm,this.getKey(), this.iv);
        // Create the new (encrypted) buffer
        const result = Buffer.concat([this.iv, cipher.update(buffer), cipher.final()]);
        return result;
    };

    public decryptFile = (encrypted : Buffer) =>{
        const iv = encrypted.slice(0, 16);
        // Get the rest
        encrypted = encrypted.slice(16);
        const key = this.getKey();
        // Create a decipher
        const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
        // Actually decrypt it
        const result = Buffer.concat([decipher.update(encrypted), decipher.final()]);
        return result;
    }
}