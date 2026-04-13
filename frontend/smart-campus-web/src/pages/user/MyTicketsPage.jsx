import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserTickets, deleteUserTicket } from "../../services/ticketService";

function MyTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await getUserTickets();
      setTickets(data);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
      setErrorMessage("Failed to load tickets.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewTicket = (ticketId) => {
    navigate(`/user/tickets/${ticketId}`);
  };

  const handleDeleteTicket = async (ticketId) => {
    const confirmed = window.confirm("Are you sure you want to delete this ticket?");
    if (!confirmed) return;

    try {
      setErrorMessage("");

      await deleteUserTicket(ticketId);

      setTickets((prev) => prev.filter((t) => t.id !== ticketId));
    } catch (error) {
      console.error(error);

      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else if (error.response?.data?.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Failed to delete ticket.");
      }
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>My Tickets</h1>
          <p style={styles.subtitle}>
            View the support tickets you have submitted.
          </p>
        </div>

        {loading && <p style={styles.info}>Loading tickets...</p>}

        {errorMessage && <p style={styles.error}>{errorMessage}</p>}

        {!loading && !errorMessage && tickets.length === 0 && (
          <div style={styles.emptyState}>
            <p style={styles.emptyTitle}>No tickets found</p>
            <p style={styles.emptyText}>
              You have not created any tickets yet.
            </p>
          </div>
        )}

        {!loading && !errorMessage && tickets.length > 0 && (
          <div style={styles.ticketList}>
            {tickets.map((ticket) => (
              <div key={ticket.id} style={styles.ticketCard}>
                <div style={styles.ticketTop}>
                  <h3 style={styles.ticketTitle}>{ticket.title}</h3>
                  <span style={getStatusStyle(ticket.status)}>
                    {ticket.status}
                  </span>
                </div>

                <p style={styles.ticketDescription}>{ticket.description}</p>

                <div style={styles.metaRow}>
                  <span style={styles.metaItem}>
                    <strong>Priority:</strong> {ticket.priority}
                  </span>
                  <span style={styles.metaItem}>
                    <strong>Ticket ID:</strong> {ticket.id}
                  </span>
                </div>

                <div style={styles.buttonRow}>
                <button
                  style={styles.button}
                  onClick={() => handleViewTicket(ticket.id)}
                >
                  View Ticket
                </button>

                
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDeleteTicket(ticket.id)}
                  >
                    Delete
                  </button>
                
              </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const getStatusStyle = (status) => {
  return {
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
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
  header: {
    marginBottom: "28px",
  },
  title: {
    margin: "0 0 8px 0",
    fontSize: "32px",
    color: "#ffffff",
  },
  subtitle: {
    margin: 0,
    color: "#d1d5db",
    fontSize: "15px",
  },
  info: {
    color: "#ffffff",
    fontSize: "15px",
  },
  error: {
    color: "#f87171",
    fontSize: "15px",
  },
  emptyState: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "32px",
    textAlign: "center",
  },
  emptyTitle: {
    margin: "0 0 8px 0",
    fontSize: "22px",
    color: "#111827",
  },
  emptyText: {
    margin: 0,
    color: "#6b7280",
  },
  ticketList: {
    display: "grid",
    gap: "18px",
  },
  ticketCard: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
  },
  ticketTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginBottom: "14px",
  },
  ticketTitle: {
    margin: 0,
    fontSize: "22px",
    color: "#111827",
  },
  ticketDescription: {
    margin: "0 0 16px 0",
    color: "#4b5563",
    lineHeight: "1.5",
  },
  metaRow: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "18px",
  },
  metaItem: {
    color: "#374151",
    fontSize: "14px",
  },
  button: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "12px",
    background: "#111827",
    color: "#ffffff",
    fontWeight: "600",
    cursor: "pointer",
  },


  buttonRow: {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  },

  deleteButton: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "12px",
    background: "#dc2626",
    color: "#ffffff",
    fontWeight: "600",
    cursor: "pointer",
  },

};

export default MyTicketsPage;