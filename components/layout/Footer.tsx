import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 py-6 w-full shrink-0 items-center px-4 md:px-16 text-xs font-doHyeon text-white bg-primary xl:items-start">
      <p>전화번호: 1544 2638 </p>
      <p>남양주 현장</p>
      <p className="mt-6">{`주식회사 더그린컨설팅`}</p>
      <p>대표: 손주찬</p>
      <p>사업자 번호: 347-86-02731</p>
      <p>본사 주소: 서울특별시 강남구 논현로151길 41, 3층</p>
    </footer>
  );
};

export default Footer;
