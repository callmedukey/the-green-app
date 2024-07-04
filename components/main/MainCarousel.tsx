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
];

export function MainCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full mx-auto max-w-7xl"
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
            className="basis-1/1 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 transition-all duration-300 hover:scale-y-[120%] hover:scale-x-[120%] hover:translate-y-[-10%] hover:mx-3"
            key={carousel.title + i}
          >
            <Card
              className={cn(
                "h-[200px] w-[250px]",
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
              <CardContent className={cn("flex items-center justify-center")}>
                {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
