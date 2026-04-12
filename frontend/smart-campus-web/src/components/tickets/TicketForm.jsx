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
      setErrorMessage("Failed to create ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Create Support Ticket</h2>
          <p style={styles.subtitle}>
            Report an issue and attach up to 3 images if needed.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Title</label>
            <input
              type="text"
              placeholder="Enter ticket title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Description</label>
            <textarea
              placeholder="Describe the issue clearly"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              style={styles.textarea}
            />
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={styles.input}
              >
                <option value="">Select priority</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Resource ID</label>
              <input
                type="number"
                placeholder="Optional"
                value={resourceId}
                onChange={(e) => setResourceId(e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Upload Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              style={styles.fileInput}
            />
            <small style={styles.helperText}>Maximum 3 images allowed.</small>

            {images.length > 0 && (
              <div style={styles.fileList}>
                {images.map((image, index) => (
                  <div key={index} style={styles.fileItem}>
                    {image.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {errorMessage && <p style={styles.error}>{errorMessage}</p>}
          {successMessage && <p style={styles.success}>{successMessage}</p>}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Creating..." : "Create Ticket"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "48px 20px",
    background: "#1f1f1f",
  },
  card: {
    width: "100%",
    maxWidth: "720px",
    background: "#ffffff",
    borderRadius: "18px",
    padding: "32px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.20)",
  },
  header: {
    marginBottom: "24px",
  },
  title: {
    margin: "0 0 8px 0",
    fontSize: "28px",
    color: "#111827",
  },
  subtitle: {
    margin: 0,
    color: "#6b7280",
    fontSize: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "8px",
    fontWeight: "600",
    color: "#111827",
    fontSize: "14px",
  },
  input: {
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none",
    background: "#6e6e6e",
  },
  textarea: {
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none",
    resize: "vertical",
    background: "#6e6e6e",
  },
  fileInput: {
    padding: "10px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    background: "#f9fafb",
  },
  helperText: {
    marginTop: "6px",
    color: "#6b7280",
  },
  fileList: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  fileItem: {
    background: "#f3f4f6",
    padding: "10px 12px",
    borderRadius: "10px",
    fontSize: "14px",
    color: "#374151",
  },
  button: {
    marginTop: "8px",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background: "#111827",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
  error: {
    margin: 0,
    color: "#dc2626",
    fontSize: "14px",
  },
  success: {
    margin: 0,
    color: "#16a34a",
    fontSize: "14px",
  },
};

export default TicketForm;