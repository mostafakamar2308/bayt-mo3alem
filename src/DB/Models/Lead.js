// models/User.js

import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 100,
    minlength: 3,
  },
  phone: { type: Number, required: [true, "Please provie a Number"] },
  subject: { type: String, required: [true, "please provide a subject"] },
});

module.exports = mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
