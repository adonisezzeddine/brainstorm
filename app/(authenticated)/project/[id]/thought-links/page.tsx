"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Plus,
  Trash2,
  Edit2,
  X,
  Grid,
  List,
  SortAsc,
  SortDesc,
  Bot,
  Sparkles,
  FileText,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface ThoughtLink {
  id: string;
  title: string;
  url: string;
  description?: string;
  tags?: string[];
  created_at: string;
  project_id: string;
  user_id: string;
}

interface Project {
  id: string;
  topic: string;
  description?: string;
  updated_at: string;
}

type ViewMode = 'list' | 'grid';
type SortOrder = 'asc' | 'desc';
type SortBy = 'title' | 'created_at';

export default function ThoughtLinksPage() {
  const { data: session, status } = useSession();
  const params = useParams();
  const router = useRouter();
  const [thoughtLinks, setThoughtLinks] = useState<ThoughtLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewModal, setShowNewModal] = useState(false);
  const [newThoughtLink, setNewThoughtLink] = useState<Partial<ThoughtLink>>({
    title: "",
    url: "",
    description: "",
    tags: [],
  });
  const [editingLink, setEditingLink] = useState<ThoughtLink | null>(null);
  const [deletingLink, setDeletingLink] = useState<ThoughtLink | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortBy, setSortBy] = useState<SortBy>('created_at');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [showAIMenu, setShowAIMenu] = useState<string | null>(null);
  const [project, setProject] = useState<Project | null>(null);

  // Fetch thought links
  useEffect(() => {
    const fetchThoughtLinks = async () => {
      if (status === 'authenticated' && session?.user?.id && params.id) {
        try {
          const projectId = Array.isArray(params.id) ? params.id[0] : params.id;
          
          const { data, error } = await supabase
            .from('thought_links')
            .select('*')
            .eq('project_id', projectId)
            .eq('user_id', session.user.id)
            .order('created_at', { ascending: false });

          if (error) throw error;
          setThoughtLinks(data || []);
        } catch (error) {
          console.error('Error fetching thought links:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchThoughtLinks();
  }, [status, session, params.id]);

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      if (status === 'authenticated' && session?.user?.id && params.id) {
        try {
          const projectId = Array.isArray(params.id) ? params.id[0] : params.id;
          
          const { data, error } = await supabase
            .from('projects')
            .select('id, topic, description, updated_at')
            .eq('id', projectId)
            .eq('user_id', session.user.id)
            .single();

          if (error) throw error;
          setProject(data);
        } catch (error) {
          console.error('Error fetching project:', error);
        }
      }
    };

    fetchProject();
  }, [status, session, params.id]);

  // Handle authentication
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Add new thought link
  const addThoughtLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id || !params.id) return;

    try {
      const projectId = Array.isArray(params.id) ? params.id[0] : params.id;
      const newLink = {
        ...newThoughtLink,
        project_id: projectId,
        user_id: session.user.id,
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('thought_links')
        .insert(newLink)
        .select()
        .single();

      if (error) throw error;

      setThoughtLinks(prev => [data, ...prev]);
      setNewThoughtLink({ title: "", url: "", description: "", tags: [] });
      setShowNewModal(false);
    } catch (error) {
      console.error('Error adding thought link:', error);
      alert('Failed to add thought link');
    }
  };

  // Delete thought link
  const deleteThoughtLink = async (id: string) => {
    if (!session?.user?.id) return;

    try {
      const { error } = await supabase
        .from('thought_links')
        .delete()
        .eq('id', id)
        .eq('user_id', session.user.id);

      if (error) throw error;

      setThoughtLinks(prev => prev.filter(link => link.id !== id));
      setDeletingLink(null);
    } catch (error) {
      console.error('Error deleting thought link:', error);
      alert('Failed to delete thought link');
    }
  };

  // Update thought link
  const updateThoughtLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLink || !session?.user?.id) return;

    try {
      const { error } = await supabase
        .from('thought_links')
        .update({
          title: editingLink.title,
          url: editingLink.url,
          description: editingLink.description,
          tags: editingLink.tags,
        })
        .eq('id', editingLink.id)
        .eq('user_id', session.user.id);

      if (error) throw error;

      setThoughtLinks(prev =>
        prev.map(link =>
          link.id === editingLink.id ? editingLink : link
        )
      );
      setEditingLink(null);
    } catch (error) {
      console.error('Error updating thought link:', error);
      alert('Failed to update thought link');
    }
  };

  // Filter thought links based on search query
  const filteredLinks = thoughtLinks.filter(link =>
    link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading thought links...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href={`/project/${params.id}`}
                  className="flex items-center gap-2 p-2 hover:bg-accent/50 rounded-lg text-muted-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <h1 className="text-xl font-semibold">Thought Links</h1>
              </div>
              <button
                onClick={() => setShowNewModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Link</span>
              </button>
            </div>
            
            {/* Project Name */}
            <div className="mt-2">
              <h2 className="text-lg text-muted-foreground">
                {project?.topic}
              </h2>
            </div>

            {/* View Controls */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-accent text-primary'
                      : 'text-muted-foreground hover:bg-accent/50'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-accent text-primary'
                      : 'text-muted-foreground hover:bg-accent/50'
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <div className="h-4 w-px bg-border/50 mx-2" />
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-2 text-muted-foreground hover:bg-accent/50 rounded-lg transition-colors"
                  title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                >
                  {sortOrder === 'asc' ? (
                    <SortAsc className="w-4 h-4" />
                  ) : (
                    <SortDesc className="w-4 h-4" />
                  )}
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortBy)}
                  className="px-2 py-1 bg-background/40 border border-border/50 rounded-lg text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="created_at">Date</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search thought links..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background/40 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Thought Links List/Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
          {filteredLinks.map((link) => (
            <div
              key={link.id}
              className={`group p-4 bg-background/40 border border-border/50 rounded-lg hover:border-primary/50 transition-colors ${
                viewMode === 'grid' ? 'flex flex-col' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium truncate">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      {link.title}
                    </a>
                  </h3>
                  {link.description && (
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {link.description}
                    </p>
                  )}
                  {link.tags && link.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {link.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="relative">
                    <button
                      onClick={() => setShowAIMenu(showAIMenu === link.id ? null : link.id)}
                      className="p-2 text-muted-foreground hover:text-primary hover:bg-accent/50 rounded-lg transition-colors"
                      title="AI Actions"
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                    {showAIMenu === link.id && (
                      <div className="absolute left-full ml-2 w-64 min-w-[180px] max-w-[260px] bg-background/95 backdrop-blur-md border border-border/50 rounded-xl shadow-xl p-2 z-50 transition-all duration-150 ease-in-out animate-fade-in">
                        <div className="py-1">
                          <button
                            className="w-full px-4 py-2 text-left text-sm hover:bg-accent/50 transition-colors flex flex-nowrap items-center gap-2"
                            onClick={() => {/* TODO: Implement AI summary */}}
                          >
                            <Bot className="w-4 h-4" />
                            <span className="whitespace-nowrap truncate">Generate Summary</span>
                          </button>
                          <button
                            className="w-full px-4 py-2 text-left text-sm hover:bg-accent/50 transition-colors flex flex-nowrap items-center gap-2"
                            onClick={() => {/* TODO: Implement AI analysis */}}
                          >
                            <Sparkles className="w-4 h-4" />
                            <span className="whitespace-nowrap truncate">AI Analysis</span>
                          </button>
                          <button
                            className="w-full px-4 py-2 text-left text-sm hover:bg-accent/50 transition-colors flex flex-nowrap items-center gap-2"
                            onClick={() => {/* TODO: Implement add to notes */}}
                          >
                            <FileText className="w-4 h-4" />
                            <span className="whitespace-nowrap truncate">Add to Notes</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setEditingLink(link)}
                    className="p-2 text-muted-foreground hover:text-primary hover:bg-accent/50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeletingLink(link)}
                    className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Thought Link Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-background/95 to-background/90 backdrop-blur-xl rounded-2xl p-4 w-auto max-w-md mx-4 border border-border/50">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-bold">Add Thought Link</h2>
              <button
                onClick={() => setShowNewModal(false)}
                className="p-2 hover:bg-accent/50 rounded-lg text-muted-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={addThoughtLink} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={newThoughtLink.title}
                  onChange={(e) => setNewThoughtLink(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl bg-background/40 border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  URL
                </label>
                <input
                  type="url"
                  value={newThoughtLink.url}
                  onChange={(e) => setNewThoughtLink(prev => ({ ...prev, url: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl bg-background/40 border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter URL"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Description
                </label>
                <textarea
                  value={newThoughtLink.description}
                  onChange={(e) => setNewThoughtLink(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl bg-background/40 border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter description"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={newThoughtLink.tags?.join(', ')}
                  onChange={(e) => setNewThoughtLink(prev => ({
                    ...prev,
                    tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                  }))}
                  className="w-full px-4 py-2 rounded-xl bg-background/40 border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter tags"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 rounded-xl bg-background/40 text-muted-foreground hover:bg-accent/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary/80 transition-colors"
                >
                  Add Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Thought Link Modal */}
      {editingLink && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-background/95 to-background/90 backdrop-blur-xl rounded-2xl p-4 w-auto max-w-md mx-4 border border-border/50">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-bold">Edit Thought Link</h2>
              <button
                onClick={() => setEditingLink(null)}
                className="p-2 hover:bg-accent/50 rounded-lg text-muted-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={updateThoughtLink} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={editingLink.title}
                  onChange={(e) => setEditingLink(prev => prev ? { ...prev, title: e.target.value } : null)}
                  className="w-full px-4 py-2 rounded-xl bg-background/40 border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  URL
                </label>
                <input
                  type="url"
                  value={editingLink.url}
                  onChange={(e) => setEditingLink(prev => prev ? { ...prev, url: e.target.value } : null)}
                  className="w-full px-4 py-2 rounded-xl bg-background/40 border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter URL"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Description
                </label>
                <textarea
                  value={editingLink.description}
                  onChange={(e) => setEditingLink(prev => prev ? { ...prev, description: e.target.value } : null)}
                  className="w-full px-4 py-2 rounded-xl bg-background/40 border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter description"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={editingLink.tags?.join(', ')}
                  onChange={(e) => setEditingLink(prev => prev ? {
                    ...prev,
                    tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                  } : null)}
                  className="w-full px-4 py-2 rounded-xl bg-background/40 border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter tags"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingLink(null)}
                  className="px-4 py-2 rounded-xl bg-background/40 text-muted-foreground hover:bg-accent/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary/80 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingLink && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-background/95 to-background/90 backdrop-blur-xl rounded-2xl p-4 w-auto max-w-md mx-4 border border-border/50">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-bold">Delete Thought Link</h2>
              <button
                onClick={() => setDeletingLink(null)}
                className="p-2 hover:bg-accent/50 rounded-lg text-muted-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-red-500">Warning</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      This action cannot be undone. The thought link will be permanently deleted.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeletingLink(null)}
                  className="px-4 py-2 rounded-xl bg-background/40 text-muted-foreground hover:bg-accent/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteThoughtLink(deletingLink.id)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-colors"
                >
                  Delete Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 