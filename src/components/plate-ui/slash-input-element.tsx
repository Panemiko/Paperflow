"use client";

import React from "react";

import { withRef } from "@udecode/cn";
import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import { CodeBlockPlugin } from "@udecode/plate-code-block/react";
import { DatePlugin } from "@udecode/plate-date/react";
import { HEADING_KEYS } from "@udecode/plate-heading";
import { TocPlugin } from "@udecode/plate-heading/react";
import { INDENT_LIST_KEYS, ListStyleType } from "@udecode/plate-indent-list";
import {
  EquationPlugin,
  InlineEquationPlugin,
} from "@udecode/plate-math/react";
import { TablePlugin } from "@udecode/plate-table/react";
import { TogglePlugin } from "@udecode/plate-toggle/react";
import {
  type PlateEditor,
  ParagraphPlugin,
  PlateElement,
} from "@udecode/plate/react";
import {
  CalendarIcon,
  ChevronRightIcon,
  Code2,
  Columns3Icon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrdered,
  PilcrowIcon,
  Quote,
  RadicalIcon,
  Square,
  Table,
  TableOfContentsIcon,
} from "lucide-react";

import {
  insertBlock,
  insertInlineElement,
} from "@/components/editor/transforms";

import {
  InlineCombobox,
  InlineComboboxContent,
  InlineComboboxEmpty,
  InlineComboboxGroup,
  InlineComboboxGroupLabel,
  InlineComboboxInput,
  InlineComboboxItem,
} from "./inline-combobox";

type Group = {
  group: string;
  items: Item[];
};

interface Item {
  icon: React.ReactNode;

  value: string;

  onSelect: (editor: PlateEditor, value: string) => void;
  className?: string;
  focusEditor?: boolean;
  keywords?: string[];
  label?: string;
}

const groups: Group[] = [
  {
    group: "Blocos básicos",
    items: [
      {
        icon: <PilcrowIcon />,
        keywords: ["parágrafo"],
        label: "Texto",
        value: ParagraphPlugin.key,
      },
      {
        icon: <Heading1Icon />,
        keywords: ["título", "h1"],
        label: "Título 1",
        value: HEADING_KEYS.h1,
      },
      {
        icon: <Heading2Icon />,
        keywords: ["subtítulo", "h2"],
        label: "Título 2",
        value: HEADING_KEYS.h2,
      },
      {
        icon: <Heading3Icon />,
        keywords: ["subtítulo", "h3"],
        label: "Título 3",
        value: HEADING_KEYS.h3,
      },
      {
        icon: <ListIcon />,
        keywords: ["não ordenada", "ul", "-"],
        label: "Lista com marcadores",
        value: ListStyleType.Disc,
      },
      {
        icon: <ListOrdered />,
        keywords: ["ordenada", "ol", "1"],
        label: "Lista numerada",
        value: ListStyleType.Decimal,
      },
      {
        icon: <Square />,
        keywords: ["lista de tarefas", "checkbox", "[]"],
        label: "Lista de tarefas",
        value: INDENT_LIST_KEYS.todo,
      },
      {
        icon: <ChevronRightIcon />,
        keywords: ["colapsável", "expansível"],
        label: "Alternar",
        value: TogglePlugin.key,
      },
      {
        icon: <Code2 />,
        keywords: ["```"],
        label: "Bloco de código",
        value: CodeBlockPlugin.key,
      },
      {
        icon: <Table />,
        label: "Tabela",
        value: TablePlugin.key,
      },
      {
        icon: <Quote />,
        keywords: ["citação", "blockquote", "quote", ">"],
        label: "Citação",
        value: BlockquotePlugin.key,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
  {
    group: "Blocos avançados",
    items: [
      {
        icon: <TableOfContentsIcon />,
        keywords: ["sumário"],
        label: "Sumário",
        value: TocPlugin.key,
      },
      {
        icon: <Columns3Icon />,
        label: "3 colunas",
        value: "action_three_columns",
      },
      {
        focusEditor: false,
        icon: <RadicalIcon />,
        label: "Equação",
        value: EquationPlugin.key,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
  {
    group: "Inline",
    items: [
      {
        focusEditor: true,
        icon: <CalendarIcon />,
        keywords: ["data", "tempo"],
        label: "Data",
        value: DatePlugin.key,
      },
      {
        focusEditor: false,
        icon: <RadicalIcon />,
        label: "Equação Inline",
        value: InlineEquationPlugin.key,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertInlineElement(editor, value);
      },
    })),
  },
];

export const SlashInputElement = withRef<typeof PlateElement>(
  ({ className, children, ...props }, ref) => {
    const { editor, element } = props;

    return (
      <PlateElement
        ref={ref}
        as="span"
        className={className}
        data-slate-value={element.value}
        {...props}
      >
        <InlineCombobox element={element} trigger="/">
          <InlineComboboxInput />

          <InlineComboboxContent>
            <InlineComboboxEmpty>Nenhum resultado</InlineComboboxEmpty>

            {groups.map(({ group, items }) => (
              <InlineComboboxGroup key={group}>
                <InlineComboboxGroupLabel>{group}</InlineComboboxGroupLabel>

                {items.map(
                  ({ focusEditor, icon, keywords, label, value, onSelect }) => (
                    <InlineComboboxItem
                      key={value}
                      value={value}
                      onClick={() => onSelect(editor, value)}
                      label={label}
                      focusEditor={focusEditor}
                      group={group}
                      keywords={keywords}
                    >
                      <div className="text-muted-foreground mr-2">{icon}</div>
                      {label ?? value}
                    </InlineComboboxItem>
                  ),
                )}
              </InlineComboboxGroup>
            ))}
          </InlineComboboxContent>
        </InlineCombobox>

        {children}
      </PlateElement>
    );
  },
);
