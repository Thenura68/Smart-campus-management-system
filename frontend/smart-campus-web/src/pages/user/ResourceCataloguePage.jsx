import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllResources } from "../../services/resourceService";
import ResourceCard from "../../components/resources/ResourceCard";

export default function ResourceCataloguePage() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await getAllResources();
        setResources(data);
      } catch (err) {
        setError("Failed to load resources");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handleView = (id) => {
    navigate(`/resources/${id}`);
  };

  if (loading) return <p>Loading resources...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Resource Catalogue</h1>
      {resources.length === 0 ? (
        <p>No resources found.</p>
      ) : (
        resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} onView={handleView} />
        ))
      )}
    </div>
  );
}