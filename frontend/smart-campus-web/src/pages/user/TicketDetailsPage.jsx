import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTicketImages, getUserTickets } from "../../services/ticketService";
import "./TicketDetailsPage.css";
import ticketBg from "../../assets/ticketimage.png";

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
      <div className="rd-page">
        <div className="rd-state-screen">
          <div className="rd-spinner" />
          <p>Loading ticket details...</p>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="rd-page">
        <div className="rd-state-screen">
          <p>{errorMessage}</p>
          <button className="rd-ghost-btn" onClick={() => navigate("/user/tickets")}>
            ← Back to Tickets
          </button>
        </div>
      </div>
    );
  }


  

  return (
  <div className="rd-page">

    {/* HERO */}
    <div className="rd-cover">
      <img
        src={ticketBg}
        className="rd-cover-img"
      />
      <div className="rd-cover-overlay" />

      <div className="rd-cover-nav">
        <button className="rd-nav-back" onClick={() => navigate("/user/tickets")}>
          ← Back to Tickets
        </button>

        <div className="rd-nav-tag">
          SUPPORT TICKET
        </div>
      </div>

      <div className="rd-cover-content">
        <div className="rd-cover-type">TICKET</div>

        <h1 className="rd-cover-title">
          {ticket.title}
        </h1>

        <div className="rd-cover-location">
          Ticket ID: #{ticket.id}
        </div>
      </div>

      <div className={`rd-float-status ${
        ticket.status === "RESOLVED"
          ? "rd-float-active"
          : "rd-float-inactive"
      }`}>
        <span className="rd-float-dot" />
        {ticket.status}
      </div>
    </div>

    {/* BODY */}
    <div className="rd-body">

      {/* STATS BAR */}
      <div className="rd-stats-bar">
        <div className="rd-stat-item">
          <span className="rd-stat-label">Priority</span>
          <span className="rd-stat-val">{ticket.priority}</span>
        </div>

        <div className="rd-stat-div" />

        <div className="rd-stat-item">
          <span className="rd-stat-label">Status</span>
          <span className="rd-stat-val">{ticket.status}</span>
        </div>

        <div className="rd-stat-div" />

        <div className="rd-stat-item">
          <span className="rd-stat-label">Ticket ID</span>
          <span className="rd-stat-val">#{ticket.id}</span>
        </div>
      </div>

      {/* GRID */}
      <div className="rd-grid">

        {/* LEFT */}
        <div className="rd-main">

          <div className="rd-about-card">
            <div className="rd-about-stripe" />
            <h2 className="rd-about-title">Description</h2>
            <p className="rd-about-desc">
              {ticket.description}
            </p>
          </div>

          <div className="rd-about-card">
            <h2 className="rd-about-title">Uploaded Images</h2>

            {images.length === 0 ? (
              <p>No images uploaded.</p>
            ) : (
              <div className="rd-detail-grid">
                {images.map((img) => (
                  <img
                    key={img.id}
                    src={img.imageUrl}
                    style={{ width: "100%", borderRadius: "12px" }}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

        {/* RIGHT */}
        <div className="rd-sidebar">

          <div className="rd-info-card">
            <div className="rd-info-row">
              <span className="rd-info-label">Ticket ID</span>
              <span className="rd-info-mono">#{ticket.id}</span>
            </div>

            <div className="rd-info-hr" />

            <div className="rd-info-row">
              <span className="rd-info-label">Priority</span>
              <span>{ticket.priority}</span>
            </div>

            <div className="rd-info-hr" />

            <div className="rd-info-row">
              <span className="rd-info-label">Status</span>
              <span>{ticket.status}</span>
            </div>
          </div>

          <div className="rd-action-stack">
            <button
              className="rd-btn-primary"
              style={{ background: "#2563eb" }}
              onClick={() => navigate("/user/tickets")}
            >
              ← Back to Tickets
            </button>
          </div>

        </div>

      </div>
    </div>
  </div>
);
};

export default TicketDetailsPage;