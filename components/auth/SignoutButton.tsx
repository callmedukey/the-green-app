"use client";
import React from "react";
import { Button } from "../ui/button";
import { signOutUser } from "@/actions/actions";

const SignoutButton = () => {
  return (
    <Button type="button" onClick={() => signOutUser()}>
      SignoutButton
    </Button>
  );
};

export default SignoutButton;
