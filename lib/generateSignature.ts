import crypto from "crypto";

export const generateSignature = async () => {
  const date = new Date().toUTCString();
  const salt = crypto.randomBytes(16).toString("hex");
  const signatureData = `${date} ${salt}`;
  const signature = crypto
    .createHmac("sha256", apiSecret)
    .update(signatureData)
    .digest("hex");
};
