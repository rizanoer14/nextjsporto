"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProjectForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech: "",
    bg: "",
    slug: "",
    category: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataWithImage = new FormData();
    formDataWithImage.append("image", image);
    formDataWithImage.append("title", formData.title);
    formDataWithImage.append("description", formData.description);
    formDataWithImage.append("tech", formData.tech);
    formDataWithImage.append("bg", formData.bg);
    formDataWithImage.append("slug", formData.slug);
    formDataWithImage.append("category", formData.category);

    const res = await fetch("/api/projects", {
      method: "POST",
      body: formDataWithImage,
    });

    if (res.ok) {
      router.push("/projects");
    } else {
      console.error("Failed to create project");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Project Title"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Project Description"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="tech"
        value={formData.tech}
        onChange={handleChange}
        placeholder="Tech Stack (e.g., Python, Pygame)"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="bg"
        value={formData.bg}
        onChange={handleChange}
        placeholder="Background Image URL"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="slug"
        value={formData.slug}
        onChange={handleChange}
        placeholder="Slug"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category ID"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input type="file" onChange={handleImageChange} className="w-full p-2 border border-gray-300 rounded" />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Create Project
      </button>
    </form>
  );
}
