import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Course from "@/models/Course"
import { authMiddleware } from "@/lib/auth"
import type { AuthenticatedRequest } from "@/types/database"
import Category from "@/models/Category"

// GET /api/instructor/courses - Get instructor's courses
export const GET = authMiddleware("instructor")(async (request: AuthenticatedRequest) => {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const status = searchParams.get("status")

    // Build query for instructor's courses
    const query: any = { instructor: request.user?.userId }

    if (status) {
      query.status = status
    } 
    await Category.find()
    // Get courses with pagination
    const courses = await Course.find(query)
      .populate("category", "name nameAm")
      .lean()

    // Get total count for pagination
    const total = await Course.countDocuments(query)

    // Get course statistics
    const stats = await Course.aggregate([
      { $match: { instructor: request.user?.userId } },
      {
        $group: {
          _id: null,
          totalCourses: { $sum: 1 },
          publishedCourses: {
            $sum: { $cond: [{ $eq: ["$status", "published"] }, 1, 0] },
          },
          draftCourses: {
            $sum: { $cond: [{ $eq: ["$status", "draft"] }, 1, 0] },
          },
          totalStudents: { $sum: "$totalStudents" },
          totalRevenue: {
            $sum: {
              $multiply: ["$price", "$totalStudents"],
            },
          },
          averageRating: { $avg: "$rating" },
        },
      },
    ])

    const statistics = stats[0] || {
      totalCourses: 0,
      publishedCourses: 0,
      draftCourses: 0,
      totalStudents: 0,
      totalRevenue: 0,
      averageRating: 0,
    }

    return NextResponse.json({
      success: true,
      message: "Instructor courses retrieved successfully",
      data: courses,
      statistics,
      pagination: {
        page,
        total,
      },
    })
  } catch (error) {
    console.error("Get instructor courses error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
})

// POST /api/instructor/courses - Create a new course
export const POST = authMiddleware("instructor")(async (request: AuthenticatedRequest) => {
  try {
    await dbConnect()
    const body = await request.json()
    const {
      title,
      titleAm,
      description,
      descriptionAm,
      shortDescription,
      shortDescriptionAm,
      category,
      subcategory,
      level,
      language,
      price,
      discountPrice,
      thumbnail,
      previewVideo,
      tags,
      requirements,
      whatYouWillLearn,
      targetAudience,
    } = body
    
    const { searchParams } = new URL(request.url)
    const publish = searchParams.get('publish') || false

    
    if (publish) {
      // Validation
      if (!title || !description || !shortDescription || !category || !level || price === undefined || !thumbnail) {
        return NextResponse.json({ success: false, message: "Required fields are missing" }, { status: 400 })
      }
      
      if (price < 0) {
        return NextResponse.json({ success: false, message: "Price cannot be negative" }, { status: 400 })
      }
      
      if (discountPrice !== undefined && discountPrice < 0) {
        return NextResponse.json({ success: false, message: "Discount price cannot be negative" }, { status: 400 })
      }
      
      if (discountPrice !== undefined && discountPrice >= price) {
        return NextResponse.json(
          { success: false, message: "Discount price must be less than original price" },
          { status: 400 },
        )
      }
    }
    
    console.log('post======================================== started')
    // Create course
    const course = new Course({
      title,
      titleAm,
      description,
      descriptionAm,
      shortDescription,
      shortDescriptionAm,
      instructor: request.user?.userId,
      category,
      // subcategory,
      level,
      language: language || "en",
      price,
      discountPrice,
      thumbnail,
      previewVideo,
      tags: tags || [],
      requirements: requirements || [],
      whatYouWillLearn: whatYouWillLearn || [],
      targetAudience: targetAudience || [],
      status: "draft",
    })

    await course.save()

    // Populate instructor and category data
    await course.populate("instructor", "firstName lastName avatar")
    await course.populate("category", "name nameAm")

    return NextResponse.json(
      {
        success: true,
        message: "Course created successfully",
        data: course,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create course error:", error)

    if ((error as any).name === "ValidationError" && false) {
      const validationErrors = Object.values((error as any).errors).map((err: any) => {
        // console.log(err.message)
        return err.message
      })
      return NextResponse.json({ success: false, message: validationErrors.join(", ") }, { status: 400 })
    }
    console.log(error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
})
