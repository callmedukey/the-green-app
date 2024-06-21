"use client";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Input } from "../ui/input";
import moment from "moment";
import { bookTime } from "@/actions/admin-actions";
import { useParams } from "next/navigation";

const AdminBookTime = ({
  confirmedBooking,
}: {
  confirmedBooking: Date | null;
}) => {
  const { id } = useParams();

  const [bookingTime, setBookingTime] = useState<string>(
    confirmedBooking
      ? moment(confirmedBooking).format().substring(0, 16)
      : moment().format().substring(0, 16)
  );

  const bookTheTime = async (bookingTime: string) => {
    if (
      !confirm(
        `${new Intl.DateTimeFormat("ko-KR", {
          dateStyle: "short",
          timeStyle: "short",
        }).format(new Date(bookingTime))} 확정하시겠습니까?`
      )
    )
      return;
    const { error, message } = await bookTime(id as string, bookingTime);
    if (error) {
      return alert(error);
    }
    alert(message);
  };
  if (!id) return null;

  return (
    <div className="relative">
      <button
        className="absolute right-0 -top-1 ring-2 ring-black px-2"
        onClick={async (e) => {
          e.preventDefault();
          await bookTheTime(bookingTime);
        }}
      >
        확정
      </button>
      <Label>확정일시</Label>
      <Input
        value={moment(bookingTime).format().substring(0, 16)}
        className="h-10 w-full rounded-md border border-input bg-background p-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        type={"datetime-local"}
        onChange={(e) => setBookingTime(e.target.value)}
      />
    </div>
  );
};

export default AdminBookTime;
