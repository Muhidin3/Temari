import { ICourse } from "@/types/types"
import mongoose, { Schema } from "mongoose"

const CourseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
      maxlength: 200,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: String,
      trim: true,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
    language: {
      type: String,
      enum: ["en", "am"],
      default: "en",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discountPrice: {
      type: Number,
      min: 0,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    previewVideo: {
      type: String,
    },
    duration: {
      type: Number,
      required: true,
      min: 0,
    },
    totalLessons: {
      type: Number,
      default: 0,
    },
    requirements: [
      {
        type: String,
        trim: true,
      },
    ],
    whatYouWillLearn: [
      {
        type: String,
        trim: true,
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    totalStudents: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
CourseSchema.index({ instructor: 1 })
CourseSchema.index({ category: 1 })
CourseSchema.index({ status: 1 })
CourseSchema.index({ isApproved: 1 })
CourseSchema.index({ rating: -1 })
CourseSchema.index({ totalStudents: -1 })
CourseSchema.index({ createdAt: -1 })

export default mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema)
