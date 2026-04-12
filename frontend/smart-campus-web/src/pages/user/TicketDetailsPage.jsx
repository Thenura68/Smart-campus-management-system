import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTicketImages, getUserTickets } from "../../services/ticketService";

function TicketDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchTicketDetails();
  }, [id]);

  const fetchTicketDetails = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const tickets = await getUserTickets();
      const selectedTicket = tickets.find((t) => String(t.id) === String(id));

      if (!selectedTicket) {
        setErrorMessage("Ticket not found.");
        setLoading(false);
        return;
      }

      setTicket(selectedTicket);

      const imageData = await getTicketImages(id);
      setImages(imageData);
    } catch (error) {
      console.error("Failed to load ticket details:", error);
      setErrorMessage("Failed to load ticket details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <p style={styles.info}>Loading ticket details...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <p style={styles.error}>{errorMessage}</p>
          <button style={styles.backButton} onClick={() => navigate("/user/tickets")}>
            Back to My Tickets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <button style={styles.backButton} onClick={() => navigate("/user/tickets")}>
          ← Back to My Tickets
        </button>

        <div style={styles.card}>
          <div style={styles.header}>
            <div>
              <h1 style={styles.title}>{ticket.title}</h1>
              <p style={styles.subtitle}>Ticket ID: {ticket.id}</p>
            </div>

            <span style={getStatusStyle(ticket.status)}>
              {ticket.status}
            </span>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Description</h3>
            <p style={styles.text}>{ticket.description}</p>
          </div>

          <div style={styles.metaGrid}>
            <div style={styles.metaBox}>
              <span style={styles.metaLabel}>Priority</span>
              <span style={styles.metaValue}>{ticket.priority}</span>
            </div>

            <div style={styles.metaBox}>
              <span style={styles.metaLabel}>Status</span>
              <span style={styles.metaValue}>{ticket.status}</span>
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Uploaded Images</h3>

            {images.length === 0 ? (
              <p style={styles.noImages}>No images uploaded for this ticket.</p>
            ) : (
              <div style={styles.imageGrid}>
                {images.map((image) => (
                  <div key={image.id} style={styles.imageCard}>
                    <img
                      src={image.imageUrl}
                      alt={image.fileName}
                      style={styles.image}
                    />
                    <div style={styles.imageInfo}>
                      <p style={styles.imageName}>{image.fileName}</p>
                      <p style={styles.imageMeta}>
                        Size: {image.fileSize} bytes
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const getStatusStyle = (status) => {
  return {
    padding: "8px 14px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "600",
    backgroundColor:
      status === "RESOLVED"
        ? "#dcfce7"
        : status === "PENDING"
        ? "#fef3c7"
        : "#dbeafe",
    color:
      status === "RESOLVED"
        ? "#166534"
        : status === "PENDING"
        ? "#92400e"
        : "#1d4ed8",
    height: "fit-content",
  };
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#1f1f1f",
    padding: "40px 20px",
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
  backButton: {
    marginBottom: "20px",
    padding: "10px 16px",
    border: "none",
    borderRadius: "10px",
    background: "#374151",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "600",
  },
  card: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "28px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    marginBottom: "24px",
    flexWrap: "wrap",
  },
  title: {
    margin: "0 0 6px 0",
    fontSize: "30px",
    color: "#111827",
  },
  subtitle: {
    margin: 0,
    color: "#6b7280",
  },
  section: {
    marginBottom: "24px",
  },
  sectionTitle: {
    margin: "0 0 12px 0",
    fontSize: "20px",
    color: "#111827",
  },
  text: {
    margin: 0,
    color: "#374151",
    lineHeight: "1.6",
  },
  metaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    marginBottom: "28px",
  },
  metaBox: {
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  metaLabel: {
    fontSize: "13px",
    color: "#6b7280",
    fontWeight: "600",
  },
  metaValue: {
    fontSize: "16px",
    color: "#111827",
    fontWeight: "700",
  },
  imageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
  },
  imageCard: {
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    overflow: "hidden",
    background: "#ffffff",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  },
  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    display: "block",
    background: "#f3f4f6",
  },
  imageInfo: {
    padding: "14px",
  },
  imageName: {
    margin: "0 0 6px 0",
    fontWeight: "600",
    color: "#111827",
    wordBreak: "break-word",
  },
  imageMeta: {
    margin: 0,
    fontSize: "13px",
    color: "#6b7280",
  },
  noImages: {
    margin: 0,
    color: "#6b7280",
  },
  info: {
    color: "#ffffff",
    fontSize: "16px",
  },
  error: {
    color: "#f87171",
    fontSize: "16px",
    marginBottom: "16px",
  },
};

export default TicketDetailsPage;