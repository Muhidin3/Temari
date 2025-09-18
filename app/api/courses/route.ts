import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Course from "@/models/Course"
import Category from "@/models/Category"
import type { ApiResponse } from "@/types/database"

export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const category = searchParams.get("category")
    const level = searchParams.get("level")
    const search = searchParams.get("search")
    const sort = searchParams.get("sort") || "createdAt"
    const order = searchParams.get("order") === "asc" ? 1 : -1
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const language = searchParams.get("language")
    const featured = searchParams.get("featured")

    // Build query
    const query: any = {
      status: "published",
      // isApproved: true,
    }

    if (category) {
      query.category = category
    }

    if (level) {
      query.level = level
    }

    if (language && language !== "all") {
      query.language = { $in: [language, "both"] }
    }

    if (featured === "true") {
      query.isFeatured = true
    }

    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number.parseFloat(minPrice)
      if (maxPrice) query.price.$lte = Number.parseFloat(maxPrice)
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { titleAm: { $regex: search, $options: "i" } },
        { descriptionAm: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ]
    }

    // Calculate pagination
    const skip = (page - 1) * limit

    // Get courses with pagination
    const courses = await Course.find(query)
      .populate("instructor", "firstName lastName avatar")
      .populate("category", "name nameAm slug")
      .sort({ [sort]: order })
      .skip(skip)
      .limit(limit)
      .lean()

    // Get total count for pagination
    const total = await Course.countDocuments(query)
    const pages = Math.ceil(total / limit)

    // Get categories for filters
    const categories = await Category.find({ isActive: true, parent: null }).sort({ sortOrder: 1 }).lean()

    return NextResponse.json({
      success: true,
      message: "Courses retrieved successfully",
      data: courses,
      meta: {
        pagination: {
          page,
          limit,
          total,
          pages,
        },
        categories,
        filters: {
          levels: ["beginner", "intermediate", "advanced"],
          languages: ["en", "am", "both"],
        },
      },
    })
  } catch (error) {
    console.error("Get courses error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
