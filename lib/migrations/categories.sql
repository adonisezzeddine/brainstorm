-- Drop existing policies and table if they exist
DROP POLICY IF EXISTS "Enable read access for users to their own categories" ON categories;
DROP POLICY IF EXISTS "Enable insert access for users to their own categories" ON categories;
DROP POLICY IF EXISTS "Enable update access for users to their own categories" ON categories;
DROP POLICY IF EXISTS "Enable delete access for users to their own categories" ON categories;
DROP POLICY IF EXISTS "categories_policy" ON categories;
DROP TABLE IF EXISTS categories;

-- Create categories table
CREATE TABLE categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    color TEXT NOT NULL,
    user_id TEXT NOT NULL, -- Changed to TEXT to match NextAuth user IDs
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(name, user_id)
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create a single policy for all operations
CREATE POLICY "categories_policy"
ON categories
FOR ALL
USING (user_id = current_setting('app.current_user_id', true))
WITH CHECK (user_id = current_setting('app.current_user_id', true));

-- Create function to set current user
CREATE OR REPLACE FUNCTION set_current_user_id()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM set_config('app.current_user_id', NEW.user_id, false);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to set current user
CREATE TRIGGER set_user_id_trigger
    BEFORE INSERT OR UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION set_current_user_id();

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at(); 