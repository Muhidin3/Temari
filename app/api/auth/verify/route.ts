import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import { verifyToken } from "@/lib/auth"
import type { AuthResponse } from "@/types/database"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const { token } = await request.json()

    if (!token) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          message: "Token is required",
        },
        { status: 400 },
      )
    }

    // Verify token
    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          message: "Invalid or expired token",
        },
        { status: 401 },
      )
    }

    // Find user
    const user = await User.findById(decoded.userId)

    if (!user) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      )
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          message: "Account is deactivated",
        },
        { status: 401 },
      )
    }

    // Return user data
    const userData = {
      _id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      language: user.language,
    }

    return NextResponse.json<AuthResponse>({
      success: true,
      message: "Token verified successfully",
      user: userData,
    })
  } catch (error) {
    console.error("Token verification error:", error)
    return NextResponse.json<AuthResponse>(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
