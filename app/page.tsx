'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dice1Icon as DiceIcon, MessageCircleIcon, PlusCircleIcon, ShieldCheckIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Challenge } from '@/types/challenge';
import { getChallenges } from '@/lib/challenges';

export default function Home() {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getRandomChallenge = (type: 'truth' | 'dare') => {
    setLoading(true);
    try {
      const challenges = getChallenges()
        .filter(c => c.difficulty === difficulty && c.type === type && c.approved);

      if (challenges.length > 0) {
        const randomIndex = Math.floor(Math.random() * challenges.length);
        setCurrentChallenge(challenges[randomIndex]);
      } else {
        toast({
          title: 'No challenges found',
          description: `No ${type} challenges available for ${difficulty} difficulty.`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error fetching challenge:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch challenge. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedDifficulty = localStorage.getItem('difficulty');
    if (savedDifficulty) {
      setDifficulty(savedDifficulty as 'easy' | 'medium' | 'hard');
    }
  }, []);

  const handleDifficultyChange = (newDifficulty: string) => {
    setDifficulty(newDifficulty as 'easy' | 'medium' | 'hard');
    localStorage.setItem('difficulty', newDifficulty);
    setCurrentChallenge(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Truth or Dare</h1>
            <p className="text-muted-foreground">
              Choose your difficulty and get ready for some fun!
            </p>
          </div>

          <Tabs value={difficulty} onValueChange={handleDifficultyChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="easy">Easy</TabsTrigger>
              <TabsTrigger value="medium">Medium</TabsTrigger>
              <TabsTrigger value="hard">Hard</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-2 gap-4">
            <Button
              size="lg"
              variant="outline"
              className="h-32"
              onClick={() => getRandomChallenge('truth')}
              disabled={loading}
            >
              <div className="flex flex-col items-center gap-2">
                <MessageCircleIcon className="h-8 w-8" />
                <span>Truth</span>
              </div>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-32"
              onClick={() => getRandomChallenge('dare')}
              disabled={loading}
            >
              <div className="flex flex-col items-center gap-2">
                <DiceIcon className="h-8 w-8" />
                <span>Dare</span>
              </div>
            </Button>
          </div>

          {currentChallenge && (
            <Card className="p-6 text-center">
              <h2 className="text-2xl font-semibold mb-2 capitalize">
                {currentChallenge.type}
              </h2>
              <p className="text-lg">{currentChallenge.content}</p>
            </Card>
          )}

          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.location.href = '/submit'}
            >
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              Submit New Challenge
            </Button>

            {/* ✅ Admin Panel Button
            <Button
              variant="outline"
              className="w-full bg-blue-500 text-white hover:bg-blue-600"
              onClick={() => window.location.href = '/admin'}
            >
              <ShieldCheckIcon className="mr-2 h-4 w-4" />
              Go to Admin Panel
            </Button> */}
          </div>
        </div>
      </main>
    </div>
  );
}
