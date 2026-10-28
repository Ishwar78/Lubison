import { useState } from "react";
import { Link } from "react-router-dom";
import "./IndustryPage.css";

const industryData = {
  agriculture: {
    eyebrow: "AGRICULTURE EQUIPMENT & SOLUTIONS",
    title: "Powering Progress in Agriculture.",
    highlight: "Built for Every Field.",
    description:
      "Explore reliable equipment solutions for agricultural operations, land preparation, material movement and everyday farm requirements.",
    heroImage:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=85",
    overviewTitle: "Equipment solutions for modern agriculture",
    overview:
      "Agricultural work requires dependable machines that can support demanding field conditions. LUBESON helps you explore equipment options for farm infrastructure, earthmoving, material handling and related applications.",
    applications: [
      "Farm land preparation and earthmoving",
      "Agricultural infrastructure development",
      "Loading and movement of materials",
    ],
    equipment: [
      {
        title: "Backhoe Loaders",
        text: "Versatile machines for digging, loading and farm infrastructure work.",
        image:
          "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Excavators",
        text: "Equipment options for earthmoving, ponds and land development.",
        image:
          "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Material Handling",
        text: "Explore equipment for moving soil, aggregates and farm materials.",
        image:
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
      },
    ],
    faqs: [
      {
        q: "Which equipment can support agricultural projects?",
        a: "Depending on your application, options may include backhoe loaders, excavators and material-handling equipment. Share your requirements to identify suitable machines.",
      },
      {
        q: "Can I request equipment recommendations?",
        a: "Yes. Contact our team with your application, work conditions and budget so we can help you explore available options.",
      },
      {
        q: "How can I enquire about a machine?",
        a: "Use the Get a Quote button to submit your enquiry to the LUBESON team.",
      },
    ],
  },

  construction: {
    eyebrow: "CONSTRUCTION EQUIPMENT & SOLUTIONS",
    title: "Build with Power.",
    highlight: "Deliver with Confidence.",
    description:
      "Explore equipment options for excavation, site preparation, loading and demanding construction applications.",
    heroImage:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=85",
    overviewTitle: "Keep construction projects moving",
    overview:
      "Construction sites need equipment matched to their workload, ground conditions and project requirements. Explore machine categories for digging, trenching, material movement and site preparation.",
    applications: [
      "Earthmoving and excavation applications",
      "Site preparation and utility work",
      "Loading and material movement",
    ],
    equipment: [
      {
        title: "Excavators",
        text: "Explore machines for excavation, trenching and earthmoving work.",
        image:
          "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Backhoe Loaders",
        text: "Flexible solutions for digging, loading and site maintenance.",
        image:
          "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Loaders",
        text: "Equipment options for handling aggregates and moving materials.",
        image:
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
      },
    ],
    faqs: [
      {
        q: "What equipment is suitable for construction projects?",
        a: "Excavators, backhoe loaders and loaders are common categories. The right choice depends on the work, site conditions and required capacity.",
      },
      {
        q: "Can I enquire about a specific machine?",
        a: "Yes. Contact our team with the machine category and your project requirements.",
      },
      {
        q: "How do I get a quotation?",
        a: "Open the Get a Quote page and submit your contact details and equipment requirements.",
      },
    ],
  },

  infrastructure: {
    eyebrow: "INFRASTRUCTURE EQUIPMENT & SOLUTIONS",
    title: "Building Tomorrow's",
    highlight: "Infrastructure Today.",
    description:
      "Discover equipment solutions for roadworks, public infrastructure, utility development and large-scale site preparation.",
    heroImage:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=85",
    overviewTitle: "Equipment for ambitious infrastructure projects",
    overview:
      "Infrastructure development demands equipment that matches project scale, site conditions and operational needs. Explore options for earthmoving, site preparation, material movement and related applications.",
    applications: [
      "Road and site development",
      "Utility corridors and excavation",
      "Large-scale earthmoving and material movement",
    ],
    equipment: [
      {
        title: "Excavators",
        text: "Explore equipment for excavation and infrastructure groundwork.",
        image:
          "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Loaders",
        text: "Equipment options for moving aggregates and bulk materials.",
        image:
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Earthmoving Equipment",
        text: "Explore solutions for ground preparation and development work.",
        image:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
      },
    ],
    faqs: [
      {
        q: "Which equipment categories support infrastructure projects?",
        a: "Depending on the project, excavators, loaders and other earthmoving equipment may be relevant.",
      },
      {
        q: "Can equipment be selected for a specific project?",
        a: "Yes. Share project scope, site conditions and expected workload with our team to discuss suitable options.",
      },
      {
        q: "How can I contact LUBESON for an enquiry?",
        a: "Use the Get a Quote button or visit the Contact page to send your requirements.",
      },
    ],
  },

  "material-handling": {
    eyebrow: "MATERIAL HANDLING EQUIPMENT & SOLUTIONS",
    title: "Move Materials",
    highlight: "With Greater Efficiency.",
    description:
      "Explore equipment solutions for loading, lifting, moving and managing materials across demanding work environments.",
    heroImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=85",
    overviewTitle: "Smarter solutions for material movement",
    overview:
      "Efficient material movement helps keep operations organised and productive. Explore equipment categories for loading, site logistics, material transfer and industrial handling requirements.",
    applications: [
      "Loading and unloading operations",
      "Movement of bulk materials",
      "Site logistics and material transfer",
    ],
    equipment: [
      {
        title: "Loaders",
        text: "Equipment options for moving aggregates and bulk materials.",
        image:
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Backhoe Loaders",
        text: "Versatile equipment for loading, digging and site work.",
        image:
          "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Industrial Handling",
        text: "Explore equipment options for demanding material-handling tasks.",
        image:
          "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=900&q=80",
      },
    ],
    faqs: [
      {
        q: "What is material handling equipment used for?",
        a: "Material-handling equipment supports the loading, lifting, movement and transfer of materials in work environments.",
      },
      {
        q: "How do I choose the right equipment?",
        a: "Consider material type, load requirements, site conditions and frequency of use. Our team can help you explore suitable options.",
      },
      {
        q: "Can I request pricing for equipment?",
        a: "Yes. Submit an enquiry through Get a Quote with the equipment category and your requirements.",
      },
    ],
  },
};

export default function IndustryPage({ industry = "construction" }) {
  const data = industryData[industry] || industryData.construction;
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="industry-page">
      <section
        className="industry-hero"
        style={{ backgroundImage: `url("${data.heroImage}")` }}
      >
        <div className="industry-hero-overlay" />
        <div className="industry-container industry-hero-content">
          <span className="industry-eyebrow">{data.eyebrow}</span>
          <h1>
            {data.title}
            <br />
            <span>{data.highlight}</span>
          </h1>
          <p>{data.description}</p>

          <div className="industry-hero-actions">
            <Link to="/quote" className="industry-btn industry-btn-red">
              Request a Quote <span>↗</span>
            </Link>
            <Link to="/equipment" className="industry-btn industry-btn-light">
              Explore Equipment <span>→</span>
            </Link>
          </div>

          <div className="industry-hero-note">
            <span className="industry-live-dot" />
            EQUIPMENT SOLUTIONS BY LUBESON
          </div>
        </div>
        <div className="industry-hero-index">
          INDUSTRY <span>/</span> SOLUTIONS
        </div>
      </section>

      <section className="industry-overview industry-section">
        <div className="industry-container industry-overview-grid">
          <div>
            <span className="industry-kicker">BUILT AROUND YOUR WORK</span>
            <h2>{data.overviewTitle}</h2>
          </div>
          <div className="industry-overview-copy">
            <p>{data.overview}</p>
            <ul>
              {data.applications.map((item) => (
                <li key={item}>
                  <span className="industry-check">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="industry-equipment industry-section">
        <div className="industry-container">
          <div className="industry-section-heading">
            <div>
              <span className="industry-kicker">FIND YOUR MACHINE</span>
              <h2>Equipment for {industry === "material-handling"
                ? "Material Handling"
                : industry.charAt(0).toUpperCase() + industry.slice(1)}</h2>
            </div>
            <Link to="/equipment" className="industry-text-link">
              View all equipment <span>↗</span>
            </Link>
          </div>

          <div className="industry-equipment-grid">
            {data.equipment.map((item, index) => (
              <article className="industry-equipment-card" key={item.title}>
                <div className="industry-equipment-image">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                  <span className="industry-card-number">
                    0{index + 1}
                  </span>
                </div>
                <div className="industry-equipment-body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <Link to="/equipment" className="industry-card-link">
                    Explore category <span>↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="industry-benefits industry-section">
        <div className="industry-container industry-benefits-grid">
          <div>
            <span className="industry-kicker">THE LUBESON APPROACH</span>
            <h2>More than equipment. A partner for your work.</h2>
            <p>
              Choosing machinery is an important decision. Tell us about your
              application and let our team help you explore available options.
            </p>
            <Link to="/quote" className="industry-btn industry-btn-red">
              Talk to Our Team <span>↗</span>
            </Link>
          </div>
          <div className="industry-benefit-list">
            <div>
              <span>01</span>
              <div>
                <h3>Application-led guidance</h3>
                <p>Discuss your work requirements before choosing equipment.</p>
              </div>
            </div>
            <div>
              <span>02</span>
              <div>
                <h3>Equipment options</h3>
                <p>Explore machine categories relevant to your application.</p>
              </div>
            </div>
            <div>
              <span>03</span>
              <div>
                <h3>Direct enquiry</h3>
                <p>Share your requirements with the LUBESON team.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="industry-testimonials industry-section">
        <div className="industry-container">
          <span className="industry-kicker">CUSTOMER STORIES</span>
          <div className="industry-section-heading">
            <h2>Successful customers.<br />Stronger projects.</h2>
            <p>
              Have a customer story, project photo or video? Add verified
              material here to showcase real work and customer experiences.
            </p>
          </div>

          <div className="industry-story-placeholder">
            <div className="industry-story-icon">▶</div>
            <div>
              <h3>Customer testimonials coming soon</h3>
              <p>
                This section is ready for real customer videos, project images
                and approved testimonials.
              </p>
            </div>
            <Link to="/contact" className="industry-text-link">
              Share your story <span>↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="industry-faq industry-section">
        <div className="industry-container industry-faq-grid">
          <div>
            <span className="industry-kicker">NEED TO KNOW</span>
            <h2>Frequently asked questions</h2>
            <p>
              Have a project in mind? Contact our team if you need help
              identifying the right equipment category.
            </p>
            <Link to="/contact" className="industry-text-link">
              Contact LUBESON <span>↗</span>
            </Link>
          </div>

          <div className="industry-faq-list">
            {data.faqs.map((faq, index) => (
              <div
                className={`industry-faq-item ${
                  openFaq === index ? "is-open" : ""
                }`}
                key={faq.q}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenFaq(openFaq === index ? -1 : index)
                  }
                  aria-expanded={openFaq === index}
                >
                  <span>{faq.q}</span>
                  <b>{openFaq === index ? "−" : "+"}</b>
                </button>
                {openFaq === index && <p>{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="industry-final-cta">
        <div className="industry-container industry-final-cta-inner">
          <div>
            <span className="industry-kicker">LET'S GET TO WORK</span>
            <h2>Tell us what your project needs.</h2>
            <p>Connect with our team to discuss your equipment requirements.</p>
          </div>
          <Link to="/quote" className="industry-btn industry-btn-light">
            Get a Quote <span>↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}