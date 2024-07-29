import Image from "next/image";
import construction from "@/public/tasks-construction.webp";
import consulting from "@/public/consulting.png";
import architecture from "@/public/tasks-architecture.webp";
import landscape from "@/public/tasks-landscape.webp";

const page = () => {
  return (
    <main className="pb-16">
      <Image
        src="/tasks-banner.webp"
        alt="그린벨트 공장에서 나오는 트럭 이미지"
        width={1800}
        height={800}
        priority
        className="w-full my-16 min-h-[100px]"
      />
      <h1 className="text-center text-[2.5rem] font-bold mb-16">사업 분야</h1>
      <section className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 justify-center gap-4 text-white">
        <div className="md:pt-[200px] md:px-[3rem] h-[300px] w-full md:h-[450px] relative md:w-[550px] grid md:grid-rows-[200px_auto]">
          <Image
            src={construction}
            alt="건설"
            fill
            placeholder="blur"
            className="object-fill -z-10"
            quality={100}
          />
          <div className="flex flex-col gap-y-2 md:gap-y-[2rem] justify-center md:justify-start">
            <h2 className="text-[2rem] font-bold text-center">건축</h2>
            <p className="bg-finalGray/70 max-w-[393px] mx-auto break-keep p-2 font-medium w-full">
              기본과 신뢰를 바탕으로 축적된 다양한 기술과 노하우로 완성도 높은
              건축 시공을 제공하여 정직하게 만들어 오래가는 공간을 만들기위해
              노력합니다
            </p>
          </div>
        </div>
        <div className="md:pt-[200px] md:px-[3rem] h-[300px] w-full md:h-[450px] relative md:w-[550px] grid md:grid-rows-[200px_auto]">
          <Image
            src={consulting}
            alt="인허가 컨설턴트"
            fill
            placeholder="blur"
            className="object-fill -z-10"
            quality={100}
          />
          <div className="flex flex-col gap-y-2 md:gap-y-[2rem] justify-center md:justify-start">
            <h2 className="text-[2rem] font-bold text-center">인허가 컨설팅</h2>
            <p className="bg-finalGray/70 max-w-[393px] break-keep p-2 font-medium w-full mx-auto">
              훼손지 정비에 수반되는 모든 인허가 업무를 오랜 현장 경험이 풍부한
              행정사 자격 전문가가 도우미가 되어드립니다
            </p>
          </div>
        </div>
        <div className="md:pt-[200px] md:px-[3rem] h-[300px] w-full md:h-[450px] relative md:w-[550px] grid md:grid-rows-[200px_auto]">
          <Image
            src={architecture}
            alt="설계"
            fill
            placeholder="blur"
            className="object-fill -z-10"
            quality={100}
          />
          <div className="flex flex-col gap-y-2 md:gap-y-[2rem] justify-center md:justify-start">
            <h2 className="text-[2rem] font-bold text-center">설계</h2>
            <p className="bg-finalGray/70 max-w-[393px] md:max-w-[500px] break-keep p-2 font-medium w-full mx-auto">
              고객의 요구조건을 바탕으로 입지, 문화, 환경에 따른 수요조사와 관련
              법규 등을 철저하게 분석하여 기획부터 설계까지 전반적인 서비스를
              제공합니다.
            </p>
          </div>
        </div>
        <div className="md:pt-[200px] md:px-[3rem] h-[300px] w-full md:h-[450px] relative md:w-[550px] grid md:grid-rows-[200px_auto]">
          <Image
            src={landscape}
            alt="조경"
            fill
            placeholder="blur"
            className="object-fill -z-10"
            quality={100}
          />
          <div className="flex flex-col gap-y-2 md:gap-y-[2rem] justify-center md:justify-start">
            <h2 className="text-[2rem] font-bold text-center">조경</h2>
            <p className="bg-finalGray/70 max-w-[393px] md:max-w-[500px] break-keep p-2 font-medium w-full mx-auto">
              훼손지에 조경 사양에 가장 적합하고 합리적인 대안을 제시하고 조경을
              통한 건축물과 자연과의 이질감을 해소하고 푸르름을 언제던지 곁에서
              느낄수 있도록 시공해드립니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
