import { cn } from "@/lib/utils";
import Image, { type StaticImageData } from "next/image";
import React from "react";

const MainContainer = ({
  className,
  title,
  children,
  img,
  imgAlt,
}: {
  className?: string;
  title: string;
  children?: React.ReactNode;
  img: StaticImageData;
  imgAlt?: string;
}) => {
  return (
    <main className={cn("", className)}>
      <section className="relative w-full h-[45vh]">
        <Image
          src={img}
          alt={imgAlt || ""}
          placeholder="blur"
          quality={100}
          fill
          className="object-center object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white px-4 md:px-6">
          <h1 className="text-2xl md:text-4xl font-bold tracking-wide">
            {title}
          </h1>
        </div>
      </section>
      {children}
    </main>
  );
};

export default MainContainer;
