import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Layers,
  Images,
  FileText,
  MessageSquare,
  ClipboardList,
  HelpCircle,
  Star,
  Building2,
  Wrench,
  Settings,
  Search,
  LogOut,
  ArrowLeft,
  PanelLeftClose,
} from "lucide-react";
import "./AdminSidebar.css";

const menuGroups = [
  {
    title: "OVERVIEW",
    items: [
      { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "CATALOG",
    items: [
      { label: "Equipment", path: "/admin/equipment", icon: Package },
      { label: "Categories", path: "/admin/categories", icon: Layers },
      { label: "Home Banners", path: "/admin/banners", icon: Images },
    ],
  },
  {
    title: "WEBSITE",
    items: [
      { label: "Page Content", path: "/admin/content", icon: FileText },
      { label: "FAQs", path: "/admin/faqs", icon: HelpCircle },
      { label: "Testimonials", path: "/admin/testimonials", icon: Star },
      { label: "Industries", path: "/admin/industries", icon: Building2 },
      { label: "Services", path: "/admin/services", icon: Wrench },
      { label: "SEO Settings", path: "/admin/seo", icon: Search },
      { label: "Website Settings", path: "/admin/settings", icon: Settings },
    ],
  },
  {
    title: "CUSTOMERS",
    items: [
      { label: "Enquiries", path: "/admin/enquiries", icon: MessageSquare },
      { label: "Quote Requests", path: "/admin/quotes", icon: ClipboardList },
    ],
  },
];

export default function AdminSidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    // Authentication will be connected in a later step.
    navigate("/admin/login");
  }

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <img src="/logo.png" alt="LUBESON logo" />

        <div className="admin-brand-text">
          <strong>LUBESON</strong>
          <span>ADMIN PANEL</span>
        </div>
      </div>

      <div className="admin-sidebar-label">WORKSPACE</div>

      <nav className="admin-sidebar-nav" aria-label="Admin navigation">
        {menuGroups.map((group) => (
          <div className="admin-menu-group" key={group.title}>
            <p className="admin-menu-title">{group.title}</p>

            {group.items.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `admin-nav-link${isActive ? " active" : ""}`
                  }
                >
                  <Icon size={18} strokeWidth={1.8} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="admin-sidebar-bottom">
        <NavLink to="/" className="admin-back-link">
          <ArrowLeft size={17} />
          <span>View Website</span>
        </NavLink>

        <button
          type="button"
          className="admin-logout-button"
          onClick={handleLogout}
        >
          <LogOut size={17} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}