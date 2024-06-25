"use client";
import React from "react";
import { Button } from "../ui/button";
import { signOutUser } from "@/actions/actions";
import { cn } from "@/lib/utils";

const SignoutButton = ({ className }: { className?: string }) => {
  return (
    <Button
      type="button"
      onClick={() => signOutUser()}
      variant="outline"
      className={cn("w-full mx-auto max-w-sm", className)}
    >
      로그아웃
    </Button>
  );
};

export default SignoutButton;
