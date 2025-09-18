import mongoose, { Schema } from "mongoose"
import type {} from "@/types/database"

const QuizSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    lesson: {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    questions: [
      {
        question: {
          type: String,
          required: true,
        },
        options: [
          {
            type: String,
            required: true,
          },
        ],
        correctAnswer: {
          type: Number,
          required: true,
        },
        explanation: {
          type: String,
        },
      },
    ],
    passingScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    timeLimit: {
      type: Number,
      min: 1,
    },
    attempts: {
      type: Number,
      default: 3,
      min: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
QuizSchema.index({ course: 1 })
QuizSchema.index({ lesson: 1 })

export default mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema)
