import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResourceById } from "../../services/resourceService";
import "./ResourceDetailsPage.css";

const TYPE_CONFIG = {
  LAB: {
    label: "Laboratory",
    accent: "#059669",
    soft: "#ecfdf5",
    border: "#6ee7b7",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="8" width="8" height="24" rx="4" fill="#059669" opacity="0.2"/>
        <rect x="36" y="4" width="8" height="28" rx="4" fill="#059669" opacity="0.35"/>
        <ellipse cx="24" cy="44" rx="14" ry="10" fill="#059669" opacity="0.15"/>
        <ellipse cx="24" cy="44" rx="14" ry="10" stroke="#059669" strokeWidth="1.5"/>
        <path d="M20 32 C18 36 14 40 24 50 C34 40 30 36 28 32" fill="#059669" opacity="0.25"/>
        <circle cx="20" cy="46" r="3" fill="#059669" opacity="0.5"/>
        <circle cx="28" cy="42" r="2" fill="#059669" opacity="0.4"/>
        <rect x="22" y="6" width="4" height="3" rx="1" fill="#059669" opacity="0.6"/>
        <rect x="38" y="2" width="4" height="3" rx="1" fill="#059669" opacity="0.6"/>
      </svg>
    ),
    illustration: "🔬",
    bgPattern: "lab",
  },
  ROOM: {
    label: "Room",
    accent: "#2563eb",
    soft: "#eff6ff",
    border: "#93c5fd",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="20" width="48" height="36" rx="3" fill="#2563eb" opacity="0.1" stroke="#2563eb" strokeWidth="1.5"/>
        <path d="M8 20 L32 6 L56 20" stroke="#2563eb" strokeWidth="1.5" fill="#2563eb" opacity="0.15"/>
        <rect x="26" y="38" width="12" height="18" rx="2" fill="#2563eb" opacity="0.2" stroke="#2563eb" strokeWidth="1"/>
        <rect x="14" y="28" width="10" height="8" rx="1" fill="#2563eb" opacity="0.3"/>
        <rect x="40" y="28" width="10" height="8" rx="1" fill="#2563eb" opacity="0.3"/>
        <circle cx="31" cy="47" r="1.5" fill="#2563eb" opacity="0.6"/>
      </svg>
    ),
    illustration: "🏛️",
    bgPattern: "room",
  },
  EQUIPMENT: {
    label: "Equipment",
    accent: "#7c3aed",
    soft: "#f5f3ff",
    border: "#c4b5fd",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="18" stroke="#7c3aed" strokeWidth="1.5" fill="#7c3aed" opacity="0.08"/>
        <circle cx="32" cy="32" r="8" fill="#7c3aed" opacity="0.2" stroke="#7c3aed" strokeWidth="1.5"/>
        <circle cx="32" cy="32" r="3" fill="#7c3aed" opacity="0.7"/>
        <path d="M32 14 L32 20" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/>
        <path d="M32 44 L32 50" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 32 L20 32" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/>
        <path d="M44 32 L50 32" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/>
        <path d="M19.5 19.5 L23.7 23.7" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/>
        <path d="M40.3 40.3 L44.5 44.5" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/>
        <path d="M44.5 19.5 L40.3 23.7" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/>
        <path d="M23.7 40.3 L19.5 44.5" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    illustration: "⚙️",
    bgPattern: "equip",
  },
};

export default function ResourceDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  if (loading) {
    return (
      <div className="rd-page">
        <div className="rd-loading">
          <div className="rd-spinner" />
          <p>Loading resource details…</p>
        </div>
      </div>
    );
  }

  if (error || !resource) {
    return (
      <div className="rd-page">
        <div className="rd-loading">
          <p>{error || "Resource not found."}</p>
          <button className="rd-back-btn" onClick={() => navigate(-1)}>← Go Back</button>
        </div>
      </div>
    );
  }

  const config = TYPE_CONFIG[resource.type] ?? TYPE_CONFIG.ROOM;
  const isActive = resource.status === "ACTIVE";

  return (
    <div className="rd-page">
      {/* ── Dark hero strip ── */}
      <div className="rd-hero-strip">
        <div className="rd-hero-inner">
          <button className="rd-back-btn" onClick={() => navigate(-1)}>
            ← Back to Catalogue
          </button>
          <div className="rd-hero-badge" style={{ color: config.accent, borderColor: config.border, background: config.soft }}>
            {config.label}
          </div>
          <h1 className="rd-hero-title">{resource.name}</h1>
          <p className="rd-hero-sub">Campus Resource · {resource.location}</p>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="rd-content-wrap">
        <div className="rd-layout">

          {/* ── Left: Visual panel ── */}
          <div className="rd-visual-panel" style={{ "--accent": config.accent, "--soft": config.soft, "--border-c": config.border }}>
            <div className={`rd-visual-bg rd-bg-${config.bgPattern}`}>
              <div className="rd-visual-icon">{config.icon}</div>
              <div className="rd-visual-emoji">{config.illustration}</div>
            </div>

            <div className="rd-visual-status">
              <div className={`rd-status-dot ${isActive ? "rd-dot-active" : "rd-dot-inactive"}`} />
              <span className={isActive ? "rd-status-active" : "rd-status-inactive"}>
                {resource.status?.replace(/_/g, " ")}
              </span>
            </div>

            <div className="rd-visual-meta">
              <div className="rd-meta-pill">
                <span className="rd-meta-label">Type</span>
                <span className="rd-meta-value" style={{ color: config.accent }}>{resource.type}</span>
              </div>
              {resource.capacity != null && (
                <div className="rd-meta-pill">
                  <span className="rd-meta-label">Capacity</span>
                  <span className="rd-meta-value">{resource.capacity}</span>
                </div>
              )}
            </div>
          </div>

          {/* ── Right: Details ── */}
          <div className="rd-details-panel">

            <div className="rd-detail-card">
              <div className="rd-card-label">Resource Name</div>
              <div className="rd-card-value rd-card-name">{resource.name}</div>
            </div>

            <div className="rd-detail-row">
              <div className="rd-detail-card">
                <div className="rd-card-label">Type</div>
                <div className="rd-card-value">
                  <span className="rd-type-badge" style={{ color: config.accent, background: config.soft, borderColor: config.border }}>
                    {resource.type}
                  </span>
                </div>
              </div>
              <div className="rd-detail-card">
                <div className="rd-card-label">Status</div>
                <div className="rd-card-value">
                  <span className={`rd-status-badge ${isActive ? "rd-badge-active" : "rd-badge-inactive"}`}>
                    <span className={`rd-status-dot ${isActive ? "rd-dot-active" : "rd-dot-inactive"}`} />
                    {resource.status?.replace(/_/g, " ")}
                  </span>
                </div>
              </div>
            </div>

            <div className="rd-detail-row">
              <div className="rd-detail-card">
                <div className="rd-card-label">Location</div>
                <div className="rd-card-value">
                  <span className="rd-icon-row">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/></svg>
                    {resource.location}
                  </span>
                </div>
              </div>
              <div className="rd-detail-card">
                <div className="rd-card-label">Capacity</div>
                <div className="rd-card-value rd-capacity-value">
                  {resource.capacity != null ? (
                    <>
                      <span className="rd-capacity-num">{resource.capacity}</span>
                      <span className="rd-capacity-unit">people</span>
                    </>
                  ) : "N/A"}
                </div>
              </div>
            </div>

            <div className="rd-detail-card rd-desc-card">
              <div className="rd-card-label">Description</div>
              <div className="rd-card-value rd-desc-value">
                {resource.description || "No description provided for this resource."}
              </div>
            </div>

            <div className="rd-actions">
              <button className="rd-action-primary" onClick={() => navigate(-1)}>
                ← Back to Catalogue
              </button>
              <button className="rd-action-secondary" onClick={() => navigate("/manage-resources")}>
                Manage Resources
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
