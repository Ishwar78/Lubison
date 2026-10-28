import {
  Package,
  Layers,
  MessageSquare,
  ClipboardList,
  ArrowUpRight,
  ArrowRight,
  Clock3,
  CheckCircle2,
  AlertCircle,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const stats = [
  {
    label: "Total Equipment",
    value: "—",
    note: "Equipment records",
    icon: Package,
    className: "equipment",
    path: "/admin/equipment",
  },
  {
    label: "Categories",
    value: "—",
    note: "Product categories",
    icon: Layers,
    className: "categories",
    path: "/admin/categories",
  },
  {
    label: "Customer Enquiries",
    value: "—",
    note: "Enquiry records",
    icon: MessageSquare,
    className: "enquiries",
    path: "/admin/enquiries",
  },
  {
    label: "Quote Requests",
    value: "—",
    note: "Quote request records",
    icon: ClipboardList,
    className: "quotes",
    path: "/admin/quotes",
  },
];

const quickActions = [
  {
    title: "Add New Equipment",
    description: "Create and manage equipment listings.",
    icon: Package,
    path: "/admin/equipment",
  },
  {
    title: "Manage Categories",
    description: "Organize your equipment categories.",
    icon: Layers,
    path: "/admin/categories",
  },
  {
    title: "View Enquiries",
    description: "Review customer messages and requests.",
    icon: MessageSquare,
    path: "/admin/enquiries",
  },
  {
    title: "Update Home Banners",
    description: "Manage homepage banner content.",
    icon: Activity,
    path: "/admin/banners",
  },
];

export default function AdminDashboard() {
  const currentHour = new Date().getHours();

  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 17
        ? "Good afternoon"
        : "Good evening";

  return (
    <div className="admin-dashboard">
      {/* Welcome section */}
      <section className="admin-dashboard-welcome">
        <div>
          <span className="admin-dashboard-kicker">
            BUSINESS OVERVIEW
          </span>

          <h2>{greeting}, Administrator 👋</h2>

          <p>
            Welcome to your LUBESON control center. Manage your website
            content, equipment listings and customer requests from here.
          </p>
        </div>

        <div className="admin-dashboard-date">
          <span>Today</span>
          <strong>
            {new Date().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </strong>
        </div>
      </section>

      {/* Statistics */}
      <section className="admin-dashboard-stats">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link
              to={stat.path}
              className="admin-stat-card"
              key={stat.label}
            >
              <div className="admin-stat-top">
                <div className={`admin-stat-icon ${stat.className}`}>
                  <Icon size={21} strokeWidth={1.8} />
                </div>

                <span className="admin-stat-link-icon">
                  <ArrowUpRight size={17} />
                </span>
              </div>

              <div className="admin-stat-value">{stat.value}</div>

              <h3>{stat.label}</h3>

              <p>{stat.note}</p>
            </Link>
          );
        })}
      </section>

      {/* Main dashboard columns */}
      <div className="admin-dashboard-grid">
        <section className="admin-dashboard-panel admin-quick-actions">
          <div className="admin-panel-heading">
            <div>
              <h3>Quick Actions</h3>
              <p>Shortcuts to common management tasks.</p>
            </div>

            <span className="admin-panel-heading-icon">
              <ArrowUpRight size={18} />
            </span>
          </div>

          <div className="admin-quick-action-list">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  to={action.path}
                  className="admin-quick-action"
                  key={action.title}
                >
                  <div className="admin-quick-action-icon">
                    <Icon size={19} />
                  </div>

                  <div className="admin-quick-action-copy">
                    <strong>{action.title}</strong>
                    <span>{action.description}</span>
                  </div>

                  <ArrowRight
                    className="admin-quick-action-arrow"
                    size={17}
                  />
                </Link>
              );
            })}
          </div>
        </section>

        <section className="admin-dashboard-panel admin-system-panel">
          <div className="admin-panel-heading">
            <div>
              <h3>System Overview</h3>
              <p>Basic application status.</p>
            </div>

            <span className="admin-panel-heading-icon">
              <Activity size={18} />
            </span>
          </div>

          <div className="admin-system-status">
            <div className="admin-system-status-icon">
              <CheckCircle2 size={19} />
            </div>

            <div>
              <strong>Admin interface</strong>
              <span>Dashboard UI loaded</span>
            </div>

            <span className="admin-status-badge">Active</span>
          </div>

          <div className="admin-system-status">
            <div className="admin-system-status-icon pending">
              <Clock3 size={19} />
            </div>

            <div>
              <strong>Backend integration</strong>
              <span>API connection to be configured</span>
            </div>

            <span className="admin-status-badge pending">Pending</span>
          </div>

          <div className="admin-system-status">
            <div className="admin-system-status-icon pending">
              <AlertCircle size={19} />
            </div>

            <div>
              <strong>Authentication</strong>
              <span>Secure login to be connected</span>
            </div>

            <span className="admin-status-badge pending">Pending</span>
          </div>

          <div className="admin-system-note">
            <ShieldInfoIcon />
            <p>
              Dashboard figures will appear once the admin APIs are connected
              to your database.
            </p>
          </div>
        </section>
      </div>

      {/* Footer note */}
      <div className="admin-dashboard-footer">
        <span>LUBESON Admin Workspace</span>
        <span>Manage your business in one place.</span>
      </div>
    </div>
  );
}

function ShieldInfoIcon() {
  return <Activity size={17} aria-hidden="true" />;
}