"use client";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const MotionArticle = () => {
  return (
    <motion.article
      className="flex flex-col bg-mainBlue/40 mr-0 ml-auto text-white justify-center sm:gap-[6.25rem] xl:px-[9rem] lg:w-[49.40%] w-full px-4 sm:px-12 gap-12"
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
      <div className="grid sm:grid-cols-[55%_45%] grid-cols-2 w-full">
        <div className="space-y-4">
          <h3 className="text-[32px] font-bold">회사 소개</h3>
          <p className="text-xl flex flex-col font-medium">
            <span>훼손지 정비 선도기업</span>
            <span>더그린이 함께 하겠습니다</span>
          </p>
        </div>
        <Link
          href="/about"
          className="mt-auto mb-0 rounded-full border w-fit px-4 py-0.5 flex items-center justify-center gap-2 ml-auto mr-4 sm:mr-auto sm:ml-0 text-lg font-medium"
        >
          바로 가기
          <Play fill="white" className="size-4" />
        </Link>
      </div>
      <div className="grid sm:grid-cols-[55%_45%] grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-[32px] font-bold">사업 분야</h3>
          <p className="text-xl flex flex-col font-medium">
            <span>분야별 전문가 기업인</span>
            <span>더그린이 함께 하겠습니다</span>
          </p>
        </div>
        <Link
          href="/tasks"
          className="mt-auto mb-0 rounded-full border w-fit px-4 py-0.5 flex items-center justify-center gap-2 text-lg font-medium ml-auto mr-4 sm:mr-auto sm:ml-0"
        >
          바로 가기
          <Play fill="white" className="size-4" />
        </Link>
      </div>
    </motion.article>
  );
};

export default MotionArticle;
