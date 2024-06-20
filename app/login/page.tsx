import LoginForm from "@/components/auth/LoginForm";
import CenterContainer from "@/components/layout/CenterContainer";
import MainContainer from "@/components/layout/MainContainer";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const LoginPage = async () => {
  const cookieStore = cookies();
  const cameFromQuote = cookieStore.get("cameFromQuote")?.value;
  revalidatePath("/reset-password/reset");

  return (
    <MainContainer
      title="로그인"
      className="flex items-center justify-start flex-col"
    >
      <CenterContainer className="max-w-sm">
        <LoginForm cameFromQuote={cameFromQuote} />
      </CenterContainer>
    </MainContainer>
  );
};

export default LoginPage;
