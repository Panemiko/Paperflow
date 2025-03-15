"use client";

import React, { type ReactNode } from "react";

import { cn } from "@udecode/cn";
import { HEADING_KEYS } from "@udecode/plate-heading";
import {
  ParagraphPlugin,
  type PlaceholderProps,
  createNodeHOC,
  createNodesHOC,
  usePlaceholderState,
} from "@udecode/plate/react";

export const Placeholder = ({ children, ...props }: PlaceholderProps) => {
  const { nodeProps, placeholder } = props;

  const { enabled } = usePlaceholderState({
    ...props,
    children: children as ReactNode,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return React.Children.map(children, (child) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return React.cloneElement(child, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      className: child.props.className,
      nodeProps: {
        ...nodeProps,
        className: cn(
          enabled &&
            "before:absolute before:cursor-text before:opacity-30 before:content-[attr(placeholder)]",
        ),
        placeholder,
      },
    });
  });
};

export const withPlaceholder = createNodeHOC(Placeholder);

export const withPlaceholdersPrimitive = createNodesHOC(Placeholder);

export const withPlaceholders = (components: unknown) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  withPlaceholdersPrimitive(components, [
    {
      key: ParagraphPlugin.key,
      hideOnBlur: true,
      placeholder: "Escreva um parágrafo",
      query: {
        maxLevel: 1,
      },
    },
    {
      key: HEADING_KEYS.h1,
      hideOnBlur: false,
      placeholder: "Sem título",
    },
  ]);
