import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/connenctDB"
import Lesson from "@/app/models/Lesson"
import Review from "@/app/models/Review"
import { AuthenticatedRequest, authMiddleware, verifyToken } from "@/lib/auth"
import Course from "@/app/models/Course"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return authMiddleware()(async(req:AuthenticatedRequest)=>{
    try {
      await connectDB()
      const {id} = await params
      const course = await Course.findById(id)
        .populate("instructor", "firstName lastName avatar bio")
        .populate("category", "name nameAm")
  
      if (!course) {
        return NextResponse.json({ error: "Course not found" }, { status: 404 })
      }
  
      // Get lessons
      const lessons = await Lesson.find({ course: id }).sort({ order: 1 })
  
      // Get reviews
      const reviews = await Review.find({ course: id, isApproved: true })
        .populate("student", "firstName lastName avatar")
        .sort({ createdAt: -1 })
        .limit(10)
  
      return NextResponse.json({
        course,
        lessons,
        reviews,
      })
    } catch (error) {
      console.error("Get course error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }


  })(request)
 
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  
  return authMiddleware()(async(req:AuthenticatedRequest)=>{ 
    try {
      const user = req.user
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
  
      await connectDB()
  
      const course = await Course.findById(params.id)
      if (!course) {
        return NextResponse.json({ error: "Course not found" }, { status: 404 })
      }
  
      // Check if user is the instructor or admin
      if (course.instructor.toString() !== user.userId && user.role !== "admin") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
      }
  
      const updateData = await request.json()
      const updatedCourse = await Course.findByIdAndUpdate(params.id, updateData, { new: true })
  
      return NextResponse.json({
        message: "Course updated successfully",
        course: updatedCourse,
      })
    } catch (error) {
      console.error("Update course error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }

  })(request)

}
