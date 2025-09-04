import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/connenctDB"
import Notification from "@/app/models/Notification"
import { AuthenticatedRequest, authMiddleware, verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  return authMiddleware()(async(req:AuthenticatedRequest)=>{ 
    try {
      const user = req.user
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
  
      await connectDB()
  
      const { searchParams } = new URL(request.url)
      const page = Number.parseInt(searchParams.get("page") || "1")
      const limit = Number.parseInt(searchParams.get("limit") || "20")
      const unreadOnly = searchParams.get("unread") === "true"
      const skip = (page - 1) * limit
  
      const query: any = { user: user.userId }
      if (unreadOnly) query.isRead = false
  
      const notifications = await Notification.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit)
  
      const total = await Notification.countDocuments(query)
      const unreadCount = await Notification.countDocuments({
        user: user.userId,
        isRead: false,
      })
  
      return NextResponse.json({
        notifications,
        unreadCount,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      })
    } catch (error) {
      console.error("Get notifications error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
    
  })(request)

}

export async function PUT(request: NextRequest) {
  return authMiddleware()(async(req:AuthenticatedRequest)=>{ 
    
    try {
      const user = req.user
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
  
      await connectDB()
  
      const { notificationIds } = await request.json()
  
      await Notification.updateMany(
        {
          _id: { $in: notificationIds },
          user: user.userId,
        },
        { isRead: true },
      )
  
      return NextResponse.json({
        message: "Notifications marked as read",
      })
    } catch (error) {
      console.error("Update notifications error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
  })(request)

}
