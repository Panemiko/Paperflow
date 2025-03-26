"use client";


import type { TLinkElement } from "@udecode/plate-link";

import { cn, withRef } from "@udecode/cn";
import { useLink } from "@udecode/plate-link/react";
import { PlateElement } from "@udecode/plate/react";

export const LinkElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    const element = props.element as TLinkElement;
    const { props: linkProps } = useLink({ element });

    return (
      // @ts-expect-error this came with the library and the only thing it errors is when i lint the project
      <PlateElement
        ref={ref}
        as="a"
        className={cn(
          className,
          "text-primary decoration-primary font-medium underline underline-offset-4",
        )}
        {...linkProps}
        {...props}
      >
        {children}
      </PlateElement>
    );
  },
);
