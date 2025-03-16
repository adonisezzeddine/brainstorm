// app/brewing/page.tsx
"use client";
import React, { useState } from "react";

type Section = {
  id: number;
  title: string;
  content: string;
};

type Project = {
  id: number;
  name: string;
  sections: Section[];
};

export default function BrewingPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSectionContent, setNewSectionContent] = useState("");

  // Create a new project
  const addProject = () => {
    if (!newProjectName.trim()) return;
    const newProject: Project = {
      id: Date.now(), // simple unique id based on timestamp
      name: newProjectName,
      sections: [],
    };
    setProjects([...projects, newProject]);
    setNewProjectName("");
  };

  // Delete a project
  const deleteProject = (projectId: number) => {
    setProjects(projects.filter((project) => project.id !== projectId));
    if (expandedProjectId === projectId) {
      setExpandedProjectId(null);
    }
  };

  // Add a new section to a specific project
  const addSectionToProject = (projectId: number) => {
    if (!newSectionTitle.trim()) return;
    const newSection: Section = {
      id: Date.now(),
      title: newSectionTitle,
      content: newSectionContent,
    };
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? { ...project, sections: [...project.sections, newSection] }
          : project
      )
    );
    setNewSectionTitle("");
    setNewSectionContent("");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Ongoing Projects</h1>
      {/* New Project Form */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:gap-2">
        <input
          type="text"
          placeholder="New Project Name"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          className="border px-3 py-2 rounded flex-1 mb-2 sm:mb-0"
        />
        <button
          onClick={addProject}
          className="bg-brainstorm-primary text-white px-4 py-2 rounded"
        >
          Create Project
        </button>
      </div>

      {/* List Projects */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="border p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-brainstorm-primary">
                {project.name}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setExpandedProjectId(
                      expandedProjectId === project.id ? null : project.id
                    )
                  }
                  className="text-sm text-blue-500"
                >
                  {expandedProjectId === project.id ? "Collapse" : "Expand"}
                </button>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="text-sm text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Project Details: only show when expanded */}
            {expandedProjectId === project.id && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Sections</h3>
                {project.sections.map((section) => (
                  <div key={section.id} className="mb-2 p-2 border rounded">
                    <h4 className="font-semibold">{section.title}</h4>
                    <p className="text-sm text-gray-600">{section.content}</p>
                  </div>
                ))}

                {/* Form to add a new section */}
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="New Section Title"
                    value={newSectionTitle}
                    onChange={(e) => setNewSectionTitle(e.target.value)}
                    className="border px-3 py-2 rounded mb-2 w-full"
                  />
                  <textarea
                    placeholder="Section Content"
                    value={newSectionContent}
                    onChange={(e) => setNewSectionContent(e.target.value)}
                    className="border px-3 py-2 rounded mb-2 w-full"
                  />
                  <button
                    onClick={() => addSectionToProject(project.id)}
                    className="bg-brainstorm-primary text-white px-4 py-2 rounded"
                  >
                    Add Section
                  </button>
                </div>

                {/* Placeholder for additional functionality */}
                <div className="mt-4">
                  <p className="text-sm text-gray-700">
                    (Here you can add notes, resume notes, link bookmarks, converse with AI, etc.)
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
