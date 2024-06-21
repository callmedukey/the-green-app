"use server";

import { auth } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getQuoteFirstStep = async ({
  name,
  phone,
  pyeong,
}: {
  name: string;
  phone: string;
  pyeong: string;
}) => {
  try {
    const cookieStore = cookies();
    cookieStore.set("name", name, {
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24,
    });
    cookieStore.set("phone", phone, {
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24,
    });
    cookieStore.set("pyeong", pyeong, {
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24,
    });

    const session = auth();

    if (!session) {
      return { redirectTo: "login" };
    }

    return { redirectTo: "easy-quote/result" };
  } catch (error) {
    return { error: "오류가 발생했습니다." };
  }
};
