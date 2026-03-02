import { useState } from "react";

export default function AdminBlogCreate() {
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    author: "",
    category: "",
    readTime: "",
    publishDate: "",
    coverImage: ""
  });

  const handleChange = (e:any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetch("/api/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    alert("Blog created");
  };

  return (
    <div>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="excerpt" placeholder="Short description" onChange={handleChange} />
      <input name="author" placeholder="Author" onChange={handleChange} />
      <input name="category" placeholder="Category" onChange={handleChange} />
      <input name="readTime" placeholder="12 min read" onChange={handleChange} />
      <input type="date" name="publishDate" onChange={handleChange} />
      <input name="coverImage" placeholder="Image URL" onChange={handleChange} />

      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}