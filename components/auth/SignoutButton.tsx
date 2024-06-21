"use client";
import React from "react";
import { Button } from "../ui/button";
import { signOutUser } from "@/actions/actions";

const SignoutButton = () => {
  return (
    <Button
      type="button"
      onClick={() => signOutUser()}
      variant="outline"
      className="w-full mx-auto max-w-sm"
    >
      로그아웃
    </Button>
  );
};

export default SignoutButton;
