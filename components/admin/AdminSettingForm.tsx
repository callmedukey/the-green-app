"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import testValidPhoneNumber from "@/lib/testValidPhoneNumber";
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
import type { adminSetting } from "@prisma/client";
import { saveAdminSettings } from "@/actions/admin-actions";

const SettingSchema = z.object({
  upTo199: z
    .string()
    .min(1, { message: "필수 입력칸 입니다" })
    .refine((val) => Number(val) > 0, {
      message: "숫자만 입력해주세요",
    }),
  upTo399: z
    .string()
    .min(1, { message: "필수 입력칸 입니다" })
    .refine((val) => Number(val) > 0, {
      message: "숫자만 입력해주세요",
    }),
  above400: z
    .string()
    .min(1, { message: "필수 입력칸 입니다" })
    .refine((val) => Number(val) > 0, {
      message: "숫자만 입력해주세요",
    }),
});
const AdminSettingForm = ({
  adminSetting,
}: {
  adminSetting: adminSetting | null;
}) => {
  const form = useForm({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      upTo199: adminSetting?.upTo199 ?? "",
      upTo399: adminSetting?.upTo399 ?? "",
      above400: adminSetting?.above400 ?? "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SettingSchema>) => {
    try {
      const { message, error } = await saveAdminSettings(data);

      if (error) {
        return alert(error);
      }
      if (message) {
        return alert(message);
      }
    } catch (error) {
      console.error(error);
      alert("설정 저장에 실패했습니다");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="upTo199"
          render={({ field }) => (
            <FormItem className="grid grid-cols-2 gap-2 items-center justify-center">
              <FormLabel className="text-center">1 ~ 199 평</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  step={1}
                  className="text-center"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="upTo399"
          render={({ field }) => (
            <FormItem className="grid grid-cols-2 gap-2 items-center justify-center">
              <FormLabel className="text-center">200 ~ 399 평</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  step={1}
                  className="text-center"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="above400"
          render={({ field }) => (
            <FormItem className="grid grid-cols-2 gap-2 items-center justify-center">
              <FormLabel className="text-center">400 평 이상</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  step={1}
                  className="text-center"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full mt-6 font-semibold">저장</Button>
      </form>
    </Form>
  );
};

export default AdminSettingForm;
