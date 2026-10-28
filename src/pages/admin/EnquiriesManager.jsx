import { useMemo, useState } from "react";
import {
  Search,
  MessageSquare,
  Eye,
  Trash2,
  X,
  Mail,
  Phone,
  CalendarDays,
  UserRound,
  Building2,
  Filter,
  Clock3,
  CheckCircle2,
  CircleDot,
} from "lucide-react";
import "./EnquiriesManager.css";

const initialEnquiries = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    company: "Sharma Construction",
    subject: "Excavator Enquiry",
    message:
      "We are looking for a reliable excavator for our upcoming construction project. Please share the available models, specifications and pricing.",
    date: "2026-10-25",
    status: "New",
  },
  {
    id: 2,
    name: "Amit Verma",
    email: "amit@example.com",
    phone: "+91 98765 12345",
    company: "Verma Infrastructure",
    subject: "Equipment Availability",
    message:
      "Please confirm the availability of construction equipment and the expected delivery timeline.",
    date: "2026-10-24",
    status: "In Progress",
  },
  {
    id: 3,
    name: "Priya Singh",
    email: "priya@example.com",
    phone: "+91 98765 67890",
    company: "Singh Enterprises",
    subject: "Product Specifications",
    message:
      "I would like to receive detailed product specifications and warranty information for your listed equipment.",
    date: "2026-10-22",
    status: "Resolved",
  },
];

const statusOptions = ["All", "New", "In Progress", "Resolved"];

function formatDate(date) {
  if (!date) return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function EnquiriesManager() {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [notice, setNotice] = useState("");

  const filteredEnquiries = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return enquiries.filter((enquiry) => {
      const matchesSearch =
        !query ||
        enquiry.name.toLowerCase().includes(query) ||
        enquiry.email.toLowerCase().includes(query) ||
        enquiry.subject.toLowerCase().includes(query) ||
        enquiry.company.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || enquiry.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [enquiries, searchTerm, statusFilter]);

  const newCount = enquiries.filter(
    (enquiry) => enquiry.status === "New"
  ).length;

  const progressCount = enquiries.filter(
    (enquiry) => enquiry.status === "In Progress"
  ).length;

  const resolvedCount = enquiries.filter(
    (enquiry) => enquiry.status === "Resolved"
  ).length;

  function updateStatus(id, status) {
    setEnquiries((current) =>
      current.map((enquiry) =>
        enquiry.id === id ? { ...enquiry, status } : enquiry
      )
    );

    setSelectedEnquiry((current) =>
      current && current.id === id ? { ...current, status } : current
    );

    setNotice("Enquiry status updated for this session.");
  }

  function deleteEnquiry(enquiry) {
    const confirmed = window.confirm(
      `Delete the enquiry from ${enquiry.name}?`
    );

    if (!confirmed) return;

    setEnquiries((current) =>
      current.filter((item) => item.id !== enquiry.id)
    );

    setSelectedEnquiry(null);
    setNotice("Enquiry removed from this session.");
  }

  return (
    <div className="enquiries-manager">
      <div className="enquiries-heading">
        <div>
          <span className="enquiries-eyebrow">CUSTOMER RELATIONSHIPS</span>
          <h2>Customer Enquiries</h2>
          <p>
            Review customer messages, follow up on requests and track enquiry
            progress.
          </p>
        </div>

        <div className="enquiries-heading-badge">
          <MessageSquare size={17} />
          <span>{enquiries.length} enquiries</span>
        </div>
      </div>

      <div className="enquiries-stats-grid">
        <div className="enquiries-stat-card">
          <div className="enquiries-stat-icon total">
            <MessageSquare size={21} />
          </div>
          <div>
            <span>Total Enquiries</span>
            <strong>{enquiries.length}</strong>
          </div>
        </div>

        <div className="enquiries-stat-card">
          <div className="enquiries-stat-icon new">
            <CircleDot size={21} />
          </div>
          <div>
            <span>New Enquiries</span>
            <strong>{newCount}</strong>
          </div>
        </div>

        <div className="enquiries-stat-card">
          <div className="enquiries-stat-icon progress">
            <Clock3 size={21} />
          </div>
          <div>
            <span>In Progress</span>
            <strong>{progressCount}</strong>
          </div>
        </div>

        <div className="enquiries-stat-card">
          <div className="enquiries-stat-icon resolved">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>Resolved</span>
            <strong>{resolvedCount}</strong>
          </div>
        </div>
      </div>

      {notice && (
        <div className="enquiries-notice" role="status">
          <span>{notice}</span>
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={() => setNotice("")}
          >
            <X size={16} />
          </button>
        </div>
      )}

      <section className="enquiries-panel">
        <div className="enquiries-toolbar">
          <div>
            <h3>All Enquiries</h3>
            <p>Search and manage customer requests.</p>
          </div>

          <div className="enquiries-toolbar-controls">
            <label className="enquiries-search">
              <Search size={17} />
              <input
                type="search"
                placeholder="Search name, email, company..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>

            <label className="enquiries-filter">
              <Filter size={16} />
              <select
                aria-label="Filter by enquiry status"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                {statusOptions.map((status) => (
                  <option value={status} key={status}>
                    {status === "All" ? "All statuses" : status}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="enquiries-table-wrapper">
          <table className="enquiries-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Subject</th>
                <th>Received</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEnquiries.map((enquiry) => (
                <tr key={enquiry.id}>
                  <td>
                    <div className="enquiry-customer">
                      <div className="enquiry-avatar">
                        {enquiry.name
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>

                      <div>
                        <strong>{enquiry.name}</strong>
                        <span>{enquiry.email}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="enquiry-subject">
                      <strong>{enquiry.subject}</strong>
                      <span>{enquiry.company}</span>
                    </div>
                  </td>

                  <td>
                    <span className="enquiry-date">
                      <CalendarDays size={14} />
                      {formatDate(enquiry.date)}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`enquiry-status enquiry-status-${enquiry.status
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      <span />
                      {enquiry.status}
                    </span>
                  </td>

                  <td>
                    <div className="enquiry-actions">
                      <button
                        type="button"
                        className="enquiry-view-button"
                        title="View enquiry"
                        aria-label={`View enquiry from ${enquiry.name}`}
                        onClick={() => setSelectedEnquiry(enquiry)}
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        type="button"
                        className="enquiry-delete-button"
                        title="Delete enquiry"
                        aria-label={`Delete enquiry from ${enquiry.name}`}
                        onClick={() => deleteEnquiry(enquiry)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredEnquiries.length === 0 && (
                <tr>
                  <td colSpan="5">
                    <div className="enquiries-empty">
                      <MessageSquare size={28} />
                      <h4>No enquiries found</h4>
                      <p>Try changing the search term or status filter.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="enquiries-table-footer">
          <span>
            Showing {filteredEnquiries.length} of {enquiries.length} enquiries
          </span>
          <span>Customer enquiry management</span>
        </div>
      </section>

      {selectedEnquiry && (
        <div
          className="enquiry-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedEnquiry(null);
            }
          }}
        >
          <section
            className="enquiry-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-modal-title"
          >
            <div className="enquiry-modal-header">
              <div>
                <span className="enquiries-eyebrow">CUSTOMER MESSAGE</span>
                <h3 id="enquiry-modal-title">Enquiry Details</h3>
              </div>

              <button
                type="button"
                className="enquiry-modal-close"
                aria-label="Close enquiry details"
                onClick={() => setSelectedEnquiry(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="enquiry-modal-body">
              <div className="enquiry-detail-customer">
                <div className="enquiry-detail-avatar">
                  {selectedEnquiry.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>

                <div>
                  <h4>{selectedEnquiry.name}</h4>
                  <span>{selectedEnquiry.company}</span>
                </div>
              </div>

              <div className="enquiry-detail-grid">
                <div className="enquiry-detail-item">
                  <Mail size={17} />
                  <div>
                    <span>Email address</span>
                    <a href={`mailto:${selectedEnquiry.email}`}>
                      {selectedEnquiry.email}
                    </a>
                  </div>
                </div>

                <div className="enquiry-detail-item">
                  <Phone size={17} />
                  <div>
                    <span>Phone number</span>
                    <a href={`tel:${selectedEnquiry.phone}`}>
                      {selectedEnquiry.phone}
                    </a>
                  </div>
                </div>

                <div className="enquiry-detail-item">
                  <Building2 size={17} />
                  <div>
                    <span>Company</span>
                    <strong>{selectedEnquiry.company}</strong>
                  </div>
                </div>

                <div className="enquiry-detail-item">
                  <CalendarDays size={17} />
                  <div>
                    <span>Received on</span>
                    <strong>{formatDate(selectedEnquiry.date)}</strong>
                  </div>
                </div>
              </div>

              <div className="enquiry-message-box">
                <span>SUBJECT</span>
                <h4>{selectedEnquiry.subject}</h4>
                <p>{selectedEnquiry.message}</p>
              </div>

              <div className="enquiry-status-editor">
                <label htmlFor="enquiry-status-select">Update status</label>
                <select
                  id="enquiry-status-select"
                  value={selectedEnquiry.status}
                  onChange={(event) =>
                    updateStatus(selectedEnquiry.id, event.target.value)
                  }
                >
                  {statusOptions
                    .filter((status) => status !== "All")
                    .map((status) => (
                      <option value={status} key={status}>
                        {status}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="enquiry-modal-footer">
              <button
                type="button"
                className="enquiry-modal-secondary"
                onClick={() => setSelectedEnquiry(null)}
              >
                Close
              </button>

              <a
                className="enquiry-reply-button"
                href={`mailto:${selectedEnquiry.email}?subject=${encodeURIComponent(
                  `Re: ${selectedEnquiry.subject}`
                )}`}
              >
                <Mail size={16} />
                Reply by Email
              </a>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
