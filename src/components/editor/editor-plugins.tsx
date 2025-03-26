"use client";

import emojiMartData from "@emoji-mart/data";
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
import { BlockDiscussion } from "@/components/plate/discussion/block-discussion";
import { SuggestionBelowNodes } from "@/components/plate/suggestion/suggestion-line-break";

import { alignPlugin } from "./plugins/align-plugin";
import { AutoSavePlugin } from "./plugins/auto-save-plugin";
import { autoformatPlugin } from "./plugins/autoformat-plugin";
import { basicNodesPlugins } from "./plugins/basic-nodes-plugins";
import { blockMenuPlugins } from "./plugins/block-menu-plugins";
import { commentsPlugin } from "./plugins/comments-plugin";
import { cursorOverlayPlugin } from "./plugins/cursor-overlay-plugin";
import { deletePlugins } from "./plugins/delete-plugins";
import { dndPlugins } from "./plugins/dnd-plugins";
import { equationPlugins } from "./plugins/equation-plugins";
import { exitBreakPlugin } from "./plugins/exit-break-plugin";
import { FramePlugin } from "./plugins/frame-plugin";
import { indentListPlugins } from "./plugins/indent-list-plugins";
import { lineHeightPlugin } from "./plugins/line-height-plugin";
import { linkPlugin } from "./plugins/link-plugin";
import { mediaPlugins } from "./plugins/media-plugins";
import { resetBlockTypePlugin } from "./plugins/reset-block-type-plugin";
import { skipMarkPlugin } from "./plugins/skip-mark-plugin";
import { softBreakPlugin } from "./plugins/soft-break-plugin";
import { suggestionPlugin } from "./plugins/suggestion-plugin";
import { tablePlugin } from "./plugins/table-plugin";
import { tocPlugin } from "./plugins/toc-plugin";

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
  AutoSavePlugin,
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
  FramePlugin,
  FixedToolbarPlugin,
  FloatingToolbarPlugin,
];
