import mongoose, { Schema } from "mongoose"
import type { ICertificate } from "@/types/database"

const CertificateSchema = new Schema<ICertificate>({
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
  certificateId: {
    type: String,
    required: true,
    unique: true,
  },
  issuedAt: {
    type: Date,
    default: Date.now,
  },
  verificationUrl: {
    type: String,
    required: true,
  },
})

// Indexes
CertificateSchema.index({ student: 1, course: 1 }, { unique: true })
CertificateSchema.index({ certificateId: 1 })

export default mongoose.models.Certificate || mongoose.model<ICertificate>("Certificate", CertificateSchema)
