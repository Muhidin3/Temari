import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import { authMiddleware } from "@/lib/auth"
import type { AuthenticatedRequest, ApiResponse } from "@/types/database"

// GET /api/profile - Get current user profile
export const GET = authMiddleware()(async (request: AuthenticatedRequest) => {
  try {
    await dbConnect()

    const user = await User.findById(request.user?.userId)

    if (!user) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "Profile retrieved successfully",
      data: user,
    })
  } catch (error) {
    console.error("Get profile error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
})

// PUT /api/profile - Update current user profile
export const PUT = authMiddleware()(async (request: AuthenticatedRequest) => {
  try {
    await dbConnect()

    const updateData = await request.json()

    // Remove sensitive fields that shouldn't be updated via this endpoint
    delete updateData.password
    delete updateData.role
    delete updateData.isActive
    delete updateData.isEmailVerified

    const user = await User.findByIdAndUpdate(request.user?.userId, updateData, { new: true, runValidators: true })

    if (!user) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "Profile updated successfully",
      data: user,
    })
  } catch (error) {
    console.error("Update profile error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
})
