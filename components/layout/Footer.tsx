import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 py-6 w-full shrink-0 items-center px-4 md:px-6 text-xs text-muted-foreground border-t">
      <p className="">&copy; 2024 {`(주)더그린컨설팅`}</p>
      <p>대표: 손주찬</p>
      <p>본사 주소: 서울특별시 강남구 논현로151길 41, 3층</p>
      <p>사업자 번호: 347-86-02731</p>
      <p>고객센터: 1544 2638 (남양주 현장)</p>

      {/* <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          href="#"
          className="text-xs hover:underline underline-offset-4"
          prefetch={false}
        >
          Terms of Service
        </Link>
        <Link
          href="#"
          className="text-xs hover:underline underline-offset-4"
          prefetch={false}
        >
          Privacy Policy
        </Link>
      </nav> */}
    </footer>
  );
};

export default Footer;
