import crypto from "crypto";

const IV_LENGTH = 16;

export default class Encryptor {
  password: string;
  constructor(password: string) {
    this.password = password;
  }
  encrypt(data: object) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(this.password),
      iv
    );
    let encrypted = cipher.update(JSON.stringify(data));
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString("hex") + ":" + encrypted.toString("hex");
  }
  decrypt(text: string) {
    let textParts: Array<string> = text.split(":");

    let iv = Buffer.from(textParts[0], "hex");
    let encryptedText = Buffer.from(textParts[1], "hex");
    let decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(this.password),
      iv
    );
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return JSON.parse(decrypted.toString());
  }
}
