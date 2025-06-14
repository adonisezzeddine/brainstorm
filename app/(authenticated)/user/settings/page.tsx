"use client";
import React, { useState, useEffect, useRef } from 'react';
import { User, Lock, Bell, Paintbrush, Shield, CreditCard, Loader2 } from 'lucide-react';
import { useSession } from "next-auth/react";
import { getSupabaseClient } from "@/lib/supabaseClient";

// Extend Session type to include accessToken
declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

const SECTIONS = [
  { key: 'profile', label: 'Profile', icon: <User className="w-5 h-5 mr-2" /> },
  { key: 'security', label: 'Security', icon: <Lock className="w-5 h-5 mr-2" /> },
  { key: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5 mr-2" /> },
  { key: 'appearance', label: 'Appearance', icon: <Paintbrush className="w-5 h-5 mr-2" /> },
  { key: 'privacy', label: 'Privacy', icon: <Shield className="w-5 h-5 mr-2" /> },
  { key: 'billing', label: 'Billing', icon: <CreditCard className="w-5 h-5 mr-2" /> },
];

function getInitials(name: string) {
  if (!name) return '';
  return name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
}

export default function UserSettingsPage() {
  const { data: session, status } = useSession();
  const [activeSection, setActiveSection] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState({ first_name: '', last_name: '', email: '', avatar_url: '' });
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const [settings, setSettings] = useState({
    theme: 'system',
    accent_color: '#6366f1',
    email_notifications: true,
    app_notifications: true,
    data_sharing: false,
  });
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsError, setSettingsError] = useState('');
  const [settingsSuccess, setSettingsSuccess] = useState('');

  // Get Supabase client with session
  const supabase = getSupabaseClient(session);

  // Debug logging
  useEffect(() => {
    if (session) {
      console.log('Session:', {
        user: session.user,
        id: session.user?.id,
        accessToken: session.accessToken
      });
    }
  }, [session]);

  // Fetch user data and settings on mount
  useEffect(() => {
    async function fetchUser() {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        // Fetch profile
        const { data, error: profileError } = await supabase
          .from('profiles')
          .select('first_name, last_name, avatar_url')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error('Profile fetch error:', profileError);
          
          // If no profile exists, create one
          if (profileError.code === 'PGRST116') {
            const { error: insertError } = await supabase
              .from('profiles')
              .insert({
                id: session.user.id,
                first_name: session.user.name?.split(' ')[0] || '',
                last_name: session.user.name?.split(' ').slice(1).join(' ') || ''
              });

            if (insertError) {
              console.error('Failed to create profile:', insertError);
              setError('Failed to create user profile');
              setLoading(false);
              return;
            }

            // Fetch the newly created profile
            const { data: newProfile, error: newProfileError } = await supabase
              .from('profiles')
              .select('first_name, last_name, avatar_url')
              .eq('id', session.user.id)
              .single();

            if (newProfileError) {
              console.error('Failed to fetch new profile:', newProfileError);
              setError('Failed to fetch user profile');
              setLoading(false);
              return;
            }

            if (newProfile) {
              setUser(newProfile);
              setFirstName(newProfile.first_name || '');
              setLastName(newProfile.last_name || '');
              setAvatarPreview(newProfile.avatar_url || '');
            }
          } else {
            setError('Failed to fetch user profile');
            setLoading(false);
            return;
          }
        } else if (data) {
          setUser(data);
          setFirstName(data.first_name || '');
          setLastName(data.last_name || '');
          setAvatarPreview(data.avatar_url || '');
        }

        setLoading(false);
      } catch (err) {
        console.error('Error in fetchUser:', err);
        setError('An unexpected error occurred');
        setLoading(false);
      }
    }

    if (status === 'authenticated') {
      fetchUser();
    }
  }, [session, status, supabase]);

  // Handle avatar file change
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  // Handle save profile
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return;
    setSaving(true);
    setError('');
    setSuccess('');
    let avatar_url = user.avatar_url;
    if (avatarFile) {
      const fileExt = avatarFile.name.split('.').pop();
      const safeEmail = session.user.email || '';
      const filePath = `avatars/${safeEmail.replace(/[^a-zA-Z0-9]/g, '')}_${Date.now()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage.from('avatars').upload(filePath, avatarFile, { upsert: true });
      if (uploadError) {
        setError('Failed to upload avatar');
        setSaving(false);
        return;
      }
      avatar_url = supabase.storage.from('avatars').getPublicUrl(filePath).data.publicUrl;
    }
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ first_name: firstName, last_name: lastName, avatar_url })
      .eq('id', session.user.id);
    if (updateError) {
      setError('Failed to update profile');
      setSaving(false);
      return;
    }
    setUser(prev => ({ ...prev, first_name: firstName, last_name: lastName, avatar_url }));
    setSuccess('Profile updated!');
    setSaving(false);
    setAvatarFile(null);
  };

  // Save user settings
  const handleSettingsSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return;
    setSettingsSaving(true);
    setSettingsError('');
    setSettingsSuccess('');
    const { error } = await supabase
      .from('user_settings')
      .update(settings)
      .eq('user_id', session.user.id);
    if (error) {
      setSettingsError('Failed to update settings');
      setSettingsSaving(false);
      return;
    }
    setSettingsSuccess('Settings updated!');
    setSettingsSaving(false);
  };

  if (status === 'loading' || !session?.user?.id) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
        <span className="ml-4 text-[var(--muted-foreground)]">Loading user session...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[var(--background)]">
      {/* Sidebar */}
      <aside className="w-72 border-r border-border/50 bg-[var(--background)]/95 dark:bg-[var(--background)]/90 p-6 flex flex-col gap-6">
        {/* User Info */}
        <div className="flex flex-col items-center gap-2 pb-6 border-b border-border/30">
          {loading ? (
            <div className="w-16 h-16 rounded-full bg-[var(--muted)] animate-pulse" />
          ) : user.avatar_url || avatarPreview ? (
            <img src={avatarPreview || user.avatar_url} alt="avatar" className="w-16 h-16 rounded-full border-2 border-[var(--primary)] shadow" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-2xl font-bold text-[var(--primary)]">
              {getInitials(user.first_name)}
            </div>
          )}
          <div className="text-base font-semibold text-[var(--foreground)]">{loading ? <span className="bg-[var(--muted)] rounded w-24 h-4 inline-block animate-pulse" /> : user.first_name}</div>
          <div className="text-xs text-[var(--muted-foreground)]">{loading ? <span className="bg-[var(--muted)] rounded w-32 h-3 inline-block animate-pulse" /> : session.user.email}</div>
        </div>
        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {SECTIONS.map(section => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`flex items-center px-4 py-2 rounded-lg transition-all font-medium group text-left gap-2
                ${activeSection === section.key
                  ? 'bg-[var(--primary)]/10 text-[var(--primary)] shadow-sm'
                  : 'text-[var(--muted-foreground)] hover:bg-[var(--accent)]/50 hover:text-[var(--foreground)]'}
              `}
            >
              {section.icon}
              {section.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col items-center bg-[var(--background)]/80">
        <div className="w-full max-w-2xl bg-[var(--background)] rounded-2xl shadow-lg p-10 border border-border/50">
          {activeSection === 'profile' && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Profile</h3>
              {loading ? (
                <div className="space-y-6 animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[var(--muted)]" />
                    <div className="flex-1 h-8 bg-[var(--muted)] rounded" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-8 bg-[var(--muted)] rounded" />
                    <div className="h-8 bg-[var(--muted)] rounded" />
                  </div>
                  <div className="flex justify-end">
                    <div className="w-24 h-8 bg-[var(--muted)] rounded" />
                  </div>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSave}>
                  <div className="flex items-center gap-4">
                    {user.avatar_url || avatarPreview ? (
                      <img src={avatarPreview || user.avatar_url} alt="avatar" className="w-14 h-14 rounded-full border border-border/50" />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-xl font-bold text-[var(--primary)]">
                        {getInitials(firstName || user.first_name)}
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium mb-1">Change Avatar</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="block w-full text-xs"
                        ref={fileInputRef}
                        onChange={handleAvatarChange}
                        disabled={saving}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">First Name (Username)</label>
                      <input
                        className="w-full px-4 py-2 rounded-lg border border-border/50 bg-[var(--background)]/40"
                        placeholder="First name"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        disabled={saving}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Last Name</label>
                      <input
                        className="w-full px-4 py-2 rounded-lg border border-border/50 bg-[var(--background)]/40"
                        placeholder="Last name"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        disabled={saving}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      className="w-full px-4 py-2 rounded-lg border border-border/50 bg-[var(--background)]/40"
                      placeholder="Your email"
                      value={session.user.email || ''}
                      disabled
                    />
                  </div>
                  {error && <div className="text-red-500 text-sm">{error}</div>}
                  {success && <div className="text-green-600 text-sm">{success}</div>}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-lg bg-[var(--primary)] text-[var(--foreground)] font-medium hover:bg-[var(--primary)]/90 transition-colors flex items-center gap-2"
                      disabled={saving}
                    >
                      {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                      Save
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
          {activeSection === 'security' && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Security</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Change Password</label>
                    <input type="password" className="w-full px-4 py-2 rounded-lg border border-border/50 bg-[var(--background)]/40" placeholder="New password" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Two-Factor Authentication</label>
                    <button className="px-4 py-2 rounded-lg bg-[var(--accent)] text-[var(--foreground)] font-medium hover:bg-[var(--accent)]/80 transition-colors">Enable 2FA</button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="px-6 py-2 rounded-lg bg-[var(--primary)] text-[var(--foreground)] font-medium hover:bg-[var(--primary)]/90 transition-colors">Save</button>
                </div>
              </form>
            </div>
          )}
          {activeSection === 'notifications' && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Notifications</h3>
              {settingsLoading ? (
                <div className="space-y-6 animate-pulse">
                  <div className="h-12 bg-[var(--muted)] rounded" />
                  <div className="h-12 bg-[var(--muted)] rounded" />
                  <div className="flex justify-end"><div className="w-24 h-8 bg-[var(--muted)] rounded" /></div>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSettingsSave}>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-[var(--background)]/40">
                    <div>
                      <div className="font-medium">Email Notifications</div>
                      <div className="text-xs text-[var(--muted-foreground)]">Get important updates and news by email.</div>
                    </div>
                    <input
                      type="checkbox"
                      className="accent-[var(--primary)] w-5 h-5"
                      checked={settings.email_notifications}
                      onChange={e => setSettings(s => ({ ...s, email_notifications: e.target.checked }))}
                      disabled={settingsSaving}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-[var(--background)]/40">
                    <div>
                      <div className="font-medium">App Notifications</div>
                      <div className="text-xs text-[var(--muted-foreground)]">Receive notifications in the app.</div>
                    </div>
                    <input
                      type="checkbox"
                      className="accent-[var(--primary)] w-5 h-5"
                      checked={settings.app_notifications}
                      onChange={e => setSettings(s => ({ ...s, app_notifications: e.target.checked }))}
                      disabled={settingsSaving}
                    />
                  </div>
                  {settingsError && <div className="text-red-500 text-sm">{settingsError}</div>}
                  {settingsSuccess && <div className="text-green-600 text-sm">{settingsSuccess}</div>}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-lg bg-[var(--primary)] text-[var(--foreground)] font-medium hover:bg-[var(--primary)]/90 transition-colors flex items-center gap-2"
                      disabled={settingsSaving}
                    >
                      {settingsSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                      Save
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
          {activeSection === 'appearance' && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Appearance</h3>
              {settingsLoading ? (
                <div className="space-y-6 animate-pulse">
                  <div className="h-12 bg-[var(--muted)] rounded" />
                  <div className="flex justify-end"><div className="w-24 h-8 bg-[var(--muted)] rounded" /></div>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSettingsSave}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">Theme</label>
                      <select
                        className="w-full px-4 py-2 rounded-lg border border-border/50 bg-[var(--background)]/40"
                        value={settings.theme}
                        onChange={e => setSettings(s => ({ ...s, theme: e.target.value }))}
                        disabled={settingsSaving}
                      >
                        <option value="system">System</option>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Accent Color</label>
                      <input
                        type="color"
                        className="w-12 h-8 p-0 border border-border/50 rounded-lg"
                        value={settings.accent_color}
                        onChange={e => setSettings(s => ({ ...s, accent_color: e.target.value }))}
                        disabled={settingsSaving}
                      />
                    </div>
                  </div>
                  {settingsError && <div className="text-red-500 text-sm">{settingsError}</div>}
                  {settingsSuccess && <div className="text-green-600 text-sm">{settingsSuccess}</div>}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-lg bg-[var(--primary)] text-[var(--foreground)] font-medium hover:bg-[var(--primary)]/90 transition-colors flex items-center gap-2"
                      disabled={settingsSaving}
                    >
                      {settingsSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                      Save
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
          {activeSection === 'privacy' && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Privacy</h3>
              {settingsLoading ? (
                <div className="space-y-6 animate-pulse">
                  <div className="h-12 bg-[var(--muted)] rounded" />
                  <div className="flex gap-4 mt-4"><div className="flex-1 h-8 bg-[var(--muted)] rounded" /><div className="flex-1 h-8 bg-[var(--muted)] rounded" /></div>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSettingsSave}>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-[var(--background)]/40">
                    <div>
                      <div className="font-medium">Allow data sharing for product improvement</div>
                      <div className="text-xs text-[var(--muted-foreground)]">Help us improve by sharing anonymous usage data.</div>
                    </div>
                    <input
                      type="checkbox"
                      className="accent-[var(--primary)] w-5 h-5"
                      checked={settings.data_sharing}
                      onChange={e => setSettings(s => ({ ...s, data_sharing: e.target.checked }))}
                      disabled={settingsSaving}
                    />
                  </div>
                  {settingsError && <div className="text-red-500 text-sm">{settingsError}</div>}
                  {settingsSuccess && <div className="text-green-600 text-sm">{settingsSuccess}</div>}
                  <div className="flex gap-4 mt-4">
                    <button className="flex-1 px-4 py-2 rounded-lg bg-[var(--destructive)] text-[var(--foreground)] font-medium hover:bg-[var(--destructive)]/80 transition-colors" type="button">Export Data</button>
                    <button className="flex-1 px-4 py-2 rounded-lg bg-[var(--destructive)] text-[var(--foreground)] font-medium hover:bg-[var(--destructive)]/80 transition-colors" type="button">Delete Account</button>
                  </div>
                </form>
              )}
            </div>
          )}
          {activeSection === 'billing' && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Billing</h3>
              <div className="text-[var(--muted-foreground)]">Billing and subscription management coming soon.</div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 