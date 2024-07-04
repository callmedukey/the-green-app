import FindUsernameForm from "@/components/auth/FindUsernameForm";
import CenterContainer from "@/components/layout/CenterContainer";
import MainContainer from "@/components/layout/MainContainer";
import MainBanner from "@/public/banner3.webp";

const FindUsernamePage = () => {
  return (
    <MainContainer
      img={MainBanner}
      title="아이디 찾기"
      className="flex items-center justify-start flex-col"
    >
      <CenterContainer className="w-full max-w-sm">
        <FindUsernameForm />
      </CenterContainer>
    </MainContainer>
  );
};

export default FindUsernamePage;
