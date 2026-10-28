import { useState } from "react";
import {
  FileText,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Eye,
  EyeOff,
  Save,
} from "lucide-react";
import "./ContentManager.css";

const initialPages = [
  {
    id: 1,
    page: "Home",
    slug: "/",
    title: "Powering Progress with Reliable Equipment",
    subtitle: "Your trusted partner for construction equipment.",
    description: "Manage the main homepage content from this section.",
    status: "Published",
  },
  {
    id: 2,
    page: "About Us",
    slug: "/about",
    title: "About LUBESON",
    subtitle: "Built on trust. Driven by performance.",
    description: "Manage the company introduction and about page content.",
    status: "Published",
  },
  {
    id: 3,
    page: "Equipment",
    slug: "/equipment",
    title: "Explore Our Equipment",
    subtitle: "Find the right equipment for your next project.",
    description: "Manage the equipment listing page introduction.",
    status: "Published",
  },
  {
    id: 4,
    page: "Services",
    slug: "/services",
    title: "Equipment Services",
    subtitle: "Support that keeps your operations moving.",
    description: "Manage the services page introduction.",
    status: "Published",
  },
  {
    id: 5,
    page: "Contact",
    slug: "/contact",
    title: "Get in Touch",
    subtitle: "Our team is ready to help you find the right solution.",
    description: "Manage the contact page introduction.",
    status: "Draft",
  },
];

export default function ContentManager() {
  const [pages, setPages] = useState(initialPages);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [notice, setNotice] = useState("");

  const [form, setForm] = useState({
    page: "",
    slug: "",
    title: "",
    subtitle: "",
    description: "",
    status: "Draft",
  });

  const filteredPages = pages.filter((page) => {
    const query = searchTerm.toLowerCase();

    return (
      page.page.toLowerCase().includes(query) ||
      page.title.toLowerCase().includes(query) ||
      page.slug.toLowerCase().includes(query)
    );
  });

  const publishedCount = pages.filter(
    (page) => page.status === "Published"
  ).length;

  function resetForm() {
    setForm({
      page: "",
      slug: "",
      title: "",
      subtitle: "",
      description: "",
      status: "Draft",
    });
  }

  function openAddForm() {
    setEditingId(null);
    resetForm();
    setNotice("");
    setShowForm(true);
  }

  function openEditForm(page) {
    setEditingId(page.id);

    setForm({
      page: page.page,
      slug: page.slug,
      title: page.title,
      subtitle: page.subtitle,
      description: page.description,
      status: page.status,
    });

    setNotice("");
    setShowForm(true);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setNotice("");

    const pageName = form.page.trim();
    const pageSlug = form.slug.trim();
    const pageTitle = form.title.trim();

    if (!pageName || !pageSlug || !pageTitle) {
      setNotice("Please complete the page name, URL and heading.");
      return;
    }

    const duplicateSlug = pages.some(
      (page) => page.slug === pageSlug && page.id !== editingId
    );

    if (duplicateSlug) {
      setNotice("A page with this URL already exists.");
      return;
    }

    const pageData = {
      ...form,
      page: pageName,
      slug: pageSlug,
      title: pageTitle,
      subtitle: form.subtitle.trim(),
      description: form.description.trim(),
    };

    if (editingId !== null) {
      setPages((current) =>
        current.map((page) =>
          page.id === editingId ? { ...page, ...pageData } : page
        )
      );

      setNotice("Page content updated in this session.");
    } else {
      setPages((current) => [
        {
          id: Date.now(),
          ...pageData,
        },
        ...current,
      ]);

      setNotice("Page content added in this session.");
    }

    setShowForm(false);
  }

  function handleDelete(id) {
    const page = pages.find((item) => item.id === id);

    if (!page) return;

    const confirmed = window.confirm(
      `Remove "${page.page}" from this session's content list?`
    );

    if (!confirmed) return;

    setPages((current) => current.filter((item) => item.id !== id));
    setNotice("Page removed from this session.");
  }

  function toggleStatus(id) {
    setPages((current) =>
      current.map((page) =>
        page.id === id
          ? {
              ...page,
              status: page.status === "Published" ? "Draft" : "Published",
            }
          : page
      )
    );

    setNotice("Status updated for this session.");
  }

  return (
    <div className="content-manager">
      <div className="content-manager-heading">
        <div>
          <span className="content-manager-eyebrow">
            WEBSITE MANAGEMENT
          </span>
          <h2>Page Content</h2>
          <p>
            Manage page headings, supporting text, descriptions and publication
            status from one workspace.
          </p>
        </div>

        <button
          type="button"
          className="content-primary-button"
          onClick={openAddForm}
        >
          <Plus size={18} />
          Add Page Content
        </button>
      </div>

      <div className="content-stats-grid">
        <div className="content-stat-card">
          <div className="content-stat-icon">
            <FileText size={21} />
          </div>
          <div>
            <span>Total Pages</span>
            <strong>{pages.length}</strong>
          </div>
        </div>

        <div className="content-stat-card">
          <div className="content-stat-icon published">
            <Eye size={21} />
          </div>
          <div>
            <span>Published</span>
            <strong>{publishedCount}</strong>
          </div>
        </div>

        <div className="content-stat-card">
          <div className="content-stat-icon drafts">
            <EyeOff size={21} />
          </div>
          <div>
            <span>Drafts</span>
            <strong>{pages.length - publishedCount}</strong>
          </div>
        </div>
      </div>

      {notice && (
        <div className="content-notice" role="status">
          <span>{notice}</span>
          <button
            type="button"
            aria-label="Dismiss message"
            onClick={() => setNotice("")}
          >
            <X size={16} />
          </button>
        </div>
      )}

      <section className="content-list-panel">
        <div className="content-list-toolbar">
          <div>
            <h3>Website Pages</h3>
            <p>Review and manage page content entries.</p>
          </div>

          <label className="content-search">
            <Search size={17} />
            <input
              type="search"
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
        </div>

        <div className="content-table-wrapper">
          <table className="content-table">
            <thead>
              <tr>
                <th>Page</th>
                <th>Heading</th>
                <th>URL</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredPages.map((page) => (
                <tr key={page.id}>
                  <td>
                    <div className="content-page-cell">
                      <div className="content-page-icon">
                        <FileText size={18} />
                      </div>

                      <div>
                        <strong>{page.page}</strong>
                        <span>Page content</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="content-heading-cell">
                      <strong>{page.title}</strong>
                      <span>{page.subtitle || "No subtitle"}</span>
                    </div>
                  </td>

                  <td>
                    <code className="content-page-slug">{page.slug}</code>
                  </td>

                  <td>
                    <span
                      className={`content-status ${
                        page.status === "Published"
                          ? "published"
                          : "draft"
                      }`}
                    >
                      <span />
                      {page.status}
                    </span>
                  </td>

                  <td>
                    <div className="content-row-actions">
                      <button
                        type="button"
                        className="content-edit-button"
                        title="Edit page content"
                        aria-label={`Edit ${page.page}`}
                        onClick={() => openEditForm(page)}
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        className="content-status-button"
                        title={
                          page.status === "Published"
                            ? "Move to draft"
                            : "Publish page"
                        }
                        aria-label={`Change publication status for ${page.page}`}
                        onClick={() => toggleStatus(page.id)}
                      >
                        {page.status === "Published" ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>

                      <button
                        type="button"
                        className="content-delete-button"
                        title="Remove content entry"
                        aria-label={`Remove ${page.page}`}
                        onClick={() => handleDelete(page.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredPages.length === 0 && (
                <tr>
                  <td colSpan="5">
                    <div className="content-empty-state">
                      <div className="content-empty-icon">
                        <FileText size={27} />
                      </div>

                      <h4>
                        {searchTerm
                          ? "No matching pages"
                          : "No page content available"}
                      </h4>

                      <p>
                        {searchTerm
                          ? "Try a different page name or URL."
                          : "Add a page content entry to get started."}
                      </p>

                      {!searchTerm && (
                        <button
                          type="button"
                          className="content-primary-button"
                          onClick={openAddForm}
                        >
                          <Plus size={17} />
                          Add Page Content
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="content-list-footer">
          <span>
            Showing {filteredPages.length} of {pages.length} pages
          </span>
          <span>Website content management</span>
        </div>
      </section>

      {showForm && (
        <div
          className="content-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowForm(false);
            }
          }}
        >
          <section
            className="content-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="content-modal-title"
          >
            <div className="content-modal-header">
              <div>
                <span className="content-manager-eyebrow">
                  PAGE CONFIGURATION
                </span>
                <h3 id="content-modal-title">
                  {editingId !== null ? "Edit Page Content" : "Add Page Content"}
                </h3>
              </div>

              <button
                type="button"
                className="content-modal-close"
                aria-label="Close form"
                onClick={() => setShowForm(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form className="content-form" onSubmit={handleSubmit}>
              <div className="content-form-field">
                <label htmlFor="content-page-name">Page name *</label>
                <input
                  id="content-page-name"
                  name="page"
                  value={form.page}
                  onChange={handleInputChange}
                  placeholder="e.g. About Us"
                  required
                />
              </div>

              <div className="content-form-field">
                <label htmlFor="content-page-slug">Page URL *</label>
                <input
                  id="content-page-slug"
                  name="slug"
                  value={form.slug}
                  onChange={handleInputChange}
                  placeholder="e.g. /about"
                  required
                />
              </div>

              <div className="content-form-field">
                <label htmlFor="content-page-title">Main heading *</label>
                <input
                  id="content-page-title"
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  placeholder="Enter the main page heading"
                  required
                />
              </div>

              <div className="content-form-field">
                <label htmlFor="content-page-subtitle">Subtitle</label>
                <input
                  id="content-page-subtitle"
                  name="subtitle"
                  value={form.subtitle}
                  onChange={handleInputChange}
                  placeholder="Enter a supporting message"
                />
              </div>

              <div className="content-form-field">
                <label htmlFor="content-page-description">Description</label>
                <textarea
                  id="content-page-description"
                  name="description"
                  rows="4"
                  value={form.description}
                  onChange={handleInputChange}
                  placeholder="Write the page description..."
                />
              </div>

              <div className="content-form-field">
                <label htmlFor="content-page-status">Publication status</label>
                <select
                  id="content-page-status"
                  name="status"
                  value={form.status}
                  onChange={handleInputChange}
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>

              <div className="content-form-note">
                These entries are managed in temporary page state. Editing
                them here will not yet change the actual public website pages.
              </div>

              <div className="content-form-actions">
                <button
                  type="button"
                  className="content-secondary-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="content-primary-button">
                  <Save size={16} />
                  {editingId !== null ? "Save Changes" : "Create Entry"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}