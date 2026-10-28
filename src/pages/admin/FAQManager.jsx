
import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  HelpCircle,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import "./FAQManager.css";

const initialFaqs = [
  {
    id: 1,
    question: "What types of construction equipment do you offer?",
    answer:
      "We offer a range of construction equipment and machinery for different industrial and infrastructure requirements.",
    category: "Products",
    status: "Published",
  },
  {
    id: 2,
    question: "How can I request a quotation?",
    answer:
      "You can submit your requirements through our quotation form. Our team will review your enquiry and contact you.",
    category: "Orders",
    status: "Published",
  },
  {
    id: 3,
    question: "Do you provide after-sales support?",
    answer:
      "Please contact our support team with your equipment details to learn about the available after-sales services.",
    category: "Support",
    status: "Draft",
  },
];

const emptyFaq = {
  question: "",
  answer: "",
  category: "General",
  status: "Published",
};

export default function FAQManager() {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [form, setForm] = useState(emptyFaq);
  const [error, setError] = useState("");

  const categories = [
    "General",
    "Products",
    "Orders",
    "Delivery",
    "Support",
  ];

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        faq.question.toLowerCase().includes(searchText) ||
        faq.answer.toLowerCase().includes(searchText) ||
        faq.category.toLowerCase().includes(searchText);

      const matchesCategory =
        categoryFilter === "All" || faq.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" || faq.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [faqs, search, categoryFilter, statusFilter]);

  const publishedCount = faqs.filter(
    (faq) => faq.status === "Published"
  ).length;

  const draftCount = faqs.filter(
    (faq) => faq.status === "Draft"
  ).length;

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyFaq);
    setError("");
    setModalOpen(true);
  };

  const openEditModal = (faq) => {
    setEditingId(faq.id);
    setForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      status: faq.status,
    });
    setError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyFaq);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.question.trim() || !form.answer.trim()) {
      setError("Please enter both the question and the answer.");
      return;
    }

    if (editingId !== null) {
      setFaqs((currentFaqs) =>
        currentFaqs.map((faq) =>
          faq.id === editingId
            ? {
                ...faq,
                ...form,
                question: form.question.trim(),
                answer: form.answer.trim(),
              }
            : faq
        )
      );
    } else {
      const newFaq = {
        id: Date.now(),
        ...form,
        question: form.question.trim(),
        answer: form.answer.trim(),
      };

      setFaqs((currentFaqs) => [newFaq, ...currentFaqs]);
    }

    closeModal();
  };

  const toggleStatus = (id) => {
    setFaqs((currentFaqs) =>
      currentFaqs.map((faq) =>
        faq.id === id
          ? {
              ...faq,
              status:
                faq.status === "Published" ? "Draft" : "Published",
            }
          : faq
      )
    );
  };

  const deleteFaq = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this FAQ?"
    );

    if (!confirmed) return;

    setFaqs((currentFaqs) =>
      currentFaqs.filter((faq) => faq.id !== id)
    );

    if (expandedId === id) {
      setExpandedId(null);
    }
  };

  return (
    <div className="faq-manager">
      <div className="faq-page-heading">
        <div>
          <span className="faq-eyebrow">CONTENT MANAGEMENT</span>
          <h1>FAQ Management</h1>
          <p>Manage frequently asked questions for your website.</p>
        </div>

        <button className="faq-primary-btn" onClick={openAddModal}>
          <Plus size={18} />
          Add New FAQ
        </button>
      </div>

      <div className="faq-stats">
        <div className="faq-stat-card">
          <div className="faq-stat-icon faq-stat-purple">
            <HelpCircle size={21} />
          </div>
          <div>
            <span>Total FAQs</span>
            <strong>{faqs.length}</strong>
          </div>
        </div>

        <div className="faq-stat-card">
          <div className="faq-stat-icon faq-stat-green">
            <Eye size={21} />
          </div>
          <div>
            <span>Published</span>
            <strong>{publishedCount}</strong>
          </div>
        </div>

        <div className="faq-stat-card">
          <div className="faq-stat-icon faq-stat-orange">
            <EyeOff size={21} />
          </div>
          <div>
            <span>Drafts</span>
            <strong>{draftCount}</strong>
          </div>
        </div>
      </div>

      <div className="faq-content-card">
        <div className="faq-toolbar">
          <div className="faq-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search questions, answers..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            aria-label="Filter by category"
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter by status"
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        <div className="faq-list-heading">
          <div>
            <h2>Frequently Asked Questions</h2>
            <p>{filteredFaqs.length} FAQs found</p>
          </div>
        </div>

        {filteredFaqs.length > 0 ? (
          <div className="faq-list">
            {filteredFaqs.map((faq, index) => {
              const expanded = expandedId === faq.id;

              return (
                <div className="faq-item" key={faq.id}>
                  <div className="faq-item-main">
                    <button
                      className="faq-expand-btn"
                      onClick={() =>
                        setExpandedId(expanded ? null : faq.id)
                      }
                      aria-label={expanded ? "Collapse FAQ" : "Expand FAQ"}
                    >
                      {expanded ? (
                        <ChevronUp size={19} />
                      ) : (
                        <ChevronDown size={19} />
                      )}
                    </button>

                    <div className="faq-item-info">
                      <div className="faq-question-line">
                        <span className="faq-item-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3>{faq.question}</h3>
                      </div>

                      <div className="faq-item-meta">
                        <span className="faq-category">
                          {faq.category}
                        </span>

                        <span
                          className={`faq-status ${
                            faq.status === "Published"
                              ? "faq-status-published"
                              : "faq-status-draft"
                          }`}
                        >
                          {faq.status}
                        </span>
                      </div>
                    </div>

                    <div className="faq-item-actions">
                      <button
                        className="faq-icon-btn"
                        title="Edit FAQ"
                        onClick={() => openEditModal(faq)}
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        className="faq-icon-btn"
                        title={
                          faq.status === "Published"
                            ? "Move to draft"
                            : "Publish FAQ"
                        }
                        onClick={() => toggleStatus(faq.id)}
                      >
                        {faq.status === "Published" ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>

                      <button
                        className="faq-icon-btn faq-delete-btn"
                        title="Delete FAQ"
                        onClick={() => deleteFaq(faq.id)}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>

                  {expanded && (
                    <div className="faq-answer">
                      <strong>Answer</strong>
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="faq-empty-state">
            <HelpCircle size={36} />
            <h3>No FAQs found</h3>
            <p>Try changing your search or add a new FAQ.</p>
            <button className="faq-primary-btn" onClick={openAddModal}>
              <Plus size={17} />
              Add New FAQ
            </button>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="faq-modal-overlay" onMouseDown={closeModal}>
          <div
            className="faq-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="faq-modal-header">
              <div>
                <span className="faq-eyebrow">FAQ CONTENT</span>
                <h2>{editingId !== null ? "Edit FAQ" : "Add New FAQ"}</h2>
              </div>

              <button
                className="faq-modal-close"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="faq-form-group">
                <label htmlFor="faq-question">Question *</label>
                <input
                  id="faq-question"
                  type="text"
                  placeholder="Enter the question"
                  value={form.question}
                  onChange={(event) =>
                    setForm({ ...form, question: event.target.value })
                  }
                  maxLength={250}
                  required
                />
              </div>

              <div className="faq-form-group">
                <label htmlFor="faq-answer">Answer *</label>
                <textarea
                  id="faq-answer"
                  placeholder="Write a clear answer..."
                  value={form.answer}
                  onChange={(event) =>
                    setForm({ ...form, answer: event.target.value })
                  }
                  rows={5}
                  required
                />
              </div>

              <div className="faq-form-row">
                <div className="faq-form-group">
                  <label htmlFor="faq-category">Category</label>
                  <select
                    id="faq-category"
                    value={form.category}
                    onChange={(event) =>
                      setForm({ ...form, category: event.target.value })
                    }
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="faq-form-group">
                  <label htmlFor="faq-status">Status</label>
                  <select
                    id="faq-status"
                    value={form.status}
                    onChange={(event) =>
                      setForm({ ...form, status: event.target.value })
                    }
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              {error && <p className="faq-form-error">{error}</p>}

              <div className="faq-modal-actions">
                <button
                  type="button"
                  className="faq-secondary-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="faq-primary-btn">
                  {editingId !== null ? "Save Changes" : "Create FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
