"use client";

import { CalloutPlugin } from "@udecode/plate-callout/react";
import { CodeBlockPlugin } from "@udecode/plate-code-block/react";
import { DatePlugin } from "@udecode/plate-date/react";
import { DocxPlugin } from "@udecode/plate-docx";
import { EmojiPlugin } from "@udecode/plate-emoji/react";
import { HighlightPlugin } from "@udecode/plate-highlight/react";
import { HorizontalRulePlugin } from "@udecode/plate-horizontal-rule/react";
import { JuicePlugin } from "@udecode/plate-juice";
import { KbdPlugin } from "@udecode/plate-kbd/react";
import { ColumnPlugin } from "@udecode/plate-layout/react";
import { MarkdownPlugin } from "@udecode/plate-markdown";
import { SlashPlugin } from "@udecode/plate-slash-command/react";
import { TogglePlugin } from "@udecode/plate-toggle/react";
import { TrailingBlockPlugin } from "@udecode/plate-trailing-block";

import { FixedToolbarPlugin } from "@/components/editor/plugins/fixed-toolbar-plugin";
import { FloatingToolbarPlugin } from "@/components/editor/plugins/floating-toolbar-plugin";
import { BlockDiscussion } from "@/components/plate-ui/block-discussion";
import { SuggestionBelowNodes } from "@/components/plate-ui/suggestion-line-break";

import { alignPlugin } from "@/components/editor/plugins/align-plugin";
import { autoformatPlugin } from "@/components/editor/plugins/autoformat-plugin";
import { basicNodesPlugins } from "@/components/editor/plugins/basic-nodes-plugins";
import { blockMenuPlugins } from "@/components/editor/plugins/block-menu-plugins";
import { commentsPlugin } from "@/components/editor/plugins/comments-plugin";
import { cursorOverlayPlugin } from "@/components/editor/plugins/cursor-overlay-plugin";
import { deletePlugins } from "@/components/editor/plugins/delete-plugins";
import { dndPlugins } from "@/components/editor/plugins/dnd-plugins";
import { equationPlugins } from "@/components/editor/plugins/equation-plugins";
import { exitBreakPlugin } from "@/components/editor/plugins/exit-break-plugin";
import { FramePlugin } from "@/components/editor/plugins/frame-plugin";
import { indentListPlugins } from "@/components/editor/plugins/indent-list-plugins";
import { lineHeightPlugin } from "@/components/editor/plugins/line-height-plugin";
import { linkPlugin } from "@/components/editor/plugins/link-plugin";
import { mediaPlugins } from "@/components/editor/plugins/media-plugins";
import { resetBlockTypePlugin } from "@/components/editor/plugins/reset-block-type-plugin";
import { skipMarkPlugin } from "@/components/editor/plugins/skip-mark-plugin";
import { softBreakPlugin } from "@/components/editor/plugins/soft-break-plugin";
import { suggestionPlugin } from "@/components/editor/plugins/suggestion-plugin";
import { tablePlugin } from "@/components/editor/plugins/table-plugin";
import { tocPlugin } from "@/components/editor/plugins/toc-plugin";

export const viewPlugins = [
  ...basicNodesPlugins,
  HorizontalRulePlugin,
  linkPlugin,
  DatePlugin,
  tablePlugin,
  TogglePlugin,
  tocPlugin,
  ...mediaPlugins,
  ...equationPlugins,
  CalloutPlugin,
  ColumnPlugin,

  // Marks
  HighlightPlugin,
  KbdPlugin,
  skipMarkPlugin,

  // Block Style
  alignPlugin,
  ...indentListPlugins,
  lineHeightPlugin,

  // Collaboration
  commentsPlugin.configure({
    render: { aboveNodes: BlockDiscussion as any },
  }),
  suggestionPlugin.configure({
    render: { belowNodes: SuggestionBelowNodes as any },
  }),
] as const;

export const editorPlugins = [
  // Nodes
  ...viewPlugins,

  // Functionality
  SlashPlugin.extend({
    options: {
      triggerQuery(editor) {
        return !editor.api.some({
          match: { type: editor.getType(CodeBlockPlugin) },
        });
      },
    },
  }),
  autoformatPlugin,
  cursorOverlayPlugin,
  ...blockMenuPlugins,
  ...dndPlugins,
  EmojiPlugin.configure({ options: { data: emojiMartData as any } }),
  exitBreakPlugin,
  resetBlockTypePlugin,
  ...deletePlugins,
  softBreakPlugin,
  TrailingBlockPlugin,

  // Deserialization
  DocxPlugin,
  MarkdownPlugin.configure({ options: { indentList: true } }),
  JuicePlugin,

  // UI
  FixedToolbarPlugin,
  FloatingToolbarPlugin,
  FramePlugin,
];
