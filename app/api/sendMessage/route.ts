import { SolapiMessageService } from "solapi";
import type { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const {
    to,
    from,
    text,
    date,
  }: { to: string; from: string; text: string; date: string } =
    await req.json();

  const messageService = new SolapiMessageService(
    process.env.NEXT_PUBLIC_SOLAPI_API_KEY as string,
    process.env.NEXT_PUBLIC_SOLAPI_API_SECRET as string
  );

  const res = await messageService.sendOne({
    to,
    from,
    text,
  });
  console.log(res);
  return Response.json({ ok: true });
};
