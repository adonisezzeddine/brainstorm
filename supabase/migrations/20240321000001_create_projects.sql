-- Create projects table
create table if not exists projects (
  id uuid default uuid_generate_v4() primary key,
  topic text not null,
  description text,
  notes text,
  ai_chat_history jsonb default '[]'::jsonb,
  bookmarks jsonb default '[]'::jsonb,
  user_id uuid not null,
  category text,
  tags text[],
  is_favorite boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table projects enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Users can view their own projects" on projects;
drop policy if exists "Users can insert their own projects" on projects;
drop policy if exists "Users can update their own projects" on projects;
drop policy if exists "Users can delete their own projects" on projects;

-- Create policy to allow users to see only their own projects
create policy "Users can view their own projects"
  on projects for select
  using (user_id::text = current_setting('app.current_user_id', true));

-- Create policy to allow users to insert their own projects
create policy "Users can insert their own projects"
  on projects for insert
  with check (user_id::text = current_setting('app.current_user_id', true));

-- Create policy to allow users to update their own projects
create policy "Users can update their own projects"
  on projects for update
  using (user_id::text = current_setting('app.current_user_id', true));

-- Create policy to allow users to delete their own projects
create policy "Users can delete their own projects"
  on projects for delete
  using (user_id::text = current_setting('app.current_user_id', true));

-- Create trigger for updated_at
create trigger set_projects_updated_at
  before update on projects
  for each row
  execute function handle_updated_at();

-- Create trigger to set current user
create trigger set_projects_user_id_trigger
  before insert or update on projects
  for each row
  execute function set_current_user_id(); 