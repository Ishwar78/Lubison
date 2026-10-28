import { useState } from "react";
import {
  Package,
  Plus,
  Search,
  Filter,
  Pencil,
  Trash2,
  Eye,
  X,
  ImagePlus,
} from "lucide-react";
import "./EquipmentManager.css";

const initialEquipment = [];

export default function EquipmentManager() {
  const [equipment, setEquipment] = useState(initialEquipment);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({
    name: "",
    category: "",
    brand: "",
    price: "",
    status: "Draft",
    description: "",
  });

  const filteredEquipment = equipment.filter((item) => {
    const query = searchTerm.toLowerCase();

    return (
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.brand.toLowerCase().includes(query)
    );
  });

  function openAddForm() {
    setEditingId(null);
    setForm({
      name: "",
      category: "",
      brand: "",
      price: "",
      status: "Draft",
      description: "",
    });
    setNotice("");
    setShowForm(true);
  }

  function openEditForm(item) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      category: item.category,
      brand: item.brand,
      price: item.price,
      status: item.status,
      description: item.description,
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

    const equipmentData = {
      ...form,
      name: form.name.trim(),
      category: form.category.trim(),
      brand: form.brand.trim(),
      description: form.description.trim(),
    };

    if (
      !equipmentData.name ||
      !equipmentData.category ||
      !equipmentData.brand
    ) {
      setNotice("Please complete all required fields.");
      return;
    }

    if (editingId !== null) {
      setEquipment((current) =>
        current.map((item) =>
          item.id === editingId
            ? { ...item, ...equipmentData }
            : item
        )
      );
      setNotice("Equipment updated in this session.");
    } else {
      setEquipment((current) => [
        {
          ...equipmentData,
          id: Date.now(),
        },
        ...current,
      ]);
      setNotice("Equipment added in this session.");
    }

    setShowForm(false);
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to remove this equipment from the current session?"
    );

    if (!confirmed) return;

    setEquipment((current) => current.filter((item) => item.id !== id));
    setNotice("Equipment removed from this session.");
  }

  function handleStatusChange(id, status) {
    setEquipment((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  }

  return (
    <div className="equipment-manager">
      {/* Page heading */}
      <div className="equipment-manager-heading">
        <div>
          <span className="equipment-manager-eyebrow">
            CATALOG MANAGEMENT
          </span>
          <h2>Equipment Management</h2>
          <p>
            Manage equipment listings, product details and publication status.
          </p>
        </div>

        <button
          type="button"
          className="equipment-primary-button"
          onClick={openAddForm}
        >
          <Plus size={18} />
          Add Equipment
        </button>
      </div>

      {/* Summary cards */}
      <div className="equipment-summary-grid">
        <div className="equipment-summary-card">
          <div className="equipment-summary-icon">
            <Package size={21} />
          </div>
          <div>
            <span>Total Equipment</span>
            <strong>{equipment.length}</strong>
          </div>
        </div>

        <div className="equipment-summary-card">
          <div className="equipment-summary-icon published">
            <Eye size={21} />
          </div>
          <div>
            <span>Published</span>
            <strong>
              {equipment.filter((item) => item.status === "Published").length}
            </strong>
          </div>
        </div>

        <div className="equipment-summary-card">
          <div className="equipment-summary-icon draft">
            <Pencil size={21} />
          </div>
          <div>
            <span>Drafts</span>
            <strong>
              {equipment.filter((item) => item.status === "Draft").length}
            </strong>
          </div>
        </div>
      </div>

      {/* Notice */}
      {notice && (
        <div className="equipment-manager-notice" role="status">
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

      {/* Listing panel */}
      <section className="equipment-list-panel">
        <div className="equipment-list-toolbar">
          <div>
            <h3>All Equipment</h3>
            <p>Manage the products in your catalog.</p>
          </div>

          <div className="equipment-list-controls">
            <label className="equipment-search">
              <Search size={17} />
              <input
                type="search"
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>

            <button
              type="button"
              className="equipment-filter-button"
              onClick={() =>
                setSearchTerm((current) => (current ? "" : current))
              }
              title="Clear search"
            >
              <Filter size={17} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="equipment-table-wrapper">
          <table className="equipment-table">
            <thead>
              <tr>
                <th>Equipment</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price / Quote</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEquipment.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="equipment-product-cell">
                      <div className="equipment-product-placeholder">
                        <Package size={20} />
                      </div>
                      <div>
                        <strong>{item.name}</strong>
                        <span>ID: {String(item.id).slice(-6)}</span>
                      </div>
                    </div>
                  </td>

                  <td>{item.category}</td>
                  <td>{item.brand}</td>

                  <td>
                    {item.price ? `₹${item.price}` : "Request a quote"}
                  </td>

                  <td>
                    <select
                      className={`equipment-status-select ${item.status.toLowerCase()}`}
                      aria-label={`Status for ${item.name}`}
                      value={item.status}
                      onChange={(event) =>
                        handleStatusChange(item.id, event.target.value)
                      }
                    >
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                    </select>
                  </td>

                  <td>
                    <div className="equipment-row-actions">
                      <button
                        type="button"
                        className="equipment-action-edit"
                        aria-label={`Edit ${item.name}`}
                        title="Edit equipment"
                        onClick={() => openEditForm(item)}
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        className="equipment-action-delete"
                        aria-label={`Delete ${item.name}`}
                        title="Delete equipment"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredEquipment.length === 0 && (
                <tr>
                  <td colSpan="6">
                    <div className="equipment-empty-state">
                      <div className="equipment-empty-icon">
                        {searchTerm ? (
                          <Search size={25} />
                        ) : (
                          <ImagePlus size={25} />
                        )}
                      </div>

                      <h4>
                        {searchTerm
                          ? "No matching equipment found"
                          : "No equipment added yet"}
                      </h4>

                      <p>
                        {searchTerm
                          ? "Try another search term."
                          : "Add your first equipment listing to get started."}
                      </p>

                      {!searchTerm && (
                        <button
                          type="button"
                          className="equipment-primary-button"
                          onClick={openAddForm}
                        >
                          <Plus size={17} />
                          Add First Equipment
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="equipment-list-footer">
          <span>
            Showing {filteredEquipment.length} of {equipment.length} items
          </span>
          <span>Equipment catalog</span>
        </div>
      </section>

      {/* Add / edit form */}
      {showForm && (
        <div
          className="equipment-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowForm(false);
            }
          }}
        >
          <section
            className="equipment-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="equipment-modal-title"
          >
            <div className="equipment-modal-header">
              <div>
                <span className="equipment-manager-eyebrow">
                  CATALOG DETAILS
                </span>
                <h3 id="equipment-modal-title">
                  {editingId !== null ? "Edit Equipment" : "Add Equipment"}
                </h3>
              </div>

              <button
                type="button"
                className="equipment-modal-close"
                aria-label="Close form"
                onClick={() => setShowForm(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form className="equipment-form" onSubmit={handleSubmit}>
              <div className="equipment-form-grid">
                <div className="equipment-form-field">
                  <label htmlFor="equipment-name">Equipment name *</label>
                  <input
                    id="equipment-name"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Hydraulic Excavator"
                    required
                  />
                </div>

                <div className="equipment-form-field">
                  <label htmlFor="equipment-category">Category *</label>
                  <input
                    id="equipment-category"
                    name="category"
                    value={form.category}
                    onChange={handleInputChange}
                    placeholder="e.g. Excavators"
                    required
                  />
                </div>

                <div className="equipment-form-field">
                  <label htmlFor="equipment-brand">Brand *</label>
                  <input
                    id="equipment-brand"
                    name="brand"
                    value={form.brand}
                    onChange={handleInputChange}
                    placeholder="e.g. JCB"
                    required
                  />
                </div>

                <div className="equipment-form-field">
                  <label htmlFor="equipment-price">Price (optional)</label>
                  <input
                    id="equipment-price"
                    name="price"
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={handleInputChange}
                    placeholder="Leave blank for quote"
                  />
                </div>

                <div className="equipment-form-field">
                  <label htmlFor="equipment-status">Publication status</label>
                  <select
                    id="equipment-status"
                    name="status"
                    value={form.status}
                    onChange={handleInputChange}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>

                <div className="equipment-form-field equipment-form-field-full">
                  <label htmlFor="equipment-description">Description</label>
                  <textarea
                    id="equipment-description"
                    name="description"
                    rows="4"
                    value={form.description}
                    onChange={handleInputChange}
                    placeholder="Add equipment specifications and details..."
                  />
                </div>
              </div>

              <div className="equipment-form-note">
                This form currently stores changes in temporary page state.
                Database integration will be added separately.
              </div>

              <div className="equipment-form-actions">
                <button
                  type="button"
                  className="equipment-secondary-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="equipment-primary-button">
                  {editingId !== null ? "Save Changes" : "Add Equipment"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}