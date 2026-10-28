
import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  X,
  Globe,
  FileText,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Save,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import "./SeoManager.css";

const initialPages = [
  {
    id: 1,
    pageName: "Home",
    path: "/",
    title: "LUBESON | Construction Equipment & Machinery",
    description:
      "Explore reliable construction equipment, heavy machinery, and industrial solutions with LUBESON.",
    keywords: "construction equipment, heavy machinery, LUBESON",
    indexable: true,
    status: "Optimized",
  },
  {
    id: 2,
    pageName: "Equipment",
    path: "/equipment",
    title: "Construction Equipment for Sale | LUBESON",
    description:
      "Discover construction machinery and equipment for your industrial and infrastructure projects.",
    keywords: "construction machinery, equipment for sale, industrial equipment",
    indexable: true,
    status: "Optimized",
  },
  {
    id: 3,
    pageName: "Services",
    path: "/services",
    title: "Our Services | LUBESON",
    description:
      "Learn about LUBESON services and support for construction equipment and machinery.",
    keywords: "equipment services, machinery support, LUBESON services",
    indexable: true,
    status: "Needs Review",
  },
  {
    id: 4,
    pageName: "About Us",
    path: "/about",
    title: "About LUBESON | Our Company",
    description:
      "Learn about LUBESON, our business, and our commitment to construction equipment solutions.",
    keywords: "about LUBESON, construction equipment company",
    indexable: true,
    status: "Optimized",
  },
  {
    id: 5,
    pageName: "Contact",
    path: "/contact",
    title: "",
    description: "",
    keywords: "",
    indexable: true,
    status: "Incomplete",
  },
];

const emptyPage = {
  pageName: "",
  path: "",
  title: "",
  description: "",
  keywords: "",
  indexable: true,
  status: "Incomplete",
};

function getSeoStatus(page) {
  if (!page.title.trim() || !page.description.trim()) {
    return "Incomplete";
  }

  if (
    page.title.length > 60 ||
    page.description.length > 160 ||
    !page.keywords.trim()
  ) {
    return "Needs Review";
  }

  return "Optimized";
}

function SeoStatusBadge({ status }) {
  const statusClass = status.toLowerCase().replace(/\s+/g, "-");

  return (
    <span className={`seo-status-badge ${statusClass}`}>
      <span className="seo-status-dot" />
      {status}
    </span>
  );
}

export default function SeoManager() {
  const [pages, setPages] = useState(initialPages);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [indexFilter, setIndexFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedPage, setSelectedPage] = useState(null);
  const [form, setForm] = useState(emptyPage);
  const [notice, setNotice] = useState("");

  const filteredPages = useMemo(() => {
    const query = search.trim().toLowerCase();

    return pages.filter((page) => {
      const matchesSearch =
        !query ||
        page.pageName.toLowerCase().includes(query) ||
        page.path.toLowerCase().includes(query) ||
        page.title.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || getSeoStatus(page) === statusFilter;

      const matchesIndex =
        indexFilter === "All" ||
        (indexFilter === "Indexable" && page.indexable) ||
        (indexFilter === "No Index" && !page.indexable);

      return matchesSearch && matchesStatus && matchesIndex;
    });
  }, [pages, search, statusFilter, indexFilter]);

  const stats = useMemo(() => {
    return {
      total: pages.length,
      optimized: pages.filter(
        (page) => getSeoStatus(page) === "Optimized"
      ).length,
      review: pages.filter(
        (page) => getSeoStatus(page) === "Needs Review"
      ).length,
      incomplete: pages.filter(
        (page) => getSeoStatus(page) === "Incomplete"
      ).length,
    };
  }, [pages]);

  const openAddModal = () => {
    setModalMode("add");
    setSelectedPage(null);
    setForm({ ...emptyPage });
    setNotice("");
    setModalOpen(true);
  };

  const openEditModal = (page) => {
    setModalMode("edit");
    setSelectedPage(page);
    setForm({ ...page });
    setNotice("");
    setModalOpen(true);
  };

  const openViewModal = (page) => {
    setModalMode("view");
    setSelectedPage(page);
    setForm({ ...page });
    setNotice("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPage(null);
    setForm({ ...emptyPage });
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    const pageName = form.pageName.trim();
    const path = form.path.trim();

    if (!pageName || !path) {
      setNotice("Page name and page path are required.");
      return;
    }

    if (!path.startsWith("/")) {
      setNotice("Page path must start with /, for example /equipment.");
      return;
    }

    const duplicatePath = pages.some(
      (page) =>
        page.path.toLowerCase() === path.toLowerCase() &&
        page.id !== selectedPage?.id
    );

    if (duplicatePath) {
      setNotice("This page path already exists.");
      return;
    }

    const updatedPage = {
      ...form,
      id: selectedPage?.id ?? Date.now(),
      pageName,
      path,
      title: form.title.trim(),
      description: form.description.trim(),
      keywords: form.keywords.trim(),
    };

    updatedPage.status = getSeoStatus(updatedPage);

    if (modalMode === "edit" && selectedPage) {
      setPages((current) =>
        current.map((page) =>
          page.id === selectedPage.id ? updatedPage : page
        )
      );
      setNotice("SEO settings updated for this session.");
    } else {
      setPages((current) => [...current, updatedPage]);
      setNotice("SEO page added for this session.");
    }

    setModalOpen(false);
    setSelectedPage(null);
    setForm({ ...emptyPage });
  };

  const handleDelete = (page) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete SEO settings for "${page.pageName}"?`
    );

    if (!confirmed) return;

    setPages((current) => current.filter((item) => item.id !== page.id));
    setNotice(`SEO entry for "${page.pageName}" removed from this session.`);
  };

  const handleIndexToggle = (page) => {
    setPages((current) =>
      current.map((item) =>
        item.id === page.id
          ? { ...item, indexable: !item.indexable }
          : item
      )
    );
  };

  const resetDemoData = () => {
    const confirmed = window.confirm(
      "Reset SEO settings to the original demo data?"
    );

    if (!confirmed) return;

    setPages(initialPages.map((page) => ({ ...page })));
    setSearch("");
    setStatusFilter("All");
    setIndexFilter("All");
    setNotice("Demo SEO data has been reset.");
  };

  return (
    <div className="seo-manager">
      <div className="seo-page-header">
        <div>
          <div className="seo-eyebrow">
            <Globe size={15} />
            WEBSITE CONFIGURATION
          </div>

          <h1>SEO Manager</h1>

          <p>
            Manage search engine titles, descriptions and indexing preferences
            for your website pages.
          </p>
        </div>

        <div className="seo-header-actions">
          <button
            type="button"
            className="seo-btn seo-btn-secondary"
            onClick={resetDemoData}
          >
            <RotateCcw size={16} />
            Reset Demo
          </button>

          <button
            type="button"
            className="seo-btn seo-btn-primary"
            onClick={openAddModal}
          >
            <Plus size={17} />
            Add SEO Page
          </button>
        </div>
      </div>

      {notice && (
        <div className="seo-notice" role="status">
          <CheckCircle2 size={18} />
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            <X size={17} />
          </button>
        </div>
      )}

      <div className="seo-stats-grid">
        <div className="seo-stat-card">
          <div className="seo-stat-icon total">
            <FileText size={21} />
          </div>
          <div>
            <span>Total Pages</span>
            <h2>{stats.total}</h2>
            <small>SEO entries configured</small>
          </div>
        </div>

        <div className="seo-stat-card">
          <div className="seo-stat-icon optimized">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>Optimized</span>
            <h2>{stats.optimized}</h2>
            <small>Passing basic checks</small>
          </div>
        </div>

        <div className="seo-stat-card">
          <div className="seo-stat-icon review">
            <AlertCircle size={21} />
          </div>
          <div>
            <span>Needs Review</span>
            <h2>{stats.review}</h2>
            <small>Review metadata length</small>
          </div>
        </div>

        <div className="seo-stat-card">
          <div className="seo-stat-icon incomplete">
            <Search size={21} />
          </div>
          <div>
            <span>Incomplete</span>
            <h2>{stats.incomplete}</h2>
            <small>Missing key metadata</small>
          </div>
        </div>
      </div>

      <div className="seo-guidance">
        <div className="seo-guidance-icon">
          <AlertCircle size={20} />
        </div>

        <div>
          <h3>SEO checklist</h3>
          <p>
            As a basic guideline, aim for a descriptive page title around
            50–60 characters and a meta description around 150–160 characters.
            These are recommendations, not guaranteed search engine limits.
          </p>
        </div>
      </div>

      <div className="seo-table-card">
        <div className="seo-table-header">
          <div>
            <h2>Page Metadata</h2>
            <p>Review and edit metadata for individual pages.</p>
          </div>

          <span className="seo-record-count">
            {filteredPages.length}{" "}
            {filteredPages.length === 1 ? "page" : "pages"}
          </span>
        </div>

        <div className="seo-filters">
          <div className="seo-search-box">
            <Search size={17} />
            <input
              type="search"
              placeholder="Search pages, paths or titles..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <label className="seo-select-wrap">
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Optimized">Optimized</option>
              <option value="Needs Review">Needs Review</option>
              <option value="Incomplete">Incomplete</option>
            </select>
            <ChevronDown size={15} />
          </label>

          <label className="seo-select-wrap">
            <span>Indexing:</span>
            <select
              value={indexFilter}
              onChange={(event) => setIndexFilter(event.target.value)}
            >
              <option value="All">All Pages</option>
              <option value="Indexable">Indexable</option>
              <option value="No Index">No Index</option>
            </select>
            <ChevronDown size={15} />
          </label>
        </div>

        <div className="seo-table-scroll">
          <table className="seo-table">
            <thead>
              <tr>
                <th>PAGE</th>
                <th>TITLE & DESCRIPTION</th>
                <th>SEO STATUS</th>
                <th>INDEXING</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredPages.map((page) => (
                <tr key={page.id}>
                  <td>
                    <div className="seo-page-cell">
                      <div className="seo-page-icon">
                        <FileText size={18} />
                      </div>
                      <div>
                        <strong>{page.pageName}</strong>
                        <span>{page.path}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="seo-metadata-cell">
                      <strong>
                        {page.title || "No title configured"}
                      </strong>
                      <span>
                        {page.description || "No meta description configured"}
                      </span>
                      {page.title && (
                        <small>{page.title.length} title characters</small>
                      )}
                    </div>
                  </td>

                  <td>
                    <SeoStatusBadge status={getSeoStatus(page)} />
                  </td>

                  <td>
                    <button
                      type="button"
                      className={`seo-index-toggle ${
                        page.indexable ? "is-indexable" : "is-noindex"
                      }`}
                      onClick={() => handleIndexToggle(page)}
                      title="Toggle indexing preference"
                    >
                      <span className="seo-index-dot" />
                      {page.indexable ? "Indexable" : "No Index"}
                    </button>
                  </td>

                  <td>
                    <div className="seo-row-actions">
                      <button
                        type="button"
                        className="seo-action-btn"
                        onClick={() => openViewModal(page)}
                        title="Preview metadata"
                        aria-label={`Preview ${page.pageName}`}
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        type="button"
                        className="seo-action-btn edit"
                        onClick={() => openEditModal(page)}
                        title="Edit SEO"
                        aria-label={`Edit ${page.pageName}`}
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        className="seo-action-btn delete"
                        onClick={() => handleDelete(page)}
                        title="Delete SEO entry"
                        aria-label={`Delete ${page.pageName}`}
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
                    <div className="seo-empty-state">
                      <div className="seo-empty-icon">
                        <Search size={25} />
                      </div>
                      <h3>No SEO pages found</h3>
                      <p>
                        Try changing your filters or add a new SEO page.
                      </p>
                      <button
                        type="button"
                        className="seo-btn seo-btn-primary"
                        onClick={openAddModal}
                      >
                        <Plus size={16} />
                        Add SEO Page
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="seo-table-footer">
          <span>
            Showing {filteredPages.length} of {pages.length} pages
          </span>
          <span className="seo-demo-label">DEMO DATA</span>
        </div>
      </div>

      {modalOpen && (
        <div
          className="seo-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div
            className="seo-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="seo-modal-title"
          >
            <div className="seo-modal-header">
              <div>
                <h2 id="seo-modal-title">
                  {modalMode === "view"
                    ? "SEO Preview"
                    : modalMode === "edit"
                      ? "Edit SEO Page"
                      : "Add SEO Page"}
                </h2>
                <p>
                  {modalMode === "view"
                    ? "Preview the metadata currently configured."
                    : "Enter the metadata for this website page."}
                </p>
              </div>

              <button
                type="button"
                className="seo-modal-close"
                onClick={closeModal}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            {modalMode === "view" ? (
              <div className="seo-modal-body">
                <div className="seo-preview-card">
                  <div className="seo-preview-label">
                    SEARCH RESULT PREVIEW
                  </div>

                  <h3>
                    {form.title || "Page title not configured"}
                  </h3>

                  <a
                    href="#seo-preview"
                    onClick={(event) => event.preventDefault()}
                  >
                    lubeson.com{form.path}
                    <ExternalLink size={12} />
                  </a>

                  <p>
                    {form.description ||
                      "No meta description has been configured for this page."}
                  </p>
                </div>

                <div className="seo-preview-details">
                  <div>
                    <span>Page name</span>
                    <strong>{form.pageName}</strong>
                  </div>
                  <div>
                    <span>Page path</span>
                    <strong>{form.path}</strong>
                  </div>
                  <div>
                    <span>Title length</span>
                    <strong>{form.title.length} characters</strong>
                  </div>
                  <div>
                    <span>Description length</span>
                    <strong>{form.description.length} characters</strong>
                  </div>
                  <div>
                    <span>Indexing preference</span>
                    <strong>
                      {form.indexable ? "Indexable" : "No Index"}
                    </strong>
                  </div>
                  <div>
                    <span>Basic SEO status</span>
                    <SeoStatusBadge status={getSeoStatus(form)} />
                  </div>
                </div>

                {form.keywords && (
                  <div className="seo-keywords-preview">
                    <span>Keywords</span>
                    <p>{form.keywords}</p>
                  </div>
                )}

                <div className="seo-modal-footer">
                  <button
                    type="button"
                    className="seo-btn seo-btn-secondary"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="seo-btn seo-btn-primary"
                    onClick={() => openEditModal(selectedPage)}
                  >
                    <Pencil size={15} />
                    Edit Metadata
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSave}>
                <div className="seo-modal-body">
                  {notice && (
                    <div className="seo-form-error" role="alert">
                      <AlertCircle size={17} />
                      {notice}
                    </div>
                  )}

                  <div className="seo-form-grid">
                    <div className="seo-form-group">
                      <label htmlFor="seo-page-name">Page Name *</label>
                      <input
                        id="seo-page-name"
                        name="pageName"
                        value={form.pageName}
                        onChange={handleChange}
                        placeholder="e.g. Equipment"
                        required
                      />
                    </div>

                    <div className="seo-form-group">
                      <label htmlFor="seo-page-path">Page Path *</label>
                      <input
                        id="seo-page-path"
                        name="path"
                        value={form.path}
                        onChange={handleChange}
                        placeholder="e.g. /equipment"
                        required
                      />
                      <small>Use a path beginning with /.</small>
                    </div>

                    <div className="seo-form-group full-width">
                      <label htmlFor="seo-title">Meta Title</label>
                      <input
                        id="seo-title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Enter a descriptive page title"
                        maxLength={120}
                      />
                      <div
                        className={`seo-character-count ${
                          form.title.length > 60 ? "over-limit" : ""
                        }`}
                      >
                        {form.title.length}/60 recommended characters
                      </div>
                    </div>

                    <div className="seo-form-group full-width">
                      <label htmlFor="seo-description">
                        Meta Description
                      </label>
                      <textarea
                        id="seo-description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Summarize this page for search results..."
                        rows={4}
                        maxLength={320}
                      />
                      <div
                        className={`seo-character-count ${
                          form.description.length > 160 ? "over-limit" : ""
                        }`}
                      >
                        {form.description.length}/160 recommended characters
                      </div>
                    </div>

                    <div className="seo-form-group full-width">
                      <label htmlFor="seo-keywords">
                        Keywords (optional)
                      </label>
                      <input
                        id="seo-keywords"
                        name="keywords"
                        value={form.keywords}
                        onChange={handleChange}
                        placeholder="construction equipment, machinery"
                      />
                      <small>
                        Enter comma-separated terms for internal reference.
                        Search engines do not generally use meta keywords for
                        ranking.
                      </small>
                    </div>

                    <div className="seo-form-group full-width">
                      <label className="seo-checkbox-label">
                        <input
                          type="checkbox"
                          name="indexable"
                          checked={form.indexable}
                          onChange={handleChange}
                        />
                        <span>
                          <strong>Allow search engine indexing</strong>
                          <small>
                            This is a saved preference in this demo. It does
                            not change the live page's robots directives.
                          </small>
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="seo-preview-card seo-live-preview">
                    <div className="seo-preview-label">
                      SEARCH RESULT PREVIEW
                    </div>

                    <h3>{form.title || "Your page title will appear here"}</h3>

                    <a
                      href="#seo-live-preview"
                      onClick={(event) => event.preventDefault()}
                    >
                      lubeson.com{form.path || "/your-page"}
                      <ExternalLink size={12} />
                    </a>

                    <p>
                      {form.description ||
                        "Your meta description will appear here."}
                    </p>
                  </div>

                  <div className="seo-modal-footer">
                    <button
                      type="button"
                      className="seo-btn seo-btn-secondary"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="seo-btn seo-btn-primary"
                    >
                      <Save size={16} />
                      {modalMode === "edit" ? "Update SEO" : "Add SEO Page"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
