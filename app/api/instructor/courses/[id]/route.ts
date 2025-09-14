import { authMiddleware } from "@/lib/auth";
import Course from "@/models/Course";
import { AuthenticatedRequest } from "@/types/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest,{params}:{params:{id:string}})=>{
    return authMiddleware()(async(req:AuthenticatedRequest)=>{
        try {
            const {id} = await params
            const course = await Course.findOne({_id:id,instructor:req.user?.userId}).populate('category')
            return NextResponse.json({message:'sucess',course})
        } catch (error) {
            return NextResponse.json({message:'failed',error},{status:500})           
        }
    })(req)
}


export const PUT = async(req:NextRequest,{params}:{params:{id:string}})=>{
    return authMiddleware()(async(req:AuthenticatedRequest)=>{
        try {
            const {id} = await params
            const body = await req.json()

            const {
                title,
                titleAm,
                description,
                descriptionAm,
                shortDescription,
                shortDescriptionAm,
                category,
                subcategory,
                level,
                language,
                price,
                discountPrice,
                thumbnail,
                previewVideo,
                tags,
                requirements,
                whatYouWillLearn,
                targetAudience,
            } = body
    
    const { searchParams } = new URL(req.url)
    const publish = searchParams.get('publish') || false

    
    if (publish) {
      // Validation
      if (!title || !description || !shortDescription || !category || !level || price === undefined || !thumbnail) {
        return NextResponse.json({ success: false, message: "Required fields are missing" }, { status: 400 })
      }
      
      if (price < 0) {
        return NextResponse.json({ success: false, message: "Price cannot be negative" }, { status: 400 })
      }
      
      if (discountPrice !== undefined && discountPrice < 0) {
        return NextResponse.json({ success: false, message: "Discount price cannot be negative" }, { status: 400 })
      }
      
      if (discountPrice !== undefined && discountPrice >= price) {
        return NextResponse.json(
          { success: false, message: "Discount price must be less than original price" },
          { status: 400 },
        )
      }
    }
            body.subcategory = null
            const course = await Course.findByIdAndUpdate(id,body)
            .populate('category')
            return NextResponse.json({
              message:'sucess',
              course
            })
        } catch (error:any) {
            return NextResponse.json({error:error.message},{status:500})           
        }
    })(req)
}

