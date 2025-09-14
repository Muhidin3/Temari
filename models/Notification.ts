import mongoose, { Schema } from "mongoose"
import type { INotification } from "@/types/database"

const NotificationSchema = new Schema<INotification>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["course", "payment", "system", "message", "assignment"],
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
NotificationSchema.index({ user: 1 })
NotificationSchema.index({ isRead: 1 })
NotificationSchema.index({ type: 1 })

export default mongoose.models.Notification || mongoose.model<INotification>("Notification", NotificationSchema)
