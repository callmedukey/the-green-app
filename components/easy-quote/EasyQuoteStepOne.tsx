"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "../ui/button";

const regex = /^[0-9]+$/;
const phoneRegex = /^[0-9-]+$/;

const QuoteSchema = z.object({
  name: z.string().min(2, { message: "성함을 입력해주세요" }),
  phone: z
    .string()
    .min(11, { message: "휴대전화 번호를 입력해주세요" })
    .max(14, { message: "휴대전화 번호를 입력해주세요" })
    .refine((value) => phoneRegex.test(value), {
      message: "휴대전화 번호를 입력해주세요",
    }),
  pyeong: z
    .string()
    .min(1, { message: "평수를 입력해주세요" })
    .refine((val) => regex.test(val), { message: "숫자만 입력해주세요" }),
});

const EasyQuoteStepOne = () => {
  const form = useForm({
    resolver: zodResolver(QuoteSchema),
    defaultValues: {
      name: "",
      phone: "",
      pyeong: "",
    },
  });

  const onSubmit = (data: z.infer<typeof QuoteSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="md:grid-cols-2 grid">
          <fieldset className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>성함</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="성함을 입력해주세요" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>휴대전화 번호</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="휴대전화 번호를 입력해주세요"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pyeong"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>평수</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="평수를 입력해주세요" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          <div className="flex items-center justify-center">
            <Button className="max-w-[150px] h-full max-h-[60px] w-full">
              결과보기
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EasyQuoteStepOne;
