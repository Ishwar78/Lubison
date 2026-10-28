
import { useState } from "react";
import { Plus, Minus, MessageCircle } from "lucide-react";
import "./FAQ.css";

const faqs = [
  {
    question: "What types of construction equipment does LUBESON offer?",
    answer:
      "LUBESON offers a range of construction and industrial equipment, including backhoe loaders, wheel loaders, excavators, cranes, telehandlers, road construction equipment, and agricultural machinery.",
  },
  {
    question: "How can I get a price quote for equipment?",
    answer:
      "You can request a quote through our Get a Quote form or contact our team. Share your equipment requirements, and our team can help you with the next steps.",
  },
  {
    question: "Can I enquire about a specific machine?",
    answer:
      "Yes. Visit the Equipment page, select the machine you are interested in, and use the enquiry option on its detail page to share your requirements.",
  },
  {
    question: "Does LUBESON provide equipment servicing and maintenance?",
    answer:
      "LUBESON lists equipment servicing, spare parts, and maintenance and repair among its service categories. Contact our team to discuss the support available for your machine.",
  },
  {
    question: "How do I choose the right equipment for my project?",
    answer:
      "The right machine depends on your application, site conditions, operating requirements, and budget. Contact our team with your project details for assistance in identifying suitable equipment.",
  },
  {
    question: "How can I contact the LUBESON team?",
    answer:
      "Visit the Contact page or use the Get a Quote option on our website to send your enquiry to the team.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="lubeson-faq-section" id="faq">
      <div className="lubeson-faq-container">
        <div className="lubeson-faq-heading">
          <span className="lubeson-faq-eyebrow">
            <span className="lubeson-faq-dot" />
            GOT QUESTIONS?
          </span>

          <h2>
            Frequently Asked
            <br />
            <span>Questions.</span>
          </h2>

          <p>
            Everything you need to know about our equipment, services, and
            enquiry process.
          </p>

          <div className="lubeson-faq-contact">
            <div className="lubeson-faq-contact-icon">
              <MessageCircle size={21} />
            </div>

            <div>
              <strong>Still have questions?</strong>
              <p>Our team is here to help.</p>
            </div>

            <a href="/contact" aria-label="Contact LUBESON">
              →
            </a>
          </div>
        </div>

        <div className="lubeson-faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                className={`lubeson-faq-item ${isOpen ? "is-open" : ""}`}
                key={faq.question}
              >
                <button
                  className="lubeson-faq-question"
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? -1 : index)
                  }
                  aria-expanded={isOpen}
                >
                  <span className="lubeson-faq-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="lubeson-faq-question-text">
                    {faq.question}
                  </span>

                  <span className="lubeson-faq-toggle">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>

                <div
                  className="lubeson-faq-answer"
                  hidden={!isOpen}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
