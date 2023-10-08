// models/User.js

import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
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
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  grade: {
    type: String,
    required: [true, "Please provide grade"],
  },

  parentPhoneNumber: {
    type: Number,
    required: [true, "Please provide a valid phone number"],
  },
  examsSubmitted: [
    {
      examId: Schema.Types.ObjectId,
      stats: {
        timeSpent: Number,
        rawScore: Number,
        percentileScore: Number,
      },
      examAnswers: [{ questionHead: String, choosenAnswer: String }],
    },
  ],
  teacherIds: {
    type: [Schema.Types.ObjectId],
  },
});
StudentSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

StudentSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports =
  mongoose.models.Student || mongoose.model("Student", StudentSchema);
