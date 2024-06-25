"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { attachments, booking, inquiry, user } from "@prisma/client";
import AccountEdit from "./AccountEdit";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";

interface InquiryWithAttachments extends inquiry {
  attachments: attachments[];
}

interface UserWithBookingAndInquiry extends user {
  booking: booking[];
  inquiry: InquiryWithAttachments[];
}

export function AccountTabs({
  userInfo,
  initialState,
}: {
  userInfo: UserWithBookingAndInquiry;
  initialState: string;
}) {
  const searchparams = useSearchParams();
  const tab = searchparams.get("state");
  const router = useRouter();
  return (
    <Tabs
      defaultValue={initialState}
      className="w-full"
      value={tab || "inquiries"}
      onValueChange={(value) => {
        router.push(`/account?state=${value}`);
      }}
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="inquiries">문의 내역</TabsTrigger>
        <TabsTrigger value="bookings">방문 예약 상황</TabsTrigger>
        <TabsTrigger value="account">계정 정보</TabsTrigger>
      </TabsList>
      <TabsContent
        value="inquiries"
        className="max-h-[600px] h-[600px] overflow-y-scroll divide-y-2"
      >
        {userInfo.inquiry.map((inquiry) => {
          return (
            <div key={inquiry.id} className="flex h-12 items-center">
              <div className="max-w-[70%] w-full truncate">{inquiry.title}</div>
              <div className="text-gray-400">
                작성일자:{" "}
                {new Intl.DateTimeFormat("ko-KR", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(inquiry.createdAt)}
              </div>
            </div>
          );
        })}
      </TabsContent>
      <TabsContent
        value="bookings"
        className="max-h-[600px] h-[600px] overflow-y-scroll divide-y-2"
      >
        {userInfo.booking.map((booking) => {
          return (
            <div
              key={booking.id}
              className="grid h-12 items-center grid-cols-2 text-center"
            >
              <div className="w-full">
                신청일자: {format(booking.bookingDate, "yyyy-MM-dd")}{" "}
                {booking.bookingTime}
              </div>
              <div className="w-full">
                {booking.confirmedBookingDate &&
                  booking.confirmedTime &&
                  "확정일자: " +
                    format(booking.confirmedBookingDate, "yyyy-MM-dd") +
                    " " +
                    booking.confirmedTime}
                {!booking.confirmedBookingDate &&
                  !booking.confirmedTime &&
                  "미확정"}
              </div>
            </div>
          );
        })}
      </TabsContent>
      <TabsContent value="account" className="">
        <AccountEdit
          name={userInfo.name}
          phone={userInfo.phone}
          email={userInfo.email}
          address={userInfo.address}
          username={userInfo.username}
        />
      </TabsContent>
    </Tabs>
  );
}
