"use client";
import { Menu } from "lucide-react";
import Account from "@/public/account.svg";
import Link from "next/link";
import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import Image from "next/image";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        className="ml-auto mr-0 md:hidden"
        aria-label="모바일 메뉴"
      >
        <Menu className="size-12 stroke-black mr-0 ml-auto md:hidden" />
      </DrawerTrigger>
      <DrawerContent className="px-2 text-xl py-4 ">
        <nav className="flex flex-col gap-4 px-4">
          <Link
            href="/about"
            className="p-4 hover:bg-gray-200 transition-colors duration-300"
          >
            About 더그린
          </Link>
          <Link
            href="/tasks"
            className="p-4 hover:bg-gray-200 transition-colors duration-300"
          >
            주요 업무
          </Link>
          <Link
            href="/booking"
            className="p-4 hover:bg-gray-200 transition-colors duration-300"
          >
            현장 방문예약
          </Link>
          <Link
            href="/inquiry"
            className="p-4 hover:bg-gray-200 transition-colors duration-300"
          >
            문의하기
          </Link>
          <Link
            href="easy-quote"
            className="px-4 py-4 bg-primary text-white transition-colors duration-300 font-bold rounded-md hover:bg-yellow-500"
          >
            7초 간편견적
          </Link>
          <Link
            href="/account"
            className="p-4 hover:bg-gray-200 transition-colors duration-300"
          >
            계정
          </Link>
        </nav>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
