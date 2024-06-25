"use client";
import { z } from "zod";
import { ko } from "date-fns/locale/ko";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import testValidPhoneNumber from "@/lib/testValidPhoneNumber";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import Script from "next/script";
import { createBooking } from "@/actions/booking-action";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { format } from "date-fns";
import { Label } from "../ui/label";
import { validateTimeFormat } from "@/lib/validateTimeFormat";

declare global {
  interface Window {
    daum: any;
  }
}

interface IAddr {
  address: string;
  zonecode: string;
}

const bookingSchema = z.object({
  name: z.string().min(2, { message: "성함을 입력해주세요." }),
  phone: z
    .string()
    .min(1, { message: "전화번호를 입력해주세요." })
    .refine((val) => testValidPhoneNumber(val), {
      message: "올바른 전화번호를 입력해주세요.",
    }),
  planDate: z.enum(["3months", "6months", "12months", "unknown"], {
    required_error: "건축 시기를 선택해주세요",
  }),
  pyeong: z.number().min(1, { message: "평수를 입력해주세요." }),
  address: z.string().min(1, { message: "주소를 입력해주세요." }),
  addressDetail: z.string().min(1, { message: "상세주소를 입력해주세요." }),
  reason: z
    .string()
    .min(1, { message: "신청 사유를 입력해주세요." })
    .max(1000, { message: "1000자 이하로 입력해주세요." }),
  bookingTime: z
    .string()
    .min(5, { message: "예약시간은 00:00 형식으로 입력해주세요." })
    .max(5, { message: "예약시간은 00:00 형식으로 입력해주세요." })
    .refine((val) => validateTimeFormat(val), {
      message: "예약시간은 00:00 형식으로 입력해주세요.",
    }),
});

const BookingForm = () => {
  const [date, setDate] = useState<Date | undefined>();
  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      planDate: "3months",
      pyeong: 0,
      address: "",
      addressDetail: "",
      reason: "",
      bookingTime: "",
    },
  });

  const onClickAddr = () => {
    if (form.getValues("address").length > 0) {
      return;
    }
    new window.daum.Postcode({
      oncomplete: function (data: IAddr) {
        form.setValue("address", `${data.zonecode} ${data.address}`);
      },
    }).open();
  };

  const onSubmit = async (data: z.infer<typeof bookingSchema>) => {
    if (!date) {
      return alert("날짜를 선택해주세요.");
    }
    if (date < new Date()) {
      return alert("날짜를 올바르게 선택해주세요.");
    }
    try {
      const result = await createBooking({
        ...data,
        bookingDate: date ? new Date(date) : new Date(),
        address: `${data.address} ${data.addressDetail}`,
      });
      if (result.message) {
        form.reset();
        setDate(undefined);
        return alert(result.message);
      }

      if (result.error) {
        return alert(result.error);
      }
    } catch (error) {
      console.error(error);
      return alert("예약 신청을 실패하였습니다. 유선으로 부탁드리겠습니다.");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 py-4">
        <fieldset className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>성함</FormLabel>
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
        <fieldset className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>현장방문일</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "yyyy-MM-dd") : <span>날짜 선택</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="single"
                  locale={ko}
                  selected={date}
                  onSelect={setDate}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="bookingTime"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>방문시간</FormLabel>
                  <FormControl>
                    <Input {...field} maxLength={5} placeholder="예) 15:00" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </fieldset>
        <fieldset className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="pyeong"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>총건축면적</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="relative mt-6">
              <button
                type="button"
                className="text-sm absolute right-0 disabled:text-slate-400 font-bold ring-2 ring-black disabled:ring-0 px-2 top-0.5"
                onClick={onClickAddr}
              >
                주소찾기
              </button>

              <FormLabel>건축 예정지</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onClick={
                    form.getValues("address").length > 0
                      ? undefined
                      : onClickAddr
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressDetail"
          render={({ field }) => (
            <FormItem className="relative mt-6">
              <FormLabel>상세주소</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="planDate"
          render={({ field }) => (
            <FormItem className="flex gap-4 items-center py-4 border-primary border-y">
              <FormLabel className="h-full">건축 시기</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-6 items-center !mt-0 mx-auto [@media(max-width:400px)]:grid [@media(max-width:400px)]:grid-cols-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="3months" />
                    </FormControl>
                    <FormLabel className="font-normal">3개월이내</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="6months" />
                    </FormControl>
                    <FormLabel className="font-normal">6개월이내</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="12months" />
                    </FormControl>
                    <FormLabel className="font-normal">1년이내</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="unknown" />
                    </FormControl>
                    <FormLabel className="font-normal">미정</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>신청이유</FormLabel>
              <FormControl>
                <Textarea {...field} rows={10} className="resize-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full font-bold">방문신청하기</Button>
      </form>
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        async
        strategy="lazyOnload"
      />
    </Form>
  );
};

export default BookingForm;
