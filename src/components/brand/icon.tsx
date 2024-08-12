import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

export function Icon({
  className,
  ...params
}: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      width="338"
      height="338"
      viewBox="0 0 338 338"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-fit w-full", className)}
      {...params}
    >
      <g clipPath="url(#clip0_54_2)">
        <rect
          width="338"
          height="338"
          rx="40"
          fill="url(#paint0_linear_54_2)"
        />
        <path
          d="M209.333 108.5L249.667 249.667"
          stroke="#005F48"
          strokeWidth="30"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M169 108.5V249.667"
          stroke="#005F48"
          strokeWidth="30"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M128.667 128.667V249.667"
          stroke="#005F48"
          strokeWidth="30"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M88.3333 88.3333V249.667"
          stroke="#005F48"
          strokeWidth="30"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_54_2"
          x1="1.25915e-06"
          y1="169"
          x2="338"
          y2="338"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#69AC63" />
          <stop offset="1" stopColor="#5BE45B" />
        </linearGradient>
        <clipPath id="clip0_54_2">
          <rect width="338" height="338" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
