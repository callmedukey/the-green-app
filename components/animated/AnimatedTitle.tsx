"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const AnimatedTitle = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 2.5,
        delay: stagger(0.25),
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className={cn(
                "dark:text-white text-black opacity-0",
                idx === wordsArray.length - 1 && "text-primary"
              )}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <h1 className="text-3xl font-bold tracking-tighter mx-auto sm:text-4xl md:text-6xl flex gap-2.5 items-center justify-center lg:justify-start">
      {renderWords()}
    </h1>
  );
};
