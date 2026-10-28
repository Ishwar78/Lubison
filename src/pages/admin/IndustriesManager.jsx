
import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Factory,
  Eye,
  EyeOff,
  Truck,
  Building2,
  Pickaxe,
  HardHat,
  Warehouse,
  CheckCircle2,
} from "lucide-react";
import "./IndustriesManager.css";

const industryIcons = {
  Construction: Building2,
  Infrastructure: HardHat,
  Mining: Pickaxe,
  Logistics: Truck,
  Manufacturing: Factory,
  Warehousing: Warehouse,
};

const initialIndustries = [
  {
    id: 1,
    name: "Construction",
    slug: "construction",
    description:
      "Equipment solutions for residential, commercial and large-scale construction projects.",
    icon: "Construction",
    status: "Published",
  },
  {
    id: 2,
    name: "Infrastructure",
    slug: "infrastructure",
    description:
      "Machinery for road development, bridges, highways and infrastructure projects.",
    icon: "Infrastructure",
    status: "Published",
  },
  {
    id: 3,
    name: "Mining",
    slug: "mining",
    description:
      "Equipment solutions for mining, excavation and material handling operations.",
    icon: "Mining",
    status: "Published",
  },
  {
    id: 4,
    name: "Logistics",
    slug: "logistics",
    description:
      "Material handling and transportation equipment for logistics operations.",
    icon: "Logistics",
    status: "Draft",
  },
];

const emptyIndustry = {
  name: "",
  slug: "",
  description: "",
  icon: "Construction",
  status: "Published",
};

function createSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function IndustriesManager() {
  const [industries, setIndustries] = useState(initialIndustries);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyIndustry);
  const [error, setError] = useState("");

  const publishedCount = industries.filter(
    (item) => item.status === "Published"
  ).length;

  const draftCount = industries.filter(
    (item) => item.status === "Draft"
  ).length;

  const filteredIndustries = useMemo(() => {
    return industries.filter((item) => {
      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        item.name.toLowerCase().includes(searchText) ||
        item.slug.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [industries, search, statusFilter]);

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyIndustry);
    setError("");
    setModalOpen(true);
  };

  const openEditModal = (industry) => {
    setEditingId(industry.id);
    setForm({
      name: industry.name,
      slug: industry.slug,
      description: industry.description,
      icon: industry.icon,
      status: industry.status,
    });
    setError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyIndustry);
    setError("");
  };

  const handleNameChange = (value) => {
    setForm((current) => ({
      ...current,
      name: value,
      slug:
        editingId === null || current.slug === createSlug(current.name)
          ? createSlug(value)
          : current.slug,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const slug = createSlug(form.slug || form.name);
    const description = form.description.trim();

    if (!name || !description) {
      setError("Please enter the industry name and description.");
      return;
    }

    const duplicateSlug = industries.some(
      (item) =>
        item.slug === slug &&
        item.id !== editingId
    );

    if (duplicateSlug) {
      setError("This URL slug already exists. Please use a different name.");
      return;
    }

    const cleanedIndustry = {
      ...form,
      name,
      slug,
      description,
    };

    if (editingId !== null) {
      setIndustries((current) =>
        current.map((item) =>
          item.id === editingId
            ? { ...item, ...cleanedIndustry }
            : item
        )
      );
    } else {
      setIndustries((current) => [
        { id: Date.now(), ...cleanedIndustry },
        ...current,
      ]);
    }

    closeModal();
  };

  const toggleStatus = (id) => {
    setIndustries((current) =>
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

  const deleteIndustry = (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this industry?"
      )
    ) {
      return;
    }

    setIndustries((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const getIndustryIcon = (iconName) => {
    return industryIcons[iconName] || Factory;
  };

  return (
    <div className="im-page">
      <div className="im-page-heading">
        <div>
          <span className="im-eyebrow">BUSINESS CATEGORIES</span>
          <h1>Industries Management</h1>
          <p>
            Organize the industries and sectors served by LUBESON.
          </p>
        </div>

        <button className="im-primary-btn" onClick={openAddModal}>
          <Plus size={18} />
          Add Industry
        </button>
      </div>

      <div className="im-stats">
        <div className="im-stat-card">
          <div className="im-stat-icon im-icon-purple">
            <Factory size={22} />
          </div>
          <div>
            <span>Total Industries</span>
            <strong>{industries.length}</strong>
          </div>
        </div>

        <div className="im-stat-card">
          <div className="im-stat-icon im-icon-green">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <span>Published</span>
            <strong>{publishedCount}</strong>
          </div>
        </div>

        <div className="im-stat-card">
          <div className="im-stat-icon im-icon-orange">
            <EyeOff size={22} />
          </div>
          <div>
            <span>Drafts</span>
            <strong>{draftCount}</strong>
          </div>
        </div>
      </div>

      <div className="im-content-card">
        <div className="im-toolbar">
          <div className="im-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search industries..."
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
        </div>

        <div className="im-list-heading">
          <div>
            <h2>All Industries</h2>
            <p>{filteredIndustries.length} industries found</p>
          </div>
        </div>

        {filteredIndustries.length > 0 ? (
          <div className="im-grid">
            {filteredIndustries.map((industry) => {
              const Icon = getIndustryIcon(industry.icon);

              return (
                <article className="im-industry-card" key={industry.id}>
                  <div className="im-card-top">
                    <div className="im-industry-icon">
                      <Icon size={25} />
                    </div>

                    <span
                      className={`im-status ${
                        industry.status === "Published"
                          ? "im-status-published"
                          : "im-status-draft"
                      }`}
                    >
                      {industry.status}
                    </span>
                  </div>

                  <h3>{industry.name}</h3>

                  <span className="im-slug">
                    /industries/{industry.slug}
                  </span>

                  <p className="im-description">
                    {industry.description}
                  </p>

                  <div className="im-card-footer">
                    <button
                      className="im-text-btn"
                      onClick={() => openEditModal(industry)}
                    >
                      <Pencil size={15} />
                      Edit
                    </button>

                    <div className="im-card-actions">
                      <button
                        className="im-icon-btn"
                        title={
                          industry.status === "Published"
                            ? "Move to draft"
                            : "Publish industry"
                        }
                        onClick={() => toggleStatus(industry.id)}
                      >
                        {industry.status === "Published" ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>

                      <button
                        className="im-icon-btn im-delete-btn"
                        title="Delete industry"
                        onClick={() => deleteIndustry(industry.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="im-empty">
            <Factory size={38} />
            <h3>No industries found</h3>
            <p>Try another search or add a new industry.</p>
            <button className="im-primary-btn" onClick={openAddModal}>
              <Plus size={17} />
              Add Industry
            </button>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="im-overlay" onMouseDown={closeModal}>
          <div
            className="im-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="im-modal-header">
              <div>
                <span className="im-eyebrow">INDUSTRY DETAILS</span>
                <h2>
                  {editingId !== null ? "Edit Industry" : "Add Industry"}
                </h2>
              </div>

              <button
                className="im-close-btn"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="im-form-group">
                <label htmlFor="im-name">Industry Name *</label>
                <input
                  id="im-name"
                  value={form.name}
                  onChange={(event) => handleNameChange(event.target.value)}
                  placeholder="e.g. Construction"
                  maxLength={100}
                  required
                />
              </div>

              <div className="im-form-group">
                <label htmlFor="im-slug">URL Slug *</label>
                <input
                  id="im-slug"
                  value={form.slug}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      slug: createSlug(event.target.value),
                    })
                  }
                  placeholder="e.g. construction"
                  maxLength={120}
                  required
                />
                <small>
                  URL: /industries/{form.slug || "your-industry"}
                </small>
              </div>

              <div className="im-form-group">
                <label htmlFor="im-description">Description *</label>
                <textarea
                  id="im-description"
                  value={form.description}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      description: event.target.value,
                    })
                  }
                  placeholder="Describe this industry's equipment requirements..."
                  rows={4}
                  maxLength={600}
                  required
                />
              </div>

              <div className="im-form-row">
                <div className="im-form-group">
                  <label htmlFor="im-icon">Industry Icon</label>
                  <select
                    id="im-icon"
                    value={form.icon}
                    onChange={(event) =>
                      setForm({ ...form, icon: event.target.value })
                    }
                  >
                    {Object.keys(industryIcons).map((iconName) => (
                      <option key={iconName} value={iconName}>
                        {iconName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="im-form-group">
                  <label htmlFor="im-status">Status</label>
                  <select
                    id="im-status"
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

              {error && <p className="im-error">{error}</p>}

              <div className="im-modal-actions">
                <button
                  type="button"
                  className="im-secondary-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="im-primary-btn">
                  {editingId !== null ? "Save Changes" : "Create Industry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


