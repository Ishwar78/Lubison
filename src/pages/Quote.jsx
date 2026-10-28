
import { useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  ClipboardList,
  Headphones,
  ShieldCheck,
  Clock3,
} from "lucide-react";
import "./Quote.css";

const initialForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  equipment: "",
  quantity: "1",
  budget: "",
  location: "",
  requirement: "",
};

export default function Quote() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = `
LUBESON - Quote Request

Name: ${form.name}
Company: ${form.company || "Not provided"}
Email: ${form.email}
Phone: ${form.phone}
Equipment: ${form.equipment}
Quantity: ${form.quantity}
Budget: ${form.budget || "Not specified"}
Location: ${form.location}
Requirement: ${form.requirement || "Not specified"}
    `.trim();

    const whatsappNumber = ""; // Add your official WhatsApp number with country code.
    
    if (whatsappNumber) {
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener,noreferrer");
      setSubmitted(true);
    } else {
      // No backend or WhatsApp number is configured yet.
      // Keep the entered details visible until a submission method is connected.
      alert(
        "The quote form is ready, but submission is not connected yet. Please contact the website administrator to connect WhatsApp or a backend."
      );
    }
  };

  return (
    <main className="lb-quote-page">
      <section className="lb-quote-hero">
        <div className="lb-quote-hero-image" />

        <div className="lb-quote-hero-content">
          <span className="lb-quote-eyebrow">
            <span /> LET'S GET STARTED
          </span>

          <h1>
            Let's Find the Right
            <br />
            <span>Equipment for You.</span>
          </h1>

          <p>
            Tell us what your project needs. Share your equipment
            requirements and our team can help you explore the right solution.
          </p>

          <div className="lb-quote-hero-points">
            <span>
              <CheckCircle2 size={17} /> Tailored equipment enquiries
            </span>
            <span>
              <CheckCircle2 size={17} /> Clear requirement details
            </span>
          </div>
        </div>

        <div className="lb-quote-hero-tag">
          <span>YOUR PROJECT</span>
          <strong>STARTS HERE ↗</strong>
        </div>
      </section>

      <section className="lb-quote-main">
        <div className="lb-quote-intro">
          <span className="lb-quote-section-label">REQUEST A QUOTE</span>
          <h2>
            Tell us what
            <br />
            <span>you need.</span>
          </h2>
          <p>
            Complete the form with a few details about your requirement.
            The more information you provide, the easier it is to understand
            your project needs.
          </p>

          <div className="lb-quote-benefits">
            <div className="lb-quote-benefit">
              <span className="lb-quote-benefit-icon">
                <ClipboardList size={21} />
              </span>
              <div>
                <h3>Your Requirements</h3>
                <p>Tell us about the machine and quantity you need.</p>
              </div>
            </div>

            <div className="lb-quote-benefit">
              <span className="lb-quote-benefit-icon">
                <Headphones size={21} />
              </span>
              <div>
                <h3>Personalised Assistance</h3>
                <p>Share your contact details for follow-up.</p>
              </div>
            </div>

            <div className="lb-quote-benefit">
              <span className="lb-quote-benefit-icon">
                <ShieldCheck size={21} />
              </span>
              <div>
                <h3>Clear Communication</h3>
                <p>Provide the details needed to discuss your enquiry.</p>
              </div>
            </div>
          </div>

          <div className="lb-quote-note">
            <Clock3 size={19} />
            <p>
              <strong>Have an urgent requirement?</strong>
              <br />
              Include your preferred timeline in the project details.
            </p>
          </div>
        </div>

        <div className="lb-quote-form-card">
          <div className="lb-quote-form-heading">
            <div>
              <span>QUOTE FORM</span>
              <h2>Project Details</h2>
            </div>
            <span className="lb-quote-step">01 / 01</span>
          </div>

          {submitted ? (
            <div className="lb-quote-success">
              <CheckCircle2 size={48} />
              <h3>Your enquiry is ready!</h3>
              <p>
                If WhatsApp opened, send the pre-filled message to complete
                your enquiry. Otherwise, contact the website administrator
                to connect a submission method.
              </p>
              <button
                type="button"
                onClick={() => {
                  setForm(initialForm);
                  setSubmitted(false);
                }}
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="lb-quote-field-grid">
                <label>
                  Full Name <span>*</span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                  />
                </label>

                <label>
                  Company Name
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Your company (optional)"
                    autoComplete="organization"
                  />
                </label>

                <label>
                  Email Address <span>*</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    autoComplete="email"
                    required
                  />
                </label>

                <label>
                  Phone Number <span>*</span>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                    required
                  />
                </label>

                <label>
                  Equipment Required <span>*</span>
                  <select
                    name="equipment"
                    value={form.equipment}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select equipment type</option>
                    <option value="Backhoe Loader">Backhoe Loader</option>
                    <option value="Excavator">Excavator</option>
                    <option value="Wheel Loader">Wheel Loader</option>
                    <option value="Crane">Crane</option>
                    <option value="Road Construction Equipment">
                      Road Construction Equipment
                    </option>
                    <option value="Agriculture Equipment">
                      Agriculture Equipment
                    </option>
                    <option value="Spare Parts">Spare Parts</option>
                    <option value="Other">Other Equipment</option>
                  </select>
                </label>

                <label>
                  Quantity <span>*</span>
                  <select
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    required
                  >
                    <option value="1">1 unit</option>
                    <option value="2-5">2–5 units</option>
                    <option value="6-10">6–10 units</option>
                    <option value="10+">More than 10 units</option>
                  </select>
                </label>

                <label>
                  Project Location <span>*</span>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="City, State"
                    autoComplete="address-level2"
                    required
                  />
                </label>

                <label>
                  Estimated Budget
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select budget (optional)</option>
                    <option value="Under ₹5 lakh">Under ₹5 lakh</option>
                    <option value="₹5–15 lakh">₹5–15 lakh</option>
                    <option value="₹15–30 lakh">₹15–30 lakh</option>
                    <option value="₹30 lakh+">₹30 lakh+</option>
                    <option value="Need guidance">Need guidance</option>
                  </select>
                </label>
              </div>

              <label className="lb-quote-message">
                Tell Us About Your Requirement
                <textarea
                  name="requirement"
                  value={form.requirement}
                  onChange={handleChange}
                  placeholder="Equipment specifications, application, preferred timeline, or other details..."
                  rows={4}
                />
              </label>

              <p className="lb-quote-privacy">
                By submitting, you agree that your details may be used to
                respond to this enquiry.
              </p>

              <button type="submit" className="lb-quote-submit">
                Request a Quote <ArrowUpRight size={19} />
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="lb-quote-bottom">
        <div>
          <span>LET'S TALK EQUIPMENT</span>
          <h2>Have a project in mind?</h2>
          <p>
            Share your requirements and start a conversation with LUBESON.
          </p>
        </div>

        <a href="/contact" className="lb-quote-contact-link">
          Contact Our Team <ArrowUpRight size={18} />
        </a>
      </section>
    </main>
  );
}
