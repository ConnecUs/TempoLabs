import React from "react";
import PromptDashboard from "./PromptDashboard";
import Navbar from "./Navbar";
import { Button } from "./ui/button";
import ImageGallery from "./ImageGallery";

import { loadPrompts, savePrompts, createPrompt } from "../lib/storage";
import { Prompt } from "../lib/types";

const Home = () => {
  const [prompts, setPrompts] = React.useState<Prompt[]>([]);

  React.useEffect(() => {
    setPrompts(loadPrompts());
  }, []);
  const handleCreatePrompt = (
    title: string,
    systemPrompt: string,
    userPrompt: string,
  ) => {
    const newPrompt = createPrompt(title, systemPrompt, userPrompt);
    const updatedPrompts = [...prompts, newPrompt];
    setPrompts(updatedPrompts);
    savePrompts(updatedPrompts);
  };

  const handleUpdatePrompt = (
    id: string,
    title: string,
    systemPrompt: string,
    userPrompt: string,
  ) => {
    const updatedPrompts = prompts.map((prompt) =>
      prompt.id === id
        ? { ...prompt, title, systemPrompt, userPrompt }
        : prompt,
    );
    setPrompts(updatedPrompts);
    savePrompts(updatedPrompts);
  };

  const handleDeletePrompt = (id: string) => {
    const updatedPrompts = prompts.filter((prompt) => prompt.id !== id);
    setPrompts(updatedPrompts);
    savePrompts(updatedPrompts);
  };

  const handleMergePrompts = (
    title: string,
    systemPrompt: string,
    userPrompt: string,
  ) => {
    const newPrompt = createPrompt(title, systemPrompt, userPrompt);
    const updatedPrompts = [...prompts, newPrompt];
    setPrompts(updatedPrompts);
    savePrompts(updatedPrompts);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Prompt Manager</h1>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <PromptDashboard
            prompts={prompts}
            onCreatePrompt={handleCreatePrompt}
            onUpdatePrompt={handleUpdatePrompt}
            onDeletePrompt={handleDeletePrompt}
            onMergePrompts={handleMergePrompts}
          />
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recent Generations</h2>
              <Button
                onClick={() => (window.location.href = "/gallery")}
                variant="outline"
              >
                View All Images
              </Button>
            </div>
            <ImageGallery />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
