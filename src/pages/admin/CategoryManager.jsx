import { useState } from "react";
import {
  Layers,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Package,
} from "lucide-react";
import "./CategoryManager.css";

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [notice, setNotice] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    status: "Active",
  });

  const filteredCategories = categories.filter((category) => {
    const query = searchTerm.toLowerCase();

    return (
      category.name.toLowerCase().includes(query) ||
      category.slug.toLowerCase().includes(query)
    );
  });

  function createSlug(value) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function openAddForm() {
    setEditingId(null);
    setForm({
      name: "",
      slug: "",
      description: "",
      status: "Active",
    });
    setNotice("");
    setShowForm(true);
  }

  function openEditForm(category) {
    setEditingId(category.id);
    setForm({
      name: category.name,
      slug: category.slug,
      description: category.description,
      status: category.status,
    });
    setNotice("");
    setShowForm(true);
  }

  function handleNameChange(event) {
    const name = event.target.value;

    setForm((current) => ({
      ...current,
      name,
      slug: createSlug(name),
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setNotice("");

    const name = form.name.trim();
    const slug = createSlug(form.slug || form.name);

    if (!name) {
      setNotice("Please enter a category name.");
      return;
    }

    const duplicate = categories.some(
      (category) =>
        category.slug === slug && category.id !== editingId
    );

    if (duplicate) {
      setNotice("A category with this slug already exists.");
      return;
    }

    const categoryData = {
      name,
      slug,
      description: form.description.trim(),
      status: form.status,
    };

    if (editingId !== null) {
      setCategories((current) =>
        current.map((category) =>
          category.id === editingId
            ? { ...category, ...categoryData }
            : category
        )
      );
      setNotice("Category updated in this session.");
    } else {
      setCategories((current) => [
        {
          id: Date.now(),
          ...categoryData,
        },
        ...current,
      ]);
      setNotice("Category added in this session.");
    }

    setShowForm(false);
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category from the current session?"
    );

    if (!confirmed) return;

    setCategories((current) =>
      current.filter((category) => category.id !== id)
    );

    setNotice("Category deleted from this session.");
  }

  function toggleStatus(id) {
    setCategories((current) =>
      current.map((category) =>
        category.id === id
          ? {
              ...category,
              status: category.status === "Active" ? "Inactive" : "Active",
            }
          : category
      )
    );
  }

  const activeCount = categories.filter(
    (category) => category.status === "Active"
  ).length;

  return (
    <div className="category-manager">
      <div className="category-manager-heading">
        <div>
          <span className="category-manager-eyebrow">
            CATALOG ORGANIZATION
          </span>
          <h2>Categories</h2>
          <p>
            Organize equipment into clear categories to make products easier
            for customers to discover.
          </p>
        </div>

        <button
          type="button"
          className="category-primary-button"
          onClick={openAddForm}
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <div className="category-stats">
        <div className="category-stat-card">
          <div className="category-stat-icon">
            <Layers size={21} />
          </div>
          <div>
            <span>Total Categories</span>
            <strong>{categories.length}</strong>
          </div>
        </div>

        <div className="category-stat-card">
          <div className="category-stat-icon active">
            <Package size={21} />
          </div>
          <div>
            <span>Active Categories</span>
            <strong>{activeCount}</strong>
          </div>
        </div>

        <div className="category-stat-card">
          <div className="category-stat-icon inactive">
            <Layers size={21} />
          </div>
          <div>
            <span>Inactive Categories</span>
            <strong>{categories.length - activeCount}</strong>
          </div>
        </div>
      </div>

      {notice && (
        <div className="category-notice" role="status">
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

      <section className="category-list-panel">
        <div className="category-list-toolbar">
          <div>
            <h3>All Categories</h3>
            <p>Manage your equipment categories.</p>
          </div>

          <label className="category-search">
            <Search size={17} />
            <input
              type="search"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
        </div>

        <div className="category-table-wrapper">
          <table className="category-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>URL Slug</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCategories.map((category) => (
                <tr key={category.id}>
                  <td>
                    <div className="category-name-cell">
                      <div className="category-row-icon">
                        <Layers size={19} />
                      </div>
                      <strong>{category.name}</strong>
                    </div>
                  </td>

                  <td>
                    <code className="category-slug">
                      /{category.slug}
                    </code>
                  </td>

                  <td>
                    <span className="category-description">
                      {category.description || "—"}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className={`category-status ${
                        category.status === "Active" ? "active" : "inactive"
                      }`}
                      onClick={() => toggleStatus(category.id)}
                      title="Click to change status"
                    >
                      <span />
                      {category.status}
                    </button>
                  </td>

                  <td>
                    <div className="category-row-actions">
                      <button
                        type="button"
                        className="category-edit-button"
                        aria-label={`Edit ${category.name}`}
                        title="Edit category"
                        onClick={() => openEditForm(category)}
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        className="category-delete-button"
                        aria-label={`Delete ${category.name}`}
                        title="Delete category"
                        onClick={() => handleDelete(category.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCategories.length === 0 && (
                <tr>
                  <td colSpan="5">
                    <div className="category-empty-state">
                      <div className="category-empty-icon">
                        <Layers size={25} />
                      </div>

                      <h4>
                        {searchTerm
                          ? "No matching categories"
                          : "No categories created yet"}
                      </h4>

                      <p>
                        {searchTerm
                          ? "Try a different search term."
                          : "Create categories such as Excavators, Cranes, Loaders or Road Equipment."}
                      </p>

                      {!searchTerm && (
                        <button
                          type="button"
                          className="category-primary-button"
                          onClick={openAddForm}
                        >
                          <Plus size={17} />
                          Create First Category
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="category-list-footer">
          <span>
            Showing {filteredCategories.length} of {categories.length} categories
          </span>
          <span>Category management</span>
        </div>
      </section>

      {showForm && (
        <div
          className="category-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowForm(false);
            }
          }}
        >
          <section
            className="category-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="category-modal-title"
          >
            <div className="category-modal-header">
              <div>
                <span className="category-manager-eyebrow">
                  CATEGORY DETAILS
                </span>
                <h3 id="category-modal-title">
                  {editingId !== null ? "Edit Category" : "Add Category"}
                </h3>
              </div>

              <button
                type="button"
                className="category-modal-close"
                aria-label="Close form"
                onClick={() => setShowForm(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form className="category-form" onSubmit={handleSubmit}>
              <div className="category-form-field">
                <label htmlFor="category-name">Category name *</label>
                <input
                  id="category-name"
                  value={form.name}
                  onChange={handleNameChange}
                  placeholder="e.g. Excavators"
                  required
                />
              </div>

              <div className="category-form-field">
                <label htmlFor="category-slug">URL slug *</label>
                <input
                  id="category-slug"
                  value={form.slug}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      slug: createSlug(event.target.value),
                    }))
                  }
                  placeholder="e.g. excavators"
                  required
                />
                <small>
                  Automatically generated from the category name.
                </small>
              </div>

              <div className="category-form-field">
                <label htmlFor="category-description">Description</label>
                <textarea
                  id="category-description"
                  rows="4"
                  value={form.description}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  placeholder="Describe the type of equipment in this category..."
                />
              </div>

              <div className="category-form-field">
                <label htmlFor="category-status">Status</label>
                <select
                  id="category-status"
                  value={form.status}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      status: event.target.value,
                    }))
                  }
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="category-form-note">
                Changes are temporary until database integration is completed.
              </div>

              <div className="category-form-actions">
                <button
                  type="button"
                  className="category-secondary-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="category-primary-button">
                  {editingId !== null ? "Save Changes" : "Create Category"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}