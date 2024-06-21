import type { NextRequest } from "next/server";
import path from "path";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from "zod";
import testValidPhoneNumber from "@/lib/testValidPhoneNumber";
import { InquiryType } from "@prisma/client";

import { writeFile } from "fs/promises";
import { renameFileWithExtension } from "@/lib/renameFile";

const InquiryPlanSchema = z.object({
  name: z.string().min(2, { message: "성함을 입력해주세요." }),
  phone: z
    .string()
    .min(1, { message: "전화번호를 입력해주세요." })
    .refine((val) => testValidPhoneNumber(val), {
      message: "올바른 전화번호를 입력해주세요.",
    }),
  title: z.string().min(1, { message: "제목을 입력해주세요." }),
  content: z
    .string()
    .min(1, { message: "내용을 입력해주세요." })
    .max(1000, { message: "1000자 이하로 입력해주세요." }),
  file1: z.any().optional(),
  file2: z.any().optional(),
  type: z.enum(["CONSTRUCTION", "PLAN", "ETC"]),
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const firstFile: File | undefined = formData.get("file1") as
      | File
      | undefined;
    const secondFile: File | undefined = formData.get("file2") as
      | File
      | undefined;

    const session = await auth();

    const parsed = InquiryPlanSchema.parse({
      title: formData?.get("title"),
      content: formData?.get("content"),
      name: formData?.get("name"),
      phone: formData?.get("phone"),
      type: formData?.get("type"),
    });

    if (!session || !session.user?.id) {
      return Response.json({ message: "로그인이 필요합니다." });
    }

    const createdInquiry = await prisma.inquiry.create({
      data: {
        title: parsed.title,
        content: parsed.content,
        name: parsed.name,
        phone: parsed.phone,
        inquiryType: parsed.type as InquiryType,
        user: {
          connect: {
            id: session?.user?.id,
          },
        },
      },
    });

    if (firstFile !== undefined && typeof firstFile !== "string") {
      const updated = await prisma.$transaction(async (tx) => {
        const createdID = await tx.attachments.create({
          data: {
            inquiry: {
              connect: {
                id: createdInquiry.id,
              },
            },
          },
        });
        if (createdID) {
          const updated = await tx.attachments.update({
            where: {
              id: createdID.id,
            },
            data: {
              fileName: renameFileWithExtension(
                firstFile.name,
                createdID.id.toString()
              ),
            },
          });
          if (updated) {
            return updated;
          } else throw new Error("Blegh");
        }
      });

      if (updated) {
        const buffer = Buffer.from(await firstFile.arrayBuffer());
        await writeFile(
          path.join(process.cwd(), "uploads/" + updated.fileName),
          buffer
        );
      }
    }
    if (secondFile !== undefined && typeof secondFile !== "string") {
      const updated = await prisma.$transaction(async (tx) => {
        const createdID = await tx.attachments.create({
          data: {
            inquiry: {
              connect: {
                id: createdInquiry.id,
              },
            },
          },
        });
        if (createdID) {
          const updated = await tx.attachments.update({
            where: {
              id: createdID.id,
            },
            data: {
              fileName: renameFileWithExtension(
                secondFile.name,
                createdID.id.toString()
              ),
            },
          });
          if (updated) {
            return updated;
          } else throw new Error("Blegh");
        }
      });

      if (updated) {
        const buffer = Buffer.from(await secondFile.arrayBuffer());
        await writeFile(
          path.join(process.cwd(), "uploads/" + updated.fileName),
          buffer
        );
      }
    }

    return Response.json({
      message: "문의 등록 되셨습니다! 곧 연락드리겠습니다",
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      error: "문의 등록 오류, 유선 문의 부탁드리겠습니다.",
    });
  }
}
