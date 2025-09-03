import mongoose, { Schema } from "mongoose"
import type { ICategory } from "@/types/types"

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    nameAm: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    descriptionAm: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    subcategories: [
      {
        type: String,
        trim: true,
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
CategorySchema.index({ isActive: 1 })

export default mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema)
