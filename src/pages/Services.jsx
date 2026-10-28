
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Wrench,
  Settings,
  Cog,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Phone,
} from "lucide-react";
import "./Services.css";

const servicesData = {
  "equipment-servicing": {
    number: "01",
    title: "Equipment Servicing",
    subtitle: "Keep Your Machines Performing.",
    description:
      "Keep your construction equipment ready for demanding work. Contact our team to discuss servicing requirements, equipment condition, and suitable support options.",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2021/6/JB/OX/PF/110258598/equipment-maintenance-and-repair.png",
    icon: Wrench,
    label: "EQUIPMENT CARE",
    features: [
      {
        title: "Equipment Inspection",
        description:
          "Discuss your machine's condition and identify the servicing support it may require.",
      },
      {
        title: "Routine Servicing",
        description:
          "Ask about servicing schedules and maintenance requirements for your equipment.",
      },
      {
        title: "Performance Support",
        description:
          "Explore available support options to help keep your equipment working efficiently.",
      },
    ],
  },

  "spare-parts": {
    number: "02",
    title: "Spare Parts",
    subtitle: "The Right Parts for the Job.",
    description:
      "Looking for replacement parts for construction equipment? Share your machine details and part requirements with our team to discuss availability and pricing.",
    image:
      "https://www.orangemachinetech.com/images/blogs/tower-crane-mechanical-electrical-parts-neatly-arranged-on-workshop-table.webp",
    icon: Cog,
    label: "PARTS & COMPONENTS",
    features: [
      {
        title: "Parts Identification",
        description:
          "Share the equipment model or part number to help identify the component you need.",
      },
      {
        title: "Availability & Pricing",
        description:
          "Contact our team to enquire about current availability, pricing, and order requirements.",
      },
      {
        title: "Replacement Components",
        description:
          "Discuss replacement requirements for your equipment and its components.",
      },
    ],
  },

  "maintenance-repair": {
    number: "03",
    title: "Maintenance & Repair",
    subtitle: "Support for Your Equipment.",
    description:
      "Equipment problems can affect project schedules. Tell us about the issue, your machine, and your requirements so our team can discuss the next steps with you.",
    image:
      "https://cdn.allcrane.com/sitefinity/images/default-source/pages/rent/maintenance_and_service1.jpg?sfvrsn=83db3966_1",
    icon: Settings,
    label: "REPAIR & MAINTENANCE",
    features: [
      {
        title: "Repair Enquiries",
        description:
          "Describe the issue with your equipment to help us understand your repair requirements.",
      },
      {
        title: "Preventive Maintenance",
        description:
          "Discuss maintenance practices that may help identify equipment issues early.",
      },
      {
        title: "Technical Assistance",
        description:
          "Share your equipment details and ask about suitable support options.",
      },
    ],
  },
};

const serviceBenefits = [
  {
    icon: ShieldCheck,
    title: "Equipment-Focused Support",
    description:
      "Discuss your requirements with a focus on your machine and application.",
  },
  {
    icon: Clock,
    title: "Plan Your Next Step",
    description:
      "Share the details needed to understand your service or parts enquiry.",
  },
  {
    icon: CheckCircle2,
    title: "Clear Communication",
    description:
      "Get in touch to discuss requirements, availability, and possible solutions.",
  },
];

export default function Services() {
  const { serviceSlug } = useParams();

  const service = servicesData[serviceSlug];

  // Default Services overview page
  if (!service) {
    return (
      <main className="lb-services-page">
        <section className="lb-services-overview-hero">
          <div className="lb-services-overview-image" />

          <div className="lb-services-container lb-services-overview-content">
            <span className="lb-services-eyebrow">
              <span />
              LUBESON SERVICES
            </span>

            <h1>
              Support That
              <br />
              Keeps You <span>Moving.</span>
            </h1>

            <p>
              Explore our service categories for construction
              equipment. From servicing enquiries to spare parts
              and maintenance support, start with what your
              equipment needs.
            </p>

            <a href="#all-services" className="lb-services-main-btn">
              Explore Services
              <ArrowRight size={18} />
            </a>
          </div>
        </section>

        <section
          className="lb-services-overview-section"
          id="all-services"
        >
          <div className="lb-services-container">
            <div className="lb-services-section-heading">
              <div>
                <span className="lb-services-kicker">
                  HOW WE CAN HELP
                </span>

                <h2>
                  Services built around
                  <br />
                  <span>your equipment.</span>
                </h2>
              </div>

              <p>
                Select a service to explore the details and contact
                our team about your requirements.
              </p>
            </div>

            <div className="lb-services-card-grid">
              {Object.entries(servicesData).map(([slug, item]) => {
                const Icon = item.icon;

                return (
                  <article className="lb-services-card" key={slug}>
                    <div className="lb-services-card-image">
                      <img src={item.image} alt={item.title} />

                      <span className="lb-services-card-number">
                        {item.number}
                      </span>
                    </div>

                    <div className="lb-services-card-content">
                      <div className="lb-services-card-icon">
                        <Icon size={23} />
                      </div>

                      <span className="lb-services-card-label">
                        {item.label}
                      </span>

                      <h3>{item.title}</h3>

                      <p>{item.description}</p>

                      <Link
                        to={`/services/${slug}`}
                        className="lb-services-card-link"
                      >
                        Explore Service
                        <ArrowUpRight size={18} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="lb-services-benefits-section">
          <div className="lb-services-container">
            <div className="lb-services-benefits-grid">
              {serviceBenefits.map((item) => {
                const Icon = item.icon;

                return (
                  <div className="lb-services-benefit" key={item.title}>
                    <Icon size={25} />

                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="lb-services-bottom-cta">
          <div className="lb-services-container lb-services-cta-inner">
            <div>
              <span className="lb-services-kicker">
                NEED ASSISTANCE?
              </span>

              <h2>
                Let's discuss your <span>requirements.</span>
              </h2>

              <p>
                Contact our team with your equipment or service enquiry.
              </p>
            </div>

            <Link to="/contact" className="lb-services-main-btn">
              Contact Our Team
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  // Individual service page
  const ServiceIcon = service.icon;

  return (
    <main className="lb-services-page">
      <section className="lb-service-detail-hero">
        <div
          className="lb-service-detail-image"
          style={{ backgroundImage: `url("${service.image}")` }}
        />

        <div className="lb-services-container lb-service-detail-content">
          <div className="lb-service-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/services">Services</Link>
            <span>/</span>
            <span>{service.title}</span>
          </div>

          <span className="lb-services-eyebrow">
            <span />
            {service.label}
          </span>

          <div className="lb-service-detail-number">
            SERVICE {service.number}
          </div>

          <div className="lb-service-detail-icon">
            <ServiceIcon size={28} />
          </div>

          <h1>
            {service.title.split(" ")[0]}
            <br />
            <span>
              {service.title
                .split(" ")
                .slice(1)
                .join(" ")}
            </span>
          </h1>

          <h2>{service.subtitle}</h2>

          <p>{service.description}</p>

          <Link to="/contact" className="lb-services-main-btn">
            Enquire About This Service
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      <section className="lb-service-detail-body">
        <div className="lb-services-container">
          <div className="lb-service-detail-heading">
            <span className="lb-services-kicker">
              {service.label}
            </span>

            <h2>
              The support your
              <br />
              <span>equipment needs.</span>
            </h2>

            <p>
              Every equipment requirement is different. Explore the
              areas below and contact our team to discuss your specific
              needs, machine details, and the available options.
            </p>
          </div>

          <div className="lb-service-features-grid">
            {service.features.map((feature, index) => (
              <article className="lb-service-feature" key={feature.title}>
                <span className="lb-service-feature-number">
                  0{index + 1}
                </span>

                <div className="lb-service-feature-icon">
                  <CheckCircle2 size={22} />
                </div>

                <h3>{feature.title}</h3>

                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lb-service-benefits-section">
        <div className="lb-services-container">
          <div className="lb-service-benefits-heading">
            <span className="lb-services-kicker">
              THE LUBESON APPROACH
            </span>

            <h2>
              Start with the right <span>conversation.</span>
            </h2>
          </div>

          <div className="lb-services-benefits-grid">
            {serviceBenefits.map((item) => {
              const Icon = item.icon;

              return (
                <div className="lb-services-benefit" key={item.title}>
                  <Icon size={25} />

                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="lb-services-bottom-cta">
        <div className="lb-services-container lb-services-cta-inner">
          <div>
            <span className="lb-services-kicker">
              LET'S TALK
            </span>

            <h2>
              Need help with <span>{service.title}?</span>
            </h2>

            <p>
              Tell us about your equipment and what you need.
            </p>
          </div>

          <Link to="/contact" className="lb-services-main-btn">
            Send an Inquiry
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
