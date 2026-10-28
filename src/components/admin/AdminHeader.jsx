
import { Bell, ExternalLink, UserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./AdminHeader.css";

const pageTitles = {
  "/admin/dashboard": "Dashboard",
  "/admin/equipment": "Equipment Management",
  "/admin/categories": "Category Management",
  "/admin/banners": "Banner Management",
  "/admin/content": "Content Management",
  "/admin/enquiries": "Enquiries",
  "/admin/quotes": "Quote Requests",
  "/admin/faqs": "FAQ Management",
  "/admin/testimonials": "Testimonials",
  "/admin/industries": "Industries",
  "/admin/services": "Services",
  "/admin/settings": "Website Settings",
  "/admin/website-settings": "Website Settings",
  "/admin/seo": "SEO Settings",
};

export default function AdminHeader() {
  const location = useLocation();

  const currentTitle =
    pageTitles[location.pathname] || "LUBESON Admin";

  return (
    <header className="admin-header">
      {/* Page title */}
      <div className="admin-header-title">
        <span className="admin-header-eyebrow">
          LUBESON ADMIN PANEL
        </span>

        <h1>{currentTitle}</h1>
      </div>

      {/* Header actions */}
      <div className="admin-header-actions">
        <Link
          to="/"
          className="admin-header-website"
          target="_blank"
          rel="noreferrer"
        >
          <ExternalLink size={16} />
          <span>View Website</span>
        </Link>

        <button
          type="button"
          className="admin-header-icon-button"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={19} />
          <span className="admin-notification-dot" />
        </button>

        <div className="admin-header-profile">
          <div className="admin-profile-avatar">
            <UserRound size={21} />
          </div>

          <div className="admin-profile-info">
            <strong>Administrator</strong>
            <span>LUBESON Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
