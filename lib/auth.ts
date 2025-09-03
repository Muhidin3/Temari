import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import connectDB from "./connenctDB"
import User from "@/models/User"

export interface DecodedUser {
  userId: string
  email: string
  role: "student" | "instructor" | "admin"
  [key:string]:any
}
export interface TokenPayload {
  userId: string
  email: string
  role: "student" | "instructor" | "admin"
}
export interface AuthenticatedRequest extends NextRequest{
  user?:{
    firstName:string
    lastName:string
    email:string
    userId?:string
    role?:string
  }
}
  const SECRET = process.env.JWT_SECRET as string
export  function verifyToken(token:string):DecodedUser|null {
    try {
      return jwt.verify(token,SECRET) as DecodedUser
    } catch (error) {
      return null 
    }
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" })
}

// export async function authmiddleware(req:NextRequest){
//   const token = req.headers.get('authorization')?.replace('Bearer ','')
//   if(!token){
//     return NextResponse.json({error:'No token provided'},{status:401})
//   }
//   const user = verifyToken(token)

//   if(!user){
//     return NextResponse.json({error:'invalid token'},{status:403})
//   }
//   const authreq = req as AuthenticatedRequest
//   authreq.user = user
//   return handler
// }
export const authMiddleware = (
  role?:string,
  self: boolean = false,
  resource?: string,
  resourceId?: string
) => {
  return (handler: (req: AuthenticatedRequest) => Promise<NextResponse>) => {
    return async (
      req: NextRequest,
      context?: { params?: { userId?: string } }
    ): Promise<NextResponse> => {
      await connectDB();

      try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return NextResponse.json(
            { message: "Authentication token required" },
            { status: 401 }
          );
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "salt") as {firstName: string;email: string;lastName: string;userId?:string,role:string};
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
          return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
          );
        }

        // Attach user to request
        const authenticatedReq = req as AuthenticatedRequest;
        authenticatedReq.user = decoded;
        if (role && (user.role !== role )) {
            return NextResponse.json({ error: "Unauthorized for this role" }, { status: 401 })
        }

        return await handler(authenticatedReq);
      } catch (error) {
        if (error && (error as any).name === "JsonWebTokenError") {
          return NextResponse.json(
            { message: "Invalid or expired token" },
            { status: 401 }
          );
        }
        return NextResponse.json(
          { message: "Server error", error: (error as Error).message },
          { status: 500 }
        );
      }
    };
  };
};