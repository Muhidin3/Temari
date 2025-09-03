import mongoose, { Schema } from "mongoose"
import type { IMessage } from "@/types/types"

const MessageSchema = new Schema<IMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    attachments: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
)

// Indexes
MessageSchema.index({ sender: 1 })
MessageSchema.index({ recipient: 1 })
MessageSchema.index({ course: 1 })
MessageSchema.index({ isRead: 1 })

export default mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema)
