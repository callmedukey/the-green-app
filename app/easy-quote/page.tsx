import EasyQuoteStepOne from "@/components/easy-quote/EasyQuoteStepOne";
import CenterContainer from "@/components/layout/CenterContainer";
import MainContainer from "@/components/layout/MainContainer";
import BannerImg from "@/public/banner3.webp";

import React from "react";

const EasyQuotePage = async () => {
  return (
    <MainContainer
      title="간편 견적계산기"
      img={BannerImg}
      imgAlt="건설 배너"
      className="pt-16"
    >
      <CenterContainer className="px-4 py-24">
        <EasyQuoteStepOne />
      </CenterContainer>
    </MainContainer>
  );
};

export default EasyQuotePage;
