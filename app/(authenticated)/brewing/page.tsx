// app/brewing/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { PlusCircle, MessageSquare, Archive, Coffee } from "lucide-react";

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
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSectionContent, setNewSectionContent] = useState("");

  // Protect the page: show a loading state, or prompt login if no session is active.
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="loading-text">Loading session...</p>
      </div>
    );
  }
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <p className="text-xl text-foreground">You must be logged in to view this page.</p>
        <Link href="/login" className="link">
          Log in
        </Link>
      </div>
    );
  }

  const addProject = () => {
    if (!newProjectName.trim()) return;
    const newProject: Project = {
      id: Date.now(),
      name: newProjectName,
      sections: [],
    };
    setProjects([...projects, newProject]);
    setNewProjectName("");
  };

  const deleteProject = (projectId: number) => {
    setProjects(projects.filter((project) => project.id !== projectId));
    if (expandedProjectId === projectId) {
      setExpandedProjectId(null);
    }
  };

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
    <div className="p-4 space-y-8">
      <div className="card">
        <div className="flex items-center gap-2 mb-6">
          <Coffee className="w-6 h-6 text-primary" />
          <h2 className="section-header">Ongoing Projects</h2>
        </div>

        {/* New Project Form */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <input
            type="text"
            placeholder="New Project Name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            className="input flex-1 mb-2 sm:mb-0"
          />
          <button onClick={addProject} className="btn-primary">
            <PlusCircle className="w-5 h-5 mr-2 inline" />
            Create Project
          </button>
        </div>

        {/* List Projects */}
        <div className="space-y-4">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project.id}
                className={`border border-border p-4 rounded-lg bg-accent/50 hover:bg-accent/70 transition-colors ${
                  expandedProjectId === project.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setExpandedProjectId(project.id)}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">{project.name}</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProject(project.id);
                      }}
                      className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-md transition-colors"
                      title="Delete Project"
                    >
                      <Archive className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Project Details: only show when expanded */}
                {expandedProjectId === project.id && (
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      {project.sections.map((section) => (
                        <div
                          key={section.id}
                          className="border border-border p-4 rounded-lg bg-accent/30"
                        >
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-white">{section.title}</h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setProjects(
                                  projects.map((proj) =>
                                    proj.id === project.id
                                      ? {
                                          ...proj,
                                          sections: proj.sections.filter(
                                            (sec) => sec.id !== section.id
                                          ),
                                        }
                                      : proj
                                  )
                                );
                              }}
                              className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-md transition-colors"
                              title="Delete Section"
                            >
                              <Archive className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {section.content}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Form to add a new section */}
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="New Section Title"
                        value={newSectionTitle}
                        onChange={(e) => setNewSectionTitle(e.target.value)}
                        className="input w-full"
                      />
                      <textarea
                        placeholder="Section Content"
                        value={newSectionContent}
                        onChange={(e) => setNewSectionContent(e.target.value)}
                        className="input w-full h-32"
                      />
                      <button
                        onClick={() => addSectionToProject(project.id)}
                        className="btn-primary"
                      >
                        <PlusCircle className="w-5 h-5 mr-2 inline" />
                        Add Section
                      </button>
                    </div>

                    {/* Placeholder for additional functionalities */}
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">
                        (Here you can add notes, resume notes, link bookmarks, converse with AI,
                        etc.)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No projects found.</p>
          )}
        </div>
      </div>
    </div>
  );
}



// "use client";
// import React, { useState } from "react";

// type Section = {
//   id: number;
//   title: string;
//   content: string;
// };

// type Project = {
//   id: number;
//   name: string;
//   sections: Section[];
// };

// export default function BrewingPage() {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [newProjectName, setNewProjectName] = useState("");
//   const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);
//   const [newSectionTitle, setNewSectionTitle] = useState("");
//   const [newSectionContent, setNewSectionContent] = useState("");

//   // Create a new project
//   const addProject = () => {
//     if (!newProjectName.trim()) return;
//     const newProject: Project = {
//       id: Date.now(), // simple unique id based on timestamp
//       name: newProjectName,
//       sections: [],
//     };
//     setProjects([...projects, newProject]);
//     setNewProjectName("");
//   };

//   // Delete a project
//   const deleteProject = (projectId: number) => {
//     setProjects(projects.filter((project) => project.id !== projectId));
//     if (expandedProjectId === projectId) {
//       setExpandedProjectId(null);
//     }
//   };

//   // Add a new section to a specific project
//   const addSectionToProject = (projectId: number) => {
//     if (!newSectionTitle.trim()) return;
//     const newSection: Section = {
//       id: Date.now(),
//       title: newSectionTitle,
//       content: newSectionContent,
//     };
//     setProjects(
//       projects.map((project) =>
//         project.id === projectId
//           ? { ...project, sections: [...project.sections, newSection] }
//           : project
//       )
//     );
//     setNewSectionTitle("");
//     setNewSectionContent("");
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4 text-gray-800">Ongoing Projects</h1>
//       {/* New Project Form */}
//       <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:gap-2">
//         <input
//           type="text"
//           placeholder="New Project Name"
//           value={newProjectName}
//           onChange={(e) => setNewProjectName(e.target.value)}
//           className="border px-3 py-2 rounded flex-1 mb-2 sm:mb-0"
//         />
//         <button
//           onClick={addProject}
//           className="bg-brainstorm-primary text-white px-4 py-2 rounded"
//         >
//           Create Project
//         </button>
//       </div>

//       {/* List Projects */}
//       <div className="space-y-4">
//         {projects.map((project) => (
//           <div key={project.id} className="border p-4 rounded shadow">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-bold text-brainstorm-primary">
//                 {project.name}
//               </h2>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() =>
//                     setExpandedProjectId(
//                       expandedProjectId === project.id ? null : project.id
//                     )
//                   }
//                   className="text-sm text-blue-500"
//                 >
//                   {expandedProjectId === project.id ? "Collapse" : "Expand"}
//                 </button>
//                 <button
//                   onClick={() => deleteProject(project.id)}
//                   className="text-sm text-red-500"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>

//             {/* Project Details: only show when expanded */}
//             {expandedProjectId === project.id && (
//               <div className="mt-4">
//                 <h3 className="text-lg font-semibold mb-2">Sections</h3>
//                 {project.sections.map((section) => (
//                   <div key={section.id} className="mb-2 p-2 border rounded">
//                     <h4 className="font-semibold">{section.title}</h4>
//                     <p className="text-sm text-gray-600">{section.content}</p>
//                   </div>
//                 ))}

//                 {/* Form to add a new section */}
//                 <div className="mt-4">
//                   <input
//                     type="text"
//                     placeholder="New Section Title"
//                     value={newSectionTitle}
//                     onChange={(e) => setNewSectionTitle(e.target.value)}
//                     className="border px-3 py-2 rounded mb-2 w-full"
//                   />
//                   <textarea
//                     placeholder="Section Content"
//                     value={newSectionContent}
//                     onChange={(e) => setNewSectionContent(e.target.value)}
//                     className="border px-3 py-2 rounded mb-2 w-full"
//                   />
//                   <button
//                     onClick={() => addSectionToProject(project.id)}
//                     className="bg-brainstorm-primary text-white px-4 py-2 rounded"
//                   >
//                     Add Section
//                   </button>
//                 </div>

//                 {/* Placeholder for additional functionality */}
//                 <div className="mt-4">
//                   <p className="text-sm text-gray-700">
//                     (Here you can add notes, resume notes, link bookmarks, converse with AI, etc.)
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
