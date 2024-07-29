import Link from "next/link";
import Result from "@/public/result.webp";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { Play } from "lucide-react";
import Image from "next/image";
export const dynamic = "force-dynamic";

export default async function EasyQuoteResult() {
  const cookieStore = cookies();
  const pyeong = cookieStore.get("pyeong")?.value.toLocaleLowerCase();
  const adminSetting = await prisma.adminSetting.findFirst();

  let price;

  if (Number(pyeong) < 199) {
    price = Math.floor(Number(pyeong) * Number(adminSetting?.upTo199));
  } else if (Number(pyeong) < 399) {
    price = Math.floor(Number(pyeong) * Number(adminSetting?.upTo399));
  } else {
    price = Math.floor(Number(pyeong) * Number(adminSetting?.above400));
  }
  return (
    <main className="flex-1">
      <Image
        src="/tasks-banner.webp"
        alt="그린벨트 공장에서 나오는 트럭 이미지"
        width={1800}
        height={800}
        priority
        className="w-full mt-16"
      />
      <section
        className="w-full relative scroll-mt-24 min-h-[calc(100dvh-9rem)] max-h-[62.5rem] mt-32 mb-96"
        id="main"
      >
        <Image
          src={Result}
          alt="견적 결과 이미지"
          fill
          className="object-fill -z-10"
        />
        <div className="w-full h-full py-36 max-width-tg">
          <div className="grid lg:grid-cols-2 lg:divide-x divide-black gap-y-24">
            <div className="flex flex-col items-start justify-center xl:px-16 gap-4 md:px-8 sm:px-4 w-full">
              <div className="xl:m-auto mx-auto px-4 sm:px-0">
                <h1 className="text-[2.5rem] font-bold text-quadGray">
                  간편 견적 결과
                </h1>
                <div className="grid grid-cols-[40%_60%] xl:w-[420px] h-[130px] bg-primary rounded-[10px] text-white px-4 sm:px-8 py-6 gap-y-4 text-xl font-doHyeon mt-6 font-semibold">
                  <div className="">총금액</div>
                  <div className="">{price.toLocaleString()}원</div>
                  <div className="">평수</div>
                  <div className="">{pyeong}평</div>
                </div>
                <p className="max-w-[430px] text-base break-keep font-bold tracking-[3%]">
                  * 상기 금액은 건축평수와 공사여건에 따라 가감될 수 있음
                </p>
              </div>
            </div>
            <div className="grid xl:px-32 md:px-16 px-8 xl:gap-x-32 lg:gap-x-24 sm:gap-x-16 gap-x-4 lg:h-[250px] place-items-center sm:grid-cols-2">
              <div className="col-span-2 w-full mb-6">
                <h2 className="font-bold text-[2.5rem] tracking-[10%] text-quadGray">
                  상세 견적상담은
                </h2>
                <p className="text-xl tracking-[3%] font-medium text-white max-w-[325px] w-full text-left">
                  아래 현장방문예약 또는 상세견적문의 로 바로가기 하심 됩니다
                  가능합니다
                </p>
              </div>
              <div className="text-nowrap w-full col-span-2 sm:col-span-1">
                <h3 className="text-[1.75rem] font-medium tracking-[10%] text-quadGray">
                  현장방문예약
                </h3>
                <p className="flex flex-col text-white text-base font-medium tracking-[3%] leading-[20px]">
                  <span>현장에 답이 있다</span>
                  <span>건축 현장에서 만납니다</span>
                </p>
                <Link
                  href="/booking"
                  className="mb-0 rounded-full border w-fit px-4 py-0.5 flex items-center justify-center gap-2 mr-auto ml-0 text-white  shadow-sm text-lg hover:bg-yellow-500 transition-all duration-300 font-medium !mt-12"
                >
                  바로 가기
                  <Play fill="white" className="size-3" />
                </Link>
              </div>
              <div className="text-nowrap w-full col-span-2 sm:col-span-1">
                <h3 className="text-[1.75rem] font-medium tracking-[10%] text-quadGray">
                  상세견적문의
                </h3>
                <p className="flex flex-col text-white text-base font-medium tracking-[3%] leading-[20px]">
                  <span>훼손지 정비 선도기업</span>
                  <span>더그린이 함께 하겠습니다</span>
                </p>
                <Link
                  href="/inquiry"
                  className="mb-0 rounded-full border w-fit px-4 py-0.5 flex items-center justify-center gap-2 mr-auto ml-0 text-white  shadow-sm text-lg hover:bg-yellow-500 transition-all duration-300 font-medium !mt-12"
                >
                  바로 가기
                  <Play fill="white" className="size-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
