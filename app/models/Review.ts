import mongoose, { Schema } from "mongoose"
import type { IReview } from "@/types/types"

const ReviewSchema = new Schema<IReview>(
  {
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
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
ReviewSchema.index({ student: 1, course: 1 }, { unique: true })
ReviewSchema.index({ course: 1 })
ReviewSchema.index({ isApproved: 1 })

export default mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema)
