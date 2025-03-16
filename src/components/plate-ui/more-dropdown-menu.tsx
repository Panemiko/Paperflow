"use client";

import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";

import {
  SubscriptPlugin,
  SuperscriptPlugin,
} from "@udecode/plate-basic-marks/react";
import { KbdPlugin } from "@udecode/plate-kbd/react";
import { useEditorRef } from "@udecode/plate/react";
import {
  KeyboardIcon,
  ListCollapseIcon,
  ListTodoIcon,
  MoreHorizontalIcon,
  SubscriptIcon,
  SuperscriptIcon,
} from "lucide-react";

import {
  useIndentTodoToolBarButton,
  useIndentTodoToolBarButtonState,
} from "@udecode/plate-indent-list/react";
import {
  useToggleToolbarButton,
  useToggleToolbarButtonState,
} from "@udecode/plate-toggle/react";
import { type MouseEvent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "./toolbar";

export function MoreDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const openState = useOpenState();

  const todoState = useIndentTodoToolBarButtonState({ nodeType: "todo" });
  const { props: todoProps } = useIndentTodoToolBarButton(todoState);

  const toggleState = useToggleToolbarButtonState();
  const { props: toogleProps } = useToggleToolbarButton(toggleState);

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="Outros">
          <MoreHorizontalIcon />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="ignore-click-outside/toolbar flex max-h-[500px] min-w-[180px] flex-col overflow-y-auto"
        align="start"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Texto</DropdownMenuLabel>
          <DropdownMenuItem
            onSelect={() => {
              editor.tf.toggleMark(KbdPlugin.key);
              editor.tf.collapse({ edge: "end" });
              editor.tf.focus();
            }}
          >
            <KeyboardIcon />
            Entrada de teclado
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() => {
              editor.tf.toggleMark(SuperscriptPlugin.key, {
                remove: SubscriptPlugin.key,
              });
              editor.tf.focus();
            }}
          >
            <SuperscriptIcon />
            Sobrescrito
            {/* (Ctrl+,) */}
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              editor.tf.toggleMark(SubscriptPlugin.key, {
                remove: SuperscriptPlugin.key,
              });
              editor.tf.focus();
            }}
          >
            <SubscriptIcon />
            Subscrito
            {/* (Ctrl+.) */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Listas</DropdownMenuLabel>
          <DropdownMenuItem
            onSelect={todoProps.onClick}
            onMouseDown={(e) =>
              todoProps.onMouseDown(
                e as unknown as MouseEvent<
                  HTMLButtonElement,
                  globalThis.MouseEvent
                >,
              )
            }
          >
            <ListTodoIcon />
            Lista de tarefas
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={toogleProps.onClick}
            onMouseDown={(e) =>
              toogleProps.onMouseDown(
                e as unknown as MouseEvent<
                  HTMLButtonElement,
                  globalThis.MouseEvent
                >,
              )
            }
          >
            <ListCollapseIcon />
            Lista colapsável
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
