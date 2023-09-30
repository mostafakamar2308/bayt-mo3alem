// models/User.js

import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema({
  examName: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },
  grade: {
    type: String,
    required: [true, "Please provide a Grade"],
  },
  totalScore: {
    type: Number,
    required: [true, "Please provide total score"],
  },
  Questions: {
    type: [
      {
        questionHead: String,
        Answers: [String],
        explaination: String,
      },
    ],
    required: [true, "You can't have exams without questions"],
  },
  from: {
    type: Date,
    required: [true, "Please provide a beginning Date"],
  },
  to: {
    type: Date,
    required: [true, "Please provide an end Date"],
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please provide Teacher Id"],
  },
  studentIds: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  stats: {
    type: {
      averageRawScore: Number,
      averagePercentile: Number,
      highestScore: Number,
      gradeDistribution: [{ grade: String, percentage: Number }],
    },
  },
});

module.exports = mongoose.models.Exam || mongoose.model("Exam", ExamSchema);
