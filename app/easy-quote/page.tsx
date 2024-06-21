import EasyQuoteStepOne from "@/components/easy-quote/EasyQuoteStepOne";
import CenterContainer from "@/components/layout/CenterContainer";
import MainContainer from "@/components/layout/MainContainer";
import BannerImg from "@/public/banner-2.jpg";

import React from "react";

const EasyQuotePage = async () => {
  return (
    <MainContainer title="간편 견적계산기" img={BannerImg} imgAlt="건설 배너">
      <CenterContainer className="px-4 py-24">
        <EasyQuoteStepOne />
      </CenterContainer>
    </MainContainer>
  );
};

export default EasyQuotePage;
