import type { Document, Schema, Types } from "mongoose"

export interface IUser extends Document {
  _id: Types.ObjectId
  firstName: string
  lastName: string
  email: string
  password: string
  enrolledCourses:Schema.Types.ObjectId[]
  role: "student" | "instructor" | "admin"
  avatar?: string
  bio?: string
  phone?: string
  dateOfBirth?: Date
  language: "en" | "am"
  isActive: boolean
  isEmailVerified: boolean
  lastLogin?: Date
  socialLinks?: {
    website?: string
    linkedin?: string
    twitter?: string
    facebook?: string
  }
  preferences?: {
    emailNotifications: boolean
    pushNotifications: boolean
    marketingEmails: boolean
  }
  comparePassword(candidatePassword: string): Promise<boolean>
  createdAt: Date
  updatedAt: Date
}

export interface ICourse extends Document {
  _id: Types.ObjectId
  title: string
  titleAm?: string
  description: string
  descriptionAm?: string
  shortDescription: string
  shortDescriptionAm?: string
  instructor: Types.ObjectId | IUser
  category: Types.ObjectId | ICategory
  subcategory?: Types.ObjectId | ICategory
  level: "beginner" | "intermediate" | "advanced"
  language: "en" | "am" | "both"
  price: number
  sections:string[]
  discountPrice?: number
  currency: string
  thumbnail: string
  previewVideo?: string
  duration: number
  totalLessons: number
  totalStudents: number
  rating: number
  totalRatings: number
  tags: string[]
  requirements: string[]
  whatYouWillLearn: string[]
  targetAudience: string[]
  status: "draft" | "published" | "archived"
  isApproved: boolean
  isFeatured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ICategory extends Document {
  _id: Types.ObjectId
  name: string
  nameAm: string
  description?: string
  descriptionAm?: string
  icon: string
  color: string
  isActive: boolean
  parentCategory?: Types.ObjectId | ICategory
  subcategories: Types.ObjectId[] | ICategory[]
  courseCount: number
  createdAt: Date
  updatedAt: Date
}

export interface ILesson extends Document {
  _id: Types.ObjectId
  title: string
  titleAm?: string
  description?: string
  descriptionAm?: string
  course: Types.ObjectId | ICourse
  section?: String
  order?: number
  type?: "video" | "text" | "quiz" | "assignment"
  content?: string
  contentAm?: string
  videoUrl?: string
  duration?: number
  isFree?: boolean
  isPublished?: boolean
  createdAt?: Date
  updatedAt?: Date
  resources?:any
  isPreview?:boolean
  
}

export interface IEnrollment extends Document {
  _id: Types.ObjectId
  student: Types.ObjectId | IUser
  course: Types.ObjectId | ICourse
  enrolledAt: Date
  progress: number
  completedLessons: Types.ObjectId[]
  lastAccessedLesson?: Types.ObjectId
  certificateIssued: boolean
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface IReview extends Document {
  _id: Types.ObjectId
  student: Types.ObjectId | IUser
  course: Types.ObjectId | ICourse
  rating: number
  comment?: string
  commentAm?: string
  isApproved: boolean
  createdAt: Date
  updatedAt: Date
}

// API Request/Response Types
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  role?: "student" | "instructor"
  language?: "en" | "am"
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: {
    _id: string
    firstName: string
    lastName: string
    email: string
    role: string
    avatar?: string
    language: string
  }
  token?: string
}

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string
    email: string
    role: string
    firstName?: string
    lastName?: string
  }
}

export interface DecodedUser {
  userId: string
  email: string
  role: "student" | "instructor" | "admin"
  iat?: number
  exp?: number
}

export interface TokenPayload {
  userId: string
  email: string
  role: "student" | "instructor" | "admin"
}

declare global {
  var mongoose: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}
