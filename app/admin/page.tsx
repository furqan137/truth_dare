'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { CheckIcon, XIcon } from 'lucide-react';
import { Challenge } from '@/types/challenge';
import { getChallenges, approveChallenge, deleteChallenge } from '@/lib/challenges';

export default function AdminPanel() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchChallenges = () => {
    try {
      const allChallenges = getChallenges();
      setChallenges(allChallenges);
    } catch (error) {
      console.error('Error fetching challenges:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch challenges',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  const handleApprove = (id: string) => {
    try {
      approveChallenge(id);
      toast({
        title: 'Success',
        description: 'Challenge approved',
      });
      fetchChallenges();
    } catch (error) {
      console.error('Error approving challenge:', error);
      toast({
        title: 'Error',
        description: 'Failed to approve challenge',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = (id: string) => {
    try {
      deleteChallenge(id);
      toast({
        title: 'Success',
        description: 'Challenge deleted',
      });
      fetchChallenges();
    } catch (error) {
      console.error('Error deleting challenge:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete challenge',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">Admin Panel</h1>
            <p className="text-muted-foreground mt-2">
              Manage and moderate challenges
            </p>
          </div>

          <Card className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {challenges.map((challenge) => (
                  <TableRow key={challenge.id}>
                    <TableCell className="capitalize">{challenge.type}</TableCell>
                    <TableCell>{challenge.content}</TableCell>
                    <TableCell className="capitalize">
                      {challenge.difficulty}
                    </TableCell>
                    <TableCell>
                      {challenge.approved ? (
                        <span className="text-green-600">Approved</span>
                      ) : (
                        <span className="text-yellow-600">Pending</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {!challenge.approved && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleApprove(challenge.id)}
                          >
                            <CheckIcon className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(challenge.id)}
                        >
                          <XIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>
    </div>
  );
}