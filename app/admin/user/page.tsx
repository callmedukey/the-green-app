import { getUserById } from "@/actions/admin-actions";
import UserStatusControlForm from "@/components/admin/UserStatusControlForm";
import CenterContainer from "@/components/layout/CenterContainer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const AdminUserControlPage = async ({
  searchParams,
}: {
  searchParams: { id: string };
}) => {
  const id = searchParams.id;

  if (!id) {
    return redirect("/admin");
  }

  const user = await getUserById(id);

  if (!user) {
    return redirect("/admin");
  }

  return (
    <CenterContainer className="max-w-4xl px-4 py-16 flex flex-col gap-4 min-h-[100dvh]">
      <UserStatusControlForm userId={user.id} userStatus={user.userStatus} />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>성함</Label>
          <Input
            value={user.name}
            className="disabled:cursor-default disabled:opacity-1"
            disabled
          />
        </div>
        <div>
          <Label>연락처</Label>
          <Input
            value={user.phone}
            disabled
            className="disabled:cursor-default disabled:opacity-1"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>아이디</Label>
          <Input
            value={user.username}
            className="disabled:cursor-default disabled:opacity-1"
            disabled
          />
        </div>
        <div>
          <Label>가입일</Label>
          <Input
            value={format(user.createdAt, "yyyy-MM-dd HH:mm")}
            disabled
            className="disabled:cursor-default disabled:opacity-1"
          />
        </div>
      </div>

      <div>
        <Label>이메일</Label>
        <Input
          value={user.email}
          disabled
          className="resize-none overflow-x-scroll disabled:cursor-default disabled:opacity-1"
        />
      </div>
      <div>
        <Label>가입 주소지</Label>
        <Input
          value={user.address}
          disabled
          className="resize-none overflow-x-scroll disabled:cursor-default disabled:opacity-1"
        />
      </div>
    </CenterContainer>
  );
};

export default AdminUserControlPage;
