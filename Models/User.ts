import mongoose, { Schema } from "mongoose"
import type { IUser } from "@/types/types"

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    phone: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    location: {
      type: String,
      trim: true,
    },
    socialLinks: {
      linkedin: String,
      twitter: String,
      website: String,
    },
    preferences: {
      language: {
        type: String,
        enum: ["en", "am"],
        default: "en",
      },
      notifications: {
        email: {
          type: Boolean,
          default: true,
        },
        push: {
          type: Boolean,
          default: true,
        },
        sms: {
          type: Boolean,
          default: false,
        },
      },
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
// UserSchema.index({ email: 1 })
UserSchema.index({ role: 1 })

const User =  mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
export default User

