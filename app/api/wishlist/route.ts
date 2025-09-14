import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Wishlist from "@/models/Wishlist"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await verifyToken(request)
    if (!user || user.role !== "student") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const wishlist = await Wishlist.findOne({ student: user.userId }).populate({
      path: "courses",
      populate: {
        path: "instructor",
        select: "firstName lastName",
      },
    })

    return NextResponse.json({
      wishlist: wishlist || { courses: [] },
    })
  } catch (error) {
    console.error("Get wishlist error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyToken(request)
    if (!user || user.role !== "student") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const { courseId } = await request.json()

    let wishlist = await Wishlist.findOne({ student: user.userId })

    if (!wishlist) {
      wishlist = await Wishlist.create({
        student: user.userId,
        courses: [courseId],
      })
    } else {
      if (wishlist.courses.includes(courseId)) {
        return NextResponse.json({ error: "Course already in wishlist" }, { status: 400 })
      }
      wishlist.courses.push(courseId)
      await wishlist.save()
    }

    return NextResponse.json({
      message: "Course added to wishlist",
      wishlist,
    })
  } catch (error) {
    console.error("Add to wishlist error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
