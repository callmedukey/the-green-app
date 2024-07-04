import Link from "next/link";
import { MainCarousel } from "@/components/main/MainCarousel";
import { Play } from "lucide-react";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh] break-keep">
      <main className="">
        <section className="w-full py-12 md:px-8 lg:px-20 bg-[url('/landing.png')] bg-center bg-no-repeat bg-cover h-[80dvh]">
          <div className="max-w-7xl xl:mt-56 font-han flex items-center justify-center flex-col h-full xl:items-start xl:justify-start">
            <h1 className="text-5xl md:text-6xl font-han tracking-wide text-primary">
              7초 간편견적계산
            </h1>
            <p className="text-mutedText text-xl flex flex-col gap-2 my-4 items-center justify-center text-center xl:items-start">
              <span>업계 최초 투명 견적 시스템</span>
              <span>7초 간편 견적으로 예상 건축 비용을 확인해 보세요</span>
            </p>

            <Link
              href="easy-quote"
              className="px-4 py-4 bg-primary text-white transition-colors duration-300 font-medium hover:bg-yellow-500 font-gmarketSans block mt-8 xl:ml-24 w-fit rounded-xl lg:text-xl text-base"
            >
              7초 간편견적
            </Link>
          </div>
        </section>
        <section className="">
          <div className="relative">
            <div className="sm:px-16 mt-20 space-y-6 px-4">
              <h2 className="flex flex-col gap-0.5 font-gmarketSans text-3xl font-bold">
                <span className="text-mainGray">훼손지 토지주를 위한</span>
                <span className="text-secondaryGray">성공 파트너 역량</span>
              </h2>
              <p className="flex flex-col gap-0.5 text-mainGray">
                <span>차별화된 훼손지 정비 사업을 선도하는</span>
                <span>더그린컨설팅이 여러분과 함께 합니다.</span>
              </p>
            </div>
            <div className="w-full absolute -bottom-[30px] left-0 right-0 bg-primary -z-10 h-[200px]" />
            <MainCarousel />
          </div>
        </section>
        <section className="w-full bg-[url('/warehouse.webp')] bg-cover bg-top bg-no-repeat h-[500px] mt-5 flex">
          <article className="flex flex-col bg-mainBlue/40 mr-0 ml-auto text-white font-gmarketSans justify-center sm:gap-[6.25rem] xl:px-[9rem] lg:w-[49.40%] w-full px-4 sm:px-12 gap-12">
            <div className="grid sm:grid-cols-[40%_60%] grid-cols-2 sm:place-items-center">
              <div className="space-y-6 ml-4">
                <h3 className="text-lg font-bold">회사 소개</h3>
                <p className="text-sm flex flex-col">
                  <span>훼손지 정비 선도기업</span>
                  <span>더그린이 함께 하겠습니다</span>
                </p>
              </div>
              <Link
                href="/about"
                className="mt-auto mb-0 rounded-full border w-fit px-4 py-0.5 flex items-center justify-center gap-2 text-sm ml-auto mr-4 sm:mr-auto sm:ml-0"
              >
                바로 가기
                <Play fill="white" className="size-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-[40%_60%] grid-cols-2 sm:place-items-center">
              <div className="space-y-6 ml-4">
                <h3 className="text-lg font-bold">사업 분야</h3>
                <p className="text-sm flex flex-col">
                  <span>분야별 전문가 기업인</span>
                  <span>더그린이 함께 하겠습니다</span>
                </p>
              </div>
              <Link
                href="/tasks"
                className="mt-auto mb-0 rounded-full border w-fit px-4 py-0.5 flex items-center justify-center gap-2 text-sm ml-auto mr-4 sm:mr-auto sm:ml-0"
              >
                바로 가기
                <Play fill="white" className="size-4" />
              </Link>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
