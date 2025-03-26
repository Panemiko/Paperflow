"use client";

import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";

import { SuggestionPlugin } from "@udecode/plate-suggestion/react";
import {
  useEditorRef,
  usePlateState,
  usePluginOption,
} from "@udecode/plate/react";
import { Eye, Pen, PencilLineIcon } from "lucide-react";

import { ToolbarButton } from "../toolbar/toolbar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from "../ui/dropdown-menu";

type Mode = "editing" | "viewing" | "suggestion";

export function ModeDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const [readOnly, setReadOnly] = usePlateState("readOnly");
  const openState = useOpenState();

  const isSuggesting = usePluginOption(SuggestionPlugin, "isSuggesting");

  let value: Mode = "editing";

  if (readOnly) value = "viewing";

  if (isSuggesting) value = "suggestion";

  const item = {
    editing: (
      <>
        <Pen />
        <span className="hidden lg:inline">Editando</span>
      </>
    ),
    suggestion: (
      <>
        <PencilLineIcon />
        <span className="hidden lg:inline">Sugestão</span>
      </>
    ),
    viewing: (
      <>
        <Eye />
        <span className="hidden lg:inline">Visualizando</span>
      </>
    ),
  };

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          pressed={openState.open}
          tooltip="Modo de edição"
          isDropdown
        >
          {item[value]}
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-[180px]" align="start">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(newValue) => {
            if (newValue === "viewing") {
              setReadOnly(true);

              return;
            } else {
              setReadOnly(false);
            }

            if (newValue === "suggestion") {
              editor.setOption(SuggestionPlugin, "isSuggesting", true);

              return;
            } else {
              editor.setOption(SuggestionPlugin, "isSuggesting", false);
            }

            if (newValue === "editing") {
              editor.tf.focus();

              return;
            }
          }}
        >
          <DropdownMenuRadioItem value="editing">
            {item.editing}
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem value="viewing">
            {item.viewing}
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem value="suggestion">
            {item.suggestion}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
