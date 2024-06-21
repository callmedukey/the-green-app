import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import CenterContainer from "@/components/layout/CenterContainer";
import MainContainer from "@/components/layout/MainContainer";
import Banner from "@/public/banner-2.jpg";

const ResetPasswordPage = () => {
  return (
    <MainContainer
      title="비밀번호 초기화"
      img={Banner}
      className="flex items-center justify-start flex-col"
    >
      <CenterContainer className="w-full max-w-sm">
        <ResetPasswordForm />
      </CenterContainer>
    </MainContainer>
  );
};

export default ResetPasswordPage;
