import { authMiddleware } from "@/lib/auth";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";
import { AuthenticatedRequest } from "@/types/database";
import { NextRequest, NextResponse } from "next/server";

export  const GET = async (req:NextRequest,{params}:{params:{id:string}})=>{
    return authMiddleware()(async (req:AuthenticatedRequest)=>{
        try {
            const {id} = await params
            const lessons = await Lesson.find({course:id}).sort({ createdAt: -1 })
            return NextResponse.json({
                message:'sucess',
                lessons
            })
        } catch (error:any) {
            return NextResponse.json({error:error.message})
            
        }
    })(req)
}

export  const POST = async (req:NextRequest,{params}:{params:{id:string}})=>{
    return authMiddleware()(async (req:AuthenticatedRequest)=>{
        try {
            const body = await req.formData()
            const {id} = await params
            const curriculum = JSON.parse(body.get('curriculum') as string)
            const thumbnail = body.get('thumbnail')
            const previewVideo = body.get('previewVideo')

            
            
            curriculum.forEach((section:any,i:number)=>{
                section.lessons.forEach(async (lesson:any,j:number)=>{
                    const a:any = body.get(`file_${i}_${j}`)
                    console.log(a)
                    const lesson_ = {
                        course:id,
                        section:lesson.section,
                        title:lesson.title,
                        description:' ',
                        videoUrl:a?.name || 'nofile',
                        duration:lesson.duration || 0,
                        order:Number(lesson.id) || await Lesson.estimatedDocumentCount({course:id,section:lesson.section})
                    }
                    const l = new Lesson(lesson_)
                    const savedlesson = await l.save()
                })
            })

            
            
            return NextResponse.json({
                message:'sucess',
            })
        } catch (error:any) {
            console.log(error.message)
            return NextResponse.json({error:error.message},{status:500})
            
        }
    })(req)
}

export  const DELETE = async (req:NextRequest,{params}:{params:{id:string}})=>{
    return authMiddleware()(async (req:AuthenticatedRequest)=>{
        try {
            const {id} = await params
            const lessonId = (await req.json()).id
            const lesson = await Lesson.findByIdAndDelete(lessonId)
            return NextResponse.json({
                message:'sucess',
                lesson
            })
        } catch (error:any) {
            return NextResponse.json({error:error.message})
            
        }
    })(req)
}