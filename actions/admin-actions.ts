"use server";
import prisma from "@/lib/prisma";

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
