"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import type { Session } from "next-auth";
import { cn } from "@/lib/utils";
import { signOutUser } from "@/actions/actions";

const MobileMenu = ({
  session,
  scrolled,
}: {
  session: Session | null;
  scrolled: boolean;
}) => {
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await signOutUser();
    setOpen(false);
  };

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        className="ml-auto mr-0 lg:hidden"
        aria-label="모바일 메뉴"
      >
        <Menu
          className={cn(
            "size-8 stroke-white mr-0 ml-auto lg:hidden group-hover:stroke-black",
            scrolled && "stroke-black"
          )}
        />
      </DrawerTrigger>
      <DrawerContent className="text-xl">
        <div className="grid grid-cols-2 items-center bg-primary py-3 px-6 text-white place-items-center divide-x-white divide-x-2">
          {session ? (
            <button
              className="block w-full text-center font-bold"
              onClick={handleLogout}
              type="button"
            >
              로그아웃
            </button>
          ) : (
            <Link
              href="/login"
              className="block w-full text-center font-bold"
              onClick={() => setOpen(false)}
            >
              로그인
            </Link>
          )}
          <Link
            href="/register"
            className="block w-full text-center font-bold"
            onClick={() => setOpen(false)}
          >
            회원 가입
          </Link>
        </div>
        <nav className="flex flex-col px-4 divide-y">
          <Link
            href="/about"
            className="p-4 hover:bg-gray-200 transition-colors duration-300"
            onClick={() => setOpen(false)}
          >
            About 더그린
          </Link>
          <Link
            href="/tasks"
            className="p-4 hover:bg-gray-200 transition-colors duration-300"
            onClick={() => setOpen(false)}
          >
            주요 업무
          </Link>
          <Link
            href="/booking"
            className="p-4 hover:bg-gray-200 transition-colors duration-300"
            onClick={() => setOpen(false)}
          >
            현장방문예약
          </Link>
          <Link
            href="/inquiry"
            className="p-4 hover:bg-gray-200 transition-colors duration-300"
            onClick={() => setOpen(false)}
          >
            상세견적문의
          </Link>
          <Link
            href="/easy-quote"
            className="p-4 hover:bg-gray-200 transition-colors duration-300"
            onClick={() => setOpen(false)}
          >
            7초 간편견적
          </Link>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger className="no-underline border-0 hover:no-underline p-4">
                마이페이지
              </AccordionTrigger>
              <AccordionContent className="py-2 text-base">
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/account?state=current"
                      className="p-4 hover:bg-gray-200 transition-colors duration-300"
                      onClick={() => setOpen(false)}
                    >
                      나의 단계
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/account?state=account"
                      className="p-4 hover:bg-gray-200 transition-colors duration-300"
                      onClick={() => setOpen(false)}
                    >
                      나의 정보
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/account?state=bookings"
                      className="p-4 hover:bg-gray-200 transition-colors duration-300"
                      onClick={() => setOpen(false)}
                    >
                      방문예약내역
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/account?state=inquiries"
                      className="p-4 hover:bg-gray-200 transition-colors duration-300"
                      onClick={() => setOpen(false)}
                    >
                      문의내역
                    </Link>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </nav>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
