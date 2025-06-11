"use client";

import React from "react";

import type * as TooltipPrimitive from "@radix-ui/react-tooltip";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./button";

type TooltipProps<T extends React.ElementType> = {
  delayDuration?: number;
  disableHoverableContent?: boolean;
  skipDelayDuration?: number;
  tooltip?: React.ReactNode;
  tooltipContentProps?: Omit<
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    "children"
  >;
  tooltipProps?: Omit<
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>,
    "children"
  >;
  tooltipTriggerProps?: React.ComponentPropsWithoutRef<
    typeof TooltipPrimitive.Trigger
  >;
} & React.ComponentProps<T>;

export function withTooltip<T extends React.ElementType>(Component: T) {
  return function ExtendComponent({
    delayDuration = 0,
    disableHoverableContent = true,
    skipDelayDuration = 0,
    tooltip,
    tooltipContentProps,
    tooltipProps,
    tooltipTriggerProps,
    ...props
  }: TooltipProps<T>) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    const component = <Component {...(props as React.ComponentProps<T>)} />;

    if (tooltip && mounted) {
      return (
        <TooltipProvider
          delayDuration={delayDuration as number}
          disableHoverableContent={disableHoverableContent as boolean}
          skipDelayDuration={skipDelayDuration as number}
        >
          <Tooltip {...tooltipProps}>
            <TooltipTrigger asChild {...tooltipTriggerProps}>
              {component}
            </TooltipTrigger>

            <TooltipContent {...tooltipContentProps}>{tooltip}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return component;
  };
}

export const TooltipButton = withTooltip(Button);
