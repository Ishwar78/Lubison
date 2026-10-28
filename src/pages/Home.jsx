import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import FAQ from "../components/FAQ";

const slides = [
  {
    label: "01 / CRANE & LIFTING",
    eyebrow: "LIFT WITH CONFIDENCE",
    title: <>POWER BEHIND<br />EVERY LIFT.</>,
    description: "Equipment solutions for demanding lifting and material-handling work.",
    image: "https://bullindia.com/images/banner/76-countries.webp",
    position: "center",
  },
  {
    label: "02 / LOADERS",
    eyebrow: "HEAVY EQUIPMENT",
    title: <>BUILT TO<br />MOVE MORE.</>,
    description: "Explore loader solutions designed for tough working conditions.",
    image: "https://www.nbmcw.com/images/10-earthmoving-equipment/52096-Caterpillar-India-2.webp",
    position: "center 55%",
  },
  {
    label: "03 / CONSTRUCTION",
    eyebrow: "READY FOR REAL WORK",
    title: <>MADE FOR<br />TOUGH JOBS.</>,
    description: "Find equipment for construction, excavation and site operations.",
    image: "https://lirp.cdn-website.com/6da0cf0d/dms3rep/multi/opt/Coastwide_Civil_Plant_Capability_4-1920w.jpg",
    position: "center",
  },
  {
    label: "04 / AGRICULTURE ATTACHMENTS",
    eyebrow: "VERSATILITY IN THE FIELD",
    title: <>MORE WAYS<br />TO GET IT DONE.</>,
    description: "Explore attachment options for agricultural and material-handling applications.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyMLhyk0_bC5nsDxhB3J0Jb-A0U_N99XoS9gDpkEGFHg&s=10",
    position: "center",
  },
  {
    label: "05 / HD 76 LOADER",
    eyebrow: "ENGINEERED FOR PERFORMANCE",
    title: <>HD 76 LOADER.<br />BUILT FOR WORK.</>,
    description: "HD 76 Loader with Kirloskar engine. Confirm the final model image and specifications with LUBESON.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Nfdspq681ksL9A0u_Sp7VkFFocHXFXm88MYksW4yjg&s=10",
    position: "center",
  },
];

const highlights = [
  { number: "01", title: "Satisfied Customers", text: "Customer-focused solutions", icon: "♧" },
  { number: "02", title: "Spares & Service", text: "Support across India", icon: "⚙" },
  { number: "03", title: "Bucket Options", text: "Versatile attachments", icon: "▱" },
  { number: "04", title: "Experienced Engineers", text: "Technical expertise", icon: "⌘" },
  { number: "05", title: "Our Employees", text: "People behind our work", icon: "♙" },
];

const machines = [
  {
    name: "Backhoe Loaders",
    type: "CONSTRUCTION",
    image: "https://www.nbmcw.com/images/10-earthmoving-equipment/52096-Caterpillar-India-2.webp",
    description: "For digging, loading and general site work.",
  },
  {
    name: "Earthmoving Equipment",
    type: "EARTHMOVING",
    image: "https://s7d2.scene7.com/is/image/Caterpillar/CM20221017-6c266-82640?fmt=pjpeg",
    description: "Equipment for excavation and ground preparation.",
  },
  {
    name: "Lifting Equipment",
    type: "LIFTING",
    image: "https://www.mo-cranes.com/images/services/forklift.jpeg",
    description: "Options for lifting and material handling.",
  },
  {
    name: "Agriculture Equipment",
    type: "AGRICULTURE",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=85",
    description: "Explore equipment for agricultural applications.",
  },
];

const attachments = [
  {
    name: "General Purpose Bucket",
    detail: "For loading and material handling.",
    image: "https://www.bulltractorattachments.com/images/products/linup-ultra-loader.png",
  },
  {
    name: "Trenching Bucket",
    detail: "For trenching and excavation tasks.",
    image: "https://www.bulltractorattachments.com/images/products/backhoe-loader-dozer.png",
  },
  {
    name: "Loader Bucket",
    detail: "A bucket option for loader applications.",
    image: "https://www.bulltractorattachments.com/images/products/dozer-radial-loader.png",
  },
];

const industries = [
  {
    name: "Construction",
    to: "/industries/construction",
    text: "Equipment for building and site operations.",
    image: "https://lirp.cdn-website.com/6da0cf0d/dms3rep/multi/opt/Coastwide_Civil_Plant_Capability_4-1920w.jpg",
  },
  {
    name: "Agriculture",
    to: "/industries/agriculture",
    text: "Explore solutions for work in the field.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Infrastructure",
    to: "/industries/infrastructure",
    text: "Equipment for road and infrastructure projects.",
    image: "https://www.nbmcw.com/images/10-earthmoving-equipment/52096-Caterpillar-India-2.webp",
  },
  {
    name: "Material Handling",
    to: "/industries/material-handling",
    text: "Solutions for lifting and moving materials.",
    image: "https://www.mo-cranes.com/images/services/forklift.jpeg",
  },
];

const reviews = [
  // Reviews will be loaded from the admin/backend once the review upload form is connected.
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [machineStart, setMachineStart] = useState(0);
  const [attachmentStart, setAttachmentStart] = useState(0);
  const [reviewStart, setReviewStart] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, []);

  const move = (setter, current, total, direction) => {
    setter((current + direction + total) % total);
  };

  const slide = slides[activeSlide];
  const featuredMachine = machines[machineStart];
  const featuredAttachment = attachments[attachmentStart];

  return (
    <main className="lh-home">
      {/* 1. HERO SLIDER */}
      <section className="lh-hero">
        {slides.map((item, index) => (
          <div
            key={item.label}
            className={`lh-hero-slide ${index === activeSlide ? "active" : ""}`}
            style={{
              backgroundImage: `url("${item.image}")`,
              backgroundPosition: item.position,
            }}
            aria-hidden={index !== activeSlide}
          />
        ))}

        <div className="lh-hero-overlay" />

        <div className="lh-hero-inner">
          <div className="lh-hero-copy" key={activeSlide}>
            <p className="lh-eyebrow"><span />{slide.eyebrow}</p>
            <h1>{slide.title}</h1>
            <p className="lh-hero-description">{slide.description}</p>

            <div className="lh-hero-actions">
              <Link to="/equipment" className="lh-btn lh-btn-accent">
                EXPLORE EQUIPMENT <span>↗</span>
              </Link>
              <Link to="/contact" className="lh-btn lh-btn-outline">
                GET A QUOTE
              </Link>
            </div>
          </div>

          <div className="lh-hero-index">
            <strong>{String(activeSlide + 1).padStart(2, "0")}</strong>
            <span />
            <small>{String(slides.length).padStart(2, "0")}</small>
          </div>
        </div>

        <div className="lh-hero-bottom">
          <span>{slide.label}</span>
          <div className="lh-hero-dots" aria-label="Choose banner">
            {slides.map((item, index) => (
              <button
                key={item.label}
                type="button"
                className={index === activeSlide ? "active" : ""}
                onClick={() => setActiveSlide(index)}
                aria-label={`Show banner ${index + 1}`}
                aria-pressed={index === activeSlide}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. COMPANY HIGHLIGHTS */}
      <section className="lh-highlights" aria-label="Company highlights">
        {highlights.map((item) => (
          <article className="lh-highlight" key={item.title}>
            <span className="lh-highlight-icon" aria-hidden="true">{item.icon}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </section>

      {/* 3. EQUIPMENT SHOWCASE */}
      <section className="lh-section lh-equipment-section">
        <div className="lh-section-head">
          <div>
            <p className="lh-kicker">EXPLORE OUR RANGE</p>
            <h2>Equipment for <span>every challenge.</span></h2>
            <p className="lh-section-subtitle">
              Explore machinery for demanding work environments and different applications.
            </p>
          </div>
          <div className="lh-carousel-actions">
            <button type="button" aria-label="Previous equipment" onClick={() => move(setMachineStart, machineStart, machines.length, -1)}>←</button>
            <button type="button" aria-label="Next equipment" onClick={() => move(setMachineStart, machineStart, machines.length, 1)}>→</button>
          </div>
        </div>

        <div className="lh-featured-layout">
          <div className="lh-featured-machine">
            <span className="lh-image-label">FEATURED EQUIPMENT</span>
            <img src={featuredMachine.image} alt={featuredMachine.name} />
            <span className="lh-featured-count">
              {String(machineStart + 1).padStart(2, "0")} / {String(machines.length).padStart(2, "0")}
            </span>
          </div>

          <div className="lh-featured-copy">
            <p className="lh-kicker">{featuredMachine.type}</p>
            <h3>{featuredMachine.name}</h3>
            <p>{featuredMachine.description}</p>
            <Link to="/equipment" className="lh-btn lh-btn-dark">
              VIEW EQUIPMENT <span>↗</span>
            </Link>
            <Link to="/contact" className="lh-text-link">ASK FOR DETAILS <span>↗</span></Link>
          </div>
        </div>

        <div className="lh-product-row">
          {[0, 1, 2].map((offset) => {
            const item = machines[(machineStart + offset) % machines.length];
            return (
              <article className={`lh-product-card ${item.name === featuredMachine.name ? "selected" : ""}`} key={item.name}>
                <button
                  type="button"
                  className="lh-product-image"
                  onClick={() => setMachineStart(machines.findIndex((machine) => machine.name === item.name))}
                  aria-label={`Feature ${item.name}`}
                >
                  <img src={item.image} alt={item.name} loading="lazy" />
                </button>
                <div className="lh-product-card-info">
                  <div><span>{item.type}</span><h3>{item.name}</h3></div>
                  <button type="button" className="lh-round-arrow" aria-label={`Feature ${item.name}`} onClick={() => setMachineStart(machines.findIndex((machine) => machine.name === item.name))}>↗</button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="lh-section-footer">
          <span>FIND THE RIGHT EQUIPMENT FOR YOUR WORK.</span>
          <Link to="/equipment" className="lh-btn lh-btn-accent">EXPLORE ALL EQUIPMENT <span>↗</span></Link>
        </div>
      </section>

      {/* 4. BUCKETS & ATTACHMENTS */}
      <section className="lh-attachments-section">
        <div className="lh-section">
          <div className="lh-section-head">
            <div>
              <p className="lh-kicker">MORE WAYS TO WORK</p>
              <h2>Buckets & <span>attachments.</span></h2>
              <p className="lh-section-subtitle">Explore attachment options for different machine types and tasks.</p>
            </div>
            <div className="lh-carousel-actions">
              <button type="button" aria-label="Previous attachments" onClick={() => move(setAttachmentStart, attachmentStart, attachments.length, -1)}>←</button>
              <button type="button" aria-label="Next attachments" onClick={() => move(setAttachmentStart, attachmentStart, attachments.length, 1)}>→</button>
            </div>
          </div>

          <div className="lh-featured-layout lh-attachment-feature">
            <div className="lh-featured-machine lh-featured-attachment">
              <span className="lh-image-label">ATTACHMENT SPOTLIGHT</span>
              <img src={featuredAttachment.image} alt={featuredAttachment.name} />
            </div>
            <div className="lh-featured-copy">
              <p className="lh-kicker">BUCKETS & ACCESSORIES</p>
              <h3>{featuredAttachment.name}</h3>
              <p>{featuredAttachment.detail}</p>
              <Link to="/equipment" className="lh-btn lh-btn-dark">VIEW ATTACHMENT <span>↗</span></Link>
              <Link to="/contact" className="lh-text-link">ENQUIRE NOW <span>↗</span></Link>
            </div>
          </div>

          <div className="lh-product-row lh-attachment-row">
            {[0, 1, 2].map((offset) => {
              const item = attachments[(attachmentStart + offset) % attachments.length];
              return (
                <article className={`lh-product-card ${item.name === featuredAttachment.name ? "selected" : ""}`} key={item.name}>
                  <button type="button" className="lh-product-image" onClick={() => setAttachmentStart(attachments.findIndex((attachment) => attachment.name === item.name))} aria-label={`Feature ${item.name}`}>
                    <img src={item.image} alt={item.name} loading="lazy" />
                  </button>
                  <div className="lh-product-card-info">
                    <div><span>ATTACHMENTS</span><h3>{item.name}</h3></div>
                    <button type="button" className="lh-round-arrow" aria-label={`Feature ${item.name}`} onClick={() => setAttachmentStart(attachments.findIndex((attachment) => attachment.name === item.name))}>↗</button>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="lh-section-footer">
            <span>THE RIGHT ATTACHMENT FOR THE RIGHT JOB.</span>
            <Link to="/contact" className="lh-btn lh-btn-accent">ENQUIRE NOW <span>↗</span></Link>
          </div>
        </div>
      </section>

      {/* 5. ABOUT */}
      <section className="lh-section lh-about">
        <div className="lh-about-image">
          <img src="https://lirp.cdn-website.com/6da0cf0d/dms3rep/multi/opt/Coastwide_Civil_Plant_Capability_4-1920w.jpg" alt="Heavy machinery working on a construction project" loading="lazy" />
          <span className="lh-image-label">LUBESON EQUIPMENT</span>
        </div>
        <div className="lh-about-copy">
          <p className="lh-kicker">ABOUT LUBESON</p>
          <h2>Equipment that helps work <span>move forward.</span></h2>
          <p>Discover machinery, attachments and equipment solutions for construction, infrastructure and other demanding applications.</p>
          <p>Contact our team to discuss your requirements and find the right solution for your project.</p>
          <Link to="/about" className="lh-btn lh-btn-dark">KNOW MORE <span>↗</span></Link>
        </div>
      </section>

      {/* 6. INDUSTRIES */}
      <section className="lh-industries-section">
        <div className="lh-section">
          <div className="lh-section-head">
            <div>
              <p className="lh-kicker">WHERE WE WORK</p>
              <h2>Industries we <span>serve.</span></h2>
            </div>
          </div>
          <div className="lh-industry-grid">
            {industries.map((item) => (
              <Link
                className="lh-industry-card"
                to={item.to}
                key={item.name}
                aria-label={`Explore ${item.name} industry`}
              >
                <img src={item.image} alt={item.name} loading="lazy" />
                <div className="lh-industry-shade" />
                <div className="lh-industry-copy">
                  <h3>{item.name}</h3>
                  <p>{item.text}</p>
                  <span className="lh-industry-link">EXPLORE INDUSTRY <span aria-hidden="true">↗</span></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. YOUTUBE VIDEO */}
      <section className="lh-section lh-video-section">
        <div className="lh-section-head">
          <div>
            <p className="lh-kicker">SEE IT IN ACTION</p>
            <h2>Machines at <span>work.</span></h2>
          </div>
          <p className="lh-section-subtitle">Add your official machine demonstrations, product walkarounds and service videos here.</p>
        </div>
        <div className="lh-video-layout">
          <div className="lh-video-frame">
            <iframe
              src="https://www.youtube-nocookie.com/embed/YOUR_VIDEO_ID"
              title="LUBESON machine and service video"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="lh-video-copy">
            <p className="lh-kicker">VIDEO SPOTLIGHT</p>
            <h3>See the details. Understand the difference.</h3>
            <p>Replace the sample YouTube ID with your video ID to display your own machine or service video.</p>
            <Link to="/contact" className="lh-text-link">TALK TO OUR TEAM <span>↗</span></Link>
          </div>
        </div>
      </section>

      {/* 8. CUSTOMER REVIEWS */}
      <section className="lh-reviews-section">
        <div className="lh-section lh-reviews-inner">
          <div className="lh-review-heading-row">
            <div className="lh-review-heading-copy">
              <p className="lh-kicker">CUSTOMER EXPERIENCES</p>
              <h2>Real work. <span>Real feedback.</span></h2>
              <p className="lh-review-intro">
                See what customers share about their equipment and service experience with LUBESON.
              </p>
            </div>
            {reviews.length > 3 && (
              <div className="lh-carousel-actions">
                <button type="button" aria-label="Previous reviews" onClick={() => move(setReviewStart, reviewStart, reviews.length, -1)}>←</button>
                <button type="button" aria-label="Next reviews" onClick={() => move(setReviewStart, reviewStart, reviews.length, 1)}>→</button>
              </div>
            )}
          </div>

          {reviews.length > 0 ? (
            <div className="lh-review-grid">
              {[0, 1, 2].slice(0, Math.min(3, reviews.length)).map((_, offset) => {
                const item = reviews[(reviewStart + offset) % reviews.length];
                return (
                  <article className="lh-review-card" key={item.id || `${reviewStart}-${offset}`}>
                    {item.image && (
                      <div className="lh-review-media">
                        <img src={item.image} alt={item.imageAlt || `Photo shared by ${item.name || "a LUBESON customer"}`} loading="lazy" />
                        {item.imageCaption && <span>{item.imageCaption}</span>}
                      </div>
                    )}
                    <div className="lh-review-card-body">
                      <div className="lh-review-card-topline">
                        <span className="lh-review-tag">CUSTOMER REVIEW</span>
                        <span className="lh-review-quote-mark" aria-hidden="true">“</span>
                      </div>
                      {Number(item.rating) > 0 && (
                        <div className="lh-review-stars" aria-label={`${Math.min(5, Number(item.rating))} out of 5 stars`}>
                          {"★".repeat(Math.max(0, Math.min(5, Number(item.rating))))}{"☆".repeat(5 - Math.max(0, Math.min(5, Number(item.rating))))}
                        </div>
                      )}
                      <p className="lh-review-quote">{item.quote}</p>
                      <div className="lh-review-author">
                        {item.avatar ? (
                          <img className="lh-review-avatar-img" src={item.avatar} alt="" loading="lazy" />
                        ) : (
                          <span className="lh-review-avatar">{(item.name || "C").trim().charAt(0).toUpperCase()}</span>
                        )}
                        <div>
                          <strong>{item.name}</strong>
                          {item.role && <small>{item.role}</small>}
                        </div>
                        {item.source && <span className="lh-review-source">{item.source}</span>}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="lh-review-empty">
              <div className="lh-review-empty-icon" aria-hidden="true">✳</div>
              <div>
                <span className="lh-review-tag">CUSTOMER STORIES</span>
                <h3>Customer stories are coming soon.</h3>
                <p>Once reviews and customer photos are added from the admin panel, they will appear here.</p>
              </div>
            </div>
          )}
          <div className="lh-review-footer-note">
            <span className="lh-review-footer-line" />
            <p>Customer feedback is published with permission.</p>
          </div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <FAQ />

      

      {/* 10. ENQUIRY CTA */}
      <section className="lh-final-cta">
        <div>
          <p className="lh-kicker">LET'S TALK EQUIPMENT</p>
          <h2>Have a project in mind?</h2>
          <p>Tell us what you need and discuss the right equipment solution.</p>
        </div>
        <Link to="/contact" className="lh-btn lh-btn-accent">GET A QUOTE <span>↗</span></Link>
      </section>
    </main>
  );
}

