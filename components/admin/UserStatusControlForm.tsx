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
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="userStatus"
          render={({ field }) => (
            <FormItem className="flex items-center py-4 border-primary border-y flex-col md:flex-row gap-2 md:gap-4">
              <FormLabel className="h-full">문의 유형</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex md:gap-6 items-center !mt-0 mx-auto [@media(max-width:365px)]:grid [@media(max-width:365px)]:grid-cols-2"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="CONSTRUCTION" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      건축 도면 제출
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0 sm:space-x-3">
                    <FormControl>
                      <RadioGroupItem value="PLAN" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      건춘견적 관련 문의
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0 sm:space-x-3">
                    <FormControl>
                      <RadioGroupItem value="ETC" />
                    </FormControl>
                    <FormLabel className="font-normal">기타 문의</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default UserStatusControlForm;
