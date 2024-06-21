import CenterContainer from "@/components/layout/CenterContainer";
import MainContainer from "@/components/layout/MainContainer";
import Banner2 from "@/public/banner-2.jpg";
import Image from "next/image";
import ContructionImage from "@/public/construction.png";
import ConsultingImage from "@/public/consulting.png";
import DesignImage from "@/public/design.png";
import DevelopmentImage from "@/public/landscape.png";

const page = () => {
  return (
    <MainContainer title="주요 업무" img={Banner2} imgAlt="주요 업무">
      <CenterContainer className="px-4 max-w-6xl break-keep">
        <section className="bg-muted py-4 px-6 rounded-lg divide-y-2">
          <article className="flex flex-col md:flex-row gap-4 py-4">
            <Image
              src={ContructionImage}
              alt="주요 업무"
              height={674}
              width={1014}
              priority
              placeholder="blur"
              className="rounded-md object-center object-cover md:max-w-[40%]"
            />
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-primary">건축</h2>
              <p className="font-semibold">
                기본과 신뢰를 바탕으로 축적된 다양한 기술과 노하우로 완성도 높은
                건축 시공을 제공하여 정직하게 만들어 오래가는 공간을 만들기위해
                노력합니다
              </p>
            </div>
          </article>
          <article className="flex flex-col md:flex-row gap-4 py-4">
            <Image
              src={ConsultingImage}
              alt="주요 업무"
              height={674}
              width={1014}
              loading="lazy"
              placeholder="blur"
              className="rounded-md object-center object-cover md:max-w-[40%]"
            />
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-primary">인허가 컨설팅 </h2>
              <p className="font-semibold">
                훼손지 정비에 수반되는 모든 인허가 업무를 오랜 현장 경험이
                풍부한 행정사 자격 전문가가 도우미가 되어드립니다
              </p>
            </div>
          </article>
          <article className="flex flex-col md:flex-row gap-4 py-4">
            <Image
              src={DesignImage}
              alt="주요 업무"
              height={674}
              width={1014}
              loading="lazy"
              placeholder="blur"
              className="rounded-md object-center object-cover md:max-w-[40%]"
            />
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-primary">설계</h2>
              <p className="font-semibold">
                고객의 요구조건을 바탕으로 입지, 문화, 환경에 따른 수요조사와
                관련 법규 등을 철저하게 분석하여 기획부터 설계까지 전반적인
                서비스를 제공합니다.
              </p>
            </div>
          </article>
          <article className="flex flex-col md:flex-row gap-4 py-4">
            <Image
              src={DevelopmentImage}
              alt="주요 업무"
              height={674}
              width={1014}
              loading="lazy"
              placeholder="blur"
              className="rounded-md object-center object-cover md:max-w-[40%]"
            />
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-primary">조경</h2>
              <p className="font-semibold">
                훼손지에 조경 사양에 가장 적합하고 합리적인 대안을 제시하고
                조경을 통한 건축물과 자연과의 이질감을 해소하고 푸르름을
                언제던지 곁에서 느낄수 있도록 시공해드립니다.
              </p>
            </div>
          </article>
        </section>
      </CenterContainer>
    </MainContainer>
  );
};

export default page;
