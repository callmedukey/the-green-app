"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const carouselArray = [
  {
    title: "설계",
    description: "1평이라도 빈틈없는 설계",
    image: "/blueprint.png",
  },
  {
    title: "건축",
    description: "건축 견적 시공",
    image: "/architecture.png",
  },
  {
    title: "인허가컨설팅",
    description: "실무경력 풍부한 행정사 자격 전문가",
    image: "/consulting.png",
  },
  {
    title: "조경",
    description: "건축과 하나인 조경구성",
    image: "/landscape.png",
  },
  {
    title: "설계",
    description: "1평이라도 빈틈없는 설계",
    image: "/blueprint.png",
  },
  {
    title: "건축",
    description: "건축 견적 시공",
    image: "/architecture.png",
  },
  {
    title: "인허가컨설팅",
    description: "실무경력 풍부한 행정사 자격 전문가",
    image: "/consulting.png",
  },
  {
    title: "조경",
    description: "건축과 하나인 조경구성",
    image: "/landscape.png",
  },
  {
    title: "설계",
    description: "1평이라도 빈틈없는 설계",
    image: "/blueprint.png",
  },
  {
    title: "건축",
    description: "건축 견적 시공",
    image: "/architecture.png",
  },
  {
    title: "인허가컨설팅",
    description: "실무경력 풍부한 행정사 자격 전문가",
    image: "/consulting.png",
  },
  {
    title: "조경",
    description: "건축과 하나인 조경구성",
    image: "/landscape.png",
  },
  {
    title: "설계",
    description: "1평이라도 빈틈없는 설계",
    image: "/blueprint.png",
  },
  {
    title: "건축",
    description: "건축 견적 시공",
    image: "/architecture.png",
  },
  {
    title: "인허가컨설팅",
    description: "실무경력 풍부한 행정사 자격 전문가",
    image: "/consulting.png",
  },
  {
    title: "조경",
    description: "건축과 하나인 조경구성",
    image: "/landscape.png",
  },
  {
    title: "설계",
    description: "1평이라도 빈틈없는 설계",
    image: "/blueprint.png",
  },
  {
    title: "건축",
    description: "건축 견적 시공",
    image: "/architecture.png",
  },
  {
    title: "인허가컨설팅",
    description: "실무경력 풍부한 행정사 자격 전문가",
    image: "/consulting.png",
  },
  {
    title: "조경",
    description: "건축과 하나인 조경구성",
    image: "/landscape.png",
  },
];

export function MainCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full mx-auto max-w-7xl -translate-y-12 translate-x-20"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={() => {
        plugin.current.play();
      }}
      opts={{
        align: "start",
      }}
    >
      <CarouselContent className="">
        {carouselArray.map((carousel, i) => (
          <CarouselItem
            className="basis-1/1 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            key={carousel.title + i}
          >
            <Card
              className={cn(
                "h-[200px] w-[230px] hover:scale-y-[120%] origin-bottom transition-all duration-300 group relative",
                carousel.image === "/blueprint.png" &&
                  "bg-[url('/blueprint.png')] bg-cover bg-center bg-no-repeat",
                carousel.image === "/architecture.png" &&
                  "bg-[url('/architecture.png')] bg-cover bg-center bg-no-repeat",
                carousel.image === "/consulting.png" &&
                  "bg-[url('/consulting.png')] bg-cover bg-center bg-no-repeat",
                carousel.image === "/landscape.png" &&
                  "bg-[url('/landscape.png')] bg-cover bg-center bg-no-repeat"
              )}
            >
              <CardContent
                className={cn(
                  "flex items-center justify-center bg-tertiaryGray/60 h-full w-full flex-col group-hover:h-[80px] bottom-0 absolute transition-all duration-200 origin-bottom"
                )}
              >
                <p className="group-hover:flex flex-col gap-4 text-white items-start justify-center mt-auto font-bold hidden w-full">
                  <span className="text-sm">{carousel.title}</span>
                  <span className="text-xs">{carousel.description}</span>
                </p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
