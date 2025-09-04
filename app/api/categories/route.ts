import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/connenctDB"
import Category from "@/app/models/Category"
import { AuthenticatedRequest, authMiddleware } from "@/lib/auth"

export async function GET() {
  try {
    await connectDB()

    const categories = await Category.find().sort({ name: 1 })

    return NextResponse.json({ categories })
  } catch (error) {
    console.error("Get categories error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export const POST= authMiddleware()
(async (req: AuthenticatedRequest) =>{
  try {
    await connectDB()

    const categoryData = await req.json()
    const category = await Category.create(categoryData)

    return NextResponse.json(
      {
        message: "Category created successfully",
        category,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create category error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
})
