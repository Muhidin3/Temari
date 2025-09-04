import mongoose, { Schema } from "mongoose"
import type { IPayment } from "@/types/types"

const PaymentSchema = new Schema<IPayment>(
  {
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
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      default: "USD",
    },
    paymentMethod: {
      type: String,
      enum: ["stripe", "paypal", "bank_transfer"],
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
PaymentSchema.index({ student: 1 })
PaymentSchema.index({ course: 1 })
PaymentSchema.index({ transactionId: 1 })
PaymentSchema.index({ status: 1 })

export default mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema)
