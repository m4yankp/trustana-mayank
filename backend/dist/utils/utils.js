"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class Utils {
    constructor(secret) {
        this.encryptFile = (buffer) => {
            const cipher = crypto.createCipheriv(this.algorithm, this.getKey(), this.iv);
            // Create the new (encrypted) buffer
            const result = Buffer.concat([this.iv, cipher.update(buffer), cipher.final()]);
            return result;
        };
        this.decryptFile = (encrypted) => {
            const iv = encrypted.slice(0, 16);
            // Get the rest
            encrypted = encrypted.slice(16);
            const key = this.getKey();
            // Create a decipher
            const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
            // Actually decrypt it
            const result = Buffer.concat([decipher.update(encrypted), decipher.final()]);
            return result;
        };
        // Secret by user 
        this.key = secret;
        // Algorithm AES 128 
        this.algorithm = 'aes-128-cbc';
        // Create 16 digit random bytes buffer
        this.iv = crypto.randomBytes(16);
    }
    // Encrypt data
    encryptData(data) {
        const key = this.getKey();
        const cipher = crypto.createCipheriv(this.algorithm, key, this.iv);
        const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
        return {
            iv: this.iv.toString('hex'),
            content: encrypted.toString('hex')
        };
    }
    // Decrypt Data
    decryptData(hash) {
        const key = this.getKey();
        const decipher = crypto.createDecipheriv(this.algorithm, key, Buffer.from(hash.iv, 'hex'));
        const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
        return decrpyted.toString();
    }
    // We convert the user entered secret into 16 digit to create a key as per crypto requirement
    getKey() {
        const hash = crypto.createHash("sha1");
        hash.update(this.key);
        let key = Buffer.from(hash.digest("hex").substring(0, 16), "binary");
        return key;
    }
}
exports.default = Utils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi91dGlscy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUFpQztBQUtqQyxNQUFxQixLQUFLO0lBS3RCLFlBQVksTUFBYztRQTJDbkIsZ0JBQVcsR0FBRyxDQUFDLE1BQWUsRUFBRSxFQUFFO1lBRXJDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzVFLG9DQUFvQztZQUNwQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0UsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQyxDQUFDO1FBRUssZ0JBQVcsR0FBRyxDQUFDLFNBQWtCLEVBQUUsRUFBRTtZQUN4QyxNQUFNLEVBQUUsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNsQyxlQUFlO1lBQ2YsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzFCLG9CQUFvQjtZQUNwQixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDbEUsc0JBQXNCO1lBQ3RCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0UsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQyxDQUFBO1FBNURHLGtCQUFrQjtRQUNsQixJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUNsQixxQkFBcUI7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7UUFDL0Isc0NBQXNDO1FBQ3RDLElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsZUFBZTtJQUNSLFdBQVcsQ0FBQyxJQUFXO1FBQzFCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUUxQixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVuRSxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXZFLE9BQU87WUFDSCxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQzNCLE9BQU8sRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztTQUNyQyxDQUFDO0lBQ04sQ0FBQztJQUNELGVBQWU7SUFDUixXQUFXLENBQUMsSUFBVTtRQUN6QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFMUIsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRTVGLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFdkcsT0FBTyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELDZGQUE2RjtJQUN0RixNQUFNO1FBRVQsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV0QixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVyRSxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7Q0FxQko7QUFuRUQsd0JBbUVDIn0=