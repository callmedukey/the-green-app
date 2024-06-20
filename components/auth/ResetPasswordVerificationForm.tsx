"use client";
import { useRouter } from "next/navigation";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { resetPasswordSecondStep } from "@/actions/auth-actions";

const ResetPasswordSchema = z.object({
  code: z
    .string()
    .min(6, "인증번호는 최소 6자 이상입니다.")
    .regex(/^\d{6}$/, "인증번호를 확인해주세요"),
});

const ResetPasswordVerificationForm = ({ username }: { username: string }) => {
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmitCode = async (values: z.infer<typeof ResetPasswordSchema>) => {
    setError("");

    if (!values.code) {
      return setError("인증번호를 입력해주세요.");
    }

    const { error, redirectTo } = await resetPasswordSecondStep({
      code: values.code,
      username,
    });

    if (error) {
      return setError(error);
    }

    if (redirectTo) {
      router.push(redirectTo);
    }
  };

  return (
    <Form {...form}>
      {error && (
        <div className="text-center text-sm text-red-500 text-pretty">
          {error}
        </div>
      )}
      <form onSubmit={form.handleSubmit(onSubmitCode)}>
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>인증번호</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full my-6 font-bold">인증번호 확인</Button>
      </form>
    </Form>
  );
};

export default ResetPasswordVerificationForm;
