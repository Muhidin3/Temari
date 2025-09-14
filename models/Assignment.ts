import mongoose, { Schema } from "mongoose"
import type { IAssignment } from "@/types/database"

const AssignmentSchema = new Schema<IAssignment>(
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
    instructions: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
    },
    maxScore: {
      type: Number,
      required: true,
      min: 0,
    },
    attachments: [
      {
        type: String,
      },
    ],
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
AssignmentSchema.index({ course: 1 })
AssignmentSchema.index({ lesson: 1 })

export default mongoose.models.Assignment || mongoose.model<IAssignment>("Assignment", AssignmentSchema)
