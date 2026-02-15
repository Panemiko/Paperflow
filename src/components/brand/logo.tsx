import Image from "next/image";
import { ComponentPropsWithoutRef } from "react";
import logo from "./logo.svg";

export function BrandLogo(props: ComponentPropsWithoutRef<"img">) {
  return (
    <Image
      height={100}
      width={100}
      src={logo}
      alt="Paperflow Logo"
      {...props}
    />
  );
}
