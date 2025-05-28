import { Challenge } from '@/types/challenge';

const LOCAL_STORAGE_KEY = 'challenges';

// Initial hardcoded challenges
const defaultChallenges: Challenge[] = [
  { id: '1', type: 'truth', content: 'What is your biggest fear?', difficulty: 'easy', approved: true, created_at: new Date().toISOString() },
  { id: '2', type: 'dare', content: 'Do 10 jumping jacks', difficulty: 'easy', approved: true, created_at: new Date().toISOString() },
  { id: '3', type: 'truth', content: 'Have you ever lied to a friend?', difficulty: 'medium', approved: true, created_at: new Date().toISOString() },
  { id: '4', type: 'dare', content: 'Send a funny selfie to the last person you texted', difficulty: 'medium', approved: true, created_at: new Date().toISOString() },
  { id: '5', type: 'truth', content: 'What is something embarrassing you’ve done recently?', difficulty: 'hard', approved: true, created_at: new Date().toISOString() },
  { id: '6', type: 'dare', content: 'Text your crush and say “I like you”', difficulty: 'hard', approved: true, created_at: new Date().toISOString() },
];

// Load challenges from localStorage or use defaults
const loadChallenges = (): Challenge[] => {
  if (typeof window !== 'undefined') {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : defaultChallenges;
  }
  return defaultChallenges;
};

// Save challenges to localStorage
const saveChallenges = (challenges: Challenge[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(challenges));
  }
};

let challenges: Challenge[] = loadChallenges();

// Get all challenges
export const getChallenges = () => challenges;

// Add a new challenge (unapproved by default)
export const addChallenge = (challenge: Omit<Challenge, 'id' | 'created_at' | 'approved'>) => {
  const newChallenge: Challenge = {
    ...challenge,
    id: crypto.randomUUID(), // Better ID generation
    created_at: new Date().toISOString(),
    approved: false,
  };

  challenges.push(newChallenge);
  saveChallenges(challenges);
  return newChallenge;
};

// Approve a challenge
export const approveChallenge = (id: string) => {
  challenges = challenges.map(challenge =>
    challenge.id === id ? { ...challenge, approved: true } : challenge
  );
  saveChallenges(challenges);
};

// Delete a challenge
export const deleteChallenge = (id: string) => {
  challenges = challenges.filter(challenge => challenge.id !== id);
  saveChallenges(challenges);
};
