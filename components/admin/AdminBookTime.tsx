"use client";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Input } from "../ui/input";
import { bookTime } from "@/actions/admin-actions";
import { ko } from "date-fns/locale/ko";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { z } from "zod";
import { validateTimeFormat } from "@/lib/validateTimeFormat";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const BookingSchema = z.object({
  bookingTime: z
    .string()
    .min(5, { message: "예약시간은 00:00 형식으로 입력해주세요." })
    .max(5, { message: "예약시간은 00:00 형식으로 입력해주세요." })
    .refine((val) => validateTimeFormat(val), {
      message: "예약시간은 00:00 형식으로 입력해주세요.",
    }),
});

const AdminBookTime = ({
  confirmedBookingDate,
  confirmedBookingTime,
}: {
  confirmedBookingDate: Date | null;
  confirmedBookingTime: string;
}) => {
  const { id } = useParams();
  const [bookingDate, setBookingDate] = useState<Date | undefined>(
    confirmedBookingDate || undefined
  );
  const form = useForm<z.infer<typeof BookingSchema>>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      bookingTime: confirmedBookingTime || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof BookingSchema>) => {
    if (!bookingDate) {
      return alert("방문일을 선택해주세요.");
    }
    if (
      !confirm(
        `${format(bookingDate, "yyyy-MM-dd")} ${
          data.bookingTime
        } 확정하시겠습니까?`
      )
    )
      return;
    const { error, message } = await bookTime(
      id as string,
      bookingDate,
      data.bookingTime
    );
    if (error) {
      return alert(error);
    }
    alert(message);
  };

  if (!id) return null;

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-2 gap-4 relative"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Button
          className="absolute right-0 -top-0 px-4 py-1 h-fit z-10"
          type="submit"
        >
          확정
        </Button>{" "}
        <div className="space-y-2">
          <Label className="text-sm">방문 확정일</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !bookingDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {bookingDate ? (
                  format(bookingDate, "yyyy-MM-dd")
                ) : (
                  <span>날짜 선택</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="single"
                locale={ko}
                selected={bookingDate}
                onSelect={setBookingDate}
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
      </form>
    </Form>
  );
};

export default AdminBookTime;
