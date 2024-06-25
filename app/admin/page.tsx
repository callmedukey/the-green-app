import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import CenterContainer from "@/components/layout/CenterContainer";
import AdminTabs from "@/components/admin/AdminTabs";
import SignoutButton from "@/components/auth/SignoutButton";

export const dynamic = "force-dynamic";

const AdminPage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/account");
  }

  const admin = await prisma.user.findFirst({
    where: {
      role: "ADMIN",
      id: session.user.id,
    },
  });

  if (!admin) {
    redirect("/login");
  }

  const [users, inquiries, bookings, adminSetting] = await Promise.all([
    prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.inquiry.findMany({
      include: {
        attachments: true,
        _count: {
          select: {
            attachments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.booking.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.adminSetting.findFirst(),
  ]);

  return (
    <CenterContainer className="px-4 pt-16 w-full max-w-4xl min-h-screen">
      <AdminTabs
        users={users}
        inquiries={inquiries}
        bookings={bookings}
        adminSetting={adminSetting}
      />
      <SignoutButton className="mx-auto max-w-full" />
    </CenterContainer>
  );
};

export default AdminPage;
