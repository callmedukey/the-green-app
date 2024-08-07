import MainContainer from "@/components/layout/MainContainer";
import React from "react";
import Banner3 from "@/public/banner3.webp";
import CenterContainer from "@/components/layout/CenterContainer";
import BookingForm from "@/components/booking/BookingForm";

const page = () => {
  return (
    <MainContainer
      title="현장 방문 예약"
      img={Banner3}
      imgAlt="배너"
      className="pt-16"
    >
      <CenterContainer className="max-w-xl px-4">
        <h2 className="text-center font-bold text-2xl mb-12">
          현장 방문 요청합니다
        </h2>
        <BookingForm />
      </CenterContainer>
    </MainContainer>
  );
};

export default page;
