import mongoose, { Schema } from "mongoose"
import type { IEnrollment } from "@/types/database"

const EnrollmentSchema = new Schema<IEnrollment>({
  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  completedLessons: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
    },
  ],
  lastAccessedLesson: {
    type: Schema.Types.ObjectId,
    ref: "Lesson",
  },
  certificateIssued: {
    type: Boolean,
    default: false,
  },
  certificateIssuedAt: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["active", "completed", "dropped"],
    default: "active",
  },
})

// Indexes
EnrollmentSchema.index({ student: 1, course: 1 }, { unique: true })
EnrollmentSchema.index({ student: 1 })
EnrollmentSchema.index({ course: 1 })

export default mongoose.models.Enrollment || mongoose.model<IEnrollment>("Enrollment", EnrollmentSchema)
