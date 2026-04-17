import React, { useEffect, useState } from "react";
import {
  getAllResources,
  createResource,
  deleteResource,
} from "../../services/resourceService";

export default function ManageResourcesPage() {
  const [resources, setResources] = useState([]);
  const [form, setForm] = useState({
    name: "",
    type: "",
    location: "",
    capacity: "",
    status: "ACTIVE",
    description: "",
  });

  const loadResources = async () => {
    try {
      const data = await getAllResources();
      setResources(data);
    } catch (error) {
      console.error("Failed to load resources", error);
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createResource({
        ...form,
        capacity: form.capacity ? Number(form.capacity) : null,
      });
      setForm({
        name: "",
        type: "",
        location: "",
        capacity: "",
        status: "ACTIVE",
        description: "",
      });
      loadResources();
    } catch (error) {
      console.error("Failed to create resource", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteResource(id);
      loadResources();
    } catch (error) {
      console.error("Failed to delete resource", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manage Resources</h1>

      <form onSubmit={handleCreate} style={{ marginBottom: "20px" }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="type" placeholder="Type" value={form.type} onChange={handleChange} />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        <input name="capacity" placeholder="Capacity" value={form.capacity} onChange={handleChange} />
        <input name="status" placeholder="Status" value={form.status} onChange={handleChange} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <button type="submit">Add Resource</button>
      </form>

      <h2>Existing Resources</h2>
      {resources.map((resource) => (
        <div key={resource.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p><strong>{resource.name}</strong> - {resource.type}</p>
          <p>{resource.location}</p>
          <button onClick={() => handleDelete(resource.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}