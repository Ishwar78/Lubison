const express = require("express");
const router = express.Router();

const WebsiteSettings = require("../models/WebsiteSettings");

// GET: Fetch website settings
router.get("/", async (req, res) => {
  try {
    let settings = await WebsiteSettings.findOne();

    if (!settings) {
      settings = await WebsiteSettings.create({});
    }

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Fetch settings error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch website settings.",
    });
  }
});

// PUT: Update website settings
router.put("/", async (req, res) => {
  try {
    // const allowedFields = [
    //   "siteName",
    //   "tagline",
    //   "email",
    //   "phone",
    //   "address",
    //   "logoUrl",
    //   "metaTitle",
    //   "metaDescription",
    //   "salesPhone",
    //   "servicePhone",
    // ];
const allowedFields = [
  "companyName",
  "tagline",
  "websiteUrl",
  "email",
  "phone",
  "alternatePhone",
  "salesPhone",
  "servicePhone",
  "address",
  "city",
  "state",
  "pincode",
  "facebook",
  "instagram",
  "linkedin",
  "youtube",
  "metaTitle",
  "metaDescription",
  "keywords",
  "currency",
  "language",
];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    let settings = await WebsiteSettings.findOne();

    if (!settings) {
      settings = new WebsiteSettings();
    }

    Object.assign(settings, updates);
    await settings.save();

    res.status(200).json({
      success: true,
      message: "Website settings saved successfully!",
      data: settings,
    });
  } catch (error) {
    console.error("Update settings error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to save website settings.",
    });
  }
});

module.exports = router;