import Link from "next/link";
import { MainCarousel } from "@/components/main/MainCarousel";
import MotionArticle from "@/components/main/MotionArticle";
import Warehouse from "@/public/main-warehouse.webp";
import Image from "next/image";
import KakaoIcon from "@/public/kakao.svg";
import Remedy from "@/public/레메디.png";
import Gold from "@/public/금강쿼츠.png";
import AiGen from "@/public/ai-gen.png";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh] break-keep ">
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
            quality={100}
            height={80}
          />
        </a>
        <section className="w-full py-12 md:px-8 lg:px-16 bg-primary h-[90dvh] max-h-[700px]">
          <div className="grid xl:grid-cols-[40%_60%] w-full max-width-tg">
            <Image
              className="brightness-[40%] xl:hidden w-full"
              src={Remedy}
              alt="easy-quote"
              width={650}
              height={452}
              placeholder="blur"
              priority
            />

            <div className="max-w-7xl xl:mt-56 md:mt-12 flex flex-col h-full items-start justify-start space-y-6 px-6 py-8">
              <h1 className="text-[2rem] xl:text-6xl tracking-wide text-white font-bold">
                <span className="text-[9rem] tracking-[-2rem]">7</span>
                <span className="text-[0.65em]">초</span> 간편견적계산
              </h1>
              <p className="text-white xl:text-xl text-base xl:flex xl:flex-col xl:gap-2 items-center xl:justify-center xl:text-center xl:items-start gap-0 font-medium xl:font-normal">
                <span>업계 최초 투명 견적 시스템</span>
                <span className="xl:hidden"> </span>
                <span>7초 간편 견적으로 예상 건축 비용을 확인해 보세요</span>
              </p>

              <Link
                href="easy-quote"
                className="px-4 py-2 bg-primary text-primary transition-colors duration-300 xl:font-medium font-bold hover:bg-yellow-500 block w-fit rounded-xl lg:text-xl text-base bg-white mx-auto !mt-[4.5rem] !xl:mt-0 xl:ml-0"
              >
                7초 간편견적
              </Link>
            </div>
            <div className="items-center justify-center lg:-translate-x-12 xl:flex px-4 hidden">
              <div className="relative h-[40rem] w-[50rem] translate-y-[6.5rem] hidden xl:block">
                <Image
                  className="absolute object-center object-fill alt-a-fade "
                  src={Remedy}
                  alt="easy-quote"
                  fill
                  placeholder="blur"
                  priority
                />
                <Image
                  className="absolute object-center object-fill alt-b-fade"
                  src={AiGen}
                  alt="ai-gen pic"
                  fill
                  placeholder="blur"
                  priority
                />
                <Image
                  className="absolute object-center object-fill alt-c-fade"
                  src={Gold}
                  alt="(주)금상 쿼츠"
                  fill
                  placeholder="blur"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        <section className="max-width-tg relative overflow-x-hidden">
          <div className="relative overflow-hidden">
            <div className="px-6 xl:px-24 xl:mt-20 space-y-6 grid lg:grid-cols-2 items-center xl:py-12 py-8">
              <div className="flex flex-col gap-8 xl:gap-0">
                <h2 className="flex flex-col text-[2rem] font-bold">
                  <span className="text-mainGray xl:leading-[1rem]">
                    훼손지 토지주를 위한
                  </span>
                  <span className="text-secondaryGray xl:leading-[3.5rem]">
                    성공 파트너 역량
                  </span>
                </h2>
                <p className="flex flex-col gap-0.5 text-mainGray font-medium leading-[auto] text-xl">
                  <span>차별화된 훼손지 정비 사업을 선도하는</span>
                  <span>더그린컨설팅이 여러분과 함께 합니다.</span>
                </p>
              </div>
              <div>
                <h3 className="text-[96px] font-bold text-zzinMakGray text-right -translate-y-10 hidden xl:block">
                  Business
                </h3>
              </div>
            </div>
            <MainCarousel />
          </div>
          <div className="w-[90vw] left-[5vw] right-[5vw]  absolute bottom-[0px] xl:-left-[20%] bg-orange -z-10 xl:h-[200px] h-[150px] [@media(min-width:1800px)]:-left-[20vw] [@media(min-width:2000px)]:-left-[30vw] [@media(min-width:2500px)]:-left-[45vw] [@media(min-width:3000px)]:-left-[60vw] overflow-hidden" />
        </section>
        <section className="w-full relative xl:h-[500px] flex overflow-hidden mt-12 h-fit">
          <Image
            src={Warehouse}
            alt="main-warehouse"
            fill
            className="object-fill object-center -z-10"
          />
          <MotionArticle />
        </section>
      </main>
    </div>
  );
}
