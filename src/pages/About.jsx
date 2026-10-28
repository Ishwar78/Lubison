import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CheckCircle2,
  Settings2,
  ShieldCheck,
  Wrench,
  Truck,
  HardHat,
  Target,
  Compass,
  Headphones,
} from "lucide-react";
import "./About.css";

const strengths = [
  {
    number: "01",
    icon: Settings2,
    title: "Equipment Solutions",
    description:
      "Explore construction equipment options suited to different applications, project requirements and working environments.",
  },
  {
    number: "02",
    icon: Wrench,
    title: "Parts & Service Support",
    description:
      "Get in touch with our team for equipment-related enquiries, spare parts information and service assistance.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Application-Focused Approach",
    description:
      "We aim to understand your requirements and help you explore suitable equipment options for your work.",
  },
  {
    number: "04",
    icon: Headphones,
    title: "Customer Assistance",
    description:
      "Our team is available to discuss your equipment needs and guide you through the next steps.",
  },
];

const industries = [
  {
    title: "Construction",
    description: "Equipment solutions for construction sites and everyday operations.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Infrastructure",
    description: "Explore equipment for roads, earthmoving and infrastructure projects.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Material Handling",
    description: "Equipment options for loading, moving and handling materials.",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Agriculture",
    description: "Explore equipment options for agricultural and land-related applications.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=85",
  },
];

export default function About() {
  return (
    <main className="lub-about">
      {/* HERO */}
      <section className="lub-about-hero">
        <div className="lub-about-hero-image" />

        <div className="lub-about-container lub-about-hero-content">
          <span className="lub-about-eyebrow">
            <span className="lub-about-dot" />
            GET TO KNOW US
          </span>

          <h1>
            Moving Work
            <br />
            <span>Forward.</span>
          </h1>

          <p>
            Exploring equipment solutions for the people who build,
            move and shape the world around us.
          </p>

          <div className="lub-about-hero-actions">
            <Link to="/equipment" className="lub-about-button">
              Explore Equipment <ArrowUpRight size={17} />
            </Link>

            <Link to="/contact" className="lub-about-text-link">
              Talk to Our Team <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="lub-about-hero-bottom">
            <span>CONSTRUCTION</span>
            <span className="lub-about-hero-line" />
            <span>EQUIPMENT</span>
            <span className="lub-about-hero-line" />
            <span>SOLUTIONS</span>
          </div>
        </div>

        <div className="lub-about-hero-index">
          <span>01</span>
          <span className="lub-about-index-line" />
          <span>ABOUT LUBESON</span>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="lub-about-intro lub-about-section">
        <div className="lub-about-container lub-about-intro-grid">
          <div className="lub-about-intro-heading">
            <span className="lub-about-eyebrow">
              <span className="lub-about-dot" />
              WHO WE ARE
            </span>

            <h2>
              Equipment for
              <br />
              <span>real-world work.</span>
            </h2>

            <div className="lub-about-heading-rule" />
          </div>

          <div className="lub-about-intro-copy">
            <p className="lub-about-lead">
              At LUBESON, we focus on connecting businesses with
              construction equipment and related solutions.
            </p>

            <p>
              Every project has its own demands. Choosing the right
              equipment means considering the application, working
              conditions and operational requirements. Our goal is to
              help customers explore suitable options and connect with
              our team for the information they need.
            </p>

            <p>
              From earthmoving equipment to material-handling and
              specialized machinery, we aim to make equipment enquiries
              straightforward and customer-focused.
            </p>

            <Link to="/contact" className="lub-about-inline-link">
              Get in Touch <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* IMAGE FEATURE */}
      <section className="lub-about-feature">
        <div className="lub-about-feature-image">
          <img
            src="https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=1800&q=85"
            alt="Heavy construction equipment at a worksite"
            loading="lazy"
          />
        </div>

        <div className="lub-about-feature-panel">
          <span className="lub-about-eyebrow">
            <span className="lub-about-dot" />
            OUR APPROACH
          </span>

          <h2>
            Understand the
            <br />
            work. Find the
            <br />
            <span>right solution.</span>
          </h2>

          <p>
            We believe equipment decisions should start with a clear
            understanding of the work to be done. Our approach is
            centred on listening to customer requirements and helping
            them explore relevant options.
          </p>

          <Link to="/equipment" className="lub-about-light-button">
            Discover Our Range <ArrowUpRight size={17} />
          </Link>

          <span className="lub-about-feature-number">L / 01</span>
        </div>
      </section>

      {/* STRENGTHS */}
      <section className="lub-about-strengths lub-about-section">
        <div className="lub-about-container">
          <div className="lub-about-section-heading">
            <div>
              <span className="lub-about-eyebrow">
                <span className="lub-about-dot" />
                WHY LUBESON
              </span>

              <h2>
                Built around
                <br />
                <span>your requirements.</span>
              </h2>
            </div>

            <p>
              A practical, customer-focused approach to equipment
              enquiries, product information and support.
            </p>
          </div>

          <div className="lub-about-strength-grid">
            {strengths.map((item) => {
              const Icon = item.icon;

              return (
                <article className="lub-about-strength-card" key={item.number}>
                  <div className="lub-about-card-top">
                    <span>{item.number}</span>

                    <div className="lub-about-strength-icon">
                      <Icon size={23} strokeWidth={1.6} />
                    </div>
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.description}</p>

                  <div className="lub-about-card-bottom">
                    <span>OUR APPROACH</span>
                    <CheckCircle2 size={17} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="lub-about-industries lub-about-section">
        <div className="lub-about-container">
          <div className="lub-about-section-heading">
            <div>
              <span className="lub-about-eyebrow">
                <span className="lub-about-dot" />
                WHERE WE FIT
              </span>

              <h2>
                Supporting work
                <br />
                <span>across industries.</span>
              </h2>
            </div>

            <p>
              Explore equipment categories for a range of work
              environments and operational needs.
            </p>
          </div>

          <div className="lub-about-industry-grid">
            {industries.map((industry, index) => (
              <Link
                to="/equipment"
                className="lub-about-industry-card"
                key={industry.title}
              >
                <div className="lub-about-industry-image">
                  <img
                    src={industry.image}
                    alt={industry.title}
                    loading="lazy"
                  />

                  <span className="lub-about-industry-number">
                    0{index + 1}
                  </span>

                  <span className="lub-about-industry-arrow">
                    <ArrowUpRight size={19} />
                  </span>
                </div>

                <div className="lub-about-industry-copy">
                  <h3>{industry.title}</h3>
                  <p>{industry.description}</p>
                  <span className="lub-about-industry-link">
                    EXPLORE EQUIPMENT <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="lub-about-cta">
        <div className="lub-about-container lub-about-cta-inner">
          <div className="lub-about-cta-icon">
            <HardHat size={29} strokeWidth={1.5} />
          </div>

          <div className="lub-about-cta-copy">
            <span className="lub-about-eyebrow">
              <span className="lub-about-dot" />
              LET'S TALK EQUIPMENT
            </span>

            <h2>
              Have a project
              <br />
              <span>in mind?</span>
            </h2>

            <p>
              Tell us what you are working on. Connect with our team
              to discuss your equipment requirements.
            </p>
          </div>

          <div className="lub-about-cta-actions">
            <Link to="/contact" className="lub-about-button">
              Enquire Now <ArrowUpRight size={17} />
            </Link>

            <Link to="/equipment" className="lub-about-cta-secondary">
              Browse Equipment
            </Link>
          </div>

          <Compass className="lub-about-cta-decoration" size={190} />
        </div>
      </section>
    </main>
  );
}