import { auth } from "@/auth";
import Header from "./Header";

const HeaderWrapper = async () => {
  const session = await auth();
  return <Header session={session} />;
};

export default HeaderWrapper;
