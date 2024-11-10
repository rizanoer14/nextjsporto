"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link"; // Import Link dari next/link

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("project");

  const handleLogout = async () => {
    // Logout API call or token removal here
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <nav className="w-1/5 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-5">Dashboard</h2>
        <ul>
          <li
            onClick={() => setActiveTab("project")}
            className={`cursor-pointer p-2 mb-2 rounded-lg ${activeTab === "project" ? "bg-gray-700" : ""}`}
          >
            <Link href="/admin/projects" passHref>
              Projects
            </Link>
          </li>
          <li
            onClick={() => setActiveTab("about")}
            className={`cursor-pointer p-2 mb-2 rounded-lg ${activeTab === "about" ? "bg-gray-700" : ""}`}
          >
            <Link href="/admin/about" passHref>
              About
            </Link>
          </li>
          <li
            onClick={() => setActiveTab("skill")}
            className={`cursor-pointer p-2 mb-2 rounded-lg ${activeTab === "skill" ? "bg-gray-700" : ""}`}
          >
            <Link href="/admin/skills" passHref>
              Skills
            </Link>
          </li>
          <li
            onClick={handleLogout}
            className="cursor-pointer p-2 mt-4 bg-red-600 text-center rounded-lg"
          >
            Logout
          </li>
        </ul>
      </nav>

      {/* Content */}
      <div className="w-4/5 p-6">
        {activeTab === "project" && <h3 className="text-xl font-bold">Projects Content</h3>}
        {activeTab === "about" && <h3 className="text-xl font-bold">About Content</h3>}
        {activeTab === "skill" && <h3 className="text-xl font-bold">Skill Content</h3>}
      </div>
    </div>
  );
}
