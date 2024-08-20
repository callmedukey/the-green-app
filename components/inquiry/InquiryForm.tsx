"use client";
import testValidPhoneNumber from "@/lib/testValidPhoneNumber";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export const InquiryPlanSchema = z.object({
  name: z.string().min(2, { message: "이름을 입력해주세요." }),
  phone: z
    .string()
    .min(1, { message: "전화번호를 입력해주세요." })
    .refine((val) => testValidPhoneNumber(val), {
      message: "올바른 전화번호를 입력해주세요.",
    }),
  title: z
    .string()
    .min(1, { message: "제목을 입력해주세요." })
    .max(100, { message: "100자 이하로 입력해주세요." }),
  content: z
    .string()
    .min(1, { message: "내용을 입력해주세요." })
    .max(1000, { message: "1000자 이하로 입력해주세요." }),
  file1: z.any().optional(),
  file2: z.any().optional(),
  type: z.enum(["CONSTRUCTION", "PLAN", "ETC"], {
    required_error: "문의 유형을 선택해주세요",
  }),
});

const InquiryForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof InquiryPlanSchema>>({
    resolver: zodResolver(InquiryPlanSchema),
    defaultValues: {
      name: "",
      phone: "",
      title: "",
      content: "",
      type: "CONSTRUCTION",
    },
  });
  const [fileError, setFileError] = useState<string>("");

  const onSubmit = async (data: z.infer<typeof InquiryPlanSchema>) => {
    setIsSubmitting(true);
    if (data.file1 || data.file2) {
      const file1 = data.file1?.[0];
      const file2 = data.file2?.[0];

      if (file1) {
        if (file1.size > 1024 * 1024 * 40) {
          setFileError("파일 용량은 최대 40mb로 부탁드립니다.");
          return;
        }
      }
      if (file2) {
        if (file2.size > 1024 * 1024 * 40) {
          setFileError("파일 용량은 최대 40mb로 부탁드립니다.");
          return;
        }
      }
      try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("phone", data.phone);
        formData.append("title", data.title);
        formData.append("content", data.content);
        formData.append("file1", file1);
        formData.append("file2", file2);
        formData.append("type", data.type);

        const res = await fetch("/api/create-inquiry", {
          method: "POST",
          body: formData,
        });
        const response = await res.json();
        if (response.message) {
          form.reset();
          return alert(response.message);
        }
        if (response.error) {
          return alert(response.error);
        }
      } catch (error) {
        console.log(error);
        alert("문의 등록 오류, 유선 문의 부탁드리겠습니다.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 py-4 ">
        <fieldset>
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex items-center py-4 border-primary border-y flex-col md:flex-row gap-2 md:gap-4">
                <FormLabel className="h-full">문의 유형</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex md:gap-6 items-center !mt-0 mx-auto [@media(max-width:365px)]:grid [@media(max-width:365px)]:grid-cols-2"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="CONSTRUCTION" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        건축도면제출
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0 sm:space-x-3">
                      <FormControl>
                        <RadioGroupItem value="PLAN" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        건축견적관련
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0 sm:space-x-3">
                      <FormControl>
                        <RadioGroupItem value="ETC" />
                      </FormControl>
                      <FormLabel className="font-normal">기타 문의</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <fieldset className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>이름</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={20} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>휴대폰 번호</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={20} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input {...field} maxLength={20} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>내용</FormLabel>
              <FormControl>
                <Textarea {...field} rows={15} className="resize-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="py-2">건축도면첨부하세요!</p>

        <fieldset className="grid grid-cols-2 gap-x-4 border p-4 rounded-md">
          <FormField
            control={form.control}
            name="file1"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="cursor-pointer flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <span className="bg-gray-300 font-bold px-2 py-0.5 block min-w-fit">
                    파일 선택
                  </span>
                  <span className="block ml-2 truncate max-w-[100px]">
                    {form.getValues("file1") && form.getValues("file1")[0]
                      ? form.getValues("file1")[0].name
                      : "선택된 파일 없음"}
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...form.register("file1")}
                    type="file"
                    className="hidden"
                  />
                </FormControl>
                {form.getValues("file1") && form.getValues("file1")[0] && (
                  <Button
                    variant={"destructive"}
                    className="w-full"
                    onClick={() => {
                      form.resetField("file1");
                    }}
                  >
                    삭제
                  </Button>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file2"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="cursor-pointer flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <span className="bg-gray-300 font-bold px-2 py-0.5 block min-w-fit">
                    파일 선택
                  </span>
                  <span className="block ml-2 truncate max-w-[100px]">
                    {form.getValues("file2") && form.getValues("file2")[0]
                      ? form.getValues("file2")[0].name
                      : "선택된 파일 없음"}
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...form.register("file2")}
                    type="file"
                    className="hidden"
                  />
                </FormControl>
                <FormMessage />
                {form.getValues("file2") && form.getValues("file2")[0] && (
                  <Button
                    variant={"destructive"}
                    className="w-full"
                    onClick={() => {
                      form.resetField("file2");
                    }}
                  >
                    삭제
                  </Button>
                )}
              </FormItem>
            )}
          />
        </fieldset>
        {fileError && <p className="text-red-500">{fileError}</p>}
        <Button className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "제출중..." : "제출하기"}
        </Button>
      </form>
    </Form>
  );
};

export default InquiryForm;
