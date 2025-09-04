import mongoose, { Schema } from "mongoose"
import type { ISubmission } from "@/types/types"

const SubmissionSchema = new Schema<ISubmission>({
  assignment: {
    type: Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  attachments: [
    {
      type: String,
    },
  ],
  score: {
    type: Number,
    min: 0,
  },
  feedback: {
    type: String,
  },
  status: {
    type: String,
    enum: ["submitted", "graded", "returned"],
    default: "submitted",
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  gradedAt: {
    type: Date,
  },
})

// Indexes
SubmissionSchema.index({ assignment: 1, student: 1 }, { unique: true })
SubmissionSchema.index({ student: 1 })

export default mongoose.models.Submission || mongoose.model<ISubmission>("Submission", SubmissionSchema)
