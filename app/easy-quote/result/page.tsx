import Link from "next/link";

import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { Play } from "lucide-react";
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
      <section
        className="w-full bg-[url('/modern.webp')] bg-center bg-cover bg-no-repeat scroll-mt-24 min-h-[calc(100dvh-9rem)]"
        id="main"
      >
        <div className="bg-trulyFinalGray/50 w-full h-full py-36">
          <div className="grid lg:grid-cols-2 lg:divide-x divide-white gap-y-24">
            <div className="flex flex-col items-start justify-center px-16 gap-4">
              <div className="m-auto space-y-6">
                <h1 className="text-5xl font-han text-left">견적 결과</h1>
                <p className="max-w-[500px] font-doHyeon text-lg">
                  간편 건축 비용은 대략적인 건축 비용이며 건축면적크기와 여건에
                  따라 가감이 발생할 수 있습니다. 정확한 상세 건축비용이
                  궁금하시면 현장 방문 요청 또는 문의를 넣어주시면 더그린의
                  전문가가 상세하게 답변을 드리겠습니다.
                </p>
                <div className="grid grid-cols-[40%_60%] w-[90%] bg-primary rounded-[10px] text-white font-doHyeon px-8 py-4 gap-y-4 text-lg">
                  <div className="">총금액</div>
                  <div className="">{price.toLocaleString()}원</div>
                  <div className="">평수</div>
                  <div className="">{pyeong}평</div>
                </div>
              </div>
            </div>
            <div className="grid xl:px-32 px-16 gap-y-16 lg:h-[600px] place-items-center sm:grid-cols-2 lg:grid-cols-1">
              <div className="space-y-6">
                <h2 className="text-5xl font-han">상세 견적문의</h2>
                <p className="flex flex-col text-white font-doHyeon text-lg">
                  <span>훼손지 정비 선도기업</span>
                  <span>더그린이 함께 하겠습니다</span>
                </p>
                <Link
                  href="/inquiry"
                  className="mt-auto mb-0 rounded-full border w-fit px-4 py-0.5 flex items-center justify-center gap-2 text-sm mr-auto ml-0 text-white font-doHyeon shadow-sm bg-trulyFinalGray/70 hover:bg-yellow-500 transition-all duration-300"
                >
                  바로 가기
                  <Play fill="white" className="size-3" />
                </Link>
              </div>
              <div className="space-y-6">
                <h2 className="text-5xl font-han">현장 방문예약</h2>
                <p className="flex flex-col text-white font-doHyeon text-lg">
                  <span>현장에 답이 있다</span>
                  <span>건축 현장에서 만납니다</span>
                </p>
                <Link
                  href="/inquiry"
                  className="mt-auto mb-0 rounded-full border w-fit px-4 py-0.5 flex items-center justify-center gap-2 text-sm mr-auto ml-0 text-white font-doHyeon shadow-sm bg-trulyFinalGray/70 hover:bg-yellow-500 transition-all duration-300"
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
