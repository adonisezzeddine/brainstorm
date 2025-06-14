"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { createClient } from '@supabase/supabase-js';
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  FileText,
  Bookmark,
  MessageSquare,
  Search,
  Filter,
  Table,
  List,
  Heading1,
  Heading2,
  Bold,
  Italic,
  Underline,
  ListOrdered,
  ListChecks,
  Quote,
  Code,
  Image,
  Link as LinkIcon,
  FileUp,
  Download,
  Share2,
  Star,
  Tag,
  Folder,
  Clock,
  MoreVertical,
  Edit2,
  X,
  Bot,
  PlusCircle,
  Archive,
  ArrowRight,
  Lightbulb,
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useState as useReactState } from "react";
import type { Editor } from '@tiptap/core';
import AIChatModal from '@/components/AIChatModal';
import { setCurrentUserId } from "@/lib/supabaseClient";
import { supabase } from "@/lib/supabaseClient";
import { ThoughtLinks } from '@/components/ThoughtLinks';
import { PortalMenu } from '@/components/PortalMenu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { EditorToolbar } from '@/components/EditorToolbar';
import ExportMenu from '@/components/ExportMenu';

// Import TipTap editor components
const TipTapEditor = dynamic(() => import("@/components/TipTapEditor"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

interface Section {
  id: string;
  title: string;
  content: string;
  section_order: number;
  project_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

type Project = {
  id: string;
  topic: string;
  description?: string;
  notes: string;
  sections: Section[];
  bookmarks: Bookmark[];
  ai_chat_history: string[];
  updated_at: string;
  category?: string;
  tags?: string[];
  is_favorite?: boolean;
};

type Bookmark = {
  title: string;
  url: string;
  description?: string;
  tags?: string[];
  created_at: string;
};

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

export default function ProjectPage() {
  const { data: session, status } = useSession();
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [showNewSectionModal, setShowNewSectionModal] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showBookmarkModal, setShowBookmarkModal] = useState(false);
  const [newBookmark, setNewBookmark] = useState<Bookmark>({
    title: "",
    url: "",
    description: "",
    tags: [],
    created_at: new Date().toISOString(),
  });
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [showAIChat, setShowAIChat] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [editSectionTitle, setEditSectionTitle] = useState("");
  const [deletingSection, setDeletingSection] = useState<Section | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [thoughtLinks, setThoughtLinks] = useState<ThoughtLink[]>([]);
  const [isThoughtLinksExpanded, setIsThoughtLinksExpanded] = useState(true);
  const [showAIMenu, setShowAIMenu] = useState<string | null>(null);
  const [aiMenuPosition, setAIMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const aiMenuButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [editorInstance, setEditorInstance] = useReactState<Editor | null>(null);

  // Simple callbacks that don't depend on functions defined later
  const handleCloseAIChat = useCallback(() => {
    setShowAIChat(false);
  }, []);

  const handleOpenAIChat = useCallback(() => {
    setShowAIChat(true);
  }, []);

  console.log('Session:', session);

  // Supabase initialization
  useEffect(() => {
    if (session?.supabaseAccessToken) {
      console.log('Setting Supabase session in project detail page');
      supabase.auth.setSession({
        access_token: session.supabaseAccessToken,
        refresh_token: session.supabaseRefreshToken,
      });
    }
  }, [session]);

  // Fetch project data - separated for clarity
  useEffect(() => {
    const fetchProjectData = async () => {
      if (status === 'authenticated' && session?.user?.id && params.id) {
        setLoading(true);
        try {
          console.log('Fetching project data for:', params.id);
          
          // Ensure user ID is set for RLS
          await supabase.rpc('set_current_user_id', { user_id: session.user.id });
          
          // Get project ID as string
          const projectId = Array.isArray(params.id) ? params.id[0] : params.id;
          
          // Fetch the project
          const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', projectId)
            .eq('user_id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching project:', error);
            setLoading(false);
            return;
          }
          
          if (!data) {
            console.log('No project found with ID:', projectId);
            setLoading(false);
            return;
          }
          
          console.log('Project fetched successfully:', data.topic);
          setProject(data);
          
          // Now fetch sections
          await fetchProjectSections(projectId, session.user.id);
        } catch (e) {
          console.error('Error in fetchProjectData:', e);
          setLoading(false);
        }
      }
    };
    
    fetchProjectData();
  }, [status, session, params.id]);
  
  // Separate function to fetch project sections
  const fetchProjectSections = async (projectId: string, userId: string) => {
    try {
      const { data: sectionsData, error: sectionsError } = await supabase
        .from('sections')
        .select('*')
        .eq('project_id', projectId)
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

      if (sectionsError) {
        console.error('Error fetching sections:', sectionsError);
        setLoading(false);
        return;
      }

      console.log('Sections fetched successfully:', sectionsData?.length || 0);
      const typedSections = (sectionsData || []) as unknown as Section[];
      setSections(typedSections);
      
      if (typedSections.length > 0) {
        setSelectedSection(typedSections[0].id);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error in fetchProjectSections:', error);
      setLoading(false);
    }
  };

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
        }
      }
    };

    fetchThoughtLinks();
  }, [status, session, params.id]);

  // Handle authentication status separately
  useEffect(() => {
    if (status === 'unauthenticated') {
      console.log('User is not authenticated, redirecting to login...');
      router.push('/login');
    }
  }, [status, router]);

  // Separate effect for handling section selection
  useEffect(() => {
    if (sections.length > 0 && !selectedSection) {
      setSelectedSection(sections[0].id);
    }
  }, [sections, selectedSection]);

  // After switching sections
  useEffect(() => {
    if (selectedSection) {
      console.log(`Selected section changed to: ${selectedSection}`);
      console.log(`This section's content:`, sections.find(s => s.id === selectedSection)?.content);
    }
  }, [selectedSection, sections]);

  // Create new section
  const createSection = async () => {
    if (!session?.user?.id) {
      console.error('No user session found');
      return;
    }

    try {
      console.log('Creating new section:', {
        projectId: params.id,
        userId: session.user.id,
        sectionOrder: sections.length
      });

      const newSection = {
        title: `Section ${sections.length + 1}`,
        content: '',
        section_order: sections.length,
        project_id: params.id,
        user_id: session.user.id,
      };
      
      const { data, error } = await supabase
        .from('sections')
        .insert(newSection)
        .select()
        .single();

      if (error) {
        console.error('Error creating section:', {
          error,
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      if (!data) {
        throw new Error('No data returned from section creation');
      }

      console.log('Successfully created section:', data);

      // Also update the project's updated_at timestamp
      if (project?.id) {
        const now = new Date().toISOString();
        const { error: projectError } = await supabase
          .from('projects')
          .update({ updated_at: now })
          .eq('id', project.id)
          .eq('user_id', session.user.id);

        if (projectError) {
          console.error('Error updating project timestamp:', projectError);
          // Non-blocking - we'll continue even if this fails
        } else {
          console.log(`Updated project ${project.id} timestamp to ${now}`);
          // Update local project state
          setProject(prev => prev ? { ...prev, updated_at: now } : null);
        }
      }

      const typedData = data as unknown as Section;
      setSections(prevSections => [...prevSections, typedData]);
      setSelectedSection(typedData.id);
    } catch (error) {
      console.error('Error in createSection:', error);
      alert(`Failed to create section: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Update section content
  const updateSectionContent = async (sectionId: string, content: string) => {
    if (!session?.user?.id) return;

    try {
      console.log('Updating section content:', {
        sectionId,
        contentLength: content.length,
        userId: session.user.id
      });

      // Update the section content
      const { error: sectionError } = await supabase
        .from('sections')
        .update({ 
          content,
          updated_at: new Date().toISOString()
        })
        .eq('id', sectionId)
        .eq('user_id', session.user.id);

      if (sectionError) {
        console.error('Error updating section content:', sectionError);
        return;
      }

      console.log('Section content updated successfully');

      // Also update the project's updated_at timestamp
      if (project?.id) {
        const now = new Date().toISOString();
        const { error: projectError } = await supabase
          .from('projects')
          .update({ updated_at: now })
          .eq('id', project.id)
          .eq('user_id', session.user.id);

        if (projectError) {
          console.error('Error updating project timestamp:', projectError);
          // Non-blocking - we'll continue even if this fails
        } else {
          console.log(`Updated project ${project.id} timestamp to ${now}`);
          // Update local project state
          setProject(prev => prev ? { ...prev, updated_at: now } : null);
        }
      }

      // Update the local sections state
      setSections(prevSections => 
        prevSections.map(section => 
          section.id === sectionId 
            ? { ...section, content, updated_at: new Date().toISOString() } 
            : section
        )
      );
    } catch (error) {
      console.error('Error in updateSectionContent:', error);
    }
  };

  // Define callbacks that depend on functions defined above
  const handleContentChange = useCallback((content: string) => {
    if (!selectedSection) return;
    console.log(`Updating section ${selectedSection} with content length ${content.length}`);
    updateSectionContent(selectedSection, content);
  }, [selectedSection, session?.user?.id, project]);

  // Add bookmark
  const addBookmark = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project || !newBookmark.title.trim() || !newBookmark.url.trim()) return;

    try {
      const updatedBookmarks = [...(project.bookmarks || []), newBookmark];
      const { error } = await supabase
        .from("projects")
        .update({ bookmarks: updatedBookmarks })
        .eq("id", project.id);

      if (error) throw error;

      setProject({ ...project, bookmarks: updatedBookmarks });
      setNewBookmark({
        title: "",
        url: "",
        description: "",
        tags: [],
        created_at: new Date().toISOString(),
      });
      setShowBookmarkModal(false);
    } catch (error) {
      console.error("Error adding bookmark:", error);
      alert("Error adding bookmark. Please try again.");
    }
  };

  // Delete section
  const deleteSection = async (sectionId: string) => {
    if (!project) return;

    try {
      console.log('Deleting section:', sectionId);

      // First delete from the sections table
      const { error: deleteError } = await supabase
        .from('sections')
        .delete()
        .eq('id', sectionId)
        .eq('project_id', project.id);

      if (deleteError) {
        console.error('Error deleting section:', deleteError);
        throw deleteError;
      }

      // Also update the project's updated_at timestamp
      const now = new Date().toISOString();
      const { error: projectError } = await supabase
        .from('projects')
        .update({ updated_at: now })
        .eq('id', project.id)
        .eq('user_id', session?.user?.id || '');

      if (projectError) {
        console.error('Error updating project timestamp:', projectError);
        // Non-blocking - we'll continue even if this fails
      } else {
        console.log(`Updated project ${project.id} timestamp to ${now}`);
        // Update local project state
        setProject(prev => prev ? { ...prev, updated_at: now } : null);
      }

      // Update local state
      const updatedSections = sections.filter((s) => s.id !== sectionId);
      setSections(updatedSections);

      // If the deleted section was selected, select another section
      if (selectedSection === sectionId) {
        setSelectedSection(updatedSections[0]?.id || null);
      }

      // Close the delete modal
      setDeletingSection(null);

      console.log('Section deleted successfully');
    } catch (error) {
      console.error('Error deleting section:', error);
      alert("Error deleting section. Please try again.");
    }
  };

  // Update section title
  const updateSectionTitle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSection || !editSectionTitle.trim()) return;

    try {
      const { error } = await supabase
        .from('sections')
        .update({ 
          title: editSectionTitle.trim(),
          updated_at: new Date().toISOString()
        })
        .eq('id', editingSection.id)
        .eq('user_id', session?.user?.id);

      if (error) throw error;

      // Update local state
      setSections(prevSections => 
        prevSections.map(section =>
          section.id === editingSection.id
            ? { ...section, title: editSectionTitle.trim(), updated_at: new Date().toISOString() }
            : section
        )
      );

      // Close modal and reset state
      setEditingSection(null);
      setEditSectionTitle("");
    } catch (error) {
      console.error('Error updating section title:', error);
      alert('Failed to update section title');
    }
  };

  // Show loading state while session is being checked
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading session...</p>
        </div>
      </div>
    );
  }

  // Show loading state while project is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-6">
        <div className="p-6 bg-gradient-to-br from-red-500/20 to-red-500/10 rounded-2xl">
          <X className="w-16 h-16 text-red-500/50" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-xl font-medium">Project Not Found</p>
          <p className="text-sm text-muted-foreground">The project you're looking for doesn't exist or you don't have access to it.</p>
        </div>
        <Link 
          href="/brainstorm" 
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary/80 transition-colors"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-screen bg-background">
        {/* Sidebar and Section Navigation (restored) */}
        <div className="w-48 border-r border-border/50 bg-background/95 dark:bg-background/90 backdrop-blur-md flex flex-col">
          {/* Project Info */}
          <div className="px-6 py-4 border-b border-border/50">
            <div className="flex items-center gap-2">
              <Link
                href="/brainstorm"
                className="flex items-center gap-2 p-2 hover:bg-accent/50 rounded-lg text-muted-foreground transition-colors"
                title="Back to Projects"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back</span>
              </Link>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-bold text-foreground truncate">{project?.topic}</h2>
              <p className="text-xs text-muted-foreground truncate">{project?.description}</p>
            </div>
          </div>
          {/* Thought Links Section */}
          <div className="px-6 py-2 border-b border-border/50">
            <button
              onClick={() => setIsThoughtLinksExpanded(!isThoughtLinksExpanded)}
              className="w-full flex items-center justify-between p-2 hover:bg-accent/50 rounded-lg text-muted-foreground transition-colors"
            >
              <div className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4" />
                <span className="text-xs">Thought Links</span>
              </div>
              {isThoughtLinksExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            {isThoughtLinksExpanded && (
              <div className="ml-4 space-y-1">
                {thoughtLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-0 text-left p-2 rounded-lg truncate transition-colors text-xs hover:bg-accent/50 text-muted-foreground"
                    title={link.description || link.title}
                  >
                    {link.title}
                  </a>
                ))}
                <Link
                  href={`/project/${params.id}/thought-links`}
                  className="flex items-center gap-2 p-2 text-xs text-primary hover:bg-accent/50 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Link</span>
                </Link>
              </div>
            )}
          </div>
          {/* Section List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-2">
            {sections.map((section) => (
              <div key={section.id} className="group flex items-center gap-2">
                <button
                  onClick={() => setSelectedSection(section.id)}
                  className={`flex-1 min-w-0 text-left p-2 rounded-lg truncate transition-colors text-xs ${selectedSection === section.id ? 'bg-accent text-primary' : 'hover:bg-accent/50 text-muted-foreground'}`}
                >
                  {section.title}
                </button>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      setEditingSection(section);
                      setEditSectionTitle(section.title);
                    }}
                    className="p-1.5 text-muted-foreground hover:text-primary hover:bg-accent/50 rounded-lg transition-all"
                    title="Edit section title"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeletingSection(section)}
                    className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                    title="Delete section"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={createSection}
              className="w-full mt-2 flex items-center gap-2 p-2 text-xs text-primary hover:bg-accent/50 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Section</span>
            </button>
          </div>
        </div>
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Sticky Section Header and Toolbar */}
          <div className="sticky top-0 z-20 bg-background/90 backdrop-blur border-b border-border/50">
            <div className="flex items-center justify-between px-6 py-3">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-foreground">
                  {project?.topic}
                  <span className="text-muted-foreground mx-2">:</span>
                  <span className="text-primary">
                    {selectedSection ? sections.find(s => s.id === selectedSection)?.title : 'Select a section'}
                  </span>
                </h2>
                {selectedSection && (
                  <button
                    onClick={() => setEditingSection(sections.find(s => s.id === selectedSection) || null)}
                    className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-colors"
                    title="Edit Section"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                {selectedSection && (
                  <>
                    <button
                      onClick={handleOpenAIChat}
                      className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Brainstorm with AI</span>
                    </button>
                    <ExportMenu
                      content={editorInstance?.getHTML() || ''}
                      title={sections.find(s => s.id === selectedSection)?.title || 'Document'}
                    />
                  </>
                )}
              </div>
            </div>
            {/* Toolbar: Place your EditorToolbar here if needed */}
            {selectedSection && (
              <EditorToolbar editor={editorInstance} />
            )}
          </div>
          {/* Editor and Content Area */}
          <div className="flex-1 overflow-y-auto px-6 pb-4">
            {selectedSection === 'thought-links' ? (
              <ThoughtLinks projectId={project.id} />
            ) : selectedSection ? (
              <div className="w-full">
                <TipTapEditor
                  key={selectedSection}
                  content={sections.find(s => s.id === selectedSection)?.content || ''}
                  onChange={handleContentChange}
                  onEditorReady={setEditorInstance}
                />
              </div>
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center text-center p-6">
                <div className="max-w-md space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">No section selected</h3>
                  <p className="text-muted-foreground">
                    Select a section from the sidebar or create a new one to start writing.
                  </p>
                  <button
                    onClick={() => setShowNewModal(true)}
                    className="mt-4 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
                  >
                    Create New Section
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Floating AI Chat, Modals, etc. */}
          {/* ...existing code for AI chat, modals, etc... */}
        </div>
      </div>

      {/* Edit Section Modal */}
      <Dialog open={!!editingSection} onOpenChange={open => { if (!open) setEditingSection(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Section Title</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={updateSectionTitle}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              value={editSectionTitle}
              onChange={e => setEditSectionTitle(e.target.value)}
              className="input"
              autoFocus
              required
            />
            <DialogFooter>
              <button type="submit" className="btn btn-primary">Save</button>
              <DialogClose asChild>
                <button type="button" className="btn btn-secondary">Cancel</button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Section Modal */}
      <Dialog open={!!deletingSection} onOpenChange={open => { if (!open) setDeletingSection(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Section</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete <b>{deletingSection?.title}</b>? This cannot be undone.</p>
          <DialogFooter>
            <button
              className="btn btn-danger"
              onClick={() => {
                if (deletingSection) deleteSection(deletingSection.id);
                setDeletingSection(null);
              }}
            >
              Delete
            </button>
            <DialogClose asChild>
              <button className="btn btn-secondary">Cancel</button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}