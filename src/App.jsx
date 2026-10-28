// import { Routes, Route, useLocation } from "react-router-dom";
// import { useEffect } from "react";

// //import Navbar from "./components/Navbar";
// import Navbar from "./components/navbar";
// import Footer from "./components/Footer";

// import Home from "./pages/Home";
// import Equipment from "./pages/Equipment";
// import ProductDetail from "./pages/ProductDetail";
// import Services from "./pages/Services";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Quote from "./pages/Quote";

// // Industry pages
// import Agriculture from "./pages/Agriculture";
// import Construction from "./pages/Construction";
// import Infrastructure from "./pages/Infrastructure";
// import MaterialHandling from "./pages/MaterialHandling";

// function ScrollToTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "instant" });
//   }, [pathname]);

//   return null;
// }

// export default function App() {
//   return (
//     <>
//       <ScrollToTop />

//       <Navbar />

//       <Routes>
//         {/* Home */}
//         <Route path="/" element={<Home />} />

//         {/* Services */}
//         <Route path="/services" element={<Services />} />
//         <Route
//           path="/services/:serviceSlug"
//           element={<Services />}
//         />
//         <Route path="/quote" element={<Quote />} />

//         {/* Equipment */}
//         <Route path="/equipment" element={<Equipment />} />
//         <Route
//           path="/equipment/:id"
//           element={<ProductDetail />}
//         />

//         {/* Industry pages */}
//         <Route
//           path="/industries/agriculture"
//           element={<Agriculture />}
//         />
//         <Route
//           path="/industries/construction"
//           element={<Construction />}
//         />
//         <Route
//           path="/industries/infrastructure"
//           element={<Infrastructure />}
//         />
//         <Route
//           path="/industries/material-handling"
//           element={<MaterialHandling />}
//         />

//         {/* About */}
//         <Route path="/about" element={<About />} />

//         {/* Contact */}
//         <Route path="/contact" element={<Contact />} />

//         {/* 404 */}
//         <Route
//           path="*"
//           element={
//             <main className="container section-pad">
//               <h1>Page not found</h1>
//               <a className="text-link" href="/">
//                 Return home
//               </a>
//             </main>
//           }
//         />
//       </Routes>

//       <Footer />
//     </>
//   );
// }



import { Routes, Route, useLocation, Navigate, Link } from "react-router-dom";
import { useEffect } from "react";

// import Navbar from "./components/navbar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Equipment from "./pages/Equipment";
import ProductDetail from "./pages/ProductDetail";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Quote from "./pages/Quote";

// Industry pages
import Agriculture from "./pages/Agriculture";
import Construction from "./pages/Construction";
import Infrastructure from "./pages/Infrastructure";
import MaterialHandling from "./pages/MaterialHandling";

// Admin components
import AdminLayout from "./components/admin/AdminLayout";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EquipmentManager from "./pages/admin/EquipmentManager";
import CategoryManager from "./pages/admin/CategoryManager";
import BannerManager from "./pages/admin/BannerManager";
import ContentManager from "./pages/admin/ContentManager";
import EnquiriesManager from "./pages/admin/EnquiriesManager";
import QuotesManager from "./pages/admin/QuotesManager";
import FAQManager from "./pages/admin/FAQManager";
import TestimonialsManager from "./pages/admin/TestimonialsManager";
import IndustriesManager from "./pages/admin/IndustriesManager";
import ServicesManager from "./pages/admin/ServicesManager";
import WebsiteSettings from "./pages/admin/WebsiteSettings";
import SeoManager from "./pages/admin/SeoManager";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

function NotFound() {
  return (
    <main className="container section-pad">
      <h1>Page not found</h1>
      <Link className="text-link" to="/">
        Return home
      </Link>
    </main>
  );
}

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />

      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* ================= PUBLIC WEBSITE ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/services" element={<Services />} />
        <Route path="/services/:serviceSlug" element={<Services />} />
        <Route path="/quote" element={<Quote />} />

        <Route path="/equipment" element={<Equipment />} />
        <Route path="/equipment/:id" element={<ProductDetail />} />

        {/* Industry pages */}
        <Route path="/industries/agriculture" element={<Agriculture />} />
        <Route path="/industries/construction" element={<Construction />} />
        <Route path="/industries/infrastructure" element={<Infrastructure />} />
        <Route
          path="/industries/material-handling"
          element={<MaterialHandling />}
        />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* ================= ADMIN LOGIN ================= */}

        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ================= ADMIN PANEL ================= */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="equipment" element={<EquipmentManager />} />
          <Route path="categories" element={<CategoryManager />} />
          <Route path="banners" element={<BannerManager />} />
          <Route path="content" element={<ContentManager />} />
          <Route path="enquiries" element={<EnquiriesManager />} />
          <Route path="quotes" element={<QuotesManager />} />
          <Route path="faqs" element={<FAQManager />} />
          <Route path="testimonials" element={<TestimonialsManager />} />
          <Route path="industries" element={<IndustriesManager />} />
          <Route path="services" element={<ServicesManager />} />
          <Route path="settings" element={<WebsiteSettings />} />
          <Route path="seo" element={<SeoManager />} />
        </Route>

        {/* ================= 404 ================= */}

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}