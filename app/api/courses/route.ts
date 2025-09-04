import { type NextRequest, NextResponse } from "next/server"
import Course from "@/app/models/Course"
import connectDB from "@/lib/connenctDB"
import { AuthenticatedRequest, authMiddleware, verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const category = searchParams.get("category")
    const level = searchParams.get("level")
    const language = searchParams.get("language")
    const search = searchParams.get("search")
    const sort = searchParams.get("sort") || "createdAt"
    const order = searchParams.get("order") || "desc"
    const status = searchParams.get('status')

    // Build query
    const query: any = { status: "published", isApproved: true }

    if (category) query.category = category
    if (level) query.level = level
    if (language) query.language = language
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ]
    }
    if (status) query.status = status

    // Build sort object
    const sortObj: any = {}
    sortObj[sort] = order === "desc" ? -1 : 1

    const skip = (page - 1) * limit

    const courses = await Course.find(query)
      .populate("instructor", "firstName lastName avatar")
      .populate("category", "name nameAm")
      .sort(sortObj)
      .skip(skip)
      .limit(limit)

    const total = await Course.countDocuments(query)

    return NextResponse.json({
      courses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get courses error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export const POST = authMiddleware()(async (req:AuthenticatedRequest)=> {
  try {
    const user = req.user
    

    await connectDB()

    const courseData = await req.json()
    courseData.instructor = user?.userId

    const course = await Course.create(courseData)

    return NextResponse.json(
      {
        message: "Course created successfully",
        course,
      },
      { status: 201 },
    )
  } catch (error) {
    console.log("Create course error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
})
