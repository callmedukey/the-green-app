"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import Script from "next/script";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import testValidPassword from "@/lib/tesValidPassword";
import CenterContainer from "../layout/CenterContainer";
import {
  checkUsername,
  registerUser,
  signInUser,
  verifyPhoneNumber,
  verifyPhoneNumberCode,
} from "@/actions/auth-actions";
import testValidPhoneNumber from "@/lib/testValidPhoneNumber";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    daum: any;
  }
}

interface IAddr {
  address: string;
  zonecode: string;
}

const RegisterSchema = z.object({
  passwordConfirm: z
    .string()
    .min(8)
    .max(20)
    .refine((val) => testValidPassword(val), {
      message: "비밀번호는 최소 8자 이상, 숫자 한개 이상이어야 합니다.",
    }),
  verificationCode: z
    .string()
    .min(6, {
      message: "인증번호는 6자리 입니다.",
    })
    .max(6, {
      message: "인증번호는 6자리 입니다.",
    }),
  password: z
    .string()
    .min(8)
    .max(20)
    .refine((val) => testValidPassword(val), {
      message: "비밀번호는 최소 8자 이상, 숫자 한개 이상이어야 합니다.",
    }),
  detailedAddress: z.string().optional(),
  email: z.string().email({ message: "이메일 형식이 올바르지 않습니다." }),
  name: z.string().min(2, { message: "성함은 최소 2자 이상입니다." }),
  phone: z.string().refine((val) => testValidPhoneNumber(val), {
    message: "휴대폰 번호 형식이 올바르지 않습니다.",
  }),
  username: z
    .string()
    .min(4, { message: "아이디는 최소 4자 최대 14자 입니다." })
    .max(14, { message: "아이디는 최소 4자 최대 14자 입니다." }),
  address: z.string({ required_error: "주소를 입력해주세요" }),
});

const RegisterForm = ({
  cookieSentTime,
  cameFromQuote,
  name,
  phone,
}: {
  cookieSentTime: string;
  cameFromQuote: string;
  name: string;
  phone: string;
}) => {
  const [timer, setTimer] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: name,
      address: "",
      detailedAddress: "",
      phone: phone,
      verificationCode: "",
      username: "",
    },
  });

  const isValidPassword =
    form.watch("password") === form.watch("passwordConfirm");

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    if (!data.address) {
      return alert("주소를 입력해주세요");
    }

    if (!isVerified) {
      return alert("휴대폰 인증을 완료해주세요");
    }

    if (!validUsername) {
      return alert("아이디 중복확인을 해주세요");
    }

    if (!isValidPassword || !testValidPassword(data.password)) {
      return alert("비밀번호를 확인해주세요");
    }

    if (data.username.includes(" ")) {
      return alert("아이디에 공백을 포함할 수 없습니다.");
    }

    const safeParsed = RegisterSchema.safeParse(data);

    if (!safeParsed.success) {
      return alert("가입 정보를 확인해주세요");
    }

    try {
      const { message, redirectTo, error } = await registerUser({
        ...data,
        address: `${data.address} ${data.detailedAddress}`,
      });

      if (error) {
        return alert(error);
      }

      if (redirectTo) {
        const response = await signInUser(data.username, data.password);
        console.log(response);
        if (response.error) {
          return alert(response.error);
        }

        if (response && response.message) {
          router.push(cameFromQuote ? "/easy-quote/result#main" : redirectTo);
        } else {
          alert(message);
          router.push("/login");
        }
      }
    } catch (error) {
      console.error(error);
      alert("회원가입 오류");
    }
  };

  const handleVerificationSend = async () => {
    setIsVerifying(true);
    try {
      const response = await verifyPhoneNumber({
        phone: form.getValues("phone"),
      });
      if (!response.error && cookieSentTime) {
        const timeSent = new Date(cookieSentTime);
        const dueTime = timeSent.getTime() + Math.floor(1000 * 60);
        const diff = dueTime - new Date().getTime();
        const seconds = Math.floor(diff / 1000);

        setTimer(seconds);
        return alert(response.message);
      }

      if (response.error) {
        setTimer(0);
        setIsVerifying(false);
        return alert(response.error);
      }
      setTimer(60);
    } catch (error) {
      alert("인증번호 발송 오류");
      setTimer(0);
      setIsVerifying(false);
    }
  };

  const handleVerificationVerify = async () => {
    try {
      const { error, invalidCode, verified } = await verifyPhoneNumberCode({
        code: form.getValues("verificationCode"),
      });

      if (error) {
        return alert(error);
      }

      if (verified) {
        return setIsVerified(true);
      }

      if (invalidCode) {
        return alert("인증번호가 유효하지 않습니다.");
      }
    } catch {
      alert("인증번호 확인이 되지 않았습니다");
    }
  };

  const validateUsername = async () => {
    try {
      const { message, error } = await checkUsername({
        username: form.getValues("username"),
      });
      if (error) {
        return alert(error);
      }

      alert(message);
      setValidUsername(true);
    } catch (error) {
      alert("아이디 확인 오류");
      setValidUsername(false);
    }
  };

  useEffect(() => {
    if (!isVerifying || !timer) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => {
      return clearInterval(interval);
    };
  }, [isVerifying, timer]);

  useEffect(() => {
    if (timer === 0) {
      setIsVerifying(false);
    }
  }, [timer]);

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

  return (
    <CenterContainer>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="px-4">
          <fieldset className="grid sm:grid-cols-2 gap-4">
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
          </fieldset>
          <fieldset className="grid sm:grid-cols-2 gap-4 mt-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="relative">
                  {!isVerified && (
                    <button
                      type="button"
                      className="text-sm absolute right-0 disabled:text-slate-400 font-bold ring-2 ring-black disabled:ring-0 px-2 top-0.5"
                      disabled={
                        !form.getValues("name") ||
                        !form.getValues("phone") ||
                        form.getValues("phone").length < 9 ||
                        timer > 0
                      }
                      onClick={handleVerificationSend}
                    >
                      {!isVerifying
                        ? "인증번호 발송"
                        : timer
                        ? `${timer}초`
                        : "인증번호 발송"}
                    </button>
                  )}

                  <FormLabel>휴대폰 번호</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="verificationCode"
              render={({ field }) => (
                <FormItem className="relative">
                  <button
                    type="button"
                    className="text-sm absolute right-0 disabled:text-slate-400 font-bold ring-2 ring-black disabled:ring-0 px-2 top-0.5"
                    disabled={
                      !timer ||
                      isVerified ||
                      !form.getValues("verificationCode") ||
                      form.getValues("verificationCode").length !== 6
                    }
                    onClick={handleVerificationVerify}
                  >
                    {isVerified ? "인증 완료" : "인증"}
                  </button>

                  <FormLabel>인증번호</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      maxLength={6}
                      disabled={!isVerifying || timer === 0 || isVerified}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          <fieldset className="grid sm:grid-cols-2 gap-4 mt-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="relative">
                  <button
                    type="button"
                    className="text-sm absolute right-0 disabled:text-slate-400 font-bold ring-2 ring-black disabled:ring-0 px-2 top-0.5"
                    onClick={validateUsername}
                    disabled={validUsername || !form.getValues("username")}
                  >
                    {validUsername ? "중복확인 완료" : "중복확인"}
                  </button>

                  <FormLabel>아이디</FormLabel>
                  <FormControl>
                    <Input {...field} maxLength={14} disabled={validUsername} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className={cn("col-span-2 text-sm text-slate-500")}>
              아이디는 최소 4자, 최대 14자 이하여야 합니다.
            </p>
          </fieldset>
          <fieldset className="grid sm:grid-cols-2 gap-4 mt-4 relative">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} maxLength={20} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>비밀번호 확인</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} maxLength={20} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p
              className={cn(
                "col-span-2 text-sm text-slate-500",
                !isValidPassword &&
                  form.getValues("passwordConfirm").length > 8 &&
                  "text-red-500"
              )}
            >
              비밀번호는 최소 8자 이상, 숫자 한개 이상이어야 합니다.
            </p>
          </fieldset>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative mt-4">
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="relative mt-6">
                <button
                  type="button"
                  className="text-sm absolute right-0 disabled:text-slate-400 font-bold ring-2 ring-black disabled:ring-0 px-2 top-0.5"
                  disabled={form.getValues("address").length > 0}
                  onClick={onClickAddr}
                >
                  주소찾기
                </button>

                <FormLabel>주소</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={form.getValues("address").length > 0}
                    onClick={onClickAddr}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="detailedAddress"
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
          <Button
            type="submit"
            className="w-full my-6"
            disabled={!isValidPassword}
          >
            회원가입
          </Button>
        </form>

        <Script
          src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
          async
          strategy="lazyOnload"
        />
      </Form>
    </CenterContainer>
  );
};

export default RegisterForm;
