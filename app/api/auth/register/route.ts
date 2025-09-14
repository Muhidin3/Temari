import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import type { ApiResponse } from "@/types/database"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const { firstName, lastName, email, password, role = "student" } = await request.json()

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 },
      )
    }

    if (password.length < 6) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Password must be at least 6 characters long",
        },
        { status: 400 },
      )
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "User with this email already exists",
        },
        { status: 409 },
      )
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      role,
    })

    await user.save()

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    )

    // Remove password from response
    const userResponse = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      language: user.language,
      isEmailVerified: user.isEmailVerified,
    }

    const response = NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Registration successful",
        data: {
          user: userResponse,
          token,
        },
      },
      { status: 201 },
    )

    // Set HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("Registration error:", error)

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
