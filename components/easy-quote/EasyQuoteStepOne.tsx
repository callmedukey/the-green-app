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
import { getQuoteFirstStep } from "@/actions/quote-actions";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(QuoteSchema),
    defaultValues: {
      name: "",
      phone: "",
      pyeong: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof QuoteSchema>) => {
    try {
      const result = await getQuoteFirstStep(data);
      if (result && result.error) {
        alert(result.error);
      }
      if (result && result.redirectTo) {
        router.push(result.redirectTo);
      }
    } catch (error) {
      console.log(error);
      alert("오류가 발생했습니다, 관리자에게 문의해주세요");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
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
            <Button className="md:max-w-[150px] md:h-full  md:max-h-[60px] w-full my-6">
              결과보기
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EasyQuoteStepOne;
