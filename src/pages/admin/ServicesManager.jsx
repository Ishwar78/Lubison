
import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  X,
  Wrench,
  Settings,
  Truck,
  Cog,
  ShieldCheck,
  Headphones,
  CheckCircle2,
  XCircle,
  BriefcaseBusiness,
  Clock3,
  ArrowUpRight,
} from "lucide-react";
import "./ServicesManager.css";

const initialServices = [
  {
    id: 1,
    title: "Equipment Sales",
    slug: "equipment-sales",
    category: "Sales",
    description:
      "Reliable construction equipment for infrastructure, road development and industrial projects.",
    icon: "BriefcaseBusiness",
    status: "Active",
    featured: true,
    duration: "Quick enquiry",
  },
  {
    id: 2,
    title: "Equipment Maintenance",
    slug: "equipment-maintenance",
    category: "Maintenance",
    description:
      "Professional maintenance support to help keep your construction equipment working efficiently.",
    icon: "Wrench",
    status: "Active",
    featured: true,
    duration: "As required",
  },
  {
    id: 3,
    title: "Spare Parts Support",
    slug: "spare-parts-support",
    category: "Support",
    description:
      "Assistance with identifying and sourcing suitable spare parts for your equipment.",
    icon: "Settings",
    status: "Active",
    featured: false,
    duration: "Availability based",
  },
  {
    id: 4,
    title: "Technical Assistance",
    slug: "technical-assistance",
    category: "Support",
    description:
      "Get help with equipment information, product selection and technical enquiries.",
    icon: "Headphones",
    status: "Inactive",
    featured: false,
    duration: "On request",
  },
];

const iconOptions = [
  { name: "Wrench", Icon: Wrench },
  { name: "Settings", Icon: Settings },
  { name: "Truck", Icon: Truck },
  { name: "Cog", Icon: Cog },
  { name: "ShieldCheck", Icon: ShieldCheck },
  { name: "Headphones", Icon: Headphones },
  { name: "BriefcaseBusiness", Icon: BriefcaseBusiness },
  { name: "Clock3", Icon: Clock3 },
];

const emptyForm = {
  title: "",
  slug: "",
  category: "Sales",
  description: "",
  icon: "Wrench",
  status: "Active",
  featured: false,
  duration: "On request",
};

function createSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getServiceIcon(iconName) {
  const icon = iconOptions.find((item) => item.name === iconName);
  return icon?.Icon || Wrench;
}

export default function ServicesManager() {
  const [services, setServices] = useState(initialServices);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [viewService, setViewService] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const activeCount = services.filter(
    (service) => service.status === "Active"
  ).length;

  const featuredCount = services.filter(
    (service) => service.featured
  ).length;

  const filteredServices = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return services.filter((service) => {
      const matchesSearch =
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query) ||
        service.slug.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || service.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" || service.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [services, searchTerm, statusFilter, categoryFilter]);

  function openAddModal() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setError("");
    setModalOpen(true);
  }

  function openEditModal(service) {
    setEditingId(service.id);
    setForm({ ...service });
    setError("");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
    setForm({ ...emptyForm });
    setError("");
  }

  function updateField(field, value) {
    setForm((previous) => {
      const updated = { ...previous, [field]: value };

      if (field === "title") {
        updated.slug = createSlug(value);
      }

      return updated;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const title = form.title.trim();
    const description = form.description.trim();
    const slug = createSlug(form.slug || title);

    if (!title || !description || !form.category) {
      setError("Please fill in all required fields.");
      return;
    }

    const duplicateSlug = services.some(
      (service) =>
        service.slug === slug && service.id !== editingId
    );

    if (duplicateSlug) {
      setError("This service URL already exists. Please change the title.");
      return;
    }

    const serviceData = {
      ...form,
      id: editingId ?? Date.now(),
      title,
      description,
      slug,
    };

    if (editingId !== null) {
      setServices((previous) =>
        previous.map((service) =>
          service.id === editingId ? serviceData : service
        )
      );
    } else {
      setServices((previous) => [serviceData, ...previous]);
    }

    closeModal();
  }

  function handleDelete(id) {
    const service = services.find((item) => item.id === id);

    if (!service) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${service.title}"?`
    );

    if (!confirmed) return;

    setServices((previous) =>
      previous.filter((item) => item.id !== id)
    );

    if (viewService?.id === id) {
      setViewService(null);
    }
  }

  function toggleStatus(id) {
    setServices((previous) =>
      previous.map((service) =>
        service.id === id
          ? {
              ...service,
              status:
                service.status === "Active" ? "Inactive" : "Active",
            }
          : service
      )
    );
  }

  function toggleFeatured(id) {
    setServices((previous) =>
      previous.map((service) =>
        service.id === id
          ? { ...service, featured: !service.featured }
          : service
      )
    );
  }

  return (
    <div className="services-manager">
      <div className="page-header">
        <div className="page-heading">
          <span className="services-eyebrow">WEBSITE MANAGEMENT</span>
          <h1>Services Management</h1>
          <p>
            Manage your services, descriptions, visibility and featured
            services.
          </p>
        </div>

        <button className="btn-primary" onClick={openAddModal}>
          <Plus size={18} />
          Add New Service
        </button>
      </div>

      <div className="services-stats">
        <div className="services-stat-card">
          <div className="services-stat-icon">
            <Wrench size={22} />
          </div>
          <div className="services-stat-info">
            <span>Total Services</span>
            <strong>{services.length}</strong>
          </div>
        </div>

        <div className="services-stat-card">
          <div className="services-stat-icon green">
            <CheckCircle2 size={22} />
          </div>
          <div className="services-stat-info">
            <span>Active Services</span>
            <strong>{activeCount}</strong>
          </div>
        </div>

        <div className="services-stat-card">
          <div className="services-stat-icon blue">
            <ArrowUpRight size={22} />
          </div>
          <div className="services-stat-info">
            <span>Featured Services</span>
            <strong>{featuredCount}</strong>
          </div>
        </div>
      </div>

      <div className="services-panel">
        <div className="services-toolbar">
          <div>
            <h2>All Services</h2>
            <p>Manage and organize your service listings.</p>
          </div>

          <div className="services-filters">
            <div className="services-search">
              <Search size={17} />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              aria-label="Filter by category"
            >
              <option value="All">All Categories</option>
              <option value="Sales">Sales</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Support">Support</option>
              <option value="Rental">Rental</option>
              <option value="Consulting">Consulting</option>
            </select>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter by status"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="services-grid">
          {filteredServices.length === 0 ? (
            <div className="services-empty">
              <Wrench size={35} />
              <h3>No services found</h3>
              <p>
                Try another search or add a new service to your website.
              </p>
              <button className="btn-primary" onClick={openAddModal}>
                <Plus size={17} />
                Add Service
              </button>
            </div>
          ) : (
            filteredServices.map((service) => {
              const ServiceIcon = getServiceIcon(service.icon);

              return (
                <article className="service-admin-card" key={service.id}>
                  <div className="service-card-top">
                    <div className="service-card-icon">
                      <ServiceIcon size={25} />
                    </div>

                    <div className="service-card-badges">
                      <span
                        className={`service-status ${
                          service.status === "Active"
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        {service.status === "Active" ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <XCircle size={12} />
                        )}
                        {service.status}
                      </span>

                      {service.featured && (
                        <span className="service-featured-badge">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="service-card-content">
                    <span className="service-category">
                      {service.category}
                    </span>

                    <h3>{service.title}</h3>

                    <p>{service.description}</p>

                    <div className="service-card-meta">
                      <span>
                        <Clock3 size={14} />
                        {service.duration}
                      </span>
                    </div>

                    <div className="service-slug">
                      /services/{service.slug}
                    </div>
                  </div>

                  <div className="service-card-actions">
                    <button
                      className="service-action-btn"
                      onClick={() => setViewService(service)}
                      title="View service"
                      aria-label={`View ${service.title}`}
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      className="service-action-btn"
                      onClick={() => openEditModal(service)}
                      title="Edit service"
                      aria-label={`Edit ${service.title}`}
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      className="service-action-btn"
                      onClick={() => toggleFeatured(service.id)}
                      title={
                        service.featured
                          ? "Remove from featured"
                          : "Mark as featured"
                      }
                    >
                      <ArrowUpRight size={16} />
                    </button>

                    <button
                      className="service-action-btn delete"
                      onClick={() => handleDelete(service.id)}
                      title="Delete service"
                      aria-label={`Delete ${service.title}`}
                    >
                      <Trash2 size={16} />
                    </button>

                    <button
                      className={`service-toggle-button ${
                        service.status === "Active" ? "enabled" : ""
                      }`}
                      onClick={() => toggleStatus(service.id)}
                      title="Toggle service status"
                      aria-label={`Toggle ${service.title} status`}
                    >
                      <span />
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </div>

        <div className="services-panel-footer">
          Showing <strong>{filteredServices.length}</strong> of{" "}
          <strong>{services.length}</strong> services
        </div>
      </div>

      {modalOpen && (
        <div
          className="service-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div
            className="service-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
          >
            <div className="service-modal-header">
              <div>
                <h2 id="service-modal-title">
                  {editingId !== null ? "Edit Service" : "Add New Service"}
                </h2>
                <p>
                  Add the service details you want to display on your website.
                </p>
              </div>

              <button
                className="service-modal-close"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <X size={19} />
              </button>
            </div>

            <form className="service-form" onSubmit={handleSubmit}>
              {error && (
                <div className="service-form-error" role="alert">
                  <XCircle size={16} />
                  {error}
                </div>
              )}

              <div className="service-form-grid">
                <div className="service-form-group full-width">
                  <label htmlFor="service-title">
                    Service Name <span>*</span>
                  </label>
                  <input
                    id="service-title"
                    type="text"
                    placeholder="e.g. Equipment Maintenance"
                    value={form.title}
                    onChange={(event) =>
                      updateField("title", event.target.value)
                    }
                    required
                  />
                </div>

                <div className="service-form-group">
                  <label htmlFor="service-category">
                    Category <span>*</span>
                  </label>
                  <select
                    id="service-category"
                    value={form.category}
                    onChange={(event) =>
                      updateField("category", event.target.value)
                    }
                  >
                    <option value="Sales">Sales</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Support">Support</option>
                    <option value="Rental">Rental</option>
                    <option value="Consulting">Consulting</option>
                  </select>
                </div>

                <div className="service-form-group">
                  <label htmlFor="service-duration">
                    Service Duration
                  </label>
                  <input
                    id="service-duration"
                    type="text"
                    placeholder="e.g. On request"
                    value={form.duration}
                    onChange={(event) =>
                      updateField("duration", event.target.value)
                    }
                  />
                </div>

                <div className="service-form-group full-width">
                  <label htmlFor="service-slug">URL Slug</label>
                  <input
                    id="service-slug"
                    type="text"
                    value={form.slug}
                    onChange={(event) =>
                      updateField("slug", event.target.value)
                    }
                    placeholder="equipment-maintenance"
                  />
                  <span className="service-form-hint">
                    URL preview: /services/{createSlug(form.slug)}
                  </span>
                </div>

                <div className="service-form-group full-width">
                  <label htmlFor="service-description">
                    Description <span>*</span>
                  </label>
                  <textarea
                    id="service-description"
                    rows="4"
                    placeholder="Describe the service..."
                    value={form.description}
                    onChange={(event) =>
                      updateField("description", event.target.value)
                    }
                    required
                  />
                </div>

                <div className="service-form-group full-width">
                  <label>Choose an Icon</label>
                  <div className="service-icon-picker">
                    {iconOptions.map(({ name, Icon }) => (
                      <button
                        type="button"
                        key={name}
                        className={`service-icon-option ${
                          form.icon === name ? "selected" : ""
                        }`}
                        onClick={() => updateField("icon", name)}
                        title={name}
                        aria-label={`Select ${name} icon`}
                        aria-pressed={form.icon === name}
                      >
                        <Icon size={21} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="service-form-group full-width">
                  <div className="service-toggle-row">
                    <div>
                      <strong>Publish Service</strong>
                      <p>
                        Set whether this service is active in the admin panel.
                      </p>
                    </div>

                    <button
                      type="button"
                      className={`service-form-toggle ${
                        form.status === "Active" ? "active" : ""
                      }`}
                      onClick={() =>
                        updateField(
                          "status",
                          form.status === "Active" ? "Inactive" : "Active"
                        )
                      }
                      aria-label="Toggle service status"
                      aria-pressed={form.status === "Active"}
                    >
                      <span />
                    </button>
                  </div>
                </div>

                <div className="service-form-group full-width">
                  <div className="service-toggle-row">
                    <div>
                      <strong>Featured Service</strong>
                      <p>
                        Mark this service as featured in the admin panel.
                      </p>
                    </div>

                    <button
                      type="button"
                      className={`service-form-toggle ${
                        form.featured ? "active" : ""
                      }`}
                      onClick={() =>
                        updateField("featured", !form.featured)
                      }
                      aria-label="Toggle featured service"
                      aria-pressed={form.featured}
                    >
                      <span />
                    </button>
                  </div>
                </div>
              </div>

              <div className="service-form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="btn-primary">
                  {editingId !== null ? "Save Changes" : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewService && (
        <div
          className="service-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setViewService(null);
          }}
        >
          <div
            className="service-modal service-view-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-view-title"
          >
            <div className="service-modal-header">
              <div>
                <h2 id="service-view-title">Service Details</h2>
                <p>Preview the saved service information.</p>
              </div>

              <button
                className="service-modal-close"
                onClick={() => setViewService(null)}
                aria-label="Close service details"
              >
                <X size={19} />
              </button>
            </div>

            <div className="service-view-content">
              {(() => {
                const ViewIcon = getServiceIcon(viewService.icon);

                return (
                  <div className="service-view-icon">
                    <ViewIcon size={30} />
                  </div>
                );
              })()}

              <h3>{viewService.title}</h3>

              <p className="service-view-description">
                {viewService.description}
              </p>

              <div className="service-view-details">
                <div>
                  <span>Category</span>
                  <strong>{viewService.category}</strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong>{viewService.status}</strong>
                </div>

                <div>
                  <span>Duration</span>
                  <strong>{viewService.duration}</strong>
                </div>

                <div>
                  <span>Featured</span>
                  <strong>{viewService.featured ? "Yes" : "No"}</strong>
                </div>

                <div className="service-view-full-row">
                  <span>URL Slug</span>
                  <strong>/services/{viewService.slug}</strong>
                </div>
              </div>

              <div className="service-view-actions">
                <button
                  className="btn-secondary"
                  onClick={() => setViewService(null)}
                >
                  Close
                </button>

                <button
                  className="btn-primary"
                  onClick={() => {
                    const selectedService = viewService;
                    setViewService(null);
                    openEditModal(selectedService);
                  }}
                >
                  <Pencil size={16} />
                  Edit Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
