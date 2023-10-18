// models/User.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { subjects } from "@/constants";

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 100,
    minlength: 3,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  subject: {
    type: String,
    required: [true, "Please provide a subject"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please provide a valid phone number"],
  },
  examIds: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  studentIds: {
    type: [mongoose.Schema.Types.ObjectId],
  },
});
TeacherSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

TeacherSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports =
  mongoose.models.Teacher || mongoose.model("Teacher", TeacherSchema);
