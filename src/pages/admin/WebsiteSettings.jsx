
import { useEffect, useState } from "react";
import {
  Save,
  Globe,
  Building2,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Search,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import "./WebsiteSettings.css";

// const defaultSettings = {
//   companyName: "LUBESON",
//   tagline: "Construction Equipment & Industrial Solutions",
//   websiteUrl: "",
//   email: "",
//   phone: "",
//   alternatePhone: "",
//   address: "",
//   city: "",
//   state: "",
//   pincode: "",
//   facebook: "",
//   instagram: "",
//   linkedin: "",
//   youtube: "",
//   metaTitle: "LUBESON | Construction Equipment",
//   metaDescription:
//     "Explore construction equipment and industrial solutions with LUBESON.",
//   keywords: "construction equipment, industrial equipment, machinery",
//   currency: "INR",
//   language: "en",
// };
const defaultSettings = {
  companyName: "BJ AND SON TOOLS AND EQUIPMENT PVT LTD",
  tagline: "",
  websiteUrl: "",
  email: "Connectlubeson@gmail.com",
  phone: "9416629792",
  alternatePhone: "",
  salesPhone: "8199943327",
  servicePhone: "8570909770",
  address: "Bhiwani Road",
  city: "Rohtak",
  state: "Haryana",
  pincode: "124001",
  facebook: "",
  instagram: "",
  linkedin: "",
  youtube: "",
  metaTitle: "LUBESON | Construction Equipment",
  metaDescription:
    "Explore construction equipment and industrial solutions with LUBESON.",
  keywords: "construction equipment, industrial equipment, machinery",
  currency: "INR",
  language: "en",
};
export default function WebsiteSettings() {
  const API_URL = "http://localhost:5000/api/settings";
  const [settings, setSettings] = useState({ ...defaultSettings });
  const [activeTab, setActiveTab] = useState("general");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadSettings() {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Could not load website settings.");
        }

        if (isMounted) {
          setSettings({ ...defaultSettings, ...(result.data || {}) });
        }
      } catch (error) {
        if (isMounted) {
          setMessageType("error");
          setMessage(
            "Could not load saved settings. Check that the backend is running on port 5000."
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadSettings();
    return () => {
      isMounted = false;
    };
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setSettings((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  }

  async function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Could not save website settings.");
      }

      setSettings({ ...defaultSettings, ...(result.data || settings) });
      setMessageType("success");
      setMessage("Website settings saved successfully to the database.");
    } catch (error) {
      setMessageType("error");
      setMessage(
        error.message ||
          "Could not save settings. Make sure the backend and database are running."
      );
    } finally {
      setSaving(false);
    }
  }

  function handleReset() {
    const confirmed = window.confirm(
      "Reset the form to default values? Click Save Settings to save these defaults to the database."
    );

    if (!confirmed) return;

    setSettings({ ...defaultSettings });
    setMessageType("success");
    setMessage("Default values restored in the form. Click Save Settings to save them.");
  }

  const tabs = [
    { id: "general", label: "General", icon: Building2 },
    { id: "contact", label: "Contact Details", icon: Phone },
    { id: "social", label: "Social Media", icon: Globe },
    { id: "seo", label: "SEO Defaults", icon: Search },
  ];

  return (
    <div className="website-settings">
      <div className="page-header">
        <div className="page-heading">
          <span className="settings-eyebrow">CONFIGURATION</span>
          <h1>Website Settings</h1>
          <p>
            Manage your website information, contact details, social links
            and default SEO settings.
          </p>
        </div>

        <button
          type="button"
          className="settings-reset-button"
          onClick={handleReset}
        >
          <RotateCcw size={16} />
          Reset Defaults
        </button>
      </div>

      <div className="settings-notice">
        <CheckCircle2 size={18} />
        <div>
          <strong>Database-connected settings</strong>
          <p>
            Settings are loaded from the backend and saved to the database when
            you click Save Settings. Keep the LUBESON backend running while editing.
          </p>
        </div>
      </div>

      {loading && (
        <div className="settings-message" role="status" aria-live="polite">
          Loading saved website settings...
        </div>
      )}

      {message && (
        <div
          className={`settings-message ${messageType}`}
          role="status"
          aria-live="polite"
        >
          {messageType === "error" ? (
            <AlertCircle size={18} />
          ) : (
            <CheckCircle2 size={18} />
          )}
          <span>{message}</span>
        </div>
      )}

      <div className="settings-layout">
        <aside className="settings-sidebar">
          <div className="settings-sidebar-heading">
            <span>SETTINGS</span>
            <small>Website configuration</small>
          </div>

          <nav className="settings-tabs" aria-label="Settings sections">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                type="button"
                key={id}
                className={`settings-tab ${
                  activeTab === id ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab(id);
                  setMessage("");
                }}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="settings-sidebar-footer">
            <Globe size={16} />
            <span>LUBESON Admin</span>
          </div>
        </aside>

        <main className="settings-content">
          <form onSubmit={handleSave}>
            {activeTab === "general" && (
              <section className="settings-section">
                <div className="settings-section-header">
                  <div className="settings-section-icon">
                    <Building2 size={21} />
                  </div>
                  <div>
                    <h2>General Information</h2>
                    <p>Configure your company identity and website address.</p>
                  </div>
                </div>

                <div className="settings-form-grid">
                  <div className="settings-form-group full-width">
                    <label htmlFor="companyName">Company Name</label>
                    <input
                      id="companyName"
                      name="companyName"
                      value={settings.companyName}
                      onChange={handleChange}
                      placeholder="Enter company name"
                      required
                    />
                  </div>

                  <div className="settings-form-group full-width">
                    <label htmlFor="tagline">Company Tagline</label>
                    <input
                      id="tagline"
                      name="tagline"
                      value={settings.tagline}
                      onChange={handleChange}
                      placeholder="Enter company tagline"
                    />
                  </div>

                  <div className="settings-form-group full-width">
                    <label htmlFor="websiteUrl">Website URL</label>
                    <input
                      id="websiteUrl"
                      name="websiteUrl"
                      type="url"
                      value={settings.websiteUrl}
                      onChange={handleChange}
                      placeholder="https://example.com"
                    />
                    <span className="settings-field-hint">
                      Enter your published website address.
                    </span>
                  </div>

                  <div className="settings-form-group">
                    <label htmlFor="currency">Default Currency</label>
                    <select
                      id="currency"
                      name="currency"
                      value={settings.currency}
                      onChange={handleChange}
                    >
                      <option value="INR">INR — Indian Rupee</option>
                      <option value="USD">USD — US Dollar</option>
                      <option value="EUR">EUR — Euro</option>
                    </select>
                  </div>

                  <div className="settings-form-group">
                    <label htmlFor="language">Website Language</label>
                    <select
                      id="language"
                      name="language"
                      value={settings.language}
                      onChange={handleChange}
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                    </select>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "contact" && (
              <section className="settings-section">
                <div className="settings-section-header">
                  <div className="settings-section-icon">
                    <Phone size={21} />
                  </div>
                  <div>
                    <h2>Contact Information</h2>
                    <p>
                      Maintain the contact details customers can use to
                      reach your business.
                    </p>
                  </div>
                </div>

                <div className="settings-form-grid">
                  <div className="settings-form-group">
                    <label htmlFor="email">Business Email</label>
                    <div className="settings-input-with-icon">
                      <Mail size={17} />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={settings.email}
                        onChange={handleChange}
                        placeholder="business@example.com"
                      />
                    </div>
                  </div>

                  <div className="settings-form-group">
                    <label htmlFor="phone">Primary Phone</label>
                    <div className="settings-input-with-icon">
                      <Phone size={17} />
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={settings.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  <div className="settings-form-group">
                    <label htmlFor="salesPhone">Sales Team Phone</label>
                    <div className="settings-input-with-icon">
                      <Phone size={17} />
                      <input
                        id="salesPhone"
                        name="salesPhone"
                        type="tel"
                        value={settings.salesPhone || ""}
                        onChange={handleChange}
                        placeholder="Enter sales team phone"
                      />
                    </div>
                  </div>

                  <div className="settings-form-group">
                    <label htmlFor="servicePhone">Service Team Phone</label>
                    <div className="settings-input-with-icon">
                      <Phone size={17} />
                      <input
                        id="servicePhone"
                        name="servicePhone"
                        type="tel"
                        value={settings.servicePhone || ""}
                        onChange={handleChange}
                        placeholder="Enter service team phone"
                      />
                    </div>
                  </div>

                  <div className="settings-form-group full-width">
                    <label htmlFor="alternatePhone">Alternate Phone</label>
                    <input
                      id="alternatePhone"
                      name="alternatePhone"
                      type="tel"
                      value={settings.alternatePhone}
                      onChange={handleChange}
                      placeholder="Enter alternate phone number"
                    />
                  </div>

                  <div className="settings-form-group full-width">
                    <label htmlFor="address">Business Address</label>
                    <div className="settings-input-with-icon textarea-icon">
                      <MapPin size={17} />
                      <textarea
                        id="address"
                        name="address"
                        rows="3"
                        value={settings.address}
                        onChange={handleChange}
                        placeholder="Enter complete business address"
                      />
                    </div>
                  </div>

                  <div className="settings-form-group">
                    <label htmlFor="city">City</label>
                    <input
                      id="city"
                      name="city"
                      value={settings.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                    />
                  </div>

                  <div className="settings-form-group">
                    <label htmlFor="state">State</label>
                    <input
                      id="state"
                      name="state"
                      value={settings.state}
                      onChange={handleChange}
                      placeholder="Enter state"
                    />
                  </div>

                  <div className="settings-form-group">
                    <label htmlFor="pincode">PIN Code</label>
                    <input
                      id="pincode"
                      name="pincode"
                      value={settings.pincode}
                      onChange={handleChange}
                      placeholder="Enter PIN code"
                    />
                  </div>
                </div>
              </section>
            )}

            {activeTab === "social" && (
              <section className="settings-section">
                <div className="settings-section-header">
                  <div className="settings-section-icon">
                    <Globe size={21} />
                  </div>
                  <div>
                    <h2>Social Media Links</h2>
                    <p>
                      Add your official social profiles. Leave fields blank
                      if you do not use a platform.
                    </p>
                  </div>
                </div>

                <div className="settings-form-grid">
                  <div className="settings-form-group full-width">
                    <label htmlFor="facebook">Facebook URL</label>
                    <div className="settings-input-with-icon">
                      <Facebook size={18} />
                      <input
                        id="facebook"
                        name="facebook"
                        type="url"
                        value={settings.facebook}
                        onChange={handleChange}
                        placeholder="https://facebook.com/yourpage"
                      />
                    </div>
                  </div>

                  <div className="settings-form-group full-width">
                    <label htmlFor="instagram">Instagram URL</label>
                    <div className="settings-input-with-icon">
                      <Instagram size={18} />
                      <input
                        id="instagram"
                        name="instagram"
                        type="url"
                        value={settings.instagram}
                        onChange={handleChange}
                        placeholder="https://instagram.com/yourprofile"
                      />
                    </div>
                  </div>

                  <div className="settings-form-group full-width">
                    <label htmlFor="linkedin">LinkedIn URL</label>
                    <div className="settings-input-with-icon">
                      <Linkedin size={18} />
                      <input
                        id="linkedin"
                        name="linkedin"
                        type="url"
                        value={settings.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/company/yourcompany"
                      />
                    </div>
                  </div>

                  <div className="settings-form-group full-width">
                    <label htmlFor="youtube">YouTube URL</label>
                    <div className="settings-input-with-icon">
                      <Youtube size={18} />
                      <input
                        id="youtube"
                        name="youtube"
                        type="url"
                        value={settings.youtube}
                        onChange={handleChange}
                        placeholder="https://youtube.com/@yourchannel"
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "seo" && (
              <section className="settings-section">
                <div className="settings-section-header">
                  <div className="settings-section-icon">
                    <Search size={21} />
                  </div>
                  <div>
                    <h2>Default SEO Settings</h2>
                    <p>
                      Set the default search title and description for your
                      website.
                    </p>
                  </div>
                </div>

                <div className="settings-form-grid">
                  <div className="settings-form-group full-width">
                    <label htmlFor="metaTitle">Default Meta Title</label>
                    <input
                      id="metaTitle"
                      name="metaTitle"
                      value={settings.metaTitle}
                      onChange={handleChange}
                      maxLength={70}
                      placeholder="Enter SEO title"
                    />
                    <span className="settings-field-hint">
                      {settings.metaTitle.length}/70 characters
                    </span>
                  </div>

                  <div className="settings-form-group full-width">
                    <label htmlFor="metaDescription">
                      Default Meta Description
                    </label>
                    <textarea
                      id="metaDescription"
                      name="metaDescription"
                      rows="4"
                      value={settings.metaDescription}
                      onChange={handleChange}
                      maxLength={170}
                      placeholder="Describe your business for search engines"
                    />
                    <span className="settings-field-hint">
                      {settings.metaDescription.length}/170 characters
                    </span>
                  </div>

                  <div className="settings-form-group full-width">
                    <label htmlFor="keywords">Default Keywords</label>
                    <textarea
                      id="keywords"
                      name="keywords"
                      rows="3"
                      value={settings.keywords}
                      onChange={handleChange}
                      placeholder="construction equipment, machinery..."
                    />
                    <span className="settings-field-hint">
                      Separate keywords with commas. Search engines may not
                      use meta keywords for rankings.
                    </span>
                  </div>

                  <div className="settings-seo-preview">
                    <span>SEARCH RESULT PREVIEW</span>
                    <h3>
                      {settings.metaTitle || "Your website title"}
                    </h3>
                    <p>
                      {settings.websiteUrl || "https://yourwebsite.com"}
                    </p>
                    <div>
                      {settings.metaDescription ||
                        "Your website description will appear here."}
                    </div>
                  </div>
                </div>
              </section>
            )}

            <div className="settings-save-bar">
              <span>
                <CheckCircle2 size={16} />
                Review your changes before saving.
              </span>

              <button
                type="submit"
                className="settings-save-button"
                disabled={loading || saving}
              >
                <Save size={17} />
                {saving ? "Saving..." : loading ? "Loading..." : "Save Settings"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
