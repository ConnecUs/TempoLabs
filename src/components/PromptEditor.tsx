import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

interface PromptEditorProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSave?: (title: string, systemPrompt: string, userPrompt: string) => void;
  initialPrompt?: {
    title?: string;
    systemPrompt?: string;
    userPrompt?: string;
  };
  title?: string;
}

const PromptEditor = ({
  isOpen = true,
  onClose = () => {},
  onSave = () => {},
  initialPrompt = {
    title: "",
    systemPrompt: "",
    userPrompt: "",
  },
  title = "Create New Prompt",
}: PromptEditorProps) => {
  const [promptTitle, setPromptTitle] = React.useState(initialPrompt.title);
  const [systemPrompt, setSystemPrompt] = React.useState(
    initialPrompt.systemPrompt,
  );
  const [userPrompt, setUserPrompt] = React.useState(initialPrompt.userPrompt);

  const handleSave = () => {
    if (!promptTitle) return;
    onSave(promptTitle, systemPrompt, userPrompt);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Prompt Title</Label>
            <input
              id="title"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter prompt title..."
              value={promptTitle}
              onChange={(e) => setPromptTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="system">System Prompt</Label>
            <Textarea
              id="system"
              placeholder="Enter system prompt here..."
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="h-[100px] resize-none"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user">User Prompt</Label>
            <Textarea
              id="user"
              placeholder="Enter user prompt here..."
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              className="h-[100px] resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Prompt</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PromptEditor;
