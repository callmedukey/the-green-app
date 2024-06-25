import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateInquiryType } from "@/lib/generateInquiryType";
import type {
  adminSetting,
  attachments,
  booking,
  inquiry,
  user,
} from "@prisma/client";
import Link from "next/link";
import AdminSettingForm from "./AdminSettingForm";
import { format } from "date-fns";

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
  adminSetting,
}: {
  users: user[];
  inquiries: InquiryWithAttachmentsAndCount[];
  bookings: booking[];
  adminSetting: adminSetting | null;
}) => {
  return (
    <Tabs defaultValue="inquiries" className="w-full">
      <TabsList className="grid w-full grid-cols-4 text-sm sm:text-base">
        <TabsTrigger value="inquiries">문의 내역</TabsTrigger>
        <TabsTrigger value="bookings">방문 예약 상황</TabsTrigger>
        <TabsTrigger value="account">계정 정보</TabsTrigger>
        <TabsTrigger value="settings">설정</TabsTrigger>
      </TabsList>
      <TabsContent
        value="inquiries"
        className="max-h-[600px] h-[600px] overflow-y-scroll divide-y-2 text-sm md:text-base"
      >
        <div className="grid h-12 items-center gap-2 grid-cols-4">
          <div className="w-full text-center">제목</div>
          <div className="w-full text-center">첨부파일</div>
          <div className="w-full text-center">작성일자</div>
          <div className="w-full text-center">유형</div>
        </div>
        {inquiries.map((inquiry) => {
          return (
            <Link href={`/admin/inquiry/${inquiry.id}`} key={inquiry.id}>
              <div className="grid h-12 items-center gap-2 grid-cols-4 cursor-pointer">
                <div className="w-full truncate text-center">
                  {generateInquiryType(inquiry.inquiryType)}
                </div>
                <div className="w-full truncate text-center">
                  {inquiry.title}
                </div>
                <div className="text-center">{inquiry._count.attachments}</div>
                <div className="text-sm text-center">
                  {format(inquiry.createdAt, "yyyy-MM-dd HH:mm")}
                </div>
              </div>
            </Link>
          );
        })}
      </TabsContent>
      <TabsContent
        value="bookings"
        className="max-h-[600px] h-[600px] overflow-y-scroll divide-y-2 text-sm sm:text-base"
      >
        <div className="grid h-12 items-center gap-2 grid-cols-4 text-center">
          <div className="w-full text-center">성함</div>
          <div className="w-full text-center">연락처</div>
          <div className="w-full text-center">신청일자</div>
          <div className="w-full text-center">확정여부</div>
        </div>
        {bookings.map((booking) => {
          return (
            <Link href={`/admin/booking/${booking.id}`} key={booking.id}>
              <div className="grid h-12 items-center gap-2 grid-cols-4 text-center text-sm sm:text-base cursor-pointer">
                <div className="w-full">{booking.name}</div>
                <div className="w-full">{booking.phone}</div>
                <div className="w-full text-sm">
                  {format(booking.createdAt, "yyyy-MM-dd HH:mm")}
                </div>
                <div className="w-full">
                  {booking.confirmedBookingDate && booking.confirmedTime
                    ? format(booking.confirmedBookingDate, "yyyy-MM-dd") +
                      ` ${booking.confirmedTime}`
                    : "미확정"}
                </div>
              </div>
            </Link>
          );
        })}
      </TabsContent>
      <TabsContent value="account" className="text-sm sm:text-base">
        <div className="grid h-12 items-center gap-2 grid-cols-4 text-center">
          <div className="w-full">아이디</div>
          <div className="w-full">성함</div>
          <div className="w-full">연락처</div>
          <div className="w-full">가입일자</div>
        </div>
        {users.map((user) => {
          return (
            <Link href={`/admin/user?id=${user.id}`} key={user.id}>
              <div className="grid h-12 items-center gap-2 grid-cols-4 text-center text-sm sm:text-base">
                <div>{user.username}</div>
                <div>{user.name}</div>
                <div>{user.phone}</div>
                <div>{format(user.createdAt, "yyyy-MM-dd HH:mm")}</div>
              </div>
            </Link>
          );
        })}
      </TabsContent>
      <TabsContent value="settings" className="">
        <AdminSettingForm adminSetting={adminSetting} />
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabs;
