import { auth } from "@/auth";
import { AccountTabs } from "@/components/account/AccountTabs";
import SignoutButton from "@/components/auth/SignoutButton";
import CenterContainer from "@/components/layout/CenterContainer";
import MainContainer from "@/components/layout/MainContainer";
import MainBanner from "@/public/banner-1.png";
import { redirect } from "next/navigation";
import React from "react";
import prisma from "@/lib/prisma";

export const dynamic = "force-dyamic";

const page = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      booking: true,
      inquiry: {
        include: {
          attachments: true,
        },
      },
    },
  });
  if (!user) {
    return redirect("/login");
  }

  return (
    <MainContainer title="My 더그린" img={MainBanner} imgAlt="Main Banner">
      <CenterContainer className="w-full max-w-4xl mx-auto flex flex-col gap-4 items-center justify-center px-4">
        <AccountTabs userInfo={user} />
        <SignoutButton />
      </CenterContainer>
    </MainContainer>
  );
};

export default page;
