import Link from "next/link";

import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
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
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section
          className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary"
          id="main"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold tracking-tighter text-white sm:text-4xl xl:text-5xl">
                    견적 결과
                  </h1>
                  <p className="max-w-[600px] text-white/90 md:text-xl">
                    간편 건축 비용은 대략적인 건축 비용이며 건축면적크기와
                    여건에 따라 가감이 발생할 수 있습니다. 정확한 상세
                    건축비용이 궁금하시면 아래 두가지중 하나를 선택하시기
                    바랍니다.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/booking"
                    prefetch={false}
                    className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-white/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    현장 방문 예약
                  </Link>
                  <Link
                    href="/inquiry"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-white bg-transparent px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white hover:text-[hsl(110,24%,62%)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    건축 도면 첨부 문의
                  </Link>
                </div>
              </div>

              <div className="relative rounded-xl bg-white p-6 shadow-lg sm:p-8 md:p-10 flex flex-col items-center justify-center gap-4 max-h-36 my-auto">
                <div className="grid gap-4 w-full">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">
                      {price.toLocaleString()}원
                    </h2>
                    <div className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
                      간편 견적
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">평수</p>
                      <p className="text-sm">
                        {typeof pyeong === "string" ? pyeong + "평" : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  더그린만의 장점
                </div>
                <h2 className="lg:leading-tighter text-2xl font-bold tracking-wide sm:text-3xl md:text-4xl">
                  믿음과 신뢰
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed break-keep">
                  더그린의 경험 많은 전문가 팀은 뛰어난 결과를 제공하고 기대를
                  뛰어넘는 데 전념하고 있습니다. 품질, 혁신 및 고객 만족에
                  중점을 두어 모든 건설 요구 사항에 있어 신뢰할 수 있는
                  선택입니다.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  혜택
                </div>
                <ul className="grid gap-4">
                  <li className="flex items-start gap-4">
                    <CircleCheckIcon className="h-8 w-8 flex-shrink-0 text-[hsl(110,24%,62%)]" />
                    <div>
                      <h3 className="text-lg font-bold">맞춤 설계</h3>
                      <p className="text-muted-foreground">
                        더그린은 귀하의 비전과 업무에 완벽하게 맞는 맞춤형
                        디자인과 설계를 만들기 위해 긴밀히 협력할 것입니다.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 break-keep">
                    <CircleCheckIcon className="h-8 w-8 flex-shrink-0 text-[hsl(110,24%,62%)]" />
                    <div>
                      <h3 className="text-lg font-bold">간소화된 프로세스</h3>
                      <p className="text-muted-foreground">
                        시작부터 끝까지, 모든 과정과 단계를 안내하여 원활하고
                        스트레스 없는 경험을 보장합니다.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CircleCheckIcon className="h-8 w-8 flex-shrink-0 text-[hsl(110,24%,62%)]" />
                    <div>
                      <h3 className="text-lg font-bold">품질 장인 정신</h3>
                      <p className="text-muted-foreground">
                        더그린의 숙련된 전문가 팀은 최고의 품질 자재와 기술만을
                        사용하여 귀하의 결과물이 오래 지속되도록 보장합니다
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function CircleCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
