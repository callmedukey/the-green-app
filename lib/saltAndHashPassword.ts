const encoder = new TextEncoder();
const decoder = new TextDecoder();

const generateSalt = (): Uint8Array => {
  const salt = new Uint8Array(16);
  return salt;
};

const deriveKey = async (
  password: string,
  salt: Uint8Array
): Promise<Uint8Array> => {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits", "deriveKey"]
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  const rawKey = await crypto.subtle.exportKey("raw", key);
  return new Uint8Array(rawKey);
};

const saltAndHashPassword = async (password: string): Promise<string> => {
  try {
    const salt = generateSalt();
    const derivedKey = await deriveKey(password, salt);
    return `${Buffer.from(salt).toString("hex")}:${Buffer.from(
      derivedKey
    ).toString("hex")}`;
  } catch (error) {
    console.error("Error salting and hashing password:", error);
    throw new Error("Failed to hash password");
  }
};

export default saltAndHashPassword;
