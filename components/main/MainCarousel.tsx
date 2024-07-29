"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import BlueprintImage from "@/public/설계.png";
import WareConstructionImage from "@/public/건축.jpg";
import ConsultingImage from "@/public/인허가 컨설팅.png";
import LandscapeImage from "@/public/조경.png";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";

const carouselArray = [
  {
    title: "설계",
    description: "1평이라도 빈틈없는 설계",
    image: BlueprintImage,
  },
  {
    title: "건축",
    description: "건축 견적 시공",
    image: WareConstructionImage,
  },
  {
    title: "인허가컨설팅",
    description: "실무경력 풍부한 행정사 자격 전문가",
    image: ConsultingImage,
  },
  {
    title: "조경",
    description: "건축과 하나인 조경구성",
    image: LandscapeImage,
  },
  {
    title: "설계",
    description: "1평이라도 빈틈없는 설계",
    image: BlueprintImage,
  },
  {
    title: "건축",
    description: "건축 견적 시공",
    image: WareConstructionImage,
  },
  {
    title: "인허가컨설팅",
    description: "실무경력 풍부한 행정사 자격 전문가",
    image: ConsultingImage,
  },
  {
    title: "조경",
    description: "건축과 하나인 조경구성",
    image: LandscapeImage,
  },
  {
    title: "설계",
    description: "1평이라도 빈틈없는 설계",
    image: BlueprintImage,
  },
  {
    title: "건축",
    description: "건축 견적 시공",
    image: WareConstructionImage,
  },
  {
    title: "인허가컨설팅",
    description: "실무경력 풍부한 행정사 자격 전문가",
    image: ConsultingImage,
  },
  {
    title: "조경",
    description: "건축과 하나인 조경구성",
    image: LandscapeImage,
  },
  {
    title: "설계",
    description: "1평이라도 빈틈없는 설계",
    image: BlueprintImage,
  },
  {
    title: "건축",
    description: "건축 견적 시공",
    image: WareConstructionImage,
  },
  {
    title: "인허가컨설팅",
    description: "실무경력 풍부한 행정사 자격 전문가",
    image: ConsultingImage,
  },
  {
    title: "조경",
    description: "건축과 하나인 조경구성",
    image: LandscapeImage,
  },
  {
    title: "설계",
    description: "1평이라도 빈틈없는 설계",
    image: BlueprintImage,
  },
  {
    title: "건축",
    description: "건축 견적 시공",
    image: WareConstructionImage,
  },
  {
    title: "인허가컨설팅",
    description: "실무경력 풍부한 행정사 자격 전문가",
    image: ConsultingImage,
  },
  {
    title: "조경",
    description: "건축과 하나인 조경구성",
    image: LandscapeImage,
  },
];

export function MainCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full mx-auto max-w-7xl -translate-y-12 xl:translate-x-20"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={() => {
        plugin.current.play();
      }}
      opts={{
        align: "start",
      }}
    >
      <CarouselContent className="bg-black-100">
        {carouselArray.map((carousel, i) => (
          <CarouselItem
            className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/4 !border-none"
            key={carousel.title + i}
          >
            <Card
              className={cn(
                "h-[200px] w-[230px] hover:scale-y-[130%] origin-bottom transition-all duration-500 group relative !border-none overflow-hidden"
              )}
            >
              <Image
                src={carousel.image}
                alt={carousel.title}
                fill
                quality={100}
                className="object-fill object-center origin-center group-hover:scale-[125%] transition-all duration-1000"
              />
              <CardContent
                className={cn(
                  "bg-tertiaryGray/60 h-full w-full group-hover:h-[80px] group-hover:flex-justify-end bottom-0 absolute transition-all duration-200 origin-bottom !border-none p-4 flex items-end"
                )}
              >
                <p className="flex flex-col gap-4 text-white items-start justify-end font-bold w-full mt-auto mb-0 h-full bottom-0">
                  <span className="text-sm mt-auto">{carousel.title}</span>
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
