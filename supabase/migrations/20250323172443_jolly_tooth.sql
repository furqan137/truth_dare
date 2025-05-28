/*
  # Truth or Dare Database Schema

  1. New Tables
    - `challenges`
      - `id` (uuid, primary key)
      - `type` (text, either 'truth' or 'dare')
      - `content` (text, the actual challenge)
      - `difficulty` (text, 'easy', 'medium', or 'hard')
      - `approved` (boolean, moderation status)
      - `created_at` (timestamp)
      - `user_id` (uuid, foreign key to auth.users)
    
  2. Security
    - Enable RLS on challenges table
    - Add policies for:
      - Anyone can read approved challenges
      - Authenticated users can create challenges
      - Only admins can update/delete challenges
*/

-- Create enum types
CREATE TYPE challenge_type AS ENUM ('truth', 'dare');
CREATE TYPE difficulty_level AS ENUM ('easy', 'medium', 'hard');

-- Create challenges table
CREATE TABLE IF NOT EXISTS challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type challenge_type NOT NULL,
  content text NOT NULL,
  difficulty difficulty_level NOT NULL,
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can read approved challenges"
  ON challenges
  FOR SELECT
  USING (approved = true);

CREATE POLICY "Authenticated users can create challenges"
  ON challenges
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update challenges"
  ON challenges
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.email IN ('admin@example.com') -- Replace with actual admin emails
  ));

CREATE POLICY "Admins can delete challenges"
  ON challenges
  FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.email IN ('admin@example.com') -- Replace with actual admin emails
  ));