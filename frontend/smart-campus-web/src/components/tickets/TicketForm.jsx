import { useState } from "react";
import { createTicket } from "../../services/ticketService";

function TicketForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [resourceId, setResourceId] = useState("");
  const [images, setImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 3) {
      setErrorMessage("You can upload a maximum of 3 images.");
      setImages([]);
      return;
    }

    setErrorMessage("");
    setImages(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (!title.trim()) {
      setErrorMessage("Title is required.");
      return;
    }

    if (!description.trim()) {
      setErrorMessage("Description is required.");
      return;
    }

    if (!priority) {
      setErrorMessage("Priority is required.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("priority", priority);

      if (resourceId) {
        formData.append("resourceId", resourceId);
      }

      images.forEach((image) => {
        formData.append("images", image);
      });

      await createTicket(formData);

      setSuccessMessage("Ticket created successfully.");
      setTitle("");
      setDescription("");
      setPriority("");
      setResourceId("");
      setImages([]);
    } catch (error) {
      console.error("Ticket creation failed:", error);

      if (error.response && error.response.data) {
        setErrorMessage("Failed to create ticket.");
      } else {
        setErrorMessage("Server error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create Ticket</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter ticket title"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue"
            rows="5"
            style={styles.textarea}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={styles.select}
          >
            <option value="">Select priority</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Resource ID</label>
          <input
            type="number"
            value={resourceId}
            onChange={(e) => setResourceId(e.target.value)}
            placeholder="Enter resource ID"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Upload Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            style={styles.input}
          />
          <small>You can upload up to 3 images.</small>
        </div>

        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        {successMessage && <p style={styles.success}>{successMessage}</p>}

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Submitting..." : "Create Ticket"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "24px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    backgroundColor: "#fff",
  },
  heading: {
    marginBottom: "20px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "6px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    resize: "vertical",
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    margin: 0,
  },
  success: {
    color: "green",
    margin: 0,
  },
};

export default TicketForm;