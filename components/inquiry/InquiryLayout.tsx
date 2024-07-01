"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InquiryPlanForm from "./InquiryPlanForm";
import InquiryPriceForm from "./InquiryPriceForm";
import InquiryETCForm from "./InquiryETCForm";

const InquiryLayout = () => {
  return (
    <div className="flex flex-col gap-2">
      <aside className="bg-primary text-white text-center py-2 font-semibold">
        문의 유형
      </aside>
      <Tabs defaultValue="plan" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="plan">건축도면 제출</TabsTrigger>
          <TabsTrigger value="price">건축견적 관련 문의</TabsTrigger>
          <TabsTrigger value="etc">기타 문의</TabsTrigger>
        </TabsList>
        <TabsContent value="plan">
          <InquiryPlanForm />
        </TabsContent>
        <TabsContent value="price">
          <InquiryPriceForm />
        </TabsContent>
        <TabsContent value="etc">
          <InquiryETCForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InquiryLayout;
