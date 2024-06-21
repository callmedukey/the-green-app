import CenterContainer from "@/components/layout/CenterContainer";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AttachmentDownload from "@/components/admin/AttachmentDownload";

export const dynamic = "force-dynamic";

const AdminSingleInquiry = async ({ params }: { params: { id: string } }) => {
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

  const inquiry = await prisma.inquiry.findUnique({
    where: {
      id: params.id,
    },
    include: {
      attachments: true,
    },
  });

  if (!inquiry) {
    return redirect("/404");
  }

  return (
    <CenterContainer className="max-w-4xl px-4 py-16 flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>성함</Label>
          <Input
            value={inquiry.name}
            className="disabled:cursor-default disabled:opacity-1"
            disabled
          />
        </div>
        <div>
          <Label>연락처</Label>
          <Input
            value={inquiry.phone}
            disabled
            className="disabled:cursor-default disabled:opacity-1"
          />
        </div>
      </div>
      <div>
        <Label>제목</Label>
        <Input
          value={inquiry.title}
          disabled
          className="resize-none overflow-x-scroll disabled:cursor-default disabled:opacity-1"
        />
      </div>
      <div>
        <Label>제목</Label>
        <Input
          value={inquiry.title}
          disabled
          className="resize-none overflow-y-scroll disabled:cursor-default disabled:opacity-1"
        />
      </div>
      <div>
        <Label>제목</Label>
        <Textarea
          value={inquiry.content}
          disabled
          rows={15}
          className="resize-none overflow-y-scroll disabled:cursor-default disabled:opacity-1 break-keep"
        />
      </div>
      <div className="flex gap-2">
        {inquiry.attachments.map((attachment) => (
          <AttachmentDownload
            key={attachment.id}
            fileName={attachment.fileName as string}
          />
        ))}
      </div>
    </CenterContainer>
  );
};

export default AdminSingleInquiry;
