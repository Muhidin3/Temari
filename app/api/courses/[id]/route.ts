import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Course from "@/models/Course"
import { authMiddleware } from "@/lib/auth"
import type { AuthenticatedRequest } from "@/types/database"
import Lesson from "@/models/Lesson"
import Category from "@/models/Category"

// GET /api/courses/[id] - Public route to get a single course
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const {id} = await params

    const a = await Category.find()
    const course = await Course.findById(id)
      .populate("instructor", "firstName lastName avatar ")
      .populate("category", "name nameAm")
      .populate('sections')
      .lean()

    const lessons = await Lesson.find({course:id})

    if (!lessons) {
      return NextResponse.json({ success: false, message: "lessons not found" }, { status: 404 })
    }

    if (!course) {
      return NextResponse.json({ success: false, message: "Course not found" }, { status: 404 })
    }

    // Only return published and approved courses for public access
    // if (course.status !== "published" || !course.isApproved) {
    //   return NextResponse.json({ success: false, message: "Course not available" }, { status: 404 })
    // }

    return NextResponse.json({
      success: true,
      message: "Course retrieved successfully",
      data: course,
      lessons
    })
  } catch (error) {
    console.error("Get course error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

// PUT /api/courses/[id] - Protected route for instructors to update their courses
export const PUT = authMiddleware("instructor")(
  async (request: AuthenticatedRequest, { params }: { params: { id: string } }) => {
    try {
      await dbConnect()

      const course = await Course.findById(params.id)

      if (!course) {
        return NextResponse.json({ success: false, message: "Course not found" }, { status: 404 })
      }

      // Check if the instructor owns this course
      if (course.instructor.toString() !== request.user?.userId) {
        return NextResponse.json({ success: false, message: "You can only update your own courses" }, { status: 403 })
      }

      const body = await request.json()
      const updateData = { ...body }

      // Remove fields that shouldn't be updated directly
      delete updateData.instructor
      delete updateData.totalStudents
      delete updateData.rating
      delete updateData.totalRatings
      delete updateData.isApproved

      // Update course
      const updatedCourse = await Course.findByIdAndUpdate(params.id, updateData, { new: true, runValidators: true })
        .populate("instructor", "firstName lastName avatar")
        .populate("category", "name nameAm")

      return NextResponse.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error("Update course error:", error)

      if ((error as any).name === "ValidationError") {
        const validationErrors = Object.values((error as any).errors).map((err: any) => err.message)
        return NextResponse.json({ success: false, message: validationErrors.join(", ") }, { status: 400 })
      }

      return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
    }
  },
)

// DELETE /api/courses/[id] - Protected route for instructors to delete their courses
export const DELETE = authMiddleware("instructor")(
  async (request: AuthenticatedRequest, { params }: { params: { id: string } }) => {
    try {
      await dbConnect()

      const course = await Course.findById(params.id)

      if (!course) {
        return NextResponse.json({ success: false, message: "Course not found" }, { status: 404 })
      }

      // Check if the instructor owns this course
      if (course.instructor.toString() !== request.user?.userId) {
        return NextResponse.json({ success: false, message: "You can only delete your own courses" }, { status: 403 })
      }

      // Check if course has students enrolled
      if (course.totalStudents > 0) {
        return NextResponse.json(
          { success: false, message: "Cannot delete course with enrolled students" },
          { status: 400 },
        )
      }

      await Course.findByIdAndDelete(params.id)

      return NextResponse.json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error("Delete course error:", error)
      return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
    }
  },
)
