"use server";
import { auth, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const checkQuoteResult = async ({
  name,
  phone,
  pyeong,
}: {
  name: string;
  phone: string;
  pyeong: string;
}) => {
  const session = await auth();
  const cookieStores = cookies();

  cookieStores.set("name", name, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24,
  });
  cookieStores.set("phone", phone, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24,
  });
  cookieStores.set("pyeong", pyeong, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24,
  });
  cookieStores.set("cameFromQuote", "true", {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24,
  });

  if (!session) {
    return redirect("/login");
  }

  return redirect("/easy-quote/result#main");
};

export const signOutUser = async () => {
  revalidatePath("/account");
  revalidatePath("/admin");
  return signOut({ redirectTo: "/login", redirect: true });
};

export const revalidatePaths = () => {
  revalidatePath("/account");
  revalidatePath("/easy-quote/result");
};
