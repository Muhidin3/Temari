import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/connenctDB"
import User from "@/app/models/User"
import { AuthenticatedRequest, authMiddleware, verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  return authMiddleware()(async(req:AuthenticatedRequest)=>{ 
    try {
      const user = req.user
      if (!user || user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
  
      await connectDB()
  
      const { searchParams } = new URL(request.url)
      const page = Number.parseInt(searchParams.get("page") || "1")
      const limit = Number.parseInt(searchParams.get("limit") || "20")
      const role = searchParams.get("role")
      const search = searchParams.get("search")
      const skip = (page - 1) * limit
  
      const query: any = {}
      if (role) query.role = role
      if (search) {
        query.$or = [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ]
      }
  
      const users = await User.find(query).select("-password").sort({ createdAt: -1 }).skip(skip).limit(limit)
  
      const total = await User.countDocuments(query)
  
      return NextResponse.json({
        users,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      })
    } catch (error) {
      console.error("Get users error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
      
    })(request)
  
}
