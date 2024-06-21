import { auth } from "@/auth";
import type { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { readFile } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export const GET = async (req: NextRequest) => {
  try {
    const session = await auth();

    if (!session) {
      return Response.json({ error: "Unauthorized" });
    }
    const searchParams = req.nextUrl.searchParams;
    const fileName = searchParams.get("fileName");

    if (!fileName) {
      return Response.json({ error: "File name is required" });
    }
    const found = await prisma.attachments.findFirst({
      where: {
        fileName,
      },
    });

    if (found) {
      if (
        !existsSync(path.join(process.cwd(), "uploads") + "/" + found.fileName)
      ) {
        return Response.json({ error: "File not found" });
      }
      const file = await readFile(
        path.join(process.cwd(), "uploads") + "/" + found.fileName
      );
      return new Response(file, {
        headers: {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": `attachment; filename="${found.fileName}"`,
        },
      });
    } else {
      return Response.json({ error: "파일을 찾을수 없습니다" });
    }
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" });
  }
};
