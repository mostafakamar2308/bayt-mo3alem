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
    type: [mongoose.Schema.Types.Mixed],
    required: [true, "You can't have exams without questions"],
  },
  from: {
    type: Date,
    required: [true, "Please provide a beginning Date"],
  },
  subject: {
    type: String,
    required: [true, "Please provide a subject"],
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
      times: [Number],
      averageTimes: Number,
      scores: [Number],
      averageScore: Number,
      highestScore: [
        { owners: [mongoose.Schema.Types.ObjectId], score: Number },
      ],
      lowestScore: [
        { owners: [mongoose.Schema.Types.ObjectId], score: Number },
      ],
    },
  },
});

module.exports = mongoose.models.Exam || mongoose.model("Exam", ExamSchema);
