import MainContainer from "@/components/layout/MainContainer";
import React from "react";
import Banner3 from "@/public/banner-3.jpg";
import CenterContainer from "@/components/layout/CenterContainer";

const page = () => {
  return (
    <MainContainer title="현장 방문 예약" img={Banner3} imgAlt="배너">
      <CenterContainer className="max-w-xl"></CenterContainer>
    </MainContainer>
  );
};

export default page;
