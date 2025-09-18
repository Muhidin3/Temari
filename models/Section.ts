 import mongoose, { Schema } from "mongoose"
 import type { ILesson } from "@/types/database"
 
 const sectionSchema = new Schema(
   {
     course: {
       type: Schema.Types.ObjectId,
       ref: "Course",
       required: true,
     },
     title: {
       type: String,
       required: true,
       trim: true,
     },
     description: {
       type: String,
     },
     order: {
       type: Number,
       required: true,
     },
     lessons:[{
      type:Schema.Types.ObjectId,
      ref:'Lesson'
     }]
   },
   {
     timestamps: true,
   },
 )
 
 // Indexes
 sectionSchema.index({ course: 1, order: 1 })
 
 // if(mongoose.models.Lesson){
 //   delete mongoose.models.Lesson
 //   console.log('model---------------lesson is -----------------deleted')
 // }
 export default mongoose.models.Section || mongoose.model<ILesson>("Section", sectionSchema)
 