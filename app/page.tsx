import Link from "next/link";
import { MainCarousel } from "@/components/main/MainCarousel";
import MotionArticle from "@/components/main/MotionArticle";
import Image from "next/image";
import KakaoIcon from "@/public/kakao.svg";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh] break-keep">
      <main className="">
        <a
          href="https://pf.kakao.com/_BhMHG"
          className="fixed bottom-[5dvh] right-4 z-20"
          target="_blank"
        >
          <Image
            src={KakaoIcon}
            alt="카카오 채널 링크"
            width={80}
            height={80}
          />
        </a>
        <section className="w-full py-12 md:px-8 lg:px-20 bg-primary h-[80dvh] max-h-[600px]">
          <div className="h-16 xl:hidden" />
          <div className="grid md:grid-cols-2 w-full max-width-tg">
            <div className="max-w-7xl xl:mt-56 md:mt-12 flex items-center justify-center flex-col h-full xl:items-start xl:justify-start space-y-6 px-4">
              <h1 className="text-4xl xl:text-6xl tracking-wide text-white font-bold">
                7초 간편견적계산
              </h1>
              <p className="text-white text-xl flex flex-col gap-2 items-center justify-center text-center xl:items-start">
                <span>업계 최초 투명 견적 시스템</span>
                <span>7초 간편 견적으로 예상 건축 비용을 확인해 보세요</span>
              </p>

              <Link
                href="easy-quote"
                className="px-4 py-2 bg-primary text-primary transition-colors duration-300 font-medium hover:bg-yellow-500 font-gmarketSans block w-fit rounded-xl lg:text-xl text-base bg-white"
              >
                7초 간편견적
              </Link>
            </div>
            <div className="items-center justify-center lg:-translate-x-12 md:flex px-4 hidden">
              <Image
                className="translate-y-48 md:translate-y-24 size-[300px] sm:size-[350px] lg:size-[400px] xl:w-[650px] xl:h-[460px] lg:translate-y-36 absolute alt-a-fade"
                src="/레메디.png"
                alt="easy-quote"
                width={650}
                height={452}
                priority
              />

              <Image
                className="translate-y-48 md:translate-y-24 size-[300px] sm:size-[350px] lg:size-[400px] xl:size-[500px] lg:translate-y-36 absolute alt-b-fade"
                src="/ai-gen.png"
                alt="easy-quote"
                width={500}
                height={452}
                priority
              />
            </div>
          </div>
        </section>
        <section className="max-width-tg relative">
          <div className="relative">
            <div className="sm:px-16 xl:px-24 mt-20 space-y-6 px-4 grid lg:grid-cols-2 items-center py-12">
              <div className="">
                <h2 className="flex flex-col text-[32px] font-bold">
                  <span className="text-mainGray leading-[1rem]">
                    훼손지 토지주를 위한
                  </span>
                  <span className="text-secondaryGray leading-[3.5rem]">
                    성공 파트너 역량
                  </span>
                </h2>
                <p className="flex flex-col gap-0.5 text-mainGray font-medium leading-[auto] text-xl">
                  <span>차별화된 훼손지 정비 사업을 선도하는</span>
                  <span>더그린컨설팅이 여러분과 함께 합니다.</span>
                </p>
              </div>
              <div>
                <h3 className="text-[96px] font-bold text-zzinMakGray text-right -translate-y-10 hidden lg:block">
                  Business
                </h3>
              </div>
            </div>
            <MainCarousel />
          </div>
          <div className="w-screen absolute bottom-[0px] -left-[20%] right-0 bg-secondaryBlue -z-10 h-[200px] [@media(min-width:1800px)]:-left-[20vw] [@media(min-width:2000px)]:-left-[30vw] [@media(min-width:2500px)]:-left-[45vw] [@media(min-width:3000px)]:-left-[60vw] overflow-hidden">
            <div className="absolute size-[400px] bottom-12 right-[45%] bg-tertiaryBlue rotate-45 blur-md" />
          </div>
        </section>
        <section className="w-full bg-[url('/main-warehouse.webp')] bg-cover bg-top bg-no-repeat h-[500px] flex overflow-hidden mt-12">
          <MotionArticle />
        </section>
      </main>
    </div>
  );
}
