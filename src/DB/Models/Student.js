// models/User.js

import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { subjects } from "@/constants";

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
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
    maxlength: 100,
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
      subjectName: String,
      exams: [
        {
          date: String,
          exam: {
            examId: Schema.Types.ObjectId,
            stats: {
              timeSpent: Number,
              rawScore: Number,
              percentileScore: Number,
              levelAtSections: [Schema.Types.Mixed],
              mostWeakSection: String,
            },
            examAnswers: [Schema.Types.Mixed],
          },
        },
      ],
    },
  ],

  teacherIds: {
    type: [Schema.Types.ObjectId],
  },
});
StudentSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
  console.log(this.password, this);
});

StudentSchema.methods.comparePassword = async function (canditatePassword) {
  console.log({ canditatePassword, hashedPass: this.password });
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports =
  mongoose.models.Student || mongoose.model("Student", StudentSchema);
