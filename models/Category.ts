import { Schema, model, models } from "mongoose"
import type { ICategory } from "@/types/database"

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
      minlength: [2, "Category name must be at least 2 characters"],
      maxlength: [50, "Category name cannot exceed 50 characters"],
    },
    nameAm: {
      type: String,
      trim: true,
      maxlength: [50, "Amharic name cannot exceed 50 characters"],
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    descriptionAm: {
      type: String,
      maxlength: [500, "Amharic description cannot exceed 500 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    icon: {
      type: String,
      default: "BookOpen",
    },
    color: {
      type: String,
      default: "#3B82F6",
      match: [/^#[0-9A-F]{6}$/i, "Please provide a valid hex color"],
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    courseCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Generate slug from name before saving
categorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }
  next()
})

// Indexes
categorySchema.index({ slug: 1 })
categorySchema.index({ parent: 1, isActive: 1 })
categorySchema.index({ sortOrder: 1 })

const Category = models.Category || model<ICategory>("Category", categorySchema)

export default Category
