"use server";

import { auth } from "@/auth";
import { KakaoTemplates } from "@/lib/kakaoTemplates";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { SolapiMessageService } from "solapi";

export async function createBooking(bookingDetails: {
  name: string;
  phone: string;
  address: string;
  reason: string;
  pyeong: number;
  planDate: string;
  bookingTime: string;
  bookingDate: Date;
}) {
  try {
    const session = await auth();

    if (!session?.user) return { error: "로그인 해주세요" };

    const booked = await prisma.booking.create({
      data: {
        name: bookingDetails.name,
        phone: bookingDetails.phone,
        address: bookingDetails.address,
        reason: bookingDetails.reason,
        pyeong: bookingDetails.pyeong + "",
        planDate: bookingDetails.planDate,
        bookingTime: bookingDetails.bookingTime,
        bookingDate: bookingDetails.bookingDate,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    revalidatePath("/account");
    if (booked) {
      const solapi = new SolapiMessageService(
        process.env.SOLAPI_API_KEY!,
        process.env.SOLAPI_API_SECRET!
      );

      await solapi.sendOne({
        to: bookingDetails.phone,
        from: process.env.SOLAPI_SENDER_PHONE_NUMBER!,
        kakaoOptions: {
          pfId: process.env.SOLAPI_PFID!,
          templateId: KakaoTemplates.BOOKING,
          variables: {
            "#{name}": bookingDetails.name,
          },
        },
      });

      return { message: "예약 신청이 성공적으로 완료되었습니다." };
    }
    return { error: "예약 신청을 실패하였습니다." };
  } catch (error) {
    console.error(error);
    return { error: "예약 신청을 실패하였습니다. 유선으로 부탁드리겠습니다." };
  }
}
