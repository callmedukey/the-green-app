import SignoutButton from "@/components/auth/SignoutButton";
import MainContainer from "@/components/layout/MainContainer";
import MainBanner from "@/public/banner-1.png";
import { Input } from "@/components/ui/input";
import React from "react";

const page = () => {
  return (
    <MainContainer title="My 그린" img={MainBanner} imgAlt="Main Banner">
      <div>
        <Input type="datetime-local" />
      </div>
      <SignoutButton />
    </MainContainer>
  );
};

export default page;
