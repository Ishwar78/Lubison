
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Play,
} from "lucide-react";
import { products } from "../data/products";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);

  const [activeTab, setActiveTab] = useState("overview");

  if (!product) {
    return (
      <main className="container section-pad">
        <h1>Equipment not found</h1>
        <Link to="/equipment" className="text-link">
          Back to equipment
        </Link>
      </main>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Salient Features" },
    { id: "attachments", label: "Attachments" },
    { id: "technical", label: "Technical Information" },
    ...(product.video ? [{ id: "video", label: "Video" }] : []),
    ...(product.gallery?.length
      ? [{ id: "images", label: "Images" }]
      : []),
  ];

  const enquiryLink = `/contact?product=${encodeURIComponent(product.name)}`;

  return (
    <main className="equipment-detail">
      <div className="equipment-breadcrumb">
        <div className="equipment-detail-container">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/equipment">Equipment</Link>
          <span>/</span>
          <strong>{product.name}</strong>
        </div>
      </div>

      <nav className="equipment-detail-tabs" aria-label="Equipment details">
        <div className="equipment-tabs-inner">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={activeTab === tab.id ? "selected" : ""}
              onClick={() => {
                setActiveTab(tab.id);
                document
                  .getElementById("equipment-content")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <section className="equipment-hero">
        <img
          className="equipment-hero-image"
          src={product.image}
          alt={product.name}
        />

        <div className="equipment-hero-overlay" />

        <div className="equipment-hero-content equipment-detail-container">
          <span className="equipment-eyebrow">
            LUBESON EQUIPMENT / {product.type}
          </span>

          <h1>{product.name}</h1>

          <h2>{product.tag}</h2>

          <p>{product.description}</p>

          <div className="equipment-hero-actions">
            <a href="#equipment-content" className="equipment-primary-button">
              Explore Overview <ChevronDown size={17} />
            </a>

            <Link to={enquiryLink} className="equipment-outline-button">
              Send Enquiry <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>

        <div className="equipment-hero-label">
          <span>01</span>
          <span>PRODUCT OVERVIEW</span>
        </div>
      </section>

      <section
        id="equipment-content"
        className="equipment-content-section"
      >
        <div className="equipment-detail-container">
          {activeTab === "overview" && (
            <div className="equipment-overview-grid">
              <div className="equipment-overview-copy">
                <span className="equipment-eyebrow">
                  BUILT FOR THE JOB
                </span>

                <h2>
                  Performance for
                  <br />
                  <span>real-world demands.</span>
                </h2>

                <p>
                  {product.overview || product.description}
                </p>

                <Link to={enquiryLink} className="equipment-text-link">
                  Discuss your requirements <ArrowUpRight size={17} />
                </Link>
              </div>

              <div className="equipment-overview-image">
                <img src={product.image} alt={product.name} />
                <div className="equipment-image-caption">
                  <span>LUBESON</span>
                  <span>{product.model || product.name}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <div className="equipment-info-layout">
              <div>
                <span className="equipment-eyebrow">
                  DESIGNED FOR PRODUCTIVITY
                </span>
                <h2>
                  Salient <span>Features</span>
                </h2>
                <p className="equipment-section-intro">
                  Explore the key application benefits of this equipment.
                  Final features depend on the selected model.
                </p>
              </div>

              <div className="equipment-feature-list">
                {(product.features || []).map((feature, index) => (
                  <div className="equipment-feature-row" key={feature}>
                    <span className="equipment-feature-number">
                      0{index + 1}
                    </span>
                    <p>{feature}</p>
                    <CheckCircle2 size={20} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "attachments" && (
            <div className="equipment-attachments-section">
              <span className="equipment-eyebrow">
                MORE WAYS TO WORK
              </span>

              <h2>
                Attachments & <span>Options</span>
              </h2>

              <p className="equipment-section-intro">
                Explore attachment options for different applications.
                Compatibility must be confirmed for the selected equipment.
              </p>

              <div className="equipment-attachment-grid">
                {(product.attachments || []).map((attachment, index) => (
                  <article className="equipment-attachment-card" key={attachment}>
                    <span className="equipment-attachment-number">
                      0{index + 1}
                    </span>
                    <div className="equipment-attachment-icon">
                      <CheckCircle2 size={25} />
                    </div>
                    <h3>{attachment}</h3>
                    <Link
                      to={`/contact?product=${encodeURIComponent(
                        product.name + " - " + attachment
                      )}`}
                    >
                      Enquire Now <ArrowUpRight size={16} />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeTab === "technical" && (
            <div className="equipment-technical-section">
              <div className="equipment-technical-heading">
                <span className="equipment-eyebrow">
                  MODEL DETAILS
                </span>

                <h2>
                  Technical <span>Information</span>
                </h2>

                <p>
                  Contact our team to confirm model-specific specifications
                  before making a purchase decision.
                </p>
              </div>

              <div className="equipment-spec-table">
                {(product.specs || []).map((spec) => (
                  <div className="equipment-spec-row" key={spec.label}>
                    <span>{spec.label}</span>
                    <strong>{spec.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "video" && product.video && (
            <div className="equipment-media-section">
              <span className="equipment-eyebrow">SEE IT IN ACTION</span>
              <h2>Equipment <span>Video</span></h2>

              <a
                className="equipment-video-link"
                href={product.video}
                target="_blank"
                rel="noreferrer"
              >
                <Play size={22} />
                Watch equipment video
                <ArrowUpRight size={17} />
              </a>
            </div>
          )}

          {activeTab === "images" && product.gallery?.length > 0 && (
            <div className="equipment-media-section">
              <span className="equipment-eyebrow">VISUAL GALLERY</span>
              <h2>Equipment <span>Images</span></h2>

              <div className="equipment-gallery-grid">
                {product.gallery.map((image, index) => (
                  <img
                    key={`${image}-${index}`}
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="equipment-enquiry-banner">
        <div className="equipment-detail-container equipment-enquiry-inner">
          <div>
            <span className="equipment-eyebrow">
              LET'S FIND THE RIGHT EQUIPMENT
            </span>

            <h2>
              Have a project
              <br />
              <span>in mind?</span>
            </h2>

            <p>
              Talk to our team about equipment options for your requirements.
            </p>
          </div>

          <Link to={enquiryLink} className="equipment-primary-button">
            Enquire About {product.name} <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      <section className="equipment-related-section">
        <div className="equipment-detail-container">
          <div className="equipment-related-heading">
            <div>
              <span className="equipment-eyebrow">EXPLORE MORE</span>
              <h2>Other <span>Equipment</span></h2>
            </div>

            <Link to="/equipment" className="equipment-text-link">
              View All Equipment <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="equipment-related-grid">
            {products
              .filter((item) => item.id !== product.id)
              .slice(0, 3)
              .map((item) => (
                <Link
                  to={`/equipment/${item.id}`}
                  className="equipment-related-card"
                  key={item.id}
                >
                  <div className="equipment-related-image">
                    <img src={item.image} alt={item.name} loading="lazy" />
                    <span>
                      <ArrowUpRight size={20} />
                    </span>
                  </div>

                  <div className="equipment-related-copy">
                    <span>{item.type}</span>
                    <h3>{item.name}</h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
