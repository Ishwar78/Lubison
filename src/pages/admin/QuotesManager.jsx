import { useMemo, useState } from "react";
import {
  ClipboardList,
  Search,
  Eye,
  Trash2,
  X,
  UserRound,
  Mail,
  Phone,
  Building2,
  CalendarDays,
  Clock3,
  CheckCircle2,
  CircleDollarSign,
  Filter,
} from "lucide-react";
import "./QuotesManager.css";

const initialQuotes = [
  {
    id: 1,
    quoteNumber: "QT-2026-001",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    company: "Sharma Construction",
    equipment: "Hydraulic Excavator",
    quantity: 2,
    budget: "₹25,00,000 - ₹40,00,000",
    date: "2026-10-25",
    status: "Pending",
    message:
      "We require two hydraulic excavators for an upcoming infrastructure project. Please share your best quotation and delivery timeline.",
  },
  {
    id: 2,
    quoteNumber: "QT-2026-002",
    name: "Amit Verma",
    email: "amit@example.com",
    phone: "+91 98765 12345",
    company: "Verma Infrastructure",
    equipment: "Wheel Loader",
    quantity: 1,
    budget: "₹15,00,000 - ₹25,00,000",
    date: "2026-10-23",
    status: "Contacted",
    message:
      "Please provide pricing details, available configurations and warranty information for a wheel loader.",
  },
  {
    id: 3,
    quoteNumber: "QT-2026-003",
    name: "Priya Singh",
    email: "priya@example.com",
    phone: "+91 98765 67890",
    company: "Singh Enterprises",
    equipment: "Mobile Crane",
    quantity: 1,
    budget: "Not specified",
    date: "2026-10-20",
    status: "Quoted",
    message:
      "We would like a quotation for a mobile crane suitable for our material handling requirements.",
  },
];

const statusOptions = ["All", "Pending", "Contacted", "Quoted", "Closed"];

function formatDate(date) {
  if (!date) return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function statusClass(status) {
  return status.toLowerCase().replaceAll(" ", "-");
}

export default function QuotesManager() {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [notice, setNotice] = useState("");

  const filteredQuotes = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return quotes.filter((quote) => {
      const matchesSearch =
        !query ||
        quote.quoteNumber.toLowerCase().includes(query) ||
        quote.name.toLowerCase().includes(query) ||
        quote.email.toLowerCase().includes(query) ||
        quote.company.toLowerCase().includes(query) ||
        quote.equipment.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || quote.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [quotes, searchTerm, statusFilter]);

  const pendingCount = quotes.filter(
    (quote) => quote.status === "Pending"
  ).length;

  const contactedCount = quotes.filter(
    (quote) => quote.status === "Contacted"
  ).length;

  const quotedCount = quotes.filter(
    (quote) => quote.status === "Quoted"
  ).length;

  function updateStatus(id, status) {
    setQuotes((current) =>
      current.map((quote) =>
        quote.id === id ? { ...quote, status } : quote
      )
    );

    setSelectedQuote((current) =>
      current && current.id === id ? { ...current, status } : current
    );

    setNotice("Quotation status updated for this session.");
  }

  function deleteQuote(quote) {
    const confirmed = window.confirm(
      `Delete quotation request ${quote.quoteNumber}?`
    );

    if (!confirmed) return;

    setQuotes((current) =>
      current.filter((item) => item.id !== quote.id)
    );

    setSelectedQuote(null);
    setNotice("Quotation request removed from this session.");
  }

  return (
    <div className="quotes-manager">
      <div className="quotes-heading">
        <div>
          <span className="quotes-eyebrow">SALES MANAGEMENT</span>
          <h2>Quote Requests</h2>
          <p>
            Review equipment quotation requests and keep track of customer
            follow-ups.
          </p>
        </div>

        <div className="quotes-heading-badge">
          <ClipboardList size={17} />
          <span>{quotes.length} requests</span>
        </div>
      </div>

      <div className="quotes-stats-grid">
        <div className="quotes-stat-card">
          <div className="quotes-stat-icon total">
            <ClipboardList size={21} />
          </div>
          <div>
            <span>Total Requests</span>
            <strong>{quotes.length}</strong>
          </div>
        </div>

        <div className="quotes-stat-card">
          <div className="quotes-stat-icon pending">
            <Clock3 size={21} />
          </div>
          <div>
            <span>Pending</span>
            <strong>{pendingCount}</strong>
          </div>
        </div>

        <div className="quotes-stat-card">
          <div className="quotes-stat-icon contacted">
            <UserRound size={21} />
          </div>
          <div>
            <span>Contacted</span>
            <strong>{contactedCount}</strong>
          </div>
        </div>

        <div className="quotes-stat-card">
          <div className="quotes-stat-icon quoted">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>Quoted</span>
            <strong>{quotedCount}</strong>
          </div>
        </div>
      </div>

      {notice && (
        <div className="quotes-notice" role="status">
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

      <section className="quotes-panel">
        <div className="quotes-toolbar">
          <div>
            <h3>All Quote Requests</h3>
            <p>Search customer requests and update their status.</p>
          </div>

          <div className="quotes-toolbar-controls">
            <label className="quotes-search">
              <Search size={17} />
              <input
                type="search"
                placeholder="Search customer or equipment..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>

            <label className="quotes-filter">
              <Filter size={16} />
              <select
                aria-label="Filter by quotation status"
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

        <div className="quotes-table-wrapper">
          <table className="quotes-table">
            <thead>
              <tr>
                <th>Request</th>
                <th>Customer</th>
                <th>Equipment</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredQuotes.map((quote) => (
                <tr key={quote.id}>
                  <td>
                    <div className="quote-number-cell">
                      <div className="quote-number-icon">
                        <ClipboardList size={17} />
                      </div>
                      <div>
                        <strong>{quote.quoteNumber}</strong>
                        <span>Quotation request</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="quote-customer-cell">
                      <strong>{quote.name}</strong>
                      <span>{quote.company}</span>
                    </div>
                  </td>

                  <td>
                    <div className="quote-equipment-cell">
                      <strong>{quote.equipment}</strong>
                      <span>Quantity: {quote.quantity}</span>
                    </div>
                  </td>

                  <td>
                    <span className="quote-date">
                      <CalendarDays size={14} />
                      {formatDate(quote.date)}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`quote-status quote-status-${statusClass(
                        quote.status
                      )}`}
                    >
                      <span />
                      {quote.status}
                    </span>
                  </td>

                  <td>
                    <div className="quote-row-actions">
                      <button
                        type="button"
                        className="quote-view-button"
                        title="View request"
                        aria-label={`View ${quote.quoteNumber}`}
                        onClick={() => setSelectedQuote(quote)}
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        type="button"
                        className="quote-delete-button"
                        title="Delete request"
                        aria-label={`Delete ${quote.quoteNumber}`}
                        onClick={() => deleteQuote(quote)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredQuotes.length === 0 && (
                <tr>
                  <td colSpan="6">
                    <div className="quotes-empty">
                      <ClipboardList size={28} />
                      <h4>No quote requests found</h4>
                      <p>Try changing the search term or status filter.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="quotes-table-footer">
          <span>
            Showing {filteredQuotes.length} of {quotes.length} requests
          </span>
          <span>Quotation management</span>
        </div>
      </section>

      {selectedQuote && (
        <div
          className="quote-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedQuote(null);
            }
          }}
        >
          <section
            className="quote-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
          >
            <div className="quote-modal-header">
              <div>
                <span className="quotes-eyebrow">
                  {selectedQuote.quoteNumber}
                </span>
                <h3 id="quote-modal-title">Quotation Details</h3>
              </div>

              <button
                type="button"
                className="quote-modal-close"
                aria-label="Close quotation details"
                onClick={() => setSelectedQuote(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="quote-modal-body">
              <div className="quote-detail-customer">
                <div className="quote-detail-avatar">
                  {selectedQuote.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>

                <div>
                  <h4>{selectedQuote.name}</h4>
                  <span>{selectedQuote.company}</span>
                </div>
              </div>

              <div className="quote-detail-grid">
                <div className="quote-detail-item">
                  <Mail size={17} />
                  <div>
                    <span>Email address</span>
                    <a href={`mailto:${selectedQuote.email}`}>
                      {selectedQuote.email}
                    </a>
                  </div>
                </div>

                <div className="quote-detail-item">
                  <Phone size={17} />
                  <div>
                    <span>Phone number</span>
                    <a href={`tel:${selectedQuote.phone}`}>
                      {selectedQuote.phone}
                    </a>
                  </div>
                </div>

                <div className="quote-detail-item">
                  <Building2 size={17} />
                  <div>
                    <span>Equipment</span>
                    <strong>{selectedQuote.equipment}</strong>
                  </div>
                </div>

                <div className="quote-detail-item">
                  <CalendarDays size={17} />
                  <div>
                    <span>Request date</span>
                    <strong>{formatDate(selectedQuote.date)}</strong>
                  </div>
                </div>

                <div className="quote-detail-item">
                  <ClipboardList size={17} />
                  <div>
                    <span>Quantity requested</span>
                    <strong>{selectedQuote.quantity}</strong>
                  </div>
                </div>

                <div className="quote-detail-item">
                  <CircleDollarSign size={17} />
                  <div>
                    <span>Estimated budget</span>
                    <strong>{selectedQuote.budget}</strong>
                  </div>
                </div>
              </div>

              <div className="quote-message-box">
                <span>CUSTOMER REQUIREMENTS</span>
                <p>{selectedQuote.message}</p>
              </div>

              <div className="quote-status-editor">
                <label htmlFor="quote-status-select">Request status</label>
                <select
                  id="quote-status-select"
                  value={selectedQuote.status}
                  onChange={(event) =>
                    updateStatus(selectedQuote.id, event.target.value)
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

            <div className="quote-modal-footer">
              <button
                type="button"
                className="quote-modal-secondary"
                onClick={() => setSelectedQuote(null)}
              >
                Close
              </button>

              <a
                className="quote-reply-button"
                href={`mailto:${selectedQuote.email}?subject=${encodeURIComponent(
                  `Quotation ${selectedQuote.quoteNumber} - ${selectedQuote.equipment}`
                )}`}
              >
                <Mail size={16} />
                Contact Customer
              </a>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}