import EasyQuoteStepOne from "@/components/easy-quote/EasyQuoteStepOne";
import CenterContainer from "@/components/layout/CenterContainer";
import MainContainer from "@/components/layout/MainContainer";
import React from "react";

const EasyQuotePage = () => {
  return (
    <MainContainer title="간편 견적계산기">
      <CenterContainer>
        <EasyQuoteStepOne />
      </CenterContainer>
    </MainContainer>
  );
};

export default EasyQuotePage;
