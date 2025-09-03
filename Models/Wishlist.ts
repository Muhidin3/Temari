import mongoose, { Schema } from "mongoose"
import type { IWishlist } from "@/types/types"

const WishlistSchema = new Schema<IWishlist>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    timestamps: true,
  },
)

// Indexes
WishlistSchema.index({ student: 1 })

export default mongoose.models.Wishlist || mongoose.model<IWishlist>("Wishlist", WishlistSchema)
