import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Card } from "./ui/card";
import { Check, X } from "lucide-react";

import { Prompt } from "../lib/types";

interface MergePromptDialogProps {
  isOpen?: boolean;
  onClose?: () => void;
  selectedPrompts?: Prompt[];
  onMerge?: (title: string, systemPrompt: string, userPrompt: string) => void;
}

const MergePromptDialog = ({
  isOpen = true,
  onClose = () => {},
  selectedPrompts = [],

  onMerge = () => {},
}: MergePromptDialogProps) => {
  const [mergedTitle, setMergedTitle] = React.useState("Merged Prompt");
  const mergedSystemPrompt = selectedPrompts
    .map((p) => p.systemPrompt)
    .join("\n\n");
  const mergedUserPrompt = selectedPrompts
    .map((p) => p.userPrompt)
    .join("\n\n");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col bg-white">
        <DialogHeader>
          <DialogTitle>Merge Prompts</DialogTitle>
          <DialogDescription>
            Review and confirm the combination of selected prompts
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 my-4">
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            {selectedPrompts.map((prompt, index) => (
              <Card key={prompt.id} className="p-4 mb-4 bg-gray-50">
                <div className="font-medium mb-2">{prompt.title}</div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">System:</span>{" "}
                    {prompt.systemPrompt}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">User:</span>{" "}
                    {prompt.userPrompt}
                  </p>
                </div>
              </Card>
            ))}
          </ScrollArea>

          <div className="mt-6 space-y-4">
            <div>
              <Label htmlFor="mergedTitle">Merged Prompt Title</Label>
              <input
                id="mergedTitle"
                className="w-full px-3 py-2 border rounded-md mt-1"
                value={mergedTitle}
                onChange={(e) => setMergedTitle(e.target.value)}
              />
            </div>
            <div>
              <h4 className="font-medium mb-2">Merged Result:</h4>
              <Card className="p-4 bg-gray-100">
                <div className="space-y-2">
                  <p className="text-sm whitespace-pre-wrap">
                    <span className="font-medium">System:</span>{" "}
                    {mergedSystemPrompt}
                  </p>
                  <p className="text-sm whitespace-pre-wrap">
                    <span className="font-medium">User:</span>{" "}
                    {mergedUserPrompt}
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex items-center"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={() =>
              onMerge(mergedTitle, mergedSystemPrompt, mergedUserPrompt)
            }
            className="flex items-center"
          >
            <Check className="w-4 h-4 mr-2" />
            Merge Prompts
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MergePromptDialog;
