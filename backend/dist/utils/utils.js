"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class Utils {
    constructor(secret) {
        this.key = secret;
        this.algorithm = 'aes-128-cbc';
        this.iv = crypto.randomBytes(16);
    }
    encryptData(data) {
        const key = this.getKey();
        const cipher = crypto.createCipheriv(this.algorithm, key, this.iv);
        const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
        return {
            iv: this.iv.toString('hex'),
            content: encrypted.toString('hex')
        };
    }
    decryptData(hash) {
        const key = this.getKey();
        const decipher = crypto.createDecipheriv(this.algorithm, key, Buffer.from(hash.iv, 'hex'));
        const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
        return decrpyted.toString();
    }
    getKey() {
        const hash = crypto.createHash("sha1");
        hash.update(this.key);
        let key = Buffer.from(hash.digest("hex").substring(0, 16), "binary");
        return key;
    }
}
exports.default = Utils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi91dGlscy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUFpQztBQUdqQyxNQUFxQixLQUFLO0lBSXRCLFlBQVksTUFBTTtRQUNkLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO1FBQy9CLElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ00sV0FBVyxDQUFDLElBQVc7UUFDMUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRTFCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRW5FLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFdkUsT0FBTztZQUNILEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDM0IsT0FBTyxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1NBQ3JDLENBQUM7SUFDTixDQUFDO0lBQ00sV0FBVyxDQUFDLElBQVU7UUFDekIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRTFCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUU1RixNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXZHLE9BQU8sU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFDTSxNQUFNO1FBQ1QsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV0QixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVyRSxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7Q0FDSjtBQXZDRCx3QkF1Q0MifQ==