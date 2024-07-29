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
      <div className="px-4 py-24 grid xl:grid-cols-3 sm:grid-cols-2 max-width-tg place-items-center">
        <div className="flex flex-col w-full text-2xl items-center justify-center text-tertiaryGray sm:place-self-start sm:mt-6">
          <p className="text-xl">창고 짓기를 준비하시간요?</p>
          <p className="mt-2 text-left flex items-baseline">
            예상{" "}
            <strong className="text-4xl text-black mx-2"> 건축비용 </strong> 을
          </p>
          <p className="mt-0">확인해보세요!</p>
        </div>
        <EasyQuoteStepOne />
      </div>
    </MainContainer>
  );
};

export default EasyQuotePage;
