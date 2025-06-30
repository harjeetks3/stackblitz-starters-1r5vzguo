/*
  # Create Files Table for Document Storage

  1. New Tables
    - `files` - Store file metadata for uploaded documents
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `file_path` (text, unique)
      - `file_name` (text)
      - `file_size` (bigint)
      - `mime_type` (text)
      - `linked_entity` (text)
      - `linked_id` (uuid)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on files table
    - Add policies for authenticated users to manage their own file metadata

  3. Indexes
    - Add index for user_id for faster lookups
    - Add index for linked_entity and linked_id for faster lookups
*/

-- Create files table for storing file metadata
CREATE TABLE IF NOT EXISTS files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  file_path text NOT NULL UNIQUE, -- Full path in Supabase Storage (e.g., documents/<USER_ID>/<UUID>-<originalFileName>)
  file_name text NOT NULL,
  file_size bigint, -- Size in bytes
  mime_type text,
  linked_entity text, -- e.g., 'tender_doc', 'company_cert', 'proposal_draft', 'key_personnel_cv'
  linked_id uuid, -- ID of the associated entity (e.g., tender_id, certification_id, proposal_id, personnel_id)
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security for files table
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- Policy to allow authenticated users to read their own file metadata
CREATE POLICY "Users can read own file metadata"
  ON files
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy to allow authenticated users to insert their own file metadata
CREATE POLICY "Users can insert own file metadata"
  ON files
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow authenticated users to update their own file metadata
CREATE POLICY "Users can update own file metadata"
  ON files
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow authenticated users to delete their own file metadata
CREATE POLICY "Users can delete own file metadata"
  ON files
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Index for user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_files_user_id ON files(user_id);

-- Index for linked_entity and linked_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_files_linked_entity_id ON files(linked_entity, linked_id);

-- Trigger to update updated_at column
CREATE TRIGGER update_files_updated_at BEFORE UPDATE ON files FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();