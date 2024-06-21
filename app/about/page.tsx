import Image from "next/image";
import BannerImg from "@/public/banner-1.png";
import MainContainer from "@/components/layout/MainContainer";

export default function AboutUsPage() {
  return (
    <MainContainer title="About 더그린" img={BannerImg} imgAlt="더그린 소개">
      <section className="py-12 md:py-20 bg-primary">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-6">
          <div className="md:space-y-8 text-white my-auto">
            <h2 className="text-3xl md:text-4xl font-bold">
              더그린과 함께하는 이유
            </h2>
            <p className="text-white md:font-bold">
              더그린 중심에는 품질, 지속 가능성, 커뮤니티에 대한 헌신이
              있습니다. 이러한 가치는 우리가 내리는 모든 결정에 영향을 미치며 각
              프로젝트를 접근하는 방식에 영향을 줍니다.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="bg-background rounded-lg p-4 shadow-sm min-h-24">
              <h3 className="text-xl font-semibold">믿음과 신뢰</h3>
              <p className="text-muted-foreground">
                더그린은 믿음, 정직, 신뢰를 바탕으로 진행 중인 프로젝트가
                안전하게 마무리되는 날까지 최선을 다합니다.
              </p>
            </div>
            <div className="bg-background rounded-lg p-4 shadow-sm min-h-24">
              <h3 className="text-xl font-semibold">품질</h3>
              <p className="text-muted-foreground">
                좋은 건축물은 사람들의 삶의 질을 향상시키고, 건강과 안정적인
                생활 환경을 제공하는 데 기여합니다.
              </p>
            </div>
            <div className="bg-background rounded-lg p-4 shadow-sm min-h-24">
              <h3 className="text-xl font-semibold">이해도</h3>
              <p className="text-muted-foreground">
                더그린은 고객의 니즈와 품질을 최우선으로 생각하며, 고객의 꿈과
                상상을 실현시키기 위해 최선을 다합니다.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-20 px-16">
        <h4 className="text-2xl md:text-3xl font-bold text-primary text-center md:mb-20 mb-12">
          건설 프로젝트 실적
        </h4>
        <div className="container grid gap-8 px-4 md:px-6 items-center justify-center">
          <div className="md:grid gap-4 md:grid-cols-2 md:gap-8 items-center justify-center flex flex-col">
            <div className="text-center md:mb-4">
              <h5 className="text-2xl font-bold tracking-tight">
                (주)큐엠 공장
              </h5>
            </div>
            <Image
              src="/큐엠.png"
              alt="(주)큐엠 공장"
              width={600}
              height={400}
              quality={100}
              loading="lazy"
              className="mx-auto rounded-lg object-cover"
            />
          </div>
          <div className="md:grid gap-4 md:grid-cols-2 md:gap-8 items-center justify-center flex flex-col-reverse">
            <Image
              src="/금강쿼츠.png"
              alt="(주)금강쿼츠 공장"
              width={600}
              height={400}
              quality={100}
              loading="lazy"
              className="mx-auto rounded-lg object-cover"
            />
            <div className="text-center md:mt-4">
              <h5 className="text-2xl font-bold tracking-tight">
                (주)금강쿼츠 공장
              </h5>
            </div>
          </div>
          <div className="md:grid gap-4 md:grid-cols-2 md:gap-8 items-center justify-center flex flex-col">
            <div className="text-center md:mb-4">
              <h5 className="text-2xl font-bold tracking-tight">
                (주)시너스 공장
              </h5>
            </div>
            <Image
              src="/시너스.png"
              alt="(주)시너스 공장"
              width={600}
              height={400}
              quality={100}
              loading="lazy"
              className="mx-auto rounded-lg object-cover"
            />
          </div>
          <div className="md:grid gap-4 md:grid-cols-2 md:gap-8 items-center justify-center flex flex-col-reverse">
            <Image
              src="/레메디.png"
              alt="(주)레메디 사옥"
              width={600}
              height={400}
              quality={100}
              loading="lazy"
              className="mx-auto rounded-lg object-cover"
            />
            <div className="text-center md:mt-4">
              <h5 className="text-2xl font-bold tracking-tight">
                (주)레메디 사옥
              </h5>
            </div>
          </div>
        </div>
      </section>
    </MainContainer>
  );
}
