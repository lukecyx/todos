import { SVGProps } from "react";

function ChevronRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="h-6 w-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m10 16 4-4-4-4"
      />
    </svg>
  );
}

export default ChevronRight;
