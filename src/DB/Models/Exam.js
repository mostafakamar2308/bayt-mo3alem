// models/User.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const ExamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },
  totalScore: {
    type: Number,
    required: [true, "Please provide total score"],
  },
  Questions: {
    type: [
      {
        title: String,
        Answers: [String],
        correctAnswer: String,
        studentsWhoAnswer: Number,
        mostFrequentAnswer: String,
        questionLevel: Number,
        itemDiscrimination: Number,
      },
    ],
    required: [true, "Please provide Questions"],
  },
  teacherId: {
    type: Schema.Types.ObjectId,
    required: [true, "Please provide Teacher Id"],
  },
  studentIds: {
    type: [Schema.Types.ObjectId],
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
