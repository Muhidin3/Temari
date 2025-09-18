import { authMiddleware } from "@/lib/auth"
import Course from "@/models/Course"
import Section from "@/models/Section"
import { AuthenticatedRequest } from "@/types/database"
import { NextRequest, NextResponse } from "next/server"

export  const GET = async (req:NextRequest ,{params}:{params:{id:string}})=>{
    return authMiddleware()(async (req:AuthenticatedRequest)=>{
        try {
            const {id} = await params
            const sections = await Section.find({course:id})

            return NextResponse.json({message:'sucess',sections})
        } catch (error:any) {
            return NextResponse.json({message:'server Error',error:error.message},{status:500})
        }
    })(req)
}

export  const POST = async (req:NextRequest ,{params}:{params:{id:string}})=>{
    return authMiddleware()(async (req:AuthenticatedRequest)=>{
        try {

            const body = await req.json()
            const {id} = await params
            const section = await Section.create({...body,course:id})
            // const course = await Course.findById(id)
            await Course.findByIdAndUpdate(id,{
                $push:{
                    sections:section._id
                }
            })
                        
            return NextResponse.json({message:'sucess',section})
        } catch (error:any) {
            return NextResponse.json({message:'server Error',error:error.message},{status:500})
        }
    })(req)
}

export  const DELETE = async (req:NextRequest ,{params}:{params:{id:string}})=>{
    return authMiddleware()(async (req:AuthenticatedRequest)=>{
        try {

            const body = await req.json()
            const {id} = await params
            const section = await Section.findByIdAndDelete(body._id)
            await Course.findByIdAndUpdate(id,{
                $pull:{
                    sections:section._id
                }
            })
                        
            return NextResponse.json({message:'sucessfully deleted',section})
        } catch (error:any) {
            return NextResponse.json({message:'server Error',error:error.message},{status:500})
        }
    })(req)
}


