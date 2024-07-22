import Link from "next/link";

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
        className="w-full bg-[url('/result.webp')] bg-center bg-cover bg-no-repeat scroll-mt-24 min-h-[calc(100dvh-9rem)] mt-32 mb-96"
        id="main"
      >
        <div className="w-full h-full py-36">
          <div className="grid lg:grid-cols-2 lg:divide-x divide-black gap-y-24">
            <div className="flex flex-col items-start justify-center px-16 gap-4">
              <div className="m-auto space-y-6">
                <h1 className="text-[40px] font-bold text-center mb-[100px]">
                  견적 결과
                </h1>
                <div className="grid grid-cols-[40%_60%] w-[420px] h-[130px] bg-primary rounded-[10px] text-white px-8 py-6 gap-y-4 text-xl font-doHyeon">
                  <div className="">총금액</div>
                  <div className="">{price.toLocaleString()}원</div>
                  <div className="">평수</div>
                  <div className="">{pyeong}평</div>
                </div>
                <p className="max-w-[430px] text-base break-keep tracking-[3%]">
                  간편 건축 비용은 대략적인 건축 비용이며 건축면적 크리와 여건에
                  따라 가감이 발생할 수 있습니다. 정확한 상세 건축비 용이
                  궁금하시면 선택 두 가지 중 하나를 선택하시기 바랍니다.
                </p>
              </div>
            </div>
            <div className="grid xl:px-32 px-16 gap-x-32 lg:h-[450px] place-items-center sm:grid-cols-2">
              <div className="col-span-2 text-center">
                <h2 className="font-bold text-[40px] tracking-[10%]">
                  정확한 건축 견적 상담은
                </h2>
                <p className="text-xl tracking-[3%] font-medium text-white max-w-[365px] mx-auto w-full text-left">
                  상세 견적문의 또는 현장 방문 예약을 통해서 속시원히 확인
                  가능합니다
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="text-[32px] font-medium tracking-[10%]">
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
              <div className="space-y-6">
                <h3 className="text-[32px] font-medium tracking-[10%]">
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
