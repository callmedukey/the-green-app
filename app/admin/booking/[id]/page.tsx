import CenterContainer from "@/components/layout/CenterContainer";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AdminBookTime from "@/components/admin/AdminBookTime";
import { type BuildingDate, generatePlanDate } from "@/lib/generatePlanDate";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

const AdminSingleBooking = async ({ params }: { params: { id: string } }) => {
  if (!params.id) {
    return redirect("/404");
  }

  const session = await auth();

  if (!session?.user) {
    return redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  if (user?.role !== "ADMIN") {
    return redirect("/login");
  }

  const booking = await prisma.booking.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!booking) {
    return redirect("/404");
  }

  return (
    <CenterContainer className="max-w-4xl px-4 py-16 flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>성함</Label>
          <Input
            value={booking.name}
            className="disabled:cursor-default disabled:opacity-1"
            disabled
          />
        </div>
        <div>
          <Label>연락처</Label>
          <Input
            value={booking.phone}
            disabled
            className="disabled:cursor-default disabled:opacity-1"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="">
          <Label>희망방문일시</Label>
          <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            {format(booking.bookingDate, "yyyy-MM-dd")} {booking.bookingTime}
          </div>
        </div>
      </div>
      <AdminBookTime
        confirmedBookingDate={booking?.confirmedBookingDate}
        confirmedBookingTime={booking?.bookingTime}
      />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>건축시기</Label>
          <Input
            value={generatePlanDate(booking.planDate as BuildingDate)}
            className="disabled:cursor-default disabled:opacity-1"
            disabled
          />
        </div>
        <div>
          <Label>총건축면적</Label>
          <Input
            value={booking.pyeong}
            className="disabled:cursor-default disabled:opacity-1"
            disabled
          />
        </div>
      </div>
      <div>
        <Label>건축 예정지</Label>
        <Input
          value={booking.address}
          disabled
          className="resize-none overflow-x-scroll disabled:cursor-default disabled:opacity-1"
        />
      </div>
      <div>
        <Label>요청사유</Label>
        <Textarea
          value={booking.reason}
          disabled
          rows={15}
          className="resize-none overflow-y-scroll disabled:cursor-default disabled:opacity-1 break-keep"
        />
      </div>
    </CenterContainer>
  );
};

export default AdminSingleBooking;
