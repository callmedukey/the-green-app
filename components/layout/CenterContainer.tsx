import { cn } from "@/lib/utils";

const CenterContainer = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("w-full max-w-xl mx-auto py-12", className)}>
      {children}
    </div>
  );
};

export default CenterContainer;
