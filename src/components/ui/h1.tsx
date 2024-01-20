import { cn } from "@/lib/utils";
import React from "react";

const H1 = (props: React.HTMLProps<HTMLHeadingElement>) => {
  return (
    <h1
      className={cn(
        "text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]",
        props.className,
      )}
      {...props}
    />
  );
};

export default H1;
