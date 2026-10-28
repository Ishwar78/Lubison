
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  ArrowUpRight,
  ChevronDown,
  Construction,
  Tractor,
  Truck,
  Shovel,
  Wrench,
  Settings,
  Cog,
} from "lucide-react";
import { useState } from "react";
import "./Navbar.css";

const equipmentGroups = [
  {
    title: "Earthmoving Equipment",
    items: [
      { name: "Backhoe Loaders", icon: Construction, id: "backhoe-loader" },
      { name: "Wheel Loaders", icon: Truck, id: "wheel-loaders" },
      { name: "Excavators", icon: Shovel, id: "excavators" },
      { name: "Skid Steer Loaders", icon: Settings, id: "skid-steer-loaders" },
    ],
  },
  {
    title: "Specialized Equipment",
    items: [
      { name: "Cranes", icon: Construction, id: "cranes" },
      { name: "Telehandlers", icon: Truck, id: "telehandlers" },
      {
        name: "Road Construction Equipment",
        icon: Cog,
        id: "road-equipment",
      },
      {
        name: "Agriculture Equipment",
        icon: Tractor,
        id: "agriculture-equipment",
      },
    ],
  },
];

const serviceLinks = [
  {
    name: "Equipment Servicing",
    description: "Keep your machines performing.",
    slug: "equipment-servicing",
  },
  {
    name: "Spare Parts",
    description: "Parts and equipment support.",
    slug: "spare-parts",
  },
  {
    name: "Maintenance & Repair",
    description: "Support for your equipment.",
    slug: "maintenance-repair",
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const closeMenus = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name) => {
    setActiveDropdown((current) => (current === name ? null : name));
  };

  return (
    <header className="lubeson-header">
      <div className="lubeson-topbar">
        <div className="lubeson-topbar-inner">
          <span>CONSTRUCTION EQUIPMENT &amp; SOLUTIONS</span>

          <Link to="/contact" onClick={closeMenus}>
            CONNECT WITH OUR TEAM <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      <div className="lubeson-navbar">
        <Link
          to="/"
          className="lubeson-brand"
          aria-label="LUBESON Home"
          onClick={closeMenus}
        >
          <img src="/logo.png" alt="LUBESON" />
        </Link>

        <button
          type="button"
          className="lubeson-menu-toggle"
          onClick={() => {
            setMenuOpen((open) => !open);
            setActiveDropdown(null);
          }}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>

        <nav
          className={`lubeson-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          {/* HOME */}
          <NavLink
            to="/"
            end
            onClick={closeMenus}
            className={({ isActive }) =>
              `lubeson-nav-link ${isActive ? "active" : ""}`
            }
          >
            Home
          </NavLink>

          {/* EQUIPMENT */}
          <div
            className={`lubeson-nav-item ${
              activeDropdown === "equipment" ? "dropdown-open" : ""
            }`}
            onMouseEnter={() => {
              if (window.innerWidth > 800) {
                setActiveDropdown("equipment");
              }
            }}
            onMouseLeave={() => {
              if (window.innerWidth > 800) {
                setActiveDropdown(null);
              }
            }}
          >
            <div className="lubeson-nav-dropdown-trigger">
              {/* Equipment text opens the main Equipment page */}
              <NavLink
                to="/equipment"
                onClick={closeMenus}
                className={({ isActive }) =>
                  `lubeson-nav-link ${
                    isActive || window.location.pathname.startsWith("/equipment")
                      ? "active"
                      : ""
                  }`
                }
              >
                Equipment
              </NavLink>

              {/* Arrow independently opens/closes the dropdown */}
              <button
                type="button"
                className="lubeson-dropdown-trigger"
                onClick={() => toggleDropdown("equipment")}
                aria-label="Toggle equipment dropdown"
                aria-expanded={activeDropdown === "equipment"}
                aria-controls="lubeson-equipment-menu"
              >
                <ChevronDown size={15} className="lubeson-chevron" />
              </button>
            </div>

            <div
              id="lubeson-equipment-menu"
              className={`lubeson-mega-menu ${
                activeDropdown === "equipment" ? "show" : ""
              }`}
            >
              <div className="lubeson-mega-heading">
                <span className="lubeson-eyebrow">OUR PRODUCT RANGE</span>

                <h3>Equipment for Every Challenge</h3>

                <p>
                  Explore machines and solutions designed for demanding work
                  environments.
                </p>

                <Link
                  to="/equipment"
                  className="lubeson-mega-all-link"
                  onClick={closeMenus}
                >
                  Explore All Equipment <ArrowUpRight size={16} />
                </Link>
              </div>

              {equipmentGroups.map((group) => (
                <div className="lubeson-mega-column" key={group.title}>
                  <h4>{group.title}</h4>

                  {group.items.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.id}
                        to={`/equipment/${item.id}`}
                        className="lubeson-equipment-link"
                        onClick={closeMenus}
                      >
                        <span className="lubeson-equipment-icon">
                          <Icon size={19} strokeWidth={1.7} />
                        </span>

                        <span>{item.name}</span>

                        <ArrowUpRight
                          size={14}
                          className="lubeson-item-arrow"
                        />
                      </Link>
                    );
                  })}
                </div>
              ))}

              <div className="lubeson-mega-footer">
                <span>Need help choosing the right machine?</span>

                <Link to="/contact" onClick={closeMenus}>
                  Talk to Our Team <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </div>

          {/* SERVICES */}
          <div
            className={`lubeson-nav-item ${
              activeDropdown === "services" ? "dropdown-open" : ""
            }`}
            onMouseEnter={() => {
              if (window.innerWidth > 800) {
                setActiveDropdown("services");
              }
            }}
            onMouseLeave={() => {
              if (window.innerWidth > 800) {
                setActiveDropdown(null);
              }
            }}
          >
            <button
              type="button"
              className="lubeson-nav-link lubeson-dropdown-trigger"
              onClick={() => toggleDropdown("services")}
              aria-expanded={activeDropdown === "services"}
              aria-controls="lubeson-services-menu"
            >
              Services
              <ChevronDown size={15} className="lubeson-chevron" />
            </button>

            <div
              id="lubeson-services-menu"
              className={`lubeson-services-menu ${
                activeDropdown === "services" ? "show" : ""
              }`}
            >
              {serviceLinks.map((service) => (
                <Link
                  to={`/services/${service.slug}`}
                  className="lubeson-service-link"
                  key={service.name}
                  onClick={closeMenus}
                >
                  <span className="lubeson-service-icon">
                    <Wrench size={18} />
                  </span>

                  <span>
                    <strong>{service.name}</strong>
                    <small>{service.description}</small>
                  </span>

                  <ArrowUpRight size={15} />
                </Link>
              ))}

              <Link
                to="/services"
                className="lubeson-service-all"
                onClick={closeMenus}
              >
                Explore Our Services <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          {/* ABOUT */}
          <NavLink
            to="/about"
            onClick={closeMenus}
            className={({ isActive }) =>
              `lubeson-nav-link ${isActive ? "active" : ""}`
            }
          >
            About Us
          </NavLink>

          {/* CONTACT */}
          <NavLink
            to="/contact"
            onClick={closeMenus}
            className={({ isActive }) =>
              `lubeson-nav-link ${isActive ? "active" : ""}`
            }
          >
            Contact
          </NavLink>

          {/* GET A QUOTE */}
          <Link
            to="/quote"
            className="lubeson-quote-button"
            onClick={closeMenus}
          >
            <Phone size={16} />
            Get a Quote
            <ArrowUpRight size={15} />
          </Link>
        </nav>
      </div>
    </header>
  );
}