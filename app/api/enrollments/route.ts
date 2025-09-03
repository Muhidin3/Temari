import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/connenctDB"
import Enrollment from "@/models/Enrollment"
import Course from "@/models/Course"
import { AuthenticatedRequest, authMiddleware, verifyToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  return authMiddleware()(async(req:AuthenticatedRequest)=>{ 
      
    try {
      const user = req.user
      if (!user || user.role !== "student") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
  
      await connectDB()
  
      const { courseId } = await request.json()
  
      // Check if course exists
      const course = await Course.findById(courseId)
      if (!course) {
        return NextResponse.json({ error: "Course not found" }, { status: 404 })
      }
  
      // Check if already enrolled
      const existingEnrollment = await Enrollment.findOne({
        student: user.userId,
        course: courseId,
      })
  
      if (existingEnrollment) {
        return NextResponse.json({ error: "Already enrolled in this course" }, { status: 400 })
      }
  
      // Create enrollment
      const enrollment = await Enrollment.create({
        student: user.userId,
        course: courseId,
      })
  
      // Update course total students
      await Course.findByIdAndUpdate(courseId, {
        $inc: { totalStudents: 1 },
      })
  
      return NextResponse.json(
        {
          message: "Enrolled successfully",
          enrollment,
        },
        { status: 201 },
      )
    } catch (error) {
      console.error("Enrollment error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
    })(request)
  
}

export async function GET(request: NextRequest) {
  return authMiddleware()(async(req:AuthenticatedRequest)=>{ 
    try {
      const user = req.user
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
  
      await connectDB()
  
      const enrollments = await Enrollment.find({ student: user.userId })
        .populate({
          path: "course",
          populate: {
            path: "instructor",
            select: "firstName lastName avatar",
          },
        })
        .sort({ enrolledAt: -1 })
  
      return NextResponse.json({ enrollments })
    } catch (error) {
      console.error("Get enrollments error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
    
  })(request)

}
