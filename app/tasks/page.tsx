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
        <div className="md:pt-[200px] h-[300px] w-full md:h-[450px] relative md:w-[550px]  items-center justify-end md:justify-center flex flex-col">
          <Image
            src={construction}
            alt="건설"
            fill
            placeholder="blur"
            className="object-fill -z-10"
            quality={100}
          />
          <h2 className="text-[2.5rem] font-bold text-center">건축</h2>
          <p className="bg-finalGray/70 mx-auto break-keep p-2 text-[1.1rem] font-medium w-full md:mb-0 mt-6 md:mt-auto  md:h-24 px-4">
            책임 시공으로 축적된 다양한 기술과 노하우가 완성도 높고 오래가는
            건축물이 되도록 시공해드립니다.
          </p>
        </div>
        <div className="md:pt-[200px] h-[300px] w-full md:h-[450px] relative md:w-[550px]  items-center justify-end md:justify-center flex flex-col">
          <Image
            src={consulting}
            alt="인허가 컨설턴트"
            fill
            placeholder="blur"
            className="object-fill -z-10"
            quality={100}
          />
          <h2 className="text-[2rem] font-bold text-center">인허가 컨설팅</h2>
          <p className="bg-finalGray/70 mx-auto break-keep p-2 text-[1.1rem] font-medium w-full md:mb-0 mt-6 md:mt-auto  md:h-24 px-4">
            훼손지 정비에 수반되는 모든 인허가 업무를 오랜 현장 경험이 풍부한
            행정사 자격 전문가가 도우미가 되어드립니다
          </p>
        </div>
        <div className="md:pt-[200px] h-[300px] w-full md:h-[450px] relative md:w-[550px]  items-center justify-end md:justify-center flex flex-col">
          <Image
            src={architecture}
            alt="설계"
            fill
            placeholder="blur"
            className="object-fill -z-10"
            quality={100}
          />
          <h2 className="text-[2rem] font-bold text-center">설계</h2>
          <p className="bg-finalGray/70 mx-auto break-keep p-2 text-[1.1rem] font-medium w-full md:mb-0 mt-6 md:mt-auto  md:h-24 px-4">
            1평의 짜두리 땅도 남지않도록 기획설계를 통한 건물의 안전과
            건축비용절감이 되도록 빈틈없이 설계해드립니다.
          </p>
        </div>
        <div className="md:pt-[200px] h-[300px] w-full md:h-[450px] relative md:w-[550px]  items-center justify-end md:justify-center flex flex-col">
          <Image
            src={landscape}
            alt="조경"
            fill
            placeholder="blur"
            className="object-fill -z-10"
            quality={100}
          />
          <h2 className="text-[2rem] font-bold text-center">조경</h2>
          <p className="bg-finalGray/70 mx-auto break-keep p-2 text-[1.1rem] font-medium w-full md:mb-0 mt-6 md:mt-auto  md:h-24 px-4">
            훼손지 조경 사양에 최적화된 시공을 기반으로 건축물과 자연과의 조화를
            이룰 수 있게 시공해드립니다.
          </p>
        </div>
      </section>
    </main>
  );
};

export default page;
