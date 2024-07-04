"use client";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import Account from "@/public/account.svg";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

const Header = () => {
  return (
    <header className="h-24 flex items-center justify-center sm:px-12 px-6">
      <Link href="/" className="ml-0 mr-auto">
        <Image src={Logo} alt="logo" width={250} height={100} priority />
      </Link>

      <nav className="items-center gap-2 lg:gap-4 lg:flex hidden">
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
          사업분야
        </Link>
        <Link
          href="/inquiry"
          className="p-4 hover:bg-gray-200 transition-colors duration-300"
        >
          상세 견적문의하기
        </Link>
        <Link
          href="/booking"
          className="p-4 hover:bg-gray-200 transition-colors duration-300"
        >
          현장방문예약
        </Link>

        <Link
          href="/easy-quote"
          className="px-4 py-2 bg-primary text-white transition-colors duration-300 font-semibold rounded-md hover:bg-yellow-500"
        >
          7초 간편견적
        </Link>
        <Link href="/account" className="px-4">
          <Image
            src={Account}
            width={35}
            height={35}
            priority
            alt="Account link"
          />
        </Link>
      </nav>
      <MobileMenu />
    </header>
  );
};

export default Header;



