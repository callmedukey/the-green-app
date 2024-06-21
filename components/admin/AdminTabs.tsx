import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateInquiryType } from "@/lib/generateInquiryType";
import type { attachments, booking, inquiry, user } from "@prisma/client";
import Link from "next/link";

interface InquiryWithAttachmentsAndCount extends inquiry {
  attachments: attachments[];
  _count: {
    attachments: number;
  };
}

const AdminTabs = ({
  users,
  inquiries,
  bookings,
}: {
  users: user[];
  inquiries: InquiryWithAttachmentsAndCount[];
  bookings: booking[];
}) => {
  return (
    <Tabs defaultValue="inquiries" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="inquiries">문의 내역</TabsTrigger>
        <TabsTrigger value="bookings">방문 예약 상황</TabsTrigger>
        <TabsTrigger value="account">계정 정보</TabsTrigger>
        <TabsTrigger value="settings">설정</TabsTrigger>
      </TabsList>
      <TabsContent
        value="inquiries"
        className="max-h-[600px] h-[600px] overflow-y-scroll divide-y-2"
      >
        <div className="grid h-12 items-center gap-2 grid-cols-4">
          <div className="w-full">유형</div>
          <div className="w-full">제목</div>
          <div className="w-full">첨부파일</div>
          <div className="w-full">작성일자</div>
        </div>
        {inquiries.map((inquiry) => {
          return (
            <Link href={`/admin/inquiry/${inquiry.id}`} key={inquiry.id}>
              <div className="grid h-12 items-center gap-2 grid-cols-4 cursor-pointer">
                <div className="w-full truncate">
                  {generateInquiryType(inquiry.inquiryType)}
                </div>
                <div className="w-full truncate">{inquiry.title}</div>
                <div className="">첨부파일: {inquiry._count.attachments}</div>
                <div className="">
                  {new Intl.DateTimeFormat("ko-KR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(inquiry.createdAt)}
                </div>
              </div>
            </Link>
          );
        })}
      </TabsContent>
      <TabsContent
        value="bookings"
        className="max-h-[600px] h-[600px] overflow-y-scroll divide-y-2"
      >
        <div className="grid h-12 items-center gap-2 grid-cols-4 text-center">
          <div className="w-full">성함</div>
          <div className="w-full">연락처</div>
          <div className="w-full">신청일자</div>
          <div className="w-full">확정여부</div>
        </div>
        {bookings.map((booking) => {
          return (
            <Link href={`/admin/booking/${booking.id}`} key={booking.id}>
              <div className="grid h-12 items-center gap-2 grid-cols-4 text-center text-sm sm:text-base cursor-pointer">
                <div className="w-full">{booking.name}</div>
                <div className="w-full">{booking.phone}</div>
                <div className="w-full">
                  {new Intl.DateTimeFormat("ko-KR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(booking.createdAt)}
                </div>
                <div className="w-full">
                  {booking.confirmedBooking
                    ? new Intl.DateTimeFormat("ko-KR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      }).format(booking.confirmedBooking)
                    : "미확정"}
                </div>
              </div>
            </Link>
          );
        })}
      </TabsContent>
      <TabsContent value="account" className="">
        <div className="grid h-12 items-center gap-2 grid-cols-4 text-center">
          <div className="w-full">아이디</div>
          <div className="w-full">성함</div>
          <div className="w-full">연락처</div>
          <div className="w-full">가입일자</div>
        </div>
        {users.map((user) => {
          return (
            <div
              key={user.id}
              className="grid h-12 items-center gap-2 grid-cols-4 text-center text-sm sm:text-base"
            >
              <div>{user.username}</div>
              <div>{user.name}</div>
              <div>{user.phone}</div>
              <div>
                {new Intl.DateTimeFormat("ko-KR", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(user.createdAt)}
              </div>
            </div>
          );
        })}
      </TabsContent>
      <TabsContent value="settings" className=""></TabsContent>
    </Tabs>
  );
};

export default AdminTabs;
