import LoginForm from "@/components/auth/LoginForm";
import CenterContainer from "@/components/layout/CenterContainer";
import MainContainer from "@/components/layout/MainContainer";
import Banner from "@/public/banner-1.png";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const LoginPage = async () => {
  const cookieStore = cookies();
  const cameFromQuote = cookieStore.get("cameFromQuote")?.value;
  revalidatePath("/reset-password/reset");

  return (
    <MainContainer
      title="로그인"
      img={Banner}
      className="flex items-center justify-start flex-col"
    >
      <CenterContainer className="max-w-sm min-h-[60vh] pt-24 flex flex-col px-4">
        <LoginForm cameFromQuote={cameFromQuote} />
      </CenterContainer>
    </MainContainer>
  );
};

export default LoginPage;
