const apiKey = process.env.SOLAPI_APIKEY as string;
const apiSecret = process.env.SOLAPI_APIKEY_SECRET as string;

export const solapiSMSUrl = "https://api.solapi.com/messages/v4/send";

async function generateSignature(date: string, salt: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(apiSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
  const data = encoder.encode(`${date} ${salt}`);
  const signature = await crypto.subtle.sign("HMAC", key, data);
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const generateHeadersSolapi = async (date: string) => {
  const salt = Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const signature = await generateSignature(date, salt);
  return {
    "Content-Type": "application/json",
    Authorization: `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`,
  };
};

export const sendSolapiSMS = async ({
  to,
  from,
  text,
  date,
}: {
  to: string;
  from: string;
  text: string;
  date: string;
}) => {
  const headers = await generateHeadersSolapi(date);
  const response = await fetch(solapiSMSUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({
      message: {
        to,
        from,
        text,
      },
    }),
  });

  console.log(await response.json());
};
