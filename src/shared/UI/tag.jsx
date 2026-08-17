import React from "react";
import { Badge } from "@/components/ui/badge";

const CustomTag = ({ value, children, onClick, className }) => {
  return (
    <Badge
      variant="secondary"
      className={`py-5 px-4 bg-black/50 border border-black flex flex-row items-center gap-2 outline-0 ${className}`}
      onClick={onClick}
    >
      <div className="">{children && children}</div>

      <div className="font-bilingual font-medium text-base text-white">
        {value && value}
      </div>
    </Badge>
  );
};

export default CustomTag;
