"use client";

import type { Value } from "@udecode/plate";

import { withProps } from "@udecode/cn";
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin,
} from "@udecode/plate-basic-marks/react";
import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import {
  CodeBlockPlugin,
  CodeLinePlugin,
  CodeSyntaxPlugin,
} from "@udecode/plate-code-block/react";
import { CommentsPlugin } from "@udecode/plate-comments/react";
import { DatePlugin } from "@udecode/plate-date/react";
import { ExcalidrawPlugin } from "@udecode/plate-excalidraw/react";
import { HEADING_KEYS } from "@udecode/plate-heading";
import { TocPlugin } from "@udecode/plate-heading/react";
import { HighlightPlugin } from "@udecode/plate-highlight/react";
import { HorizontalRulePlugin } from "@udecode/plate-horizontal-rule/react";
import { KbdPlugin } from "@udecode/plate-kbd/react";
import { ColumnItemPlugin, ColumnPlugin } from "@udecode/plate-layout/react";
import { LinkPlugin } from "@udecode/plate-link/react";
import {
  EquationPlugin,
  InlineEquationPlugin,
} from "@udecode/plate-math/react";
import {
  FilePlugin,
  ImagePlugin,
  MediaEmbedPlugin,
  PlaceholderPlugin,
} from "@udecode/plate-media/react";
import { SlashInputPlugin } from "@udecode/plate-slash-command/react";
import { SuggestionPlugin } from "@udecode/plate-suggestion/react";
import {
  TableCellHeaderPlugin,
  TableCellPlugin,
  TablePlugin,
  TableRowPlugin,
} from "@udecode/plate-table/react";
import { TogglePlugin } from "@udecode/plate-toggle/react";
import {
  type CreatePlateEditorOptions,
  ParagraphPlugin,
  type PlateCorePlugin,
  PlateLeaf,
  type PlatePlugin,
  usePlateEditor,
} from "@udecode/plate/react";

import { editorPlugins } from "@/components/editor/editor-plugins";
import { FixedToolbarPlugin } from "@/components/editor/plugins/fixed-toolbar-plugin";
import { FloatingToolbarPlugin } from "@/components/editor/plugins/floating-toolbar-plugin";
import { SlashInputElement } from "@/components/plate/block-selection/slash-input-element";
import { BlockquoteElement } from "@/components/plate/blockquote/blockquote-element";
import { CodeBlockElement } from "@/components/plate/code/code-block-element";
import { CodeLeaf } from "@/components/plate/code/code-leaf";
import { CodeLineElement } from "@/components/plate/code/code-line-element";
import { CodeSyntaxLeaf } from "@/components/plate/code/code-syntax-leaf";
import { ColumnElement } from "@/components/plate/columns/column-element";
import { ColumnGroupElement } from "@/components/plate/columns/column-group-element";
import { CommentLeaf } from "@/components/plate/comment/comment-leaf";
import { EquationElement } from "@/components/plate/equation/equation-element";
import { InlineEquationElement } from "@/components/plate/equation/inline-equation-element";
import { ExcalidrawElement } from "@/components/plate/excalidraw/excalidraw-element";
import { HeadingElement } from "@/components/plate/heading/heading-element";
import { HighlightLeaf } from "@/components/plate/highlight/highlight-leaf";
import { HrElement } from "@/components/plate/hr/hr-element";
import { KbdLeaf } from "@/components/plate/kdb/kbd-leaf";
import { LinkElement } from "@/components/plate/link/link-element";
import { ImageElement } from "@/components/plate/media/image-element";
import { MediaEmbedElement } from "@/components/plate/media/media-embed-element";
import { MediaFileElement } from "@/components/plate/media/media-file-element";
import { MediaPlaceholderElement } from "@/components/plate/media/media-placeholder-element";
import { ParagraphElement } from "@/components/plate/paragraph/paragraph-element";
import { withPlaceholders } from "@/components/plate/placeholder/placeholder";
import { SuggestionLeaf } from "@/components/plate/suggestion/suggestion-leaf";
import {
  TableCellElement,
  TableCellHeaderElement,
} from "@/components/plate/table/table-cell-element";
import { TableElement } from "@/components/plate/table/table-element";
import { TableRowElement } from "@/components/plate/table/table-row-element";
import { TocElement } from "@/components/plate/toc/toc-element";
import { DateElement } from "@/components/plate/ui/date-element";
import { ToggleElement } from "@/components/plate/ui/toggle-element";
import { defaultPaperValue } from "@/mock/default-paper";

export const viewComponents = {
  [BlockquotePlugin.key]: BlockquoteElement,
  [BoldPlugin.key]: withProps(PlateLeaf, { as: "strong" }),
  [CodeBlockPlugin.key]: CodeBlockElement,
  [CodeLinePlugin.key]: CodeLineElement,
  [CodePlugin.key]: CodeLeaf,
  [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
  [ColumnItemPlugin.key]: ColumnElement,
  [ColumnPlugin.key]: ColumnGroupElement,
  [CommentsPlugin.key]: CommentLeaf,
  [DatePlugin.key]: DateElement,
  [EquationPlugin.key]: EquationElement,
  [ExcalidrawPlugin.key]: ExcalidrawElement,
  [FilePlugin.key]: MediaFileElement,
  [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: "h1" }),
  [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: "h2" }),
  [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: "h3" }),
  [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: "h4" }),
  [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: "h5" }),
  [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: "h6" }),
  [HighlightPlugin.key]: HighlightLeaf,
  [HorizontalRulePlugin.key]: HrElement,
  [ImagePlugin.key]: ImageElement,
  [InlineEquationPlugin.key]: InlineEquationElement,
  [ItalicPlugin.key]: withProps(PlateLeaf, { as: "em" }),
  [KbdPlugin.key]: KbdLeaf,
  [LinkPlugin.key]: LinkElement,
  [MediaEmbedPlugin.key]: MediaEmbedElement,
  [ParagraphPlugin.key]: ParagraphElement,
  [PlaceholderPlugin.key]: MediaPlaceholderElement,
  [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: "s" }),
  [SubscriptPlugin.key]: withProps(PlateLeaf, { as: "sub" }),
  [SuggestionPlugin.key]: SuggestionLeaf,
  [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: "sup" }),
  [TableCellHeaderPlugin.key]: TableCellHeaderElement,
  [TableCellPlugin.key]: TableCellElement,
  [TablePlugin.key]: TableElement,
  [TableRowPlugin.key]: TableRowElement,
  [TocPlugin.key]: TocElement,
  [TogglePlugin.key]: ToggleElement,
  [UnderlinePlugin.key]: withProps(PlateLeaf, { as: "u" }),
};

export const editorComponents = {
  ...viewComponents,
  [SlashInputPlugin.key]: SlashInputElement,
};

export const useCreateEditor = (
  {
    components,
    override,
    readOnly,
    ...options
  }: {
    components?: Record<string, unknown>;
    plugins?: PlatePlugin[];
    readOnly?: boolean;
  } & Omit<CreatePlateEditorOptions, "plugins"> = {},
  deps: unknown[] = [],
) => {
  return usePlateEditor<Value>(
    {
      override: {
        components: {
          ...(readOnly ? viewComponents : withPlaceholders(editorComponents)),
          ...components,
        },
        ...override,
      },
      // @ts-expect-error aaa
      plugins: [
        ...(editorPlugins as unknown as PlateCorePlugin[]),
        FixedToolbarPlugin as unknown as PlateCorePlugin,
        FloatingToolbarPlugin as unknown as PlateCorePlugin,
      ],
      value: defaultPaperValue,
      readOnly,
      ...options,
    },
    deps,
  );
};
