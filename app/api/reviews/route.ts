import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/connenctDB"
import Review from "@/models/Review"
import Course from "@/models/Course"
import Enrollment from "@/models/Enrollment"
import { AuthenticatedRequest, authMiddleware, verifyToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  return authMiddleware()(async(req:AuthenticatedRequest)=>{ 
    
    try {
      const user = req.user
      if (!user || user.role !== "student") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
  
      await connectDB()
  
      const { courseId, rating, comment } = await request.json()
  
      // Check if student is enrolled in the course
      const enrollment = await Enrollment.findOne({
        student: user.userId,
        course: courseId,
      })
  
      if (!enrollment) {
        return NextResponse.json({ error: "You must be enrolled in this course to leave a review" }, { status: 400 })
      }
  
      // Check if review already exists
      const existingReview = await Review.findOne({
        student: user.userId,
        course: courseId,
      })
  
      if (existingReview) {
        return NextResponse.json({ error: "You have already reviewed this course" }, { status: 400 })
      }
  
      // Create review
      const review = await Review.create({
        student: user.userId,
        course: courseId,
        rating,
        comment,
      })
  
      // Update course rating
      const reviews = await Review.find({ course: courseId, isApproved: true })
      const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0)
      const avgRating = totalRating / reviews.length
  
      await Course.findByIdAndUpdate(courseId, {
        rating: avgRating,
        totalRatings: reviews.length,
      })
  
      return NextResponse.json(
        {
          message: "Review submitted successfully",
          review,
        },
        { status: 201 },
      )
    } catch (error) {
      console.error("Create review error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
  })(request)

}
