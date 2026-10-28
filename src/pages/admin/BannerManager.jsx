import { useState } from "react";
import {
  Images,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Eye,
  EyeOff,
  ImagePlus,
  ExternalLink,
} from "lucide-react";
import "./BannerManager.css";

export default function BannerManager() {
  const [banners, setBanners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [notice, setNotice] = useState("");

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    imageUrl: "",
    buttonText: "Explore Equipment",
    buttonLink: "/equipment",
    status: "Draft",
  });

  const filteredBanners = banners.filter((banner) => {
    const query = searchTerm.toLowerCase();

    return (
      banner.title.toLowerCase().includes(query) ||
      banner.subtitle.toLowerCase().includes(query)
    );
  });

  function resetForm() {
    setForm({
      title: "",
      subtitle: "",
      imageUrl: "",
      buttonText: "Explore Equipment",
      buttonLink: "/equipment",
      status: "Draft",
    });
  }

  function openAddForm() {
    setEditingId(null);
    resetForm();
    setNotice("");
    setShowForm(true);
  }

  function openEditForm(banner) {
    setEditingId(banner.id);
    setForm({
      title: banner.title,
      subtitle: banner.subtitle,
      imageUrl: banner.imageUrl,
      buttonText: banner.buttonText,
      buttonLink: banner.buttonLink,
      status: banner.status,
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

    const title = form.title.trim();

    if (!title) {
      setNotice("Please enter a banner title.");
      return;
    }

    const bannerData = {
      ...form,
      title,
      subtitle: form.subtitle.trim(),
      imageUrl: form.imageUrl.trim(),
      buttonText: form.buttonText.trim(),
      buttonLink: form.buttonLink.trim() || "/equipment",
    };

    if (editingId !== null) {
      setBanners((current) =>
        current.map((banner) =>
          banner.id === editingId
            ? { ...banner, ...bannerData }
            : banner
        )
      );
      setNotice("Banner updated in this session.");
    } else {
      setBanners((current) => [
        {
          id: Date.now(),
          ...bannerData,
        },
        ...current,
      ]);
      setNotice("Banner added in this session.");
    }

    setShowForm(false);
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this banner from the current session?"
    );

    if (!confirmed) return;

    setBanners((current) =>
      current.filter((banner) => banner.id !== id)
    );

    setNotice("Banner deleted from this session.");
  }

  function toggleStatus(id) {
    setBanners((current) =>
      current.map((banner) =>
        banner.id === id
          ? {
              ...banner,
              status: banner.status === "Published" ? "Draft" : "Published",
            }
          : banner
      )
    );
  }

  const publishedCount = banners.filter(
    (banner) => banner.status === "Published"
  ).length;

  return (
    <div className="banner-manager">
      <div className="banner-manager-heading">
        <div>
          <span className="banner-manager-eyebrow">
            WEBSITE CONTENT
          </span>
          <h2>Home Banners</h2>
          <p>
            Manage the homepage hero banners, promotional messages and call-to-action links.
          </p>
        </div>

        <button
          type="button"
          className="banner-primary-button"
          onClick={openAddForm}
        >
          <Plus size={18} />
          Add Banner
        </button>
      </div>

      <div className="banner-stats-grid">
        <div className="banner-stat-card">
          <div className="banner-stat-icon">
            <Images size={21} />
          </div>
          <div>
            <span>Total Banners</span>
            <strong>{banners.length}</strong>
          </div>
        </div>

        <div className="banner-stat-card">
          <div className="banner-stat-icon published">
            <Eye size={21} />
          </div>
          <div>
            <span>Published</span>
            <strong>{publishedCount}</strong>
          </div>
        </div>

        <div className="banner-stat-card">
          <div className="banner-stat-icon drafts">
            <EyeOff size={21} />
          </div>
          <div>
            <span>Drafts</span>
            <strong>{banners.length - publishedCount}</strong>
          </div>
        </div>
      </div>

      {notice && (
        <div className="banner-notice" role="status">
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

      <section className="banner-list-panel">
        <div className="banner-list-toolbar">
          <div>
            <h3>Homepage Banners</h3>
            <p>Manage the banners displayed on your website.</p>
          </div>

          <label className="banner-search">
            <Search size={17} />
            <input
              type="search"
              placeholder="Search banners..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
        </div>

        {filteredBanners.length > 0 ? (
          <div className="banner-cards-grid">
            {filteredBanners.map((banner, index) => (
              <article className="banner-card" key={banner.id}>
                <div className="banner-card-preview">
                  {banner.imageUrl ? (
                    <img
                      src={banner.imageUrl}
                      alt={banner.title}
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="banner-preview-placeholder">
                      <ImagePlus size={32} />
                      <span>Banner image not added</span>
                    </div>
                  )}

                  <span className="banner-order-badge">
                    Banner {index + 1}
                  </span>

                  <span
                    className={`banner-publication-badge ${
                      banner.status === "Published"
                        ? "published"
                        : "draft"
                    }`}
                  >
                    <span />
                    {banner.status}
                  </span>
                </div>

                <div className="banner-card-body">
                  <h4>{banner.title}</h4>
                  <p>{banner.subtitle || "No subtitle added."}</p>

                  <div className="banner-card-link">
                    <span>{banner.buttonText || "No button text"}</span>
                    <ExternalLink size={14} />
                  </div>

                  <div className="banner-card-actions">
                    <button
                      type="button"
                      className="banner-edit-button"
                      onClick={() => openEditForm(banner)}
                    >
                      <Pencil size={15} />
                      Edit
                    </button>

                    <button
                      type="button"
                      className="banner-status-button"
                      onClick={() => toggleStatus(banner.id)}
                    >
                      {banner.status === "Published" ? (
                        <EyeOff size={15} />
                      ) : (
                        <Eye size={15} />
                      )}
                      {banner.status === "Published" ? "Unpublish" : "Publish"}
                    </button>

                    <button
                      type="button"
                      className="banner-delete-button"
                      aria-label={`Delete ${banner.title}`}
                      title="Delete banner"
                      onClick={() => handleDelete(banner.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="banner-empty-state">
            <div className="banner-empty-icon">
              {searchTerm ? <Search size={26} /> : <Images size={28} />}
            </div>

            <h4>
              {searchTerm ? "No matching banners" : "No banners created yet"}
            </h4>

            <p>
              {searchTerm
                ? "Try another search term."
                : "Create your first homepage banner to start organizing your website's hero content."}
            </p>

            {!searchTerm && (
              <button
                type="button"
                className="banner-primary-button"
                onClick={openAddForm}
              >
                <Plus size={17} />
                Create First Banner
              </button>
            )}
          </div>
        )}

        <div className="banner-list-footer">
          <span>
            Showing {filteredBanners.length} of {banners.length} banners
          </span>
          <span>Homepage content management</span>
        </div>
      </section>

      {showForm && (
        <div
          className="banner-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowForm(false);
            }
          }}
        >
          <section
            className="banner-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="banner-modal-title"
          >
            <div className="banner-modal-header">
              <div>
                <span className="banner-manager-eyebrow">
                  HOMEPAGE CONTENT
                </span>
                <h3 id="banner-modal-title">
                  {editingId !== null ? "Edit Banner" : "Add Banner"}
                </h3>
              </div>

              <button
                type="button"
                className="banner-modal-close"
                aria-label="Close form"
                onClick={() => setShowForm(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form className="banner-form" onSubmit={handleSubmit}>
              <div className="banner-form-field">
                <label htmlFor="banner-title">Banner title *</label>
                <input
                  id="banner-title"
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Powering India's Construction"
                  required
                />
              </div>

              <div className="banner-form-field">
                <label htmlFor="banner-subtitle">Subtitle</label>
                <textarea
                  id="banner-subtitle"
                  name="subtitle"
                  rows="3"
                  value={form.subtitle}
                  onChange={handleInputChange}
                  placeholder="Enter a short supporting message..."
                />
              </div>

              <div className="banner-form-field">
                <label htmlFor="banner-image-url">Banner image URL</label>
                <input
                  id="banner-image-url"
                  name="imageUrl"
                  type="url"
                  value={form.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/banner.jpg"
                />
                <small>
                  Enter a publicly accessible image URL. File uploads will be configured separately.
                </small>
              </div>

              {form.imageUrl && (
                <div className="banner-form-image-preview">
                  <span>Image preview</span>
                  <img
                    src={form.imageUrl}
                    alt="Banner preview"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}

              <div className="banner-form-two-columns">
                <div className="banner-form-field">
                  <label htmlFor="banner-button-text">Button text</label>
                  <input
                    id="banner-button-text"
                    name="buttonText"
                    value={form.buttonText}
                    onChange={handleInputChange}
                    placeholder="Explore Equipment"
                  />
                </div>

                <div className="banner-form-field">
                  <label htmlFor="banner-button-link">Button link</label>
                  <input
                    id="banner-button-link"
                    name="buttonLink"
                    value={form.buttonLink}
                    onChange={handleInputChange}
                    placeholder="/equipment"
                  />
                </div>
              </div>

              <div className="banner-form-field">
                <label htmlFor="banner-status">Publication status</label>
                <select
                  id="banner-status"
                  name="status"
                  value={form.status}
                  onChange={handleInputChange}
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>

              <div className="banner-form-note">
                Banner changes are currently stored in temporary page state. They will not update the live homepage until the backend integration is completed.
              </div>

              <div className="banner-form-actions">
                <button
                  type="button"
                  className="banner-secondary-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="banner-primary-button">
                  {editingId !== null ? "Save Changes" : "Create Banner"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}