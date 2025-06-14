-- Drop existing policies and tables if they exist
DROP POLICY IF EXISTS "Enable read access for users to their own categories" ON categories;
DROP POLICY IF EXISTS "Enable insert access for users to their own categories" ON categories;
DROP POLICY IF EXISTS "Enable update access for users to their own categories" ON categories;
DROP POLICY IF EXISTS "Enable delete access for users to their own categories" ON categories;

-- Create categories table if it doesn't exist
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    color TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(name, user_id)
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for users to their own categories"
ON categories FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Enable insert access for users to their own categories"
ON categories FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update access for users to their own categories"
ON categories FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable delete access for users to their own categories"
ON categories FOR DELETE
USING (auth.uid() = user_id);

-- Create function to handle updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS set_updated_at ON categories;
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at(); 