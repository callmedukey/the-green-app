import Link from "next/link";
import { MainCarousel } from "@/components/main/MainCarousel";
import MotionArticle from "@/components/main/MotionArticle";

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
          <MotionArticle />
        </section>
      </main>
    </div>
  );
}
