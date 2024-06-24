"use server";
import prisma from "@/lib/prisma";
import { z } from "zod";

export const bookTime = async (bookingId: string, newDate: string) => {
  try {
    const booked = await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        confirmedBooking: new Date(newDate),
      },
    });

    if (booked) {
      return {
        message: "방문일시 확정되었습니다",
      };
    }
    return {
      error: "방문일시 확정에 실패했습니다",
    };
  } catch (error) {
    console.error(error);
    return {
      error: "방문일시 확정에 실패했습니다",
    };
  }
};

const SettingSchema = z.object({
  upTo199: z
    .string()
    .min(1, { message: "필수 입력칸 입니다" })
    .refine((val) => Number(val) > 0, {
      message: "숫자만 입력해주세요",
    }),
  upTo399: z
    .string()
    .min(1, { message: "필수 입력칸 입니다" })
    .refine((val) => Number(val) > 0, {
      message: "숫자만 입력해주세요",
    }),
  above400: z
    .string()
    .min(1, { message: "필수 입력칸 입니다" })
    .refine((val) => Number(val) > 0, {
      message: "숫자만 입력해주세요",
    }),
});

export const saveAdminSettings = async (
  data: z.infer<typeof SettingSchema>
) => {
  try {
    const parsed = SettingSchema.parse(data);
    const findSetting = await prisma.adminSetting.findMany();

    if (!findSetting?.length) {
      const created = await prisma.adminSetting.create({
        data:parsed
      })

      if (created) {
        return {
          message:"설정이 저장되었습니다"
        }
      }
    }

    const updated = await prisma.adminSetting.update({
      where: {
        id: findSetting?.id,
      },
      data: parsed,
    });

    if (findSetting && updated) {
      return { message: "설정이 저장되었습니다" };
    }
    return { error: "설정 저장에 실패했습니다" };
  } catch (error) {
    console.error(error);
    return { error: "설정 저장에 실패했습니다" };
  }
};
