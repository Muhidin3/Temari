import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/connenctDB"
import Message from "@/models/Message"
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
      const skip = (page - 1) * limit
  
      const messages = await Message.find({
        $or: [{ sender: user.userId }, { recipient: user.userId }],
      })
        .populate("sender", "firstName lastName avatar")
        .populate("recipient", "firstName lastName avatar")
        .populate("course", "title")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
  
      const total = await Message.countDocuments({
        $or: [{ sender: user.userId }, { recipient: user.userId }],
      })
  
      return NextResponse.json({
        messages,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      })
    } catch (error) {
      console.error("Get messages error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    
    }
  })(request)

  }

export async function POST(request: NextRequest) {
  return authMiddleware()(async(req:AuthenticatedRequest)=>{ 
    
      try {
        const user = req.user
        if (!user) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
    
        await connectDB()
    
        const { recipient, subject, content, course } = await request.json()
    
        const message = await Message.create({
          sender: user.userId,
          recipient,
          subject,
          content,
          course,
        })
    
        return NextResponse.json(
          {
            message: "Message sent successfully",
            data: message,
          },
          { status: 201 },
        )
      } catch (error) {
        console.error("Send message error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
      }
    
  })(request)
}
