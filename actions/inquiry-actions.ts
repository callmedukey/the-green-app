"use server";

import { attachments, inquiry } from "@prisma/client";
import prisma from "@/lib/prisma";
import { z } from "zod";
import testValidPhoneNumber from "@/lib/testValidPhoneNumber";

export const createInquiry = async (inquiry: any) => {
  console.log(inquiry);
  console.log(__dirname);
  return true;
};
