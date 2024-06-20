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
import { useState } from "react";
import { findUsername } from "@/actions/auth-actions";
import Link from "next/link";

const FindUserSchema = z.object({
  phone: z.string().min(11).max(11),
  name: z.string().min(2, { message: "성함을 입력해주세요." }),
});

const FindUsernameForm = () => {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string>("");
  const form = useForm<z.infer<typeof FindUserSchema>>({
    resolver: zodResolver(FindUserSchema),
    defaultValues: {
      phone: "",
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FindUserSchema>) => {
    const { name, phone } = values;
    const { username, error } = await findUsername({ name, phone });
    if (username) {
      setUsername(username);
    }
    if (error) {
      setError(error);
    }
  };
  return (
    <Form {...form}>
      {username && (
        <div className="text-center text-sm text-gray-600 border-2 py-4 mb-4 rounded-md">
          아이디: {username}
        </div>
      )}
      {error && <div className="text-center text-sm text-red-500">{error}</div>}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>성함</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>휴대폰 번호</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full my-6 font-bold">아이디 찾기</Button>
        <Button asChild variant={"outline"} className="w-full">
          <Link href="/login">로그인</Link>
        </Button>
      </form>
    </Form>
  );
};

export default FindUsernameForm;
