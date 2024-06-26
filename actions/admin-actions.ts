"use server";
import prisma from "@/lib/prisma";
import { UserStatus } from "@prisma/client";
import { z } from "zod";

export const bookTime = async (
  bookingId: string,
  newDate: Date,
  newTime: string
) => {
  try {
    const booked = await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        confirmedBookingDate: new Date(newDate),
        confirmedTime: newTime,
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
        data: parsed,
      });

      if (created) {
        return {
          message: "설정이 저장되었습니다",
        };
      }
    }

    const updated = await prisma.adminSetting.update({
      where: {
        id: findSetting[0]?.id,
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

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

export const saveUserStatus = async ({
  id,
  status,
}: {
  id: string;
  status: UserStatus;
}) => {
  try {
    const updated = await prisma.user.update({
      where: {
        id,
      },
      data: {
        userStatus: status,
      },
    });

    if (updated) {
      return { message: "관리 단계가 업데이트되었습니다" };
    }
    return { error: "관리 단계 업데이트에 실패했습니다" };
  } catch (error) {
    console.error(error);
    return { error: "관리 단계 업데이트에 실패했습니다" };
  }
};
