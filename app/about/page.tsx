import Image from "next/image";

export default function AboutUsPage() {
  return (
    <main className="">
      <Image
        src="/tasks-banner.webp"
        alt="그린벨트 공장에서 나오는 트럭 이미지"
        width={1800}
        height={800}
        priority
        className="w-full my-16 min-h-[100px]"
      />
      <section className="py-12 md:py-20 max-width-tg">
        <h1 className="text-[2.5rem] xl:ml-16 ml-4 sm:ml-8 md:ml-12 font-bold">
          About 더그린
        </h1>
        <p className="xl:ml-16 ml-4 sm:ml-8 md:ml-12 text-xl max-w-[450px] mt-6 text-quadGrey pr-4 sm:pr-0 font-medium">
          훼손지 정비사업 전문업체 더그린입니다. <br /> 더그린의 분야별
          전문가들이 인허가, 건축, 조경, 설계 등 그린벨트 토지주의 need를
          파악하고 대안을 제시해드리며 최적의 결과물을 얻으실 수 있도록 항상
          함께 합니다.
        </p>
        <article className="py-16 mt-32">
          <h2 className="text-quadGray text-[40px] font-bold text-center">
            건축시공사례
          </h2>
          <div className="grid xl:grid-cols-2 mt-32 gap-y-16">
            <div className="relative flex xl:flex-row flex-col items-center">
              <span className="xl:mr-0 xl:ml-auto xl:translate-x-[100%] text-3xl text-nowrap [text-shadow:_0_5px_5px_rgb(0_0_0_/_25%)] font-medium tracking-tighter  flex justify-center">
                (주)금상쿼츠 공장
              </span>
              <Image
                src="/금강쿼츠.png"
                alt="금상쿼츠 공장"
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
