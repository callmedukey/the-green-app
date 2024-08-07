import RegisterForm from "@/components/auth/RegisterForm";
import MainContainer from "@/components/layout/MainContainer";
import { cookies } from "next/headers";
import Banner from "@/public/banner3.webp";

const RegisterPage = () => {
  const cookieStore = cookies();
  const cookieLastSent = cookieStore.get("verifying-number")?.value;
  const cameFromQuote = cookieStore.get("cameFromQuote")?.value;
  const name = cookieStore.get("name")?.value;
  const phone = cookieStore.get("phone")?.value;

  return (
    <MainContainer title="회원가입" img={Banner}>
      <RegisterForm
        cookieSentTime={cookieLastSent ?? ""}
        cameFromQuote={cameFromQuote ?? ""}
        name={name ?? ""}
        phone={phone ?? ""}
      />
    </MainContainer>
  );
};

export default RegisterPage;
