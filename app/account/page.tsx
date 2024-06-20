import SignoutButton from "@/components/auth/SignoutButton";
import MainContainer from "@/components/layout/MainContainer";

import { Input } from "@/components/ui/input";
import React from "react";

const page = () => {
  return (
    <MainContainer title="My 그린">
      <div>
        <Input type="datetime-local" />
      </div>
      <SignoutButton />
    </MainContainer>
  );
};

export default page;
