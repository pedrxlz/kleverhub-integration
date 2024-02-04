import * as React from "react";

interface ArrowIconProps extends React.HTMLAttributes<SVGElement> {
  isOpen: boolean;
}

function ArrowIcon({ isOpen, ...props }: ArrowIconProps) {
  return (
    <svg
      data-isopen={isOpen}
      fill="none"
      height={24}
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      width={24}
      className="transform transition-transform data-[isopen=true]:rotate-180"
      {...props}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default ArrowIcon;
