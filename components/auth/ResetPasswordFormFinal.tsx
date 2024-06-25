"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import testValidPassword from "@/lib/tesValidPassword";
import { Button } from "../ui/button";
import { resetPasswordFinalStep } from "@/actions/auth-actions";
import { useRouter } from "next/navigation";

const ResetSchema = z.object({
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상입니다.")
    .max(20, "비밀번호는 최대 20자 이하입니다.")
    .refine((value) => testValidPassword(value), {
      message: "비밀번호는 영문, 숫자를 포함해야 합니다.",
    }),
  confirmPassword: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상입니다.")
    .max(20, "비밀번호는 최대 20자 이하입니다.")
    .refine((value) => testValidPassword(value), {
      message: "비밀번호는 영문, 숫자를 포함해야 합니다.",
    }),
});

const ResetPasswordFormFinal = ({ uniqueCode }: { uniqueCode: string }) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(ResetSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: z.infer<typeof ResetSchema>) => {
    const { password, confirmPassword } = values;
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    const result = await resetPasswordFinalStep({ password, uniqueCode });
    if (result.error) {
      alert(result.error);
      return;
    }

    if (result.redirectTo) {
      alert("비밀번호가 재설정 되셨습니다.");
      router.replace(result.redirectTo);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호 확인</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full my-6 font-bold">재설정</Button>
      </form>
    </Form>
  );
};

export default ResetPasswordFormFinal;
