import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "./mongodb"
import User from "@/models/User"
import type { DecodedUser, TokenPayload, AuthenticatedRequest } from "@/types/database"

const SECRET = process.env.JWT_SECRET as string

if (!SECRET) {
  throw new Error("JWT_SECRET environment variable is not set")
}

export function verifyToken(token: string): DecodedUser | null {
  try {
    return jwt.verify(token, SECRET) as DecodedUser
  } catch (error) {
    return null
  }
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" })
}

export const authMiddleware = (requiredRole?: string, allowSelf = false, resource?: string, resourceId?: string) => {
  return (handler: (req: AuthenticatedRequest, context?: any) => Promise<NextResponse>) => {
    return async (req: NextRequest, context?: { params?: { userId?: string; id?: string } }): Promise<NextResponse> => {
      await dbConnect()

      try {
        const authHeader = req.headers.get("authorization")
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return NextResponse.json({ success: false, message: "Authentication token required" }, { status: 401 })
        }

        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token, SECRET) as DecodedUser

        const user = await User.findById(decoded.userId).select("-password")
        if (!user) {
          return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
        }

        if (!user.isActive) {
          return NextResponse.json({ success: false, message: "Account is deactivated" }, { status: 401 })
        }

        // Attach user to request
        const authenticatedReq = req as AuthenticatedRequest
        authenticatedReq.user = {
          userId: decoded.userId,
          email: decoded.email,
          role: decoded.role,
          firstName: user.firstName,
          lastName: user.lastName,
        }

        // Check role if required
        if (requiredRole && user.role !== requiredRole && user.role !== "admin") {
          return NextResponse.json({ success: false, message: "Insufficient permissions" }, { status: 403 })
        }

        // Check self access if required
        if (allowSelf && context?.params?.userId && context.params.userId !== decoded.userId) {
          return NextResponse.json({ success: false, message: "Access denied" }, { status: 403 })
        }

        return await handler(authenticatedReq, context)
      } catch (error) {
        if (error && (error as any).name === "JsonWebTokenError") {
          return NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 401 })
        }
        console.error("Auth middleware error:", error)
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
      }
    }
  }
}
