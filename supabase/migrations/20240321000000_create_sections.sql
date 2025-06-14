-- Create sections table
create table if not exists sections (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text,
  section_order integer not null,
  project_id uuid not null references projects(id) on delete cascade,
  user_id uuid not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table sections enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Users can view their own sections" on sections;
drop policy if exists "Users can insert their own sections" on sections;
drop policy if exists "Users can update their own sections" on sections;
drop policy if exists "Users can delete their own sections" on sections;

-- Create policy to allow users to see only their own sections
create policy "Users can view their own sections"
  on sections for select
  using (user_id::text = current_setting('app.current_user_id', true));

-- Create policy to allow users to insert their own sections
create policy "Users can insert their own sections"
  on sections for insert
  with check (user_id::text = current_setting('app.current_user_id', true));

-- Create policy to allow users to update their own sections
create policy "Users can update their own sections"
  on sections for update
  using (user_id::text = current_setting('app.current_user_id', true));

-- Create policy to allow users to delete their own sections
create policy "Users can delete their own sections"
  on sections for delete
  using (user_id::text = current_setting('app.current_user_id', true));

-- Create trigger for updated_at
create trigger set_sections_updated_at
  before update on sections
  for each row
  execute function handle_updated_at();

-- Create trigger to set current user
create trigger set_sections_user_id_trigger
  before insert or update on sections
  for each row
  execute function set_current_user_id(); 