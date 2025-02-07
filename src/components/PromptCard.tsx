import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Copy, Edit, Trash } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface PromptCardProps {
  id?: string;
  title?: string;
  systemPrompt?: string;
  userPrompt?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onCopy?: (content: string) => void;
  onSelect?: (id: string, selected: boolean) => void;
  selected?: boolean;
  selectable?: boolean;
}

const PromptCard = ({
  id = "1",
  title = "Sample Prompt",
  systemPrompt = "You are a helpful AI assistant",
  userPrompt = "Help me with my tasks",
  onEdit = () => {},
  onDelete = () => {},
  onCopy = () => {},
  onSelect = () => {},
  selected = false,
  selectable = false,
}: PromptCardProps) => {
  const handleCopy = () => {
    const fullPrompt = `System: ${systemPrompt}\n\nUser: ${userPrompt}`;
    navigator.clipboard.writeText(fullPrompt);
    onCopy(fullPrompt);
  };

  return (
    <Card className="w-[320px] h-[200px] bg-white relative">
      {selectable && (
        <div className="absolute top-2 left-2 z-10">
          <Checkbox
            checked={selected}
            onCheckedChange={(checked) => onSelect(id, checked as boolean)}
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg truncate pr-4">{title}</h3>
          <div className="flex gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onEdit(id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit prompt</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleCopy}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy to clipboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => onDelete(id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete prompt</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground line-clamp-2">
            <span className="font-medium">System:</span> {systemPrompt}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            <span className="font-medium">User:</span> {userPrompt}
          </p>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <p>Click to edit or use actions above</p>
      </CardFooter>
    </Card>
  );
};

export default PromptCard;
