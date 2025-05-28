export type Challenge = {
  id: string;
  type: 'truth' | 'dare';
  content: string;
  difficulty: 'easy' | 'medium' | 'hard';
  approved: boolean;
  created_at: string;
};