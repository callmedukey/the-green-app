"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
      return { message: "예약 신청이 성공적으로 완료되었습니다." };
    }
    return { error: "예약 신청을 실패하였습니다." };
  } catch (error) {
    console.error(error);
    return { error: "예약 신청을 실패하였습니다. 유선으로 부탁드리겠습니다." };
  }
}
