import connectDB from "@/lib/connenctDB";
import { User } from "@/Models/Models";
import { NextRequest, NextResponse } from "next/server";

export  async function POST(req:NextRequest){
    await connectDB()
    const data = await req.json()
    try {
        const user = await User.findOne({email:data.email})
        if(!user){
            return NextResponse.json({message:'User Not Found'})
        }
        return NextResponse.json({message:'Success',user})
    } catch (error) {
        return NextResponse.json({message:'Server Error',error})
    }
}