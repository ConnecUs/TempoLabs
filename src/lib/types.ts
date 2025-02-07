export interface Prompt {
  id: string;
  title: string;
  systemPrompt: string;
  userPrompt: string;
  createdAt: number;
}

export type PromptStorage = {
  prompts: Prompt[];
};
