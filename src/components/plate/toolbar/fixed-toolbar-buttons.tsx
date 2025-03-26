"use client";

import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from "@udecode/plate-basic-marks/react";
import { HighlightPlugin } from "@udecode/plate-highlight/react";
import { ImagePlugin } from "@udecode/plate-media/react";
import { useEditorReadOnly } from "@udecode/plate/react";
import {
  BoldIcon,
  Code2Icon,
  HighlighterIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";

import { MoreDropdownMenu } from "@/components/plate/block-selection/more-dropdown-menu";

import { AlignDropdownMenu } from "../alignment/align-dropdown-menu";
import { InsertDropdownMenu } from "../block-selection/insert-dropdown-menu";
import { TurnIntoDropdownMenu } from "../block-selection/turn-into-dropdown-menu";
import { CommentToolbarButton } from "../comment/comment-toolbar-button";
import { LineHeightDropdownMenu } from "../line-height/line-height-dropdown-menu";
import { MediaToolbarButton } from "../media/media-toolbar-button";
import { ModeDropdownMenu } from "../mode/mode-dropdown-menu";
import { TableDropdownMenu } from "../table/table-dropdown-menu";
import { Separator } from "../ui/separator";
import { RedoToolbarButton, UndoToolbarButton } from "./history-toolbar-button";
import {
  BulletedIndentListToolbarButton,
  NumberedIndentListToolbarButton,
} from "./indent-list-toolbar-button";
import { LinkToolbarButton } from "./link-toolbar-button";
import { MarkToolbarButton } from "./mark-toolbar-button";
import { ToolbarGroup } from "./toolbar";

export function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <div className="grid w-full grid-cols-3">
      {readOnly && (
        <>
          <div />
          <div />
        </>
      )}
      {!readOnly && (
        <>
          <ToolbarGroup>
            <UndoToolbarButton />
            <RedoToolbarButton />
          </ToolbarGroup>

          <div className="flex justify-center">
            <ToolbarGroup>
              <InsertDropdownMenu />
              <TurnIntoDropdownMenu />
            </ToolbarGroup>

            <ToolbarGroup>
              <MarkToolbarButton
                nodeType={BoldPlugin.key}
                tooltip="Negrito (Ctrl+B)"
              >
                <BoldIcon />
              </MarkToolbarButton>

              <MarkToolbarButton
                nodeType={ItalicPlugin.key}
                tooltip="Itálico (Ctrl+I)"
              >
                <ItalicIcon />
              </MarkToolbarButton>

              <MarkToolbarButton
                nodeType={UnderlinePlugin.key}
                tooltip="Sublinhado (Ctrl+U)"
              >
                <UnderlineIcon />
              </MarkToolbarButton>

              <MarkToolbarButton
                nodeType={StrikethroughPlugin.key}
                tooltip="Tachado (Ctrl+⇧+M)"
              >
                <StrikethroughIcon />
              </MarkToolbarButton>

              <MarkToolbarButton
                nodeType={CodePlugin.key}
                tooltip="Código (Ctrl+E)"
              >
                <Code2Icon />
              </MarkToolbarButton>
            </ToolbarGroup>

            <ToolbarGroup>
              <AlignDropdownMenu />

              <NumberedIndentListToolbarButton />
              <BulletedIndentListToolbarButton />
              <LineHeightDropdownMenu />
            </ToolbarGroup>

            <ToolbarGroup>
              <LinkToolbarButton />
              <TableDropdownMenu />
              <MediaToolbarButton nodeType={ImagePlugin.key} />
            </ToolbarGroup>

            <ToolbarGroup>
              <MoreDropdownMenu />
            </ToolbarGroup>
          </div>
        </>
      )}

      <div className="flex justify-end">
        <ToolbarGroup>
          <div className="mx-1.5 h-full py-0.5">
            <Separator orientation="vertical" />
          </div>
          <MarkToolbarButton nodeType={HighlightPlugin.key} tooltip="Destacar">
            <HighlighterIcon />
          </MarkToolbarButton>
          <CommentToolbarButton />
        </ToolbarGroup>

        <ToolbarGroup>
          <ModeDropdownMenu />
        </ToolbarGroup>
      </div>
    </div>
  );
}
