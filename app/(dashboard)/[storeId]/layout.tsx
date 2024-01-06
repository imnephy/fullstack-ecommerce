import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ComponentProps } from "react";

type DashboardLayoutParams = {
  storeId: string;
};

interface DashboardLayoutProps extends ComponentProps<"div"> {
  params: DashboardLayoutParams;
}

const DashboardLayout = async (props: DashboardLayoutProps) => {
  const { children, params } = props;
  const { storeId } = params;
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <div>This will be a Navbar</div>
      {children}
    </>
  );
};

export default DashboardLayout;
