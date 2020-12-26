import * as crypto from "crypto";
import IHash from "../types/Hash";

export default class Utils{
    public key: string;
    public algorithm: string;
    public iv:Buffer;
    constructor(secret){
        this.key = secret;
        this.algorithm = 'aes-128-cbc';
        this.iv = crypto.randomBytes(16);
    }
    public encryptData(data:string): IHash {
        const key = this.getKey();

        const cipher = crypto.createCipheriv(this.algorithm, key, this.iv);

        const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

        return {
            iv: this.iv.toString('hex'),
            content: encrypted.toString('hex')
        };
    }
    public decryptData(hash:IHash): string{
        const key = this.getKey();

        const decipher = crypto.createDecipheriv(this.algorithm, key , Buffer.from(hash.iv, 'hex'));

        const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

        return decrpyted.toString();
    }
    public getKey(): Buffer{
        const hash = crypto.createHash("sha1");

        hash.update(this.key);

        let key = Buffer.from(hash.digest("hex").substring(0, 16), "binary");

        return key;
    }
}