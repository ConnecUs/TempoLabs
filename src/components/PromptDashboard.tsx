import React from "react";
import PromptCard from "./PromptCard";
import PromptEditor from "./PromptEditor";
import MergePromptDialog from "./MergePromptDialog";
import { Button } from "./ui/button";
import { Plus, Merge } from "lucide-react";

import { Prompt } from "../lib/types";

interface PromptDashboardProps {
  prompts?: Prompt[];
  onCreatePrompt?: (
    title: string,
    systemPrompt: string,
    userPrompt: string,
  ) => void;
  onUpdatePrompt?: (
    id: string,
    title: string,
    systemPrompt: string,
    userPrompt: string,
  ) => void;
  onDeletePrompt?: (id: string) => void;
  onMergePrompts?: (
    title: string,
    systemPrompt: string,
    userPrompt: string,
  ) => void;
}

const PromptDashboard = ({
  prompts = [
    {
      id: "1",
      title: "Welcome Prompt",
      content:
        "Welcome to the Prompt Manager! This is a sample prompt to get you started.",
    },
    {
      id: "2",
      title: "AI Assistant",
      content:
        "You are an AI assistant tasked with helping users accomplish their goals efficiently.",
    },
    {
      id: "3",
      title: "Code Review",
      content:
        "Please review this code for best practices, potential bugs, and suggest improvements.",
    },
  ],
  onCreatePrompt = () => {},
  onUpdatePrompt = () => {},
  onDeletePrompt = () => {},
  onMergePrompts = () => {},
}: PromptDashboardProps) => {
  const [isEditorOpen, setIsEditorOpen] = React.useState(false);
  const [isMergeDialogOpen, setIsMergeDialogOpen] = React.useState(false);
  const [selectedPrompts, setSelectedPrompts] = React.useState<string[]>([]);
  const [editingPrompt, setEditingPrompt] = React.useState<Prompt | null>(null);

  const handleCreatePrompt = (content: string) => {
    onCreatePrompt(content);
    setIsEditorOpen(false);
  };

  const handleEditPrompt = (id: string) => {
    const prompt = prompts.find((p) => p.id === id);
    if (prompt) {
      setEditingPrompt(prompt);
    }
  };

  const handleUpdatePrompt = (content: string) => {
    if (editingPrompt) {
      onUpdatePrompt(editingPrompt.id, content);
      setEditingPrompt(null);
    }
  };

  const handleSelectPrompt = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedPrompts([...selectedPrompts, id]);
    } else {
      setSelectedPrompts(selectedPrompts.filter((promptId) => promptId !== id));
    }
  };

  const handleMerge = (
    title: string,
    systemPrompt: string,
    userPrompt: string,
  ) => {
    onMergePrompts(title, systemPrompt, userPrompt);
    setIsMergeDialogOpen(false);
    setSelectedPrompts([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Prompt Manager</h1>
          <div className="flex gap-4">
            <Button
              onClick={() => setIsEditorOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Prompt
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsMergeDialogOpen(true)}
              disabled={selectedPrompts.length < 2}
              className="flex items-center gap-2"
            >
              <Merge className="w-4 h-4" />
              Merge Selected
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {prompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              id={prompt.id}
              title={prompt.title}
              content={prompt.content}
              onEdit={handleEditPrompt}
              onDelete={onDeletePrompt}
              onSelect={handleSelectPrompt}
              selected={selectedPrompts.includes(prompt.id)}
              selectable={true}
            />
          ))}
        </div>

        <PromptEditor
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          onSave={handleCreatePrompt}
          title="Create New Prompt"
        />

        {editingPrompt && (
          <PromptEditor
            isOpen={true}
            onClose={() => setEditingPrompt(null)}
            onSave={handleUpdatePrompt}
            initialPrompt={editingPrompt.content}
            title="Edit Prompt"
          />
        )}

        <MergePromptDialog
          isOpen={isMergeDialogOpen}
          onClose={() => setIsMergeDialogOpen(false)}
          selectedPrompts={selectedPrompts.map((id) => {
            const prompt = prompts.find((p) => p.id === id);
            return {
              id,
              text: prompt?.content || "",
            };
          })}
          onMerge={handleMerge}
        />
      </div>
    </div>
  );
};

export default PromptDashboard;
