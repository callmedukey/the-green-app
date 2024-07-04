import MainContainer from "@/components/layout/MainContainer";
import Banner3 from "@/public/banner3.webp";
import CenterContainer from "@/components/layout/CenterContainer";
import InquiryForm from "@/components/inquiry/InquiryForm";
const InquiryPage = () => {
  return (
    <MainContainer
      title="문의하기"
      img={Banner3}
      imgAlt="배너"
      className="pt-16"
    >
      <CenterContainer className="max-w-xl px-4">
        <InquiryForm />
      </CenterContainer>
    </MainContainer>
  );
};

export default InquiryPage;
