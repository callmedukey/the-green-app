import Image from "next/image";
import Logo from "@/public/logo.svg";
import Account from "@/public/account.svg";
import Link from "next/link";

const Header = () => {
  return (
    <header className="h-24 flex items-center justify-center px-12">
      <Link href="/" className="ml-0 mr-auto">
        <Image src={Logo} alt="logo" width={150} height={100} priority />
      </Link>
      <nav className="flex items-center gap-4 ">
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
          href="/inquiry"
          className="p-4 hover:bg-gray-200 transition-colors duration-300"
        >
          건축문의
        </Link>
        <Link
          href="easy-quote"
          className="px-4 py-2 bg-primary text-white transition-colors duration-300 font-bold rounded-md hover:bg-yellow-500"
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
    </header>
  );
};

export default Header;
