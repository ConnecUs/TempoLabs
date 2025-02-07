import { Prompt, PromptStorage } from "./types";

const STORAGE_KEY = "prompt-manager";

export const loadPrompts = (): Prompt[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];

  try {
    const storage: PromptStorage = JSON.parse(data);
    return storage.prompts;
  } catch {
    return [];
  }
};

export const savePrompts = (prompts: Prompt[]) => {
  const storage: PromptStorage = { prompts };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
};

export const createPrompt = (
  title: string,
  systemPrompt: string,
  userPrompt: string,
): Prompt => ({
  id: crypto.randomUUID(),
  title,
  systemPrompt,
  userPrompt,
  createdAt: Date.now(),
});
