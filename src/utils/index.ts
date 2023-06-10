import crypto from "crypto";

const iv = crypto.randomBytes(16);
const key = process.env.ENCRYPTION_KEY as string;

export const encrypt = (data: string) => {
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(key, "hex"),
    iv
  );
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return {
    iv: Buffer.from(iv).toString("base64"),
    encrypted: encrypted.toString("hex"),
  };
};

export const decrypt = (data: string, iv: string) => {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(key, "hex"),
    Buffer.from(iv, "base64")
  );
  let decrypted = decipher.update(data, "hex");
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString("utf-8");
};
