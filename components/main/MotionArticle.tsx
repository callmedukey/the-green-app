"use client";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const MotionArticle = () => {
  return (
    <motion.article
      className="flex flex-col sm:bg-mainBlue/40 mr-0 ml-auto text-white justify-center sm:gap-[6.25rem] xl:px-[9rem] lg:w-[49.40%] w-full px-6 sm:px-12 gap-5 py-8"
      initial={{ opacity: 0, x: 100 }}
      whileInView={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 1.5,
        },
      }}
      viewport={{ once: true }}
    >
      <div className="grid grid-cols-[55%_45%] w-full">
        <div className="sm:space-y-4 space-y-1">
          <h3 className="text-[2rem] font-bold">회사 소개</h3>
          <p className="sm:text-xl text-base flex flex-col font-medium">
            <span>훼손지 정비 선도기업</span>
            <span>더그린이 함께 하겠습니다</span>
          </p>
        </div>
        <Link
          href="/about"
          className="mt-auto mb-auto sm:mb-0 rounded-full border w-fit sm:px-4 px-2 py-0.5 flex items-center justify-center gap-2 sm:text-lg text-base font-medium sm:mr-auto sm:ml-0"
        >
          바로 가기
          <Play fill="white" className="size-4" />
        </Link>
      </div>
      <div className="grid grid-cols-[55%_45%] w-full">
        <div className="sm:space-y-4 space-y-1">
          <h3 className="text-[2rem] font-bold">사업 분야</h3>
          <p className="sm:text-xl text-base flex flex-col font-medium">
            <span>분야별 전문가 기업인</span>
            <span>더그린이 함께 하겠습니다</span>
          </p>
        </div>
        <Link
          href="/tasks"
          className="mt-auto mb-auto sm:mb-0 rounded-full border w-fit sm:px-4 px-2 py-0.5 flex items-center justify-center gap-2 sm:text-lg text-base font-medium sm:mr-auto sm:ml-0"
        >
          바로 가기
          <Play fill="white" className="size-4" />
        </Link>
      </div>
    </motion.article>
  );
};

export default MotionArticle;
