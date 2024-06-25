import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";

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
            현장 방문예약
          </Link>
          <Link
            href="/inquiry"
            className="p-4 hover:bg-gray-200 transition-colors duration-300"
            onClick={() => setOpen(false)}
          >
            문의하기
          </Link>
          <Link
            href="/easy-quote"
            className="px-4 py-4 bg-primary text-white transition-colors duration-300 font-bold rounded-md hover:bg-yellow-500"
            onClick={() => setOpen(false)}
          >
            7초 간편견적
          </Link>
          <Link
            href="/account"
            className="p-4 hover:bg-gray-200 transition-colors duration-300"
            onClick={() => setOpen(false)}
          >
            마이페이지
          </Link>
          <ul className="pl-4 !-mt-4 space-y-4">
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
                예약 내역
              </Link>
            </li>
            <li>
              <Link
                href="/account?state=inquiries"
                className="p-4 hover:bg-gray-200 transition-colors duration-300"
                onClick={() => setOpen(false)}
              >
                문의 내역
              </Link>
            </li>
          </ul>
        </nav>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
