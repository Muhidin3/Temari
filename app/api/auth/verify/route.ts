import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import User from "@/models/User";

export const POST = async (req:NextRequest)=>{
    const {token} = await req.json()
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "salt") as 
        {firstName: string;email: string;lastName: string;userId?:string,role:string};
    
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
            );
        }
        return NextResponse.json({
            user:{
                name:user.firstName+' '+ user.lastName,
                email:user.email,
                id:user._id
            }
        })
    } catch (error) {
        return NextResponse.json({
            error:'error in verification'
        },{status:401})
        
    }
}