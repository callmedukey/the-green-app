import Image from "next/image";

const page = () => {
  return (
    <main className="pb-16">
      <Image
        src="/tasks-banner.webp"
        alt="그린벨트 공장에서 나오는 트럭 이미지"
        width={1800}
        height={800}
        priority
        className="w-full my-16"
      />
      <h1 className="text-center text-[40px] font-bold mb-16">사업 분야</h1>
      <section className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-4 text-white">
        <div className="bg-[url('/tasks-construction.webp')] bg-cover bg-center h-[450px] grid grid-rows-[70%_30%] place-items-center items-center">
          <h2 className="text-[32px] font-bold mb-14 mt-auto">건설</h2>
          <p className="mb-16 px-1 bg-finalGray/70 max-w-[65%] break-keep p-2 font-medium w-full">
            기본과 신뢰를 바탕으로 축적된 다양한 기술과 노하우로 완성도 높은
            건축 시공을 제공하여 정직하게 만들어 오래가는 공간을 만들기위해
            노력합니다
          </p>
        </div>
        <div className="bg-[url('/consulting.png')] bg-cover bg-center h-[450px] grid grid-rows-[70%_30%] place-items-center items-center">
          <h2 className="text-[32px] font-bold mb-14 mt-auto">인허가 컨설팅</h2>
          <p className="mb-16 px-1 bg-finalGray/70 max-w-[68%] break-keep p-2 font-medium w-full">
            훼손지 정비에 수반되는 모든 인허가 업무를 오랜 현장 경험이 풍부한
            행정사 자격 전문가가 도우미가 되어드립니다
          </p>
        </div>
        <div className="bg-[url('/tasks-architecture.webp')] bg-cover bg-center h-[450px] grid grid-rows-[70%_30%] place-items-center items-center">
          <h2 className="text-[32px] font-bold mb-14 mt-auto">설계</h2>
          <p className="mb-16 px-1 bg-finalGray/70 max-w-[72%] break-keep p-2 font-medium w-full">
            고객의 요구조건을 바탕으로 입지, 문화, 환경에 따른 수요조사와 관련
            법규 등을 철저하게 분석하여 기획부터 설계까지 전반적인 서비스를
            제공합니다.
          </p>
        </div>
        <div className="bg-[url('/tasks-landscape.webp')] bg-cover bg-center h-[450px] grid grid-rows-[70%_30%] place-items-center items-center">
          <h2 className="text-[32px] font-bold mb-14 mt-auto">조경</h2>
          <p className="mb-16 px-1 bg-finalGray/70 max-w-[60%] break-keep p-2 font-medium w-full">
            훼손지에 조경 사양에 가장 적합하고 합리적인 대안을 제시하고 조경을
            통한 건축물과 자연과의 이질감을 해소하고 푸르름을 언제던지 곁에서
            느낄수 있도록 시공해드립니다.
          </p>
        </div>
      </section>
    </main>
  );
};

export default page;
