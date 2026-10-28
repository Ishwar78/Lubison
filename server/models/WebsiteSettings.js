

const mongoose = require("mongoose");

const websiteSettingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: "BJ AND SON TOOLS AND EQUIPMENT PVT LTD",
      trim: true,
    },
    tagline: {
      type: String,
      default: "",
      trim: true,
    },
    websiteUrl: {
      type: String,
      default: "",
      trim: true,
    },
    email: {
      type: String,
      default: "Connectlubeson@gmail.com",
      trim: true,
    },
    phone: {
      type: String,
      default: "9416629792",
      trim: true,
    },
    alternatePhone: {
      type: String,
      default: "",
      trim: true,
    },
    salesPhone: {
      type: String,
      default: "8199943327",
      trim: true,
    },
    servicePhone: {
      type: String,
      default: "8570909770",
      trim: true,
    },
    address: {
      type: String,
      default: "Bhiwani Road",
      trim: true,
    },
    city: {
      type: String,
      default: "Rohtak",
      trim: true,
    },
    state: {
      type: String,
      default: "Haryana",
      trim: true,
    },
    pincode: {
      type: String,
      default: "124001",
      trim: true,
    },
    facebook: {
      type: String,
      default: "",
      trim: true,
    },
    instagram: {
      type: String,
      default: "",
      trim: true,
    },
    linkedin: {
      type: String,
      default: "",
      trim: true,
    },
    youtube: {
      type: String,
      default: "",
      trim: true,
    },
    metaTitle: {
      type: String,
      default: "LUBESON | Construction Equipment",
      trim: true,
    },
    metaDescription: {
      type: String,
      default:
        "Explore construction equipment and industrial solutions with LUBESON.",
      trim: true,
    },
    keywords: {
      type: String,
      default:
        "construction equipment, industrial equipment, machinery",
      trim: true,
    },
    currency: {
      type: String,
      default: "INR",
      trim: true,
    },
    language: {
      type: String,
      default: "en",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "WebsiteSettings",
  websiteSettingsSchema
);
