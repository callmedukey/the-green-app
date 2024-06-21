import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import CenterContainer from "@/components/layout/CenterContainer";

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

  return (
    <CenterContainer className="px-4 py-16 w-full max-w-4xl min-h-screen">
      hiii
    </CenterContainer>
  );
};

export default AdminPage;
