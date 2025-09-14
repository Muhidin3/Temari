import { Schema, model, models } from "mongoose"
import type { ICourse } from "@/types/database"

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
      // minlength: [10, "Title must be at least 10 characters"],
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    titleAm: {
      type: String,
      trim: true,
      maxlength: [200, "Amharic title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      // required: [true, "Course description is required"],
      // minlength: [50, "Description must be at least 50 characters"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    descriptionAm: {
      type: String,
      maxlength: [2000, "Amharic description cannot exceed 2000 characters"],
    },
    shortDescription: {
      type: String,
      // required: [true, "Short description is required"],
      // minlength: [20, "Short description must be at least 20 characters"],
      maxlength: [500, "Short description cannot exceed 500 characters"],
    },
    shortDescriptionAm: {
      type: String,
      maxlength: [500, "Amharic short description cannot exceed 500 characters"],
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Instructor is required"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      // required: [true, "Category is required"],
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    sections:[{
      type: String,
      trim: true,
    }],
    level: {
      type: String,
      enum: {
        values: ["beginner", "intermediate", "advanced"],
        message: "Level must be beginner, intermediate, or advanced",
      },
      // required: [true, "Course level is required"],
    },
    language: {
      type: String,
      enum: {
        values: ["en", "am", "both"],
        message: "Language must be en, am, or both",
      },
      default: "en",
    },
    price: {
      type: Number,
      // required: [true, "Course price is required"],
      min: [0, "Price cannot be negative"],
      max: [100000, "Price cannot exceed 100,000 ETB"],
    },
    discountPrice: {
      type: Number,
      min: [0, "Discount price cannot be negative"],
      validate: {
        validator: function (this: ICourse, value: number) {
          return !value || value < this.price
        },
        message: "Discount price must be less than regular price",
      },
    },
    currency: {
      type: String,
      default: "ETB",
      enum: ["ETB", "USD"],
    },
    thumbnail: {
      type: String,
      // required: [true, "Course thumbnail is required"],
      // match: [/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i, "Please provide a valid image URL"],
    },
    previewVideo: {
      type: String,
      // match: [/^https?:\/\/.+/, "Please provide a valid video URL"],
    },
    duration: {
      type: Number,
      default: 0,
      min: [0, "Duration cannot be negative"],
    },
    totalLessons: {
      type: Number,
      default: 0,
      min: [0, "Total lessons cannot be negative"],
    },
    totalStudents: {
      type: Number,
      default: 0,
      min: [0, "Total students cannot be negative"],
    },
    rating: {
      type: Number,
      default: 0,
      // min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot be more than 5"],
    },
    totalRatings: {
      type: Number,
      default: 0,
      // min: [0, "Total ratings cannot be negative"],
    },
    tags: [
      {
        type: String,
        trim: true,
        maxlength: [30, "Tag cannot exceed 30 characters"],
      },
    ],
    requirements: [
      {
        type: String,
        trim: true,
        maxlength: [200, "Requirement cannot exceed 200 characters"],
      },
    ],
    whatYouWillLearn: [
      {
        type: String,
        trim: true,
        maxlength: [200, "Learning objective cannot exceed 200 characters"],
      },
    ],
    targetAudience: [
      {
        type: String,
        trim: true,
        maxlength: [200, "Target audience cannot exceed 200 characters"],
      },
    ],
    status: {
      type: String,
      enum: {
        values: ["draft", "published", "archived"],
        message: "Status must be draft, published, or archived",
      },
      default: "draft",
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// Virtual for effective price
courseSchema.virtual("effectivePrice").get(function () {
  return this.discountPrice || this.price
})

// Virtual for discount percentage
courseSchema.virtual("discountPercentage").get(function () {
  if (!this.discountPrice) return 0
  return Math.round(((this.price - this.discountPrice) / this.price) * 100)
})

// Update rating when new review is added
courseSchema.methods.updateRating = async function (newRating: number) {
  const totalRatings = this.totalRatings + 1
  const newAverageRating = (this.rating * this.totalRatings + newRating) / totalRatings

  this.rating = Math.round(newAverageRating * 10) / 10 // Round to 1 decimal place
  this.totalRatings = totalRatings

  return this.save()
}

// Increment student count
courseSchema.methods.incrementStudentCount = function () {
  this.totalStudents += 1
  return this.save()
}

// Text search index
courseSchema.index({
  title: "text",
  description: "text",
  tags: "text",
  titleAm: "text",
  descriptionAm: "text",
})

// Other indexes for performance
courseSchema.index({ category: 1, level: 1, status: 1 })
courseSchema.index({ instructor: 1, status: 1 })
courseSchema.index({ rating: -1, totalStudents: -1 })
courseSchema.index({ createdAt: -1 })
courseSchema.index({ price: 1 })
courseSchema.index({ isFeatured: -1, rating: -1 })

// if (models.Course){
//   delete models.Course
//   console.log('deleted model----------------------------------------------> course')
// }
const Course = models.Course || model<ICourse>("Course", courseSchema)

export default Course
