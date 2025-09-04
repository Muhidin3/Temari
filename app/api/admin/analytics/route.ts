import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/connenctDB"
import User from "@/app/models/User"
import Course from "@/app/models/Course"
import Enrollment from "@/app/models/Enrollment"
import Payment from "@/app/models/Payment"
import { AuthenticatedRequest, authMiddleware, verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  return authMiddleware()(async(req:AuthenticatedRequest)=>{ 
    try {
      const user = req.user
      if (!user || user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
  
      await connectDB()
  
      // Get basic counts
      const totalUsers = await User.countDocuments()
      const totalStudents = await User.countDocuments({ role: "student" })
      const totalInstructors = await User.countDocuments({ role: "instructor" })
      const totalCourses = await Course.countDocuments()
      const publishedCourses = await Course.countDocuments({ status: "published" })
      const totalEnrollments = await Enrollment.countDocuments()
  
      // Get revenue data
      const totalRevenue = await Payment.aggregate([
        { $match: { status: "completed" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ])
  
      // Get monthly enrollment data
      const monthlyEnrollments = await Enrollment.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$enrolledAt" },
              month: { $month: "$enrolledAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
        { $limit: 12 },
      ])
  
      // Get top courses
      const topCourses = await Course.find({ status: "published" })
        .sort({ totalStudents: -1 })
        .limit(10)
        .populate("instructor", "firstName lastName")
  
      return NextResponse.json({
        overview: {
          totalUsers,
          totalStudents,
          totalInstructors,
          totalCourses,
          publishedCourses,
          totalEnrollments,
          totalRevenue: totalRevenue[0]?.total || 0,
        },
        monthlyEnrollments,
        topCourses,
      })
    } catch (error) {
      console.error("Get admin analytics error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
      
    })(request)
  
}
