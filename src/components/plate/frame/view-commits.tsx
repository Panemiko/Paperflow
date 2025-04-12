import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HistoryIcon } from "lucide-react";

export function ViewCommits() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="smIcon" variant="ghost">
            <HistoryIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Ver commits</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
