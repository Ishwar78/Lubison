import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  SlidersHorizontal,
  Settings2,
  Phone,
  X,
} from "lucide-react";
import "./Equipment.css";

const categories = [
  "All Equipment",
  "Backhoe Loaders",
  "Wheel Loaders",
  "Excavators",
  "Cranes",
  "Agriculture",
  "Attachments",
];

const equipment = [
  {
    id: "backhoe-loader",
    name: "Backhoe Loaders",
    model: "Multi-Purpose Equipment",
    category: "Backhoe Loaders",
    description:
      "Versatile machines designed for digging, loading and demanding construction applications.",
    image:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSUfg3xtD4Y6nabidFHj7enoGAfzWgtItBw7uIt9R6FUq68BUfzockYZBMIeokdMPorY-ZWAPUfbM-cshuJ1S_AJ07SMWS_0oeouwpQOvQO8zqOl3hZarMV",
    tag: "POPULAR CATEGORY",
  },
  {
    id: "wheel-loader",
    name: "Wheel Loaders",
    model: "Material Handling",
    category: "Wheel Loaders",
    description:
      "Efficient loading solutions for material movement and heavy-duty site operations.",
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRu_48EYaLb6W4VNt7poYYIasF49aD-bzFrtYkSA3k-FrREjB4W4z-80dxa7cTiQs6OLToKPZZXFLJ-vbrKUo2kVeze4Em55d8QvPBBW3OB",
    tag: "HEAVY DUTY",
  },
  {
    id: "excavator",
    name: "Excavators",
    model: "Earthmoving Equipment",
    category: "Excavators",
    description:
      "Reliable excavation solutions for construction, infrastructure and earthmoving work.",
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT_vN8yt1yIO2YlSp3hIvh9lLf0yMKbnKKsxmT1AXCe6JdL-xLHkUGs0zDXv1_vinhvwqPCWfK-5TB7C0yBo-mVwr-RHWH6OrUawtkt9hkcJS3H5l76Zme4",
    tag: "EARTHMOVING",
  },
  {
    id: "crane",
    name: "Cranes",
    model: "Lifting Equipment",
    category: "Cranes",
    description:
      "Explore lifting equipment options for demanding construction and industrial projects.",
    image:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQEl_zpvbyT5ekOnGfwCjSR8JJmdnKCpsvGkfdMpPm_UEtE_x5_3_GTQ4Jj2hV8e9hNNp2eTw6QOYQMGrh0u5OeQAsnrh4ID216HCiGedy56WczZH85kXPKow",
    tag: "LIFTING SOLUTIONS",
  },
  {
    id: "agriculture-equipment",
    name: "Agriculture Equipment",
    model: "Agricultural Solutions",
    category: "Agriculture",
    description:
      "Equipment solutions for agricultural operations and land preparation applications.",
    image:
      "https://bullindia.com/images/banner/agriculture.webp",
    tag: "AGRICULTURE",
  },
  {
    id: "buckets-attachments",
    name: "Buckets & Attachments",
    model: "Equipment Attachments",
    category: "Attachments",
    description:
      "Attachments designed to support different machine applications and site requirements.",
    image:
      "data:image/webp;base64,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",
    tag: "VERSATILE",
  },
];

export default function Equipment() {
  const [activeCategory, setActiveCategory] = useState("All Equipment");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("featured");

  const filteredEquipment = useMemo(() => {
    let result = [...equipment];

    if (activeCategory !== "All Equipment") {
      result = result.filter(
        (item) => item.category === activeCategory
      );
    }

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();

      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    if (sortOrder === "az") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortOrder === "za") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [activeCategory, searchTerm, sortOrder]);

  return (
    <main className="lh-equipment-page">
      {/* PAGE HERO */}
      <section className="lh-equipment-hero">
        <div className="lh-equipment-hero-inner">
          <div className="lh-equipment-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Equipment</span>
          </div>

          <div className="lh-equipment-hero-content">
            <div className="lh-equipment-hero-copy">
              <span className="lh-section-eyebrow">
                BUILT FOR DEMANDING WORK
              </span>

              <h1>
                Equipment for
                <br />
                <span>Every Challenge.</span>
              </h1>

              <p>
                Explore construction equipment and practical solutions
                designed to support demanding work environments.
              </p>

              <a href="#equipment-catalogue" className="lh-primary-button">
                Explore Equipment <ArrowRight size={17} />
              </a>
            </div>

            <div className="lh-equipment-hero-visual">
              <div className="lh-hero-image-frame">
                <img
                  src="https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=1400&q=90"
                  alt="Construction equipment at a work site"
                />
              </div>

              <div className="lh-hero-visual-caption">
                <span className="lh-caption-line" />
                <span>ENGINEERED FOR PRODUCTIVITY</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EQUIPMENT CATALOGUE */}
      <section
        className="lh-equipment-catalogue"
        id="equipment-catalogue"
      >
        <div className="lh-equipment-container">
          <div className="lh-catalogue-heading">
            <div>
              <span className="lh-section-eyebrow">
                OUR EQUIPMENT RANGE
              </span>

              <h2>
                Find the Right <span>Machine.</span>
              </h2>

              <p>
                Browse equipment categories to explore solutions for your
                application.
              </p>
            </div>

            <div className="lh-equipment-count">
              <strong>{filteredEquipment.length.toString().padStart(2, "0")}</strong>
              <span>Categories shown</span>
            </div>
          </div>

          {/* SEARCH AND SORT */}
          <div className="lh-equipment-toolbar">
            <div className="lh-equipment-search">
              <Search size={18} />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search equipment..."
                aria-label="Search equipment"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <label className="lh-equipment-sort">
              <SlidersHorizontal size={17} />

              <span>Sort:</span>

              <select
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="az">Name: A–Z</option>
                <option value="za">Name: Z–A</option>
              </select>
            </label>
          </div>

          {/* CATEGORY FILTERS */}
          <div
            className="lh-equipment-filters"
            aria-label="Filter equipment by category"
          >
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={
                  activeCategory === category ? "active" : ""
                }
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* PRODUCT GRID */}
          {filteredEquipment.length > 0 ? (
            <div className="lh-equipment-grid">
              {filteredEquipment.map((item, index) => (
                <article
                  className="lh-equipment-card"
                  key={item.id}
                  style={{ "--card-index": index }}
                >
                  <Link
                    to={`/equipment/${item.id}`}
                    className="lh-equipment-card-image"
                    aria-label={`View ${item.name}`}
                  >
                    <span className="lh-equipment-card-tag">
                      {item.tag}
                    </span>

                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                    />

                    <span className="lh-equipment-card-image-arrow">
                      <ArrowUpRight size={19} />
                    </span>
                  </Link>

                  <div className="lh-equipment-card-body">
                    <span className="lh-equipment-card-model">
                      {item.model}
                    </span>

                    <h3>{item.name}</h3>

                    <p>{item.description}</p>

                    <div className="lh-equipment-card-actions">
                      <Link
                        to={`/equipment/${item.id}`}
                        className="lh-view-details"
                      >
                        View Details <ArrowRight size={15} />
                      </Link>

                      <Link
                        to="/contact"
                        className="lh-enquire-button"
                        aria-label={`Enquire about ${item.name}`}
                      >
                        Enquire <ArrowUpRight size={15} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="lh-equipment-empty">
              <Settings2 size={35} />

              <h3>No equipment found</h3>

              <p>
                Try another search term or choose a different category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setActiveCategory("All Equipment");
                  setSearchTerm("");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}

          <div className="lh-equipment-help">
            <div className="lh-equipment-help-icon">
              <Phone size={22} />
            </div>

            <div>
              <span>NEED HELP FINDING EQUIPMENT?</span>
              <h3>Let's discuss your requirements.</h3>
              <p>
                Contact our team to discuss your application and equipment
                requirements.
              </p>
            </div>

            <Link to="/contact" className="lh-primary-button">
              Talk to Our Team <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}