"use client";
import React from "react";
import { Button } from "../ui/button";

import { signOutUser } from "@/actions/actions";

const LogoutButton = () => {
  const handleLogout = async () => {
    await signOutUser();
  };
  return (
    <Button className="w-full" variant="outline" onClick={handleLogout}>
      로그아웃
    </Button>
  );
};

export default LogoutButton;
