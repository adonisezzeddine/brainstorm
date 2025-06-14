-- Create categories table
create table if not exists categories (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid not null, -- Changed to UUID to match NextAuth user IDs
  name text not null,
  color text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(name, user_id)
);

-- Enable Row Level Security
alter table categories enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Users can view their own categories" on categories;
drop policy if exists "Users can insert their own categories" on categories;
drop policy if exists "Users can update their own categories" on categories;
drop policy if exists "Users can delete their own categories" on categories;

-- Create policy to allow users to see only their own categories
create policy "Users can view their own categories"
  on categories for select
  using (user_id::text = current_setting('app.current_user_id', true));

-- Create policy to allow users to insert their own categories
create policy "Users can insert their own categories"
  on categories for insert
  with check (user_id::text = current_setting('app.current_user_id', true));

-- Create policy to allow users to update their own categories
create policy "Users can update their own categories"
  on categories for update
  using (user_id::text = current_setting('app.current_user_id', true));

-- Create policy to allow users to delete their own categories
create policy "Users can delete their own categories"
  on categories for delete
  using (user_id::text = current_setting('app.current_user_id', true));

-- Drop existing function and trigger if they exist
drop trigger if exists category_upsert_trigger on categories;
drop function if exists handle_category_upsert();
drop trigger if exists set_user_id_trigger on categories;
drop function if exists set_current_user_id();

-- Create function to handle category upserts
create or replace function handle_category_upsert()
returns trigger as $$
begin
  -- If a category with the same name and user_id exists, update it
  if exists (
    select 1 from categories
    where name = NEW.name
    and user_id = NEW.user_id
    and id != NEW.id
  ) then
    update categories
    set color = NEW.color,
        updated_at = now()
    where name = NEW.name
    and user_id = NEW.user_id;
    return null;
  end if;
  return NEW;
end;
$$ language plpgsql;

-- Create trigger for category upserts
create trigger category_upsert_trigger
before insert on categories
for each row
execute function handle_category_upsert();

-- Create function to set current user ID
create or replace function set_current_user_id()
returns trigger as $$
begin
  perform set_config('app.current_user_id', NEW.user_id::text, false);
  return NEW;
end;
$$ language plpgsql security definer;

-- Create trigger to set current user
create trigger set_user_id_trigger
  before insert or update on categories
  for each row
  execute function set_current_user_id(); 