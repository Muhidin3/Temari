import mongoose, { Model, Types } from "mongoose";
interface IUser {
    _id:Types.ObjectId;
    name:string;
    email:string;
    password?:string
}
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

interface Icourse{
    _id?:Types.ObjectId;
    title:String;
    titleAm:String;
    instructor:Types.ObjectId;
    rating:Number;
    students:Number;
    lectures:Number;
    price:Number;
    originalPrice:Number;
    image:String;
    category:String;
    level:String;
    isNew:Boolean;
    description:String;
    descriptionAm:String;
    createdAt:Date
}

const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    titleAm:{
        type:String,
    },
    instructor:{
        type:Types.ObjectId,
        required:true
    },
    rating:Number,
    students:Number,
    lectures:Number,
    price:{type:Number,required:true},
    originalPrice:Number,
    image:String,
    category:{type:String,required:true},
    level:{type:String,required:true},
    isNew:Boolean,
    description:{type:String,required:true},
    descriptionAm:String,
    createdAt:Date
})

export const User:Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User',userSchema)
export const Course:Model<Icourse> = mongoose.models.Course || mongoose.model<Icourse>('Course',courseSchema)