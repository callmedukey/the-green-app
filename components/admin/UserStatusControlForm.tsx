"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UserStatus } from "@prisma/client";
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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { saveUserStatus } from "@/actions/admin-actions";

const UserStatusSchema = z.object({
  userStatus: z.enum([
    "REGISTERED",
    "VISIT",
    "CONSULTATION",
    "CONTRACT",
    "SIGNED",
    "START",
  ]),
});

const UserStatusControlForm = ({
  userId,
  userStatus,
}: {
  userId: string;
  userStatus: UserStatus;
}) => {
  const form = useForm<z.infer<typeof UserStatusSchema>>({
    resolver: zodResolver(UserStatusSchema),
    defaultValues: {
      userStatus,
    },
  });

  const onSubmit = async (values: z.infer<typeof UserStatusSchema>) => {
    const { userStatus } = values;
    const { message, error } = await saveUserStatus({
      id: userId,
      status: userStatus,
    });
    if (error) {
      alert(error);
    } else {
      alert(message);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="userStatus"
          render={({ field }) => (
            <FormItem className="flex items-center py-4 border-primary border-y flex-col md:flex-row gap-2 md:gap-4">
              <FormLabel className="h-full">관리 단계</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="sm:flex md:gap-6 items-center !mt-0 mx-auto grid grid-cols-3"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="REGISTERED" />
                    </FormControl>
                    <FormLabel className="font-normal">회원가입</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0 sm:space-x-3">
                    <FormControl>
                      <RadioGroupItem value="VISIT" />
                    </FormControl>
                    <FormLabel className="font-normal">방문상담</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0 sm:space-x-3">
                    <FormControl>
                      <RadioGroupItem value="CONSULTATION" />
                    </FormControl>
                    <FormLabel className="font-normal">견적전달</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0 sm:space-x-3">
                    <FormControl>
                      <RadioGroupItem value="CONTRACT" />
                    </FormControl>
                    <FormLabel className="font-normal">계약확정</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0 sm:space-x-3">
                    <FormControl>
                      <RadioGroupItem value="SIGNED" />
                    </FormControl>
                    <FormLabel className="font-normal">계약서작성</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0 sm:space-x-3">
                    <FormControl>
                      <RadioGroupItem value="START" />
                    </FormControl>
                    <FormLabel className="font-normal">공사시작</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full mb-6 rounded-t-none">저장</Button>
      </form>
    </Form>
  );
};

export default UserStatusControlForm;
