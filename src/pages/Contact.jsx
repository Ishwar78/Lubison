
import { useState } from "react";
import {
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Building2,
  CheckCircle2,
} from "lucide-react";
import "./Contact.css";

const contactDetails = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak with our team about your requirements.",
    value: "Contact our sales team",
    action: "Call Now",
    href: "tel:+910000000000",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us your product or business inquiry.",
    value: "Email our team",
    action: "Send Email",
    href: "mailto:info@lubeson.com",
  },
  {
    icon: MapPin,
    title: "Our Location",
    description: "Connect with us for business and product inquiries.",
    value: "Location details available on request",
    action: "Get in Touch",
    href: "#contact-form",
  },
];

const inquiryTypes = [
  "Equipment Inquiry",
  "Product Pricing",
  "Bulk Order",
  "Dealership / Partnership",
  "Service & Support",
  "Other",
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("");

    const {
      name,
      company,
      email,
      phone,
      inquiryType,
      message,
    } = formData;

    const subject = encodeURIComponent(
      `LUBESON Inquiry - ${inquiryType}`
    );

    const body = encodeURIComponent(
      `Hello LUBESON Team,

Name: ${name}
Company: ${company || "Not provided"}
Email: ${email}
Phone: ${phone}
Inquiry Type: ${inquiryType}

Message:
${message}

Please contact me regarding this inquiry.`
    );

    // Opens the visitor's default email application.
    window.location.href =
      `mailto:info@lubeson.com?subject=${subject}&body=${body}`;

    setStatus(
      "Your email application should open with your inquiry. Please send the email to complete your request."
    );
  };

  return (
    <main className="lb-contact-page">
      {/* HERO SECTION */}
      <section className="lb-contact-hero">
        <div className="lb-contact-hero-image" />

        <div className="lb-contact-container lb-contact-hero-content">
          <div className="lb-contact-eyebrow">
            <span className="lb-contact-eyebrow-line" />
            WE'RE HERE TO HELP
          </div>

          <h1>
            Let's Build
            <br />
            Something <span>Powerful.</span>
          </h1>

          <p>
            Looking for construction equipment, product pricing,
            or a business partnership? Tell us what you need.
            Our team is ready to hear from you.
          </p>

          <a href="#contact-form" className="lb-contact-primary-btn">
            Talk to Our Team
            <ArrowUpRight size={19} />
          </a>

          <div className="lb-contact-hero-note">
            <span className="lb-contact-status-dot" />
            EQUIPMENT · SOLUTIONS · PARTNERSHIPS
          </div>
        </div>

        <div className="lb-contact-hero-index">CONTACT / 01</div>
      </section>

      {/* CONTACT INFORMATION */}
      <section className="lb-contact-info-section">
        <div className="lb-contact-container">
          <div className="lb-contact-section-heading">
            <div>
              <span className="lb-contact-kicker">
                CONNECT WITH LUBESON
              </span>

              <h2>
                We're just a <span>message away.</span>
              </h2>
            </div>

            <p>
              Whether you're exploring equipment options or
              discussing your next project, start the conversation
              with us.
            </p>
          </div>

          <div className="lb-contact-info-grid">
            {contactDetails.map((item) => {
              const Icon = item.icon;

              return (
                <article className="lb-contact-info-card" key={item.title}>
                  <div className="lb-contact-info-icon">
                    <Icon size={23} strokeWidth={1.7} />
                  </div>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                  <div className="lb-contact-info-value">
                    {item.value}
                  </div>

                  <a href={item.href} className="lb-contact-text-link">
                    {item.action}
                    <ArrowUpRight size={17} />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section
        className="lb-contact-form-section"
        id="contact-form"
      >
        <div className="lb-contact-container lb-contact-form-layout">
          <div className="lb-contact-form-intro">
            <span className="lb-contact-kicker">
              SEND AN INQUIRY
            </span>

            <h2>
              Tell us about
              <br />
              your <span>requirements.</span>
            </h2>

            <p>
              Share a few details about your needs. Whether it is
              equipment selection, pricing, bulk purchasing, or a
              partnership opportunity, give us the information needed
              to understand your request.
            </p>

            <div className="lb-contact-benefit">
              <div className="lb-contact-benefit-icon">
                <MessageCircle size={21} />
              </div>

              <div>
                <h4>Clear communication</h4>
                <p>
                  Share your requirements so the right inquiry can
                  reach the appropriate team.
                </p>
              </div>
            </div>

            <div className="lb-contact-benefit">
              <div className="lb-contact-benefit-icon">
                <Building2 size={21} />
              </div>

              <div>
                <h4>Business-focused support</h4>
                <p>
                  Tell us about your company, project, or equipment
                  requirements.
                </p>
              </div>
            </div>

            <div className="lb-contact-benefit">
              <div className="lb-contact-benefit-icon">
                <Clock size={21} />
              </div>

              <div>
                <h4>Help us understand your needs</h4>
                <p>
                  Include product names, quantities, or other useful
                  details in your message.
                </p>
              </div>
            </div>
          </div>

          <div className="lb-contact-form-card">
            <div className="lb-contact-form-heading">
              <div>
                <span>CONTACT FORM</span>
                <h3>Send Your Inquiry</h3>
              </div>

              <div className="lb-contact-form-heading-icon">
                <Send size={22} />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="lb-contact-input-row">
                <div className="lb-contact-field">
                  <label htmlFor="contact-name">
                    Full Name <span>*</span>
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="lb-contact-field">
                  <label htmlFor="contact-company">
                    Company Name
                  </label>

                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    placeholder="Your company name"
                    value={formData.company}
                    onChange={handleChange}
                    autoComplete="organization"
                  />
                </div>
              </div>

              <div className="lb-contact-input-row">
                <div className="lb-contact-field">
                  <label htmlFor="contact-email">
                    Email Address <span>*</span>
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="lb-contact-field">
                  <label htmlFor="contact-phone">
                    Phone Number <span>*</span>
                  </label>

                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>

              <div className="lb-contact-field">
                <label htmlFor="contact-inquiry">
                  Inquiry Type <span>*</span>
                </label>

                <select
                  id="contact-inquiry"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your inquiry</option>

                  {inquiryTypes.map((type) => (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lb-contact-field">
                <label htmlFor="contact-message">
                  Your Message <span>*</span>
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell us which equipment or services you are looking for..."
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="lb-contact-submit-btn"
              >
                Send Inquiry
                <ArrowUpRight size={19} />
              </button>

              {status && (
                <p className="lb-contact-form-status" role="status">
                  <CheckCircle2 size={18} />
                  {status}
                </p>
              )}

              <p className="lb-contact-form-disclaimer">
                By submitting this form, you agree to be contacted
                regarding your inquiry.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="lb-contact-cta-section">
        <div className="lb-contact-container lb-contact-cta-inner">
          <div>
            <span className="lb-contact-kicker">
              HAVE A PROJECT IN MIND?
            </span>

            <h2>
              Let's get to <span>work.</span>
            </h2>

            <p>
              Tell us what your project needs. Let's start with a
              conversation.
            </p>
          </div>

          <a
            href="mailto:info@lubeson.com"
            className="lb-contact-cta-btn"
          >
            Contact Our Team
            <ArrowUpRight size={19} />
          </a>
        </div>
      </section>
    </main>
  );
}
