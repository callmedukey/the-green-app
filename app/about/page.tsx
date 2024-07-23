import Image from "next/image";

export default function AboutUsPage() {
  return (
    <main className="">
      <Image
        src="/about-banner.webp"
        alt="그린벨트 공장에서 나오는 트럭 이미지"
        width={1800}
        height={800}
        priority
        className="w-full mt-16"
      />
      <section className="py-12 md:py-20 max-width-tg">
        <h1 className="text-[40px] xl:ml-16 ml-4 sm:ml-8 md:ml-12 font-bold">
          About 더그린
        </h1>
        <p className="xl:ml-16 ml-4 sm:ml-8 md:ml-12 text-xl max-w-[550px] mt-6 text-quadGrey pr-4 sm:pr-0 font-medium">
          더그린과 함께하는 이유 더그린 중심에는 품질, 지속 가능성, 커뮤니티에
          대한 헌신이 있습니다. 이러한 가치는 우리가 내리는 모든 결정에 영향을
          미치며 각 프로젝트를 접근하는 방식에 영향을 줍니다.
        </p>
        <article className="py-16 mt-32">
          <h2 className="text-quadGray text-[40px] font-bold text-center">
            포트폴리오
          </h2>
          <div className="grid xl:grid-cols-2 mt-32 gap-y-16">
            <div className="relative flex xl:flex-row flex-col items-center">
              <span className="xl:mr-0 xl:ml-auto xl:translate-x-[100%] text-3xl text-nowrap [text-shadow:_0_5px_5px_rgb(0_0_0_/_25%)] font-medium tracking-tighter  flex justify-center">
                (주)금강쿼츠 공장
              </span>
              <Image
                src="/금강쿼츠.png"
                alt="금강쿼츠 공장"
                height={450}
                width={550}
                className="h-[450px] my-auto xl:translate-x-[50%] w-[550px]"
              />
            </div>
            <div className="w-full bg-primary h-[500px] xl:block hidden" />
            <div className="w-full bg-primary h-[500px] xl:block hidden" />
            <div className="relative flex items-center justify-center xl:flex-row flex-col-reverse">
              <Image
                src="/레메디.png"
                alt="레메디 사옥"
                height={450}
                width={550}
                className="h-[450px] w-[550px] my-auto xl:translate-x-[-50%]"
              />
              <span className="xl:ml-0 xl:mr-auto xl:translate-x-[-100%] text-3xl text-nowrap [text-shadow:_0_5px_5px_rgb(0_0_0_/_25%)] font-medium tracking-tighter flex justify-center">
                (주)레메디 사옥
              </span>
            </div>
            <div className="relative flex xl:flex-row flex-col items-center">
              <span className="xl:mr-0 xl:ml-auto xl:translate-x-[100%] text-3xl text-nowrap [text-shadow:_0_5px_5px_rgb(0_0_0_/_25%)] font-medium tracking-tighter  flex justify-center">
                (주)시너스 공장
              </span>
              <Image
                src="/시너스.png"
                alt="서니스 공장"
                height={450}
                width={550}
                className="h-[450px] my-auto xl:translate-x-[50%] w-[550px]"
              />
            </div>
            <div className="w-full bg-primary h-[500px] xl:block hidden" />
            <div className="w-full bg-primary h-[500px] xl:block hidden" />
            <div className="relative flex items-center justify-center xl:flex-row flex-col-reverse">
              <Image
                src="/큐엠.png"
                alt="큐엠 공장"
                height={450}
                width={550}
                className="h-[450px] w-[550px] my-auto xl:translate-x-[-50%]"
              />
              <span className="xl:ml-0 xl:mr-auto xl:translate-x-[-100%] text-3xl text-nowrap [text-shadow:_0_5px_5px_rgb(0_0_0_/_25%)] font-medium tracking-tighter flex justify-center">
                (주)큐엠 공장
              </span>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
