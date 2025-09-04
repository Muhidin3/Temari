import mongoose, { Schema } from "mongoose"
import type { ILesson } from "@/types/types"

const LessonSchema = new Schema<ILesson>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
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
    videoUrl: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 0,
    },
    order: {
      type: Number,
      required: true,
    },
    resources: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        url: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["pdf", "doc", "link", "image"],
          required: true,
        },
      },
    ],
    isPreview: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
LessonSchema.index({ course: 1, order: 1 })

export default mongoose.models.Lesson || mongoose.model<ILesson>("Lesson", LessonSchema)
