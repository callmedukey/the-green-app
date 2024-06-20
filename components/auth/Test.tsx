"use client";
import { signInUser } from "@/actions/actions";
import React from "react";
import { Button } from "../ui/button";

const Test = () => {
  return (
    <form action={signInUser}>
      <Button type="submit" className="w-full my-6">
        로그인
      </Button>
    </form>
  );
};

export default Test;
