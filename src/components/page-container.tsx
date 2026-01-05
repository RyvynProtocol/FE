import { cn } from "@/lib/utils";
import React from "react";

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PageContainer({
  children,
  className,
  ...props
}: PageContainerProps) {
  return (
    <div className="min-h-screen">
      <div className="pointer-events-none fixed inset-0" />
      
      <div
        className={cn("relative z-10 mx-auto px-3 md:px-6 pt-32 pb-12", className)}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
