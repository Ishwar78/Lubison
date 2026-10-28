
import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Star,
  Eye,
  EyeOff,
  MessageSquareQuote,
} from "lucide-react";
import "./TestimonialsManager.css";


const initialTestimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    company: "ABC Infrastructure",
    role: "Project Manager",
    message:
      "The team helped us find suitable equipment for our project requirements. The overall experience was professional.",
    rating: 5,
    status: "Published",
  },
  {
    id: 2,
    name: "Amit Verma",
    company: "Verma Construction",
    role: "Business Owner",
    message:
      "We received helpful guidance about the available machinery and specifications. Communication was smooth.",
    rating: 4,
    status: "Published",
  },
  {
    id: 3,
    name: "Priya Mehta",
    company: "Mehta Projects",
    role: "Operations Manager",
    message:
      "The team answered our questions and helped us understand the options available for our business.",
    rating: 5,
    status: "Draft",
  },
];

const emptyTestimonial = {
  name: "",
  company: "",
  role: "",
  message: "",
  rating: 5,
  status: "Published",
};

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [form, setForm] = useState(emptyTestimonial);
  const [error, setError] = useState("");

  const publishedCount = testimonials.filter(
    (item) => item.status === "Published"
  ).length;

  const averageRating = testimonials.length
    ? (
        testimonials.reduce((sum, item) => sum + Number(item.rating), 0) /
        testimonials.length
      ).toFixed(1)
    : "0.0";

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((item) => {
      const searchText = search.trim().toLowerCase();

      const matchesSearch = [
        item.name,
        item.company,
        item.role,
        item.message,
      ].some((value) => value.toLowerCase().includes(searchText));

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesRating =
        ratingFilter === "All" ||
        item.rating === Number(ratingFilter);

      return matchesSearch && matchesStatus && matchesRating;
    });
  }, [testimonials, search, statusFilter, ratingFilter]);

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyTestimonial);
    setError("");
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      company: item.company,
      role: item.role,
      message: item.message,
      rating: item.rating,
      status: item.status,
    });
    setError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyTestimonial);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.company.trim() ||
      !form.message.trim()
    ) {
      setError("Please fill in the name, company and testimonial.");
      return;
    }

    const cleanedForm = {
      ...form,
      name: form.name.trim(),
      company: form.company.trim(),
      role: form.role.trim(),
      message: form.message.trim(),
      rating: Number(form.rating),
    };

    if (editingId !== null) {
      setTestimonials((current) =>
        current.map((item) =>
          item.id === editingId ? { ...item, ...cleanedForm } : item
        )
      );
    } else {
      setTestimonials((current) => [
        { id: Date.now(), ...cleanedForm },
        ...current,
      ]);
    }

    closeModal();
  };

  const toggleStatus = (id) => {
    setTestimonials((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "Published" ? "Draft" : "Published",
            }
          : item
      )
    );
  };

  const deleteTestimonial = (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this testimonial?"
      )
    ) {
      return;
    }

    setTestimonials((current) =>
      current.filter((item) => item.id !== id)
    );

    if (selectedTestimonial?.id === id) {
      setSelectedTestimonial(null);
    }
  };

  const renderStars = (rating) => (
    <div
      className="tm-stars"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={15}
          fill={star <= rating ? "currentColor" : "none"}
          className={star <= rating ? "tm-star-filled" : "tm-star-empty"}
        />
      ))}
    </div>
  );

  return (
    <div className="tm-page">
      <div className="tm-page-heading">
        <div>
          <span className="tm-eyebrow">CUSTOMER FEEDBACK</span>
          <h1>Testimonials</h1>
          <p>Manage customer reviews displayed on your website.</p>
        </div>

        <button className="tm-primary-btn" onClick={openAddModal}>
          <Plus size={18} />
          Add Testimonial
        </button>
      </div>

      <div className="tm-stats">
        <div className="tm-stat-card">
          <div className="tm-stat-icon tm-icon-purple">
            <MessageSquareQuote size={21} />
          </div>
          <div>
            <span>Total Testimonials</span>
            <strong>{testimonials.length}</strong>
          </div>
        </div>

        <div className="tm-stat-card">
          <div className="tm-stat-icon tm-icon-green">
            <Eye size={21} />
          </div>
          <div>
            <span>Published</span>
            <strong>{publishedCount}</strong>
          </div>
        </div>

        <div className="tm-stat-card">
          <div className="tm-stat-icon tm-icon-orange">
            <Star size={21} />
          </div>
          <div>
            <span>Average Rating</span>
            <strong>{averageRating} / 5</strong>
          </div>
        </div>
      </div>

      <div className="tm-content-card">
        <div className="tm-toolbar">
          <div className="tm-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search customer, company or review..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter by status"
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>

          <select
            value={ratingFilter}
            onChange={(event) => setRatingFilter(event.target.value)}
            aria-label="Filter by rating"
          >
            <option value="All">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        <div className="tm-list-heading">
          <div>
            <h2>Customer Reviews</h2>
            <p>{filteredTestimonials.length} testimonials found</p>
          </div>
        </div>

        {filteredTestimonials.length > 0 ? (
          <div className="tm-grid">
            {filteredTestimonials.map((item) => (
              <article className="tm-review-card" key={item.id}>
                <div className="tm-review-top">
                  <div className="tm-avatar">
                    {item.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="tm-customer">
                    <h3>{item.name}</h3>
                    <p>{item.company}</p>
                  </div>

                  <span
                    className={`tm-status ${
                      item.status === "Published"
                        ? "tm-status-published"
                        : "tm-status-draft"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {renderStars(item.rating)}

                <p className="tm-review-message">
                  “{item.message}”
                </p>

                <div className="tm-review-footer">
                  <div className="tm-review-role">
                    {item.role || "Customer"}
                  </div>

                  <div className="tm-actions">
                    <button
                      className="tm-icon-btn"
                      title="View testimonial"
                      onClick={() => setSelectedTestimonial(item)}
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      className="tm-icon-btn"
                      title="Edit testimonial"
                      onClick={() => openEditModal(item)}
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      className="tm-icon-btn"
                      title={
                        item.status === "Published"
                          ? "Move to draft"
                          : "Publish testimonial"
                      }
                      onClick={() => toggleStatus(item.id)}
                    >
                      {item.status === "Published" ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>

                    <button
                      className="tm-icon-btn tm-delete-btn"
                      title="Delete testimonial"
                      onClick={() => deleteTestimonial(item.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="tm-empty">
            <MessageSquareQuote size={38} />
            <h3>No testimonials found</h3>
            <p>Try changing your filters or add a testimonial.</p>
            <button className="tm-primary-btn" onClick={openAddModal}>
              <Plus size={17} />
              Add Testimonial
            </button>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="tm-overlay" onMouseDown={closeModal}>
          <div
            className="tm-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="tm-modal-header">
              <div>
                <span className="tm-eyebrow">CUSTOMER FEEDBACK</span>
                <h2>
                  {editingId !== null
                    ? "Edit Testimonial"
                    : "Add Testimonial"}
                </h2>
              </div>

              <button
                className="tm-close-btn"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="tm-form-row">
                <div className="tm-form-group">
                  <label htmlFor="tm-name">Customer Name *</label>
                  <input
                    id="tm-name"
                    value={form.name}
                    onChange={(event) =>
                      setForm({ ...form, name: event.target.value })
                    }
                    placeholder="Enter customer name"
                    required
                  />
                </div>

                <div className="tm-form-group">
                  <label htmlFor="tm-company">Company *</label>
                  <input
                    id="tm-company"
                    value={form.company}
                    onChange={(event) =>
                      setForm({ ...form, company: event.target.value })
                    }
                    placeholder="Enter company name"
                    required
                  />
                </div>
              </div>

              <div className="tm-form-group">
                <label htmlFor="tm-role">Designation</label>
                <input
                  id="tm-role"
                  value={form.role}
                  onChange={(event) =>
                    setForm({ ...form, role: event.target.value })
                  }
                  placeholder="e.g. Project Manager"
                />
              </div>

              <div className="tm-form-group">
                <label>Rating *</label>
                <div className="tm-rating-picker">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={
                        star <= Number(form.rating)
                          ? "tm-rating-active"
                          : ""
                      }
                      onClick={() => setForm({ ...form, rating: star })}
                      aria-label={`Set rating to ${star} stars`}
                    >
                      <Star
                        size={25}
                        fill={
                          star <= Number(form.rating)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="tm-form-group">
                <label htmlFor="tm-message">Customer Review *</label>
                <textarea
                  id="tm-message"
                  value={form.message}
                  onChange={(event) =>
                    setForm({ ...form, message: event.target.value })
                  }
                  placeholder="Write the customer's review..."
                  rows={5}
                  required
                />
              </div>

              <div className="tm-form-group">
                <label htmlFor="tm-status">Status</label>
                <select
                  id="tm-status"
                  value={form.status}
                  onChange={(event) =>
                    setForm({ ...form, status: event.target.value })
                  }
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              {error && <p className="tm-error">{error}</p>}

              <div className="tm-modal-actions">
                <button
                  type="button"
                  className="tm-secondary-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="tm-primary-btn">
                  {editingId !== null
                    ? "Save Changes"
                    : "Create Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedTestimonial && (
        <div
          className="tm-overlay"
          onMouseDown={() => setSelectedTestimonial(null)}
        >
          <div
            className="tm-modal tm-view-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="tm-modal-header">
              <div>
                <span className="tm-eyebrow">REVIEW DETAILS</span>
                <h2>Customer Testimonial</h2>
              </div>

              <button
                className="tm-close-btn"
                onClick={() => setSelectedTestimonial(null)}
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="tm-view-customer">
              <div className="tm-avatar tm-avatar-large">
                {selectedTestimonial.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3>{selectedTestimonial.name}</h3>
                <p>{selectedTestimonial.company}</p>
                <span>{selectedTestimonial.role || "Customer"}</span>
              </div>
            </div>

            {renderStars(selectedTestimonial.rating)}

            <div className="tm-view-message">
              <p>“{selectedTestimonial.message}”</p>
            </div>

            <div className="tm-view-bottom">
              <span
                className={`tm-status ${
                  selectedTestimonial.status === "Published"
                    ? "tm-status-published"
                    : "tm-status-draft"
                }`}
              >
                {selectedTestimonial.status}
              </span>

              <button
                className="tm-primary-btn"
                onClick={() => {
                  const item = selectedTestimonial;
                  setSelectedTestimonial(null);
                  openEditModal(item);
                }}
              >
                <Pencil size={16} />
                Edit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
