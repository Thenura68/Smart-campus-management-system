import React from "react";

export default function ResourceCard({ resource, onView }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "16px",
      marginBottom: "12px",
      backgroundColor: "#fff"
    }}>
      <h3>{resource.name}</h3>
      <p><strong>Type:</strong> {resource.type}</p>
      <p><strong>Location:</strong> {resource.location}</p>
      <p><strong>Capacity:</strong> {resource.capacity ?? "N/A"}</p>
      <p><strong>Status:</strong> {resource.status}</p>
      <button onClick={() => onView(resource.id)}>View Details</button>
    </div>
  );
}