import Image from "next/image";
import { ComponentPropsWithoutRef } from "react";
import logo from "./logo.svg";

export function BrandLogo(
  props: Partial<ComponentPropsWithoutRef<typeof Image>>,
) {
  return <Image src={logo} alt="Paperflow Logo" {...props} />;
}
