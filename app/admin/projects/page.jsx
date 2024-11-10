"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProjectListPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col space-y-6 p-6">
      <h1 className="text-3xl font-bold">Project Listing</h1>
      <Link href="/admin/projects/create" className="text-blue-500">
        Create New Project
      </Link>
      <div className="space-y-4 mt-4">
        {projects.map((project) => (
          <div key={project.id} className="border p-4 rounded shadow-sm">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p>{project.description}</p>
            <Link href={`/admin/projects/${project.slug}`} className="text-blue-500">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
