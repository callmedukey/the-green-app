import SignoutButton from "@/components/auth/SignoutButton";
import CenterContainer from "@/components/layout/CenterContainer";
import MainContainer from "@/components/layout/MainContainer";
import MainBanner from "@/public/banner-1.png";
import React from "react";

const page = () => {
  return (
    <MainContainer title="My 더그린" img={MainBanner} imgAlt="Main Banner">
      <CenterContainer className="w-full max-w-xl ">
        <SignoutButton />
      </CenterContainer>
    </MainContainer>
  );
};

export default page;
