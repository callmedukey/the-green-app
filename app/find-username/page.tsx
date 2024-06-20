import FindUsernameForm from "@/components/auth/FindUsernameForm";
import CenterContainer from "@/components/layout/CenterContainer";
import MainContainer from "@/components/layout/MainContainer";

const FindUsernamePage = () => {
  return (
    <MainContainer
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
