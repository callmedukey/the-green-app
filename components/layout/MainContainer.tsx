import { cn } from "@/lib/utils";
import React from "react";

const MainContainer = ({
  className,
  title,
  children,
}: {
  className?: string;
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <main className={cn("h-screen py-12 px-4", className)}>
      <h1 className="text-4xl font-bold text-center text-primary">{title}</h1>
      {children}
    </main>
  );
};

export default MainContainer;
