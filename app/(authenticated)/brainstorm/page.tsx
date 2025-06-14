"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { supabase, setCurrentUserId, setSupabaseSession } from "@/lib/supabaseClient";
import Link from "next/link";
import {
  PlusCircle,
  MessageSquare,
  Archive,
  Plus,
  ArrowRight,
  X,
  LayoutGrid,
  FileText,
  Tag,
  Folder,
  Clock,
  Star,
  MoreVertical,
  Search,
  Filter,
  Edit2,
  Trash2,
  ArrowUpDown,
} from "lucide-react";

type Section = {
  id: number;
  title: string;
  content: string;
};

type Bookmark = {
  title: string;
  url: string;
};

type ProjectStatus = 'active' | 'archived' | 'completed';
type ProjectPriority = 'high' | 'medium' | 'low';

interface Project {
  id: string;
  user_id: string;
  topic: string;
  description?: string;
  notes: string;
  ai_chat_history: string[];
  bookmarks: Bookmark[];
  sections: Section[];
  updated_at: string;
  status?: ProjectStatus;
  priority?: ProjectPriority;
  category?: string;
  tags?: string[];
  is_favorite?: boolean;
}

type ViewMode = 'grid' | 'detail';

type Category = {
  id: string;
  name: string;
  color: string;
  user_id: string;
};

const DEFAULT_CATEGORIES = [
  { id: 'personal', name: 'Personal', color: '#3B82F6' },
  { id: 'work', name: 'Work', color: '#10B981' },
  { id: 'study', name: 'Study', color: '#F59E0B' },
  { id: 'ideas', name: 'Ideas', color: '#8B5CF6' },
  { id: 'other', name: 'Other', color: '#6B7280' }
];

const getFilteredAndSortedProjects = (projects: Project[], showFavorites: boolean, selectedCategory: string, sortOption: string) => {
  return projects
    .filter((project) => {
      if (showFavorites && !project.is_favorite) return false;
      if (selectedCategory && project.category !== selectedCategory) return false;
      return true;
    })
    .sort((a: Project, b: Project) => {
      switch (sortOption) {
        case "updated_desc":
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        case "updated_asc":
          return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
        case "name_asc":
          return a.topic.localeCompare(b.topic);
        case "name_desc":
          return b.topic.localeCompare(a.topic);
        case "sections_desc":
          return (b.sections?.length || 0) - (a.sections?.length || 0);
        case "sections_asc":
          return (a.sections?.length || 0) - (b.sections?.length || 0);
        default:
          return 0;
      }
    });
};

export default function BrainstormPage() {
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [newTopic, setNewTopic] = useState("");
  const [newProjectCategory, setNewProjectCategory] = useState("Other");
  const [showNewModal, setShowNewModal] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("updated_desc");
  const [categories, setCategories] = useState<Category[]>([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#3B82F6");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editTopic, setEditTopic] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const initializedRef = useRef(false);

  const fetchProjects = useCallback(async () => {
    if (!session?.user?.id) return;
    
    setLoadingProjects(true);
    try {
      console.log('Fetching projects for user:', session.user.id);
      
      // Ensure user ID is set for RLS
      await supabase.rpc('set_current_user_id', { user_id: session.user.id });
      
      // Fetch projects with a count of their sections
    const { data, error } = await supabase
      .from("projects")
        .select(`
          *,
          sections:sections(count)
        `)
      .eq("user_id", session.user.id)
        .order("updated_at", { ascending: false });
      
    if (error) {
        console.error("Error fetching projects:", {
          error,
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
          userId: session.user.id
        });
      alert("Error fetching projects: " + error.message);
        setLoadingProjects(false);
        return;
      }
      
      // Process the data to include section counts
      const processedData = data?.map((project: any) => {
        // Get the section count from the aggregated sections data
        const sectionCount = project.sections?.[0]?.count || 0;
        
        return {
          ...project,
          // Replace the sections array with the count for display
          sections: new Array(sectionCount)
        };
      });
      
      console.log(`Successfully fetched ${processedData?.length || 0} projects with section counts`);
      setProjects(processedData as unknown as Project[]);
    } catch (error) {
      console.error("Error in fetchProjects:", error);
      alert("Error fetching projects: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setLoadingProjects(false);
    }
  }, [session]);

  const fetchCategories = useCallback(async () => {
    if (!session?.user?.id) {
      console.log("No user session found");
      return;
    }

    try {
      setIsLoadingCategories(true);
      const userId = session.user.id;
      console.log("Fetching categories for user:", userId);

      // Set the current user ID for RLS
      await supabase.rpc('set_current_user_id', { user_id: userId });

      // 1. First try to fetch existing categories
      const { data: existingCategories, error: fetchError } = await supabase
        .from("categories")
        .select("*")
        .eq("user_id", userId)
        .order("name");
      
      if (fetchError) {
        console.error("Error fetching categories:", {
          error: fetchError,
          details: fetchError.details,
          hint: fetchError.hint,
          code: fetchError.code
        });
        throw fetchError;
      }

      console.log("Existing categories:", existingCategories);

      // 2. If no categories exist, create default categories
      if (!existingCategories || existingCategories.length === 0) {
        console.log("No categories found, creating defaults...");
        
        // Create default categories one by one
        const createdCategories = [];
        for (const cat of DEFAULT_CATEGORIES) {
          try {
            console.log(`Attempting to create category: ${cat.name} for user: ${userId}`);
            
            // Ensure user_id is properly formatted as UUID
            const { data: newCategory, error: createError } = await supabase
              .from("categories")
              .insert({
                name: cat.name,
                color: cat.color,
                user_id: userId
              })
              .select()
              .single();

            if (createError) {
              console.error(`Error creating category ${cat.name}:`, {
                error: createError,
                details: createError.details,
                hint: createError.hint,
                code: createError.code,
                userId: userId,
                categoryData: {
                  name: cat.name,
                  color: cat.color,
                  user_id: userId
                }
              });
              continue;
            }

            if (newCategory) {
              console.log(`Successfully created category ${cat.name}:`, newCategory);
              createdCategories.push(newCategory);
            }
          } catch (error) {
            console.error(`Error processing category ${cat.name}:`, {
              error,
              message: error instanceof Error ? error.message : 'Unknown error',
              stack: error instanceof Error ? error.stack : undefined,
              userId: userId,
              categoryData: {
                name: cat.name,
                color: cat.color,
                user_id: userId
              }
            });
          }
        }

        // If we created any categories, use those
        if (createdCategories.length > 0) {
          console.log("Created categories:", createdCategories);
          setCategories(createdCategories as Category[]);
          return;
        }

        // If we couldn't create any categories, try one final fetch
        const { data: finalFetch, error: finalError } = await supabase
            .from("categories")
            .select("*")
          .eq("user_id", userId)
            .order("name");

        if (!finalError && finalFetch) {
          console.log("Final fetch categories:", finalFetch);
          setCategories(finalFetch as Category[]);
          return;
        }

        // If we still have no categories, set an empty array
        console.log("No categories could be created or found");
          setCategories([]);
      } else {
      // Use existing categories
      console.log("Using existing categories:", existingCategories);
        setCategories(existingCategories as Category[]);
      }
    } catch (error) {
      console.error("Error in fetchCategories:", {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        userId: session?.user?.id
      });
      setCategories([]);
    } finally {
      setIsLoadingCategories(false);
    }
  }, [session]);

  // Initialize data when session is available
  useEffect(() => {
    // Initialize session and load data
    const initSession = async () => {
      if (session?.user?.id && !initializedRef.current) {
        console.log('Setting up session and user ID for data loading...');
        
        try {
          // Set Supabase session from NextAuth
          await setSupabaseSession(session);
          
          // Set user ID for Row Level Security
          await setCurrentUserId(session.user.id);
          
          initializedRef.current = true;
          console.log('Session initialized, ready to fetch data');
          
          // Now fetch the data
          await fetchCategories();
          await fetchProjects();
        } catch (error) {
          console.error('Error initializing session:', error);
        }
      }
    };
    
    initSession();
  }, [session, fetchCategories, fetchProjects]);

  // Reset data loading flags when session changes
  useEffect(() => {
    if (status === 'unauthenticated') {
      console.log('User is not authenticated, resetting data');
      setProjects([]);
      setCategories([]);
      initializedRef.current = false;
    }
  }, [status]);

  // Session Check
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="loading-text">Loading session…</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <p className="text-xl text-foreground">Please log in to access Brainstorm.</p>
        <Link href="/login" className="link">
          Go to Login
        </Link>
      </div>
    );
  }

  async function createProject(e: React.FormEvent) {
    e.preventDefault();
    if (!newTopic.trim() || !session?.user?.id) return;

    try {
      // Log the attempt to create project
      console.log("Attempting to create project:", {
        topic: newTopic.trim(),
        user_id: session.user.id,
        category: newProjectCategory,
        description: newDescription
      });

      // Ensure we have a valid category
      const selectedCategory = categories.find(cat => cat.name === newProjectCategory)?.name || 'Other';
      
      // Set user ID for RLS
      await setCurrentUserId(session.user.id);
      
      // Create the project
      const { data: project, error } = await supabase
        .from("projects")
        .insert({
          topic: newTopic.trim(),
          user_id: session.user.id,
          is_favorite: false,
          category: selectedCategory,
          description: newDescription,
          notes: '',
      ai_chat_history: [],
      bookmarks: [],
      sections: [],
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      // Log the response
      console.log("Supabase response:", { project, error });

    if (error) {
        console.error("Error creating project:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      if (!project) {
        throw new Error("No project data returned from insert");
      }

      // Update local state
      setProjects([...projects, project as unknown as Project]);
      setNewTopic("");
      setNewDescription("");
      setNewProjectCategory('Other');
      setShowNewModal(false);

      // Show success message
      alert("Project created successfully!");
    } catch (error) {
      console.error("Error creating project:", error);
      alert(`Error creating project: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async function deleteProject(projectId: string) {
    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

    if (error) {
        throw error;
      }

      setProjects(projects.filter((p) => p.id !== projectId));
    } catch (error) {
      alert("Error deleting project: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  }

  async function toggleFavorite(projectId: string, currentState: boolean) {
    try {
      // First update the local state for immediate feedback
      setProjects(projects.map(project => 
        project.id === projectId 
          ? { ...project, is_favorite: !currentState }
          : project
      ));

      // Then update the database
      const { data, error, status, statusText } = await supabase
      .from("projects")
        .update({ is_favorite: !currentState })
      .eq("id", projectId)
        .select();

      // Log the full response for debugging
      console.log("Supabase response:", {
        data,
        error,
        status,
        statusText
      });

    if (error) {
        console.error("Supabase error details:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        
        // If there's an error, revert the local state
        setProjects(projects.map(project => 
          project.id === projectId 
            ? { ...project, is_favorite: currentState }
            : project
        ));
        throw error;
      }

      // Verify we got data back
      if (!data || data.length === 0) {
        throw new Error("No data returned from update");
      }

      // Log successful update
      console.log("Successfully updated favorite status:", data[0]);
    } catch (error) {
      console.error("Error updating favorite status:", error);
      if (error instanceof Error) {
        console.error("Error details:", {
          message: error.message,
          name: error.name,
          stack: error.stack
        });
      }
      alert("Failed to update favorite status. Please try again.");
    }
  }

  const createCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.user?.id) {
      console.error("No authenticated user found");
      alert("Please log in to create categories");
      return;
    }

    if (!newCategoryName.trim()) {
      alert("Please enter a category name");
      return;
    }

    try {
      const categoryData = {
        name: newCategoryName.trim(),
        color: newCategoryColor,
        user_id: session.user.id
      };

      console.log("Creating category with data:", categoryData);

      // Create the category
      const { data: newCategory, error: insertError } = await supabase
        .from("categories")
        .insert(categoryData)
        .select()
        .single();

      if (insertError) {
        console.error("Error creating category:", {
          error: insertError,
          details: insertError.details,
          hint: insertError.hint,
          code: insertError.code,
          data: categoryData
        });
        throw insertError;
      }

      if (!newCategory) {
        throw new Error("No category data returned");
      }

      console.log("Successfully created category:", newCategory);

      // Update local state
      setCategories(prevCategories => [...prevCategories, newCategory as Category]);

      // Reset form
      setNewCategoryName("");
      setNewCategoryColor("#3B82F6");
      setShowCategoryModal(false);

    } catch (error) {
      console.error("Error creating category:", {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      alert("Error creating category. Please try again.");
    }
  };

  async function deleteCategory(categoryId: string) {
    if (!confirm("Are you sure you want to delete this category? Projects in this category will be moved to 'Other'.")) return;

    try {
      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", categoryId);

      if (error) throw error;

      // Update projects in this category to 'other'
      const categoryName = categories.find(c => c.id === categoryId)?.name || 'Other';
      
      await supabase
      .from("projects")
        .update({ category: "other" })
        .eq("category", categoryName);

      setCategories(categories.filter(c => c.id !== categoryId));
      fetchProjects(); // Refresh projects to update their categories
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Error deleting category. Please try again.");
    }
  }

  async function updateProject(e: React.FormEvent) {
    e.preventDefault();
    if (!editingProject || !editTopic.trim() || !session?.user?.id) return;

    try {
      const selectedCategory = categories.find(cat => cat.name === editCategory)?.name || 'Other';
      
      // Set user ID for RLS
      await setCurrentUserId(session.user.id);
      
      const { error } = await supabase
      .from("projects")
        .update({
          topic: editTopic.trim(),
          description: editDescription,
          category: selectedCategory,
          updated_at: new Date().toISOString()
        })
        .eq("id", editingProject.id)
        .eq("user_id", session.user.id);

      if (error) throw error;

      // Update local state
      setProjects(projects.map(p =>
        p.id === editingProject.id
          ? { ...p, topic: editTopic.trim(), description: editDescription, category: selectedCategory, updated_at: new Date().toISOString() }
          : p
      ));

      // Reset state
      setEditingProject(null);
      setEditTopic("");
      setEditDescription("");
      setEditCategory("");
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Error updating project. Please try again.");
    }
  }

  const getViewClasses = () => {
    switch (viewMode) {
      case 'grid':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      case 'detail':
        return 'space-y-6';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };

  const getCardClasses = () => {
    return "group relative";
  };

  const getContentClasses = () => {
    const baseClasses = "relative h-full bg-background/40 backdrop-blur-sm border border-border/50 rounded-2xl transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1";
    return `${baseClasses} p-6`;
  };

  const renderCategoryList = () => {
    // Show both default and user categories
    if (categories.length === 0) {
  return (
        <div className="text-center text-gray-400 py-4">
          No categories available
      </div>
      );
    }

    return (
      <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between p-2 bg-gray-700/50 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span>{category.name}</span>
            </div>
            {!DEFAULT_CATEGORIES.find(dc => dc.name === category.name) && (
              <button
                onClick={() => deleteCategory(category.id)}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
        )}
      </div>
              ))}
            </div>
    );
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-white">
              My Brainstorms
            </h1>
            <p className="text-[#8B949E]">Organize your ideas and projects</p>
          </div>
          <div className="flex items-center gap-4">
            {/* View Mode Selector */}
            <div className="flex items-center gap-1 bg-accent/50 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-background text-primary shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('detail')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'detail' 
                    ? 'bg-background text-primary shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Detail View"
              >
                <FileText className="w-5 h-5" />
              </button>
            </div>

            <button 
              onClick={() => setShowNewModal(true)}
              className="modern-button"
            >
              <span>
                <Plus className="w-5 h-5 mr-2 transition-transform duration-200 plus-icon" />
                New Brainstorm
              </span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all ${
                showFavorites
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <Star className={`h-4 w-4 ${showFavorites ? "fill-current" : ""}`} />
              <span>Favorites</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg bg-gray-800 px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {isLoadingCategories ? (
                <option value="" disabled>Loading categories...</option>
              ) : categories.length > 0 ? (
                categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>No categories available</option>
              )}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCategoryModal(true)}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              title="Manage Categories"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <ArrowUpDown className="h-4 w-4 text-gray-400" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="rounded-lg bg-gray-800 px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="updated_desc">Newest First</option>
              <option value="updated_asc">Oldest First</option>
              <option value="name_asc">Name (A-Z)</option>
              <option value="name_desc">Name (Z-A)</option>
              <option value="sections_desc">Most Notes</option>
              <option value="sections_asc">Fewest Notes</option>
            </select>
          </div>
        </div>

        {/* Project Grid */}
        <div className={getViewClasses()}>
          {projects.length > 0 ? (
            getFilteredAndSortedProjects(projects, showFavorites, selectedCategory, sortOption).map((project: Project) => (
              <div key={project.id} className={getCardClasses()}>
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary)]/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className={getContentClasses()}>
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-2">
                      <div className="space-y-1">
                        <h2 className="text-xl font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                          {project.topic}
                        </h2>
                        {project.description && (
                          <p className="text-sm text-[var(--muted)] line-clamp-2">
                            {project.description}
                          </p>
                        )}
                        {project.category && (
                          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                            <Folder className="w-4 h-4" />
                            <span>{project.category}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setEditingProject(project);
                            setEditTopic(project.topic);
                            setEditDescription(project.description || "");
                            setEditCategory(project.category || "other");
                          }}
                          className="p-1.5 text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-lg transition-colors"
                          title="Edit Project"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(project.id, project.is_favorite || false);
                          }}
                          className={`p-1.5 rounded-lg transition-colors ${
                            project.is_favorite 
                              ? 'text-[var(--yellow)] hover:bg-[var(--yellow)]/10' 
                              : 'text-[var(--muted)] hover:text-[var(--yellow)] hover:bg-[var(--yellow)]/10'
                          }`}
                          title={project.is_favorite ? "Remove from favorites" : "Add to favorites"}
                        >
                          <Star className="w-4 h-4" fill={project.is_favorite ? 'currentColor' : 'none'} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            if (confirm('Are you sure you want to delete this project?')) {
                              deleteProject(project.id);
                            }
                          }}
                          className="p-1.5 text-[var(--muted)] hover:text-[var(--red)] hover:bg-[var(--red)]/10 rounded-lg transition-colors"
                          title="Delete Project"
                        >
                          <Archive className="w-4 h-4" />
                  </button>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 text-sm text-[var(--muted)]">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{project.sections?.length || 0} notes</span>
                        </div>
                        {project.priority && (
                          <div className={`px-2 py-0.5 rounded-full text-xs ${
                            project.priority === 'high' 
                              ? 'bg-[var(--red)]/10 text-[var(--red)]' 
                              : project.priority === 'medium'
                              ? 'bg-[var(--yellow)]/10 text-[var(--yellow)]'
                              : 'bg-[var(--green)]/10 text-[var(--green)]'
                          }`}>
                            {project.priority}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[var(--primary)]/60 animate-pulse" />
                        <span className="text-xs text-[var(--muted)]">
                            Last updated {new Date(project.updated_at).toLocaleString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                        </span>
                      </div>
                      <Link
                        href={`/project/${project.id}`}
                        className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--primary)]/10 p-1.5 rounded-lg"
                      >
                        <ArrowRight className="w-5 h-5 text-[var(--primary)]" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="max-w-md space-y-6">
                <h3 className="text-xl font-semibold text-[var(--foreground)]">No projects found</h3>
                <p className="text-[var(--muted)]">
                  {loadingProjects 
                    ? "Loading your projects..." 
                    : "You haven't created any projects yet, or there might be an issue with loading your data."}
                </p>
                <div className="flex flex-col items-center gap-3 pt-3">
                  <button
                    onClick={fetchProjects}
                    className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-[var(--primary)] rounded-lg transition-colors"
                  >
                    Refresh Projects
                  </button>
                  <button
                    onClick={() => setShowNewModal(true)}
                    className="px-4 py-2 bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/90 text-[var(--white)] rounded-lg transition-colors"
                  >
                    Create New Project
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* New Project Modal */}
        {showNewModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Create New Brainstorm</h2>
              <form onSubmit={createProject} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Project Name
                  </label>
              <input
                type="text"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter project name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Description (Optional)
                  </label>
              <textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter project description"
                rows={3}
              />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newProjectCategory}
                    onChange={(e) => {
                      const selectedCategory = categories.find(cat => cat.name === e.target.value);
                      setNewProjectCategory(selectedCategory?.name || 'Other');
                    }}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowNewModal(false)}
                    className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600"
                  >
                    Cancel
                  </button>
              <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                    Create
              </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Category Management Modal */}
        {showCategoryModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Manage Categories</h2>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {renderCategoryList()}

              {/* Add New Category Form */}
              <form onSubmit={createCategory} className="space-y-4">
                <div>
                  <label 
                    htmlFor="categoryName"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Category Name
                  </label>
                  <input
                    id="categoryName"
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter category name"
                    required
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label 
                    htmlFor="categoryColor"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      id="categoryColor"
                      type="color"
                      value={newCategoryColor}
                      onChange={(e) => setNewCategoryColor(e.target.value)}
                      className="w-12 h-12 rounded-lg cursor-pointer"
                    />
                    <span className="text-sm text-gray-400">
                      Click to choose a color
                    </span>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCategoryModal(false);
                      setNewCategoryName("");
                      setNewCategoryColor("#3B82F6");
                    }}
                    className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600"
                  >
                    Cancel
                  </button>
            <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Add Category
            </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Project Modal */}
        {editingProject && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gradient-to-b from-background/95 to-background/90 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md border border-border/50 shadow-lg shadow-primary/10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Edit Project</h2>
                <button
                  onClick={() => {
                    setEditingProject(null);
                    setEditTopic("");
                    setEditDescription("");
                    setEditCategory("");
                  }}
                  className="p-2 hover:bg-accent/50 rounded-lg text-[var(--muted)] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={updateProject} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--muted)] mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={editTopic}
                    onChange={(e) => setEditTopic(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-background/40 border border-border/50 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter project name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--muted)] mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-background/40 border border-border/50 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter project description"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--muted)] mb-2">
                    Category
                  </label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-background/40 border border-border/50 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProject(null);
                      setEditTopic("");
                      setEditDescription("");
                      setEditCategory("");
                    }}
                    className="px-6 py-3 rounded-xl bg-background/40 text-[var(--muted)] hover:bg-accent/50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/90 text-[var(--white)] hover:from-[var(--primary)]/90 hover:to-[var(--primary)]/80 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}