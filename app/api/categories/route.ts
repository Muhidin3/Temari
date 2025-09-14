import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Category from "@/models/Category"
import Course from "@/models/Course"
import type { ApiResponse } from "@/types/database"

export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const includeSubcategories = searchParams.get("includeSubcategories") === "true"
    const withCourseCount = searchParams.get("withCourseCount") === "true"

    // Get main categories
    const categories = await Category.find({
      isActive: true,
      parent: null,
    })
      .sort({ sortOrder: 1 })
      .lean()

    // If subcategories are requested, get them too
    if (includeSubcategories) {
      for (const category of categories) {
        const subcategories = await Category.find({
          parent: category._id,
          isActive: true,
        })
          .sort({ sortOrder: 1 })
          .lean()
        ;(category as any).subcategories = subcategories
      }
    }

    // If course count is requested, calculate it
    if (withCourseCount) {
      for (const category of categories) {
        const courseCount = await Course.countDocuments({
          category: category._id,
          status: "published",
          isApproved: true,
        })
        ;(category as any).courseCount = courseCount
      }
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "Categories retrieved successfully",
      data: categories,
    })
  } catch (error) {
    console.error("Get categories error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const { name, nameAm, description, descriptionAm, icon, color, parent } = await request.json()

    // Validation
    if (!name) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Category name is required",
        },
        { status: 400 },
      )
    }

    // Check if category already exists
    const existingCategory = await Category.findOne({ name })

    if (existingCategory) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Category with this name already exists",
        },
        { status: 409 },
      )
    }

    // Create new category
    const category = new Category({
      name,
      nameAm,
      description,
      descriptionAm,
      icon: icon || "BookOpen",
      color: color || "#3B82F6",
      parent: parent || null,
    })

    await category.save()

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Category created successfully",
        data: category,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create category error:", error)

    if ((error as any).name === "ValidationError") {
      const validationErrors = Object.values((error as any).errors).map((err: any) => err.message)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: validationErrors.join(", "),
        },
        { status: 400 },
      )
    }

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
