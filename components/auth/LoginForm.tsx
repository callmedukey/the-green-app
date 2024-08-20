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
import { signInUser } from "@/actions/auth-actions";
import Link from "next/link";
import testValidPassword from "@/lib/tesValidPassword";
import { useRouter } from "next/navigation";

const LoginSchema = z.object({
  username: z
    .string()
    .min(4, "아이디는 최소 4자 이상입니다.")
    .max(14, "아이디는 최대 14자 이하입니다."),
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상입니다.")
    .max(20, "비밀번호는 최대 20자 이하입니다.")
    .refine((val) => testValidPassword(val), {
      message: "비밀번호는 최소 8자 이상, 숫자 한개 이상을 포함해야 합니다.",
    }),
});
const LoginForm = ({ cameFromQuote }: { cameFromQuote?: string }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    try {
      const result = await signInUser(data.username, data.password);
      if (result && result.error) {
        alert(result.error);
      } else {
        router.push(cameFromQuote ? "/easy-quote/result#main" : "/account");
      }
    } catch (error) {
      alert("오류가 발생했습니다, 관리자에게 문의해주세요");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>아이디</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button className="w-full mt-6 font-bold">로그인</Button>
        <Button className="w-full mt-2 font-bold" variant="outline" asChild>
          <Link href="/register">회원가입</Link>
        </Button>
        <div className="flex justify-between text-sm mt-2">
          <Link href="/find-username" className="">
            아이디 찾기
          </Link>
          <Link href="/reset-password" className="">
            비밀번호 재설정
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
