import connectDB from "@/lib/connenctDB";
import { User } from "@/Models/Models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    await connectDB()
    
    const data = await req.json()
    try{
        const checkUser = await User.findOne({name:data.name})
        if (checkUser) {
            return NextResponse.json({message:`A User with name ${data.name} exist please use othername `})
        }
        const checkUser2 = await User.findOne({email:data.email})
        if (checkUser2) {
            return NextResponse.json({message:` this email exist please use another`})
        }
        const user = new User(data)
        await user.save()
        return NextResponse.json({message:'sucess',user})
    }
    catch(error){
        return NextResponse.json({message:'Server Error',error},{status:500})
    }
}