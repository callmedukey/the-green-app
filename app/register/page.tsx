import RegisterForm from "@/components/auth/RegisterForm";
import MainContainer from "@/components/layout/MainContainer";
import { cookies } from "next/headers";

const RegisterPage = () => {
  const cookieStore = cookies();
  const cookieLastSent = cookieStore.get("verifying-number")?.value;

  return (
    <MainContainer title="회원가입">
      <RegisterForm cookieSentTime={cookieLastSent ?? ""} />
    </MainContainer>
  );
};

export default RegisterPage;
