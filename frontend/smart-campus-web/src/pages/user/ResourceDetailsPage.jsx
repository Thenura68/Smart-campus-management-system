import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResourceById } from "../../services/resourceService";

export default function ResourceDetailsPage() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const data = await getResourceById(id);
        setResource(data);
      } catch (err) {
        setError("Failed to load resource details");
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [id]);

  if (loading) return <p>Loading resource details...</p>;
  if (error) return <p>{error}</p>;
  if (!resource) return <p>Resource not found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{resource.name}</h1>
      <p><strong>Type:</strong> {resource.type}</p>
      <p><strong>Location:</strong> {resource.location}</p>
      <p><strong>Capacity:</strong> {resource.capacity ?? "N/A"}</p>
      <p><strong>Status:</strong> {resource.status}</p>
      <p><strong>Description:</strong> {resource.description}</p>
    </div>
  );
}