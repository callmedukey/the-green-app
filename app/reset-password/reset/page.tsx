import ResetPasswordFormFinal from "@/components/auth/ResetPasswordFormFinal";
import CenterContainer from "@/components/layout/CenterContainer";
import MainContainer from "@/components/layout/MainContainer";
import Banner from "@/public/banner-2.jpg";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

const ResetPasswordFinalPage = async ({
  searchParams,
}: {
  searchParams: { code: string };
}) => {
  const { code } = searchParams;

  if (!code) {
    return redirect("/reset-password");
  }

  const foundCode = await prisma.oneTimeUniqueCode.findFirst({
    where: {
      id: code,
    },
  });

  if (!foundCode) {
    return redirect("/reset-password");
  }

  return (
    <MainContainer
      title="비밀번호 재설정"
      img={Banner}
      className="flex items-center justify-start flex-col"
    >
      <CenterContainer className="max-w-sm">
        <ResetPasswordFormFinal uniqueCode={code} />
      </CenterContainer>
    </MainContainer>
  );
};

export default ResetPasswordFinalPage;
