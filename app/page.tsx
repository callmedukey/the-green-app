import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LandingImage from "@/public/landing-image.png";
import { AnimatedTitle } from "@/components/animated/AnimatedTitle";
import { ImagesSlider } from "@/components/animated/ImagesSlider";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh] break-keep">
      <main className="flex-1">
        <section className="w-full py-12 flex items-center flex-col lg:flex-row md:px-8 lg:px-20 max-w-[1700px] mx-auto">
          <div className="container max-w-4xl lg:ml-0 lg:mr-auto">
            <div className="max-w-2xl space-y-4 text-center lg:text-left mx-auto">
              <AnimatedTitle words="꿈을 현실로 바꾸는 더그린" />
              <p className="text-muted-foreground md:text-xl">
                더그린은 모든 건축, 인허가 컨설팅, 설계, 조경 필요에 있어 신뢰할
                수 있는 파트너입니다. 저희와 함께 비전을 실현해보세요.
              </p>
              <div>
                <Link
                  href="easy-quote"
                  className="px-4 py-2.5 bg-primary text-white transition-colors duration-300 font-bold rounded-md hover:bg-yellow-500"
                >
                  7초 간편견적
                </Link>
              </div>
            </div>
          </div>
          <Image
            src={LandingImage}
            alt="landing-image"
            width={500}
            height={500}
            className="w-full h-full object-cover mt-16 lg:mt-0 max-w-xl fade-in"
            priority
          />
        </section>
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <HammerIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">건설</h3>
                <p className="text-muted-foreground">
                  기본과 신뢰를 바탕으로 축적된 다양한 기술과 노하우로 완성도
                  높은 건축 시공을 제공하여 정직하게 만들어 오래가는 공간을
                  만들기위해 노력합니다
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <PenIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">인허가 컨설팅</h3>
                <p className="text-muted-foreground">
                  훼손지 정비에 수반되는 모든 인허가 업무를 오랜 현장 경험이
                  풍부한 행정사 자격 전문가가 도우미가 되어드립니다
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <TypeIcon className="h-12 w-12 text-[hsl(110,24%,62%)]" />
                <h3 className="text-xl font-bold">설계</h3>
                <p className="text-muted-foreground">
                  고객의 요구조건을 바탕으로 입지, 문화, 환경에 따른 수요조사와
                  관련 법규 등을 철저하게 분석하여 기획부터 설계까지 전반적인
                  서비스를 제공합니다.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <LandmarkIcon className="h-12 w-12 text-[hsl(110,24%,62%)]" />
                <h3 className="text-xl font-bold">조경</h3>
                <p className="text-muted-foreground">
                  훼손지에 조경 사양에 가장 적합하고 합리적인 대안을 제시하고
                  조경을 통한 건축물과 자연과의 이질감을 해소하고 푸르름을
                  언제던지 곁에서 느낄수 있도록 시공해드립니다.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 bg-muted relative">
          <ImagesSlider
            images={[
              "/금강쿼츠.png",
              "/시너스.png",
              "/큐엠.png",
              "/레메디.png",
            ]}
          />
        </section>
        <section className="w-full py-12 sm:py-24 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="max-w-2xl mx-auto space-y-8 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                간편한 문의
              </h2>
              <p className="text-muted-foreground md:text-xl">
                생각 중이신 프로젝트가 있으신가요? 간편한 견적을 받아보실 수도
                있지만, 편리하게 문의를 남겨주시면 더 그린의 전문가가
                연락드립니다
              </p>

              <Button className="w-full max-w-sm mx-auto" asChild>
                <Link href="/inquiry">문의하기</Link>
              </Button>
              <Button
                className="w-full max-w-sm mx-auto !mt-4"
                asChild
                variant={"outline"}
              >
                <Link href="/booking">현장 방문 예약</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function HammerIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9" />
      <path d="m18 15 4-4" />
      <path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5" />
    </svg>
  );
}

function LandmarkIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" x2="21" y1="22" y2="22" />
      <line x1="6" x2="6" y1="18" y2="11" />
      <line x1="10" x2="10" y1="18" y2="11" />
      <line x1="14" x2="14" y1="18" y2="11" />
      <line x1="18" x2="18" y1="18" y2="11" />
      <polygon points="12 2 20 7 4 7" />
    </svg>
  );
}

function PenIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

function TypeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" x2="15" y1="20" y2="20" />
      <line x1="12" x2="12" y1="4" y2="20" />
    </svg>
  );
}
