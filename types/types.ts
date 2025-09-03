import type { Document, Types } from "mongoose"

//  User Types
export interface IUser extends Document {
  _id: Types.ObjectId
  email: string
  password: string
  firstName: string
  lastName: string
  avatar?: string
  role: "student" | "instructor" | "admin"
  isVerified: boolean
  bio?: string
  phone?: string
  dateOfBirth?: Date
  location?: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
    website?: string
  }
  preferences: {
    language: "en" | "am"
    notifications: {
      email: boolean
      push: boolean
      sms: boolean
    }
  }
  createdAt: Date
  updatedAt: Date
}

// Course Types
export interface ICourse extends Document {
  _id: Types.ObjectId
  title: string
  description: string
  shortDescription: string
  instructor: Types.ObjectId
  category: Types.ObjectId
  subcategory?: string
  level: "beginner" | "intermediate" | "advanced"
  language: "en" | "am"
  price: number
  discountPrice?: number
  thumbnail: string
  previewVideo?: string
  duration: number // in minutes
  totalLessons: number
  requirements: string[]
  whatYouWillLearn: string[]
  tags: string[]
  status: "draft" | "published" | "archived"
  isApproved: boolean
  rating: number
  totalRatings: number
  totalStudents: number
  createdAt: Date
  updatedAt: Date
}

// Lesson Types
export interface ILesson extends Document {
  _id: Types.ObjectId
  course: Types.ObjectId
  title: string
  description: string
  videoUrl: string
  duration: number // in minutes
  order: number
  resources: {
    title: string
    url: string
    type: "pdf" | "doc" | "link" | "image"
  }[]
  isPreview: boolean
  createdAt: Date
  updatedAt: Date
}

// Category Types
export interface ICategory extends Document {
  _id: Types.ObjectId
  name: string
  nameAm: string
  description: string
  descriptionAm: string
  icon: string
  color: string
  subcategories: string[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Enrollment Types
export interface IEnrollment extends Document {
  _id: Types.ObjectId
  student: Types.ObjectId
  course: Types.ObjectId
  enrolledAt: Date
  progress: number // percentage
  completedLessons: Types.ObjectId[]
  lastAccessedLesson?: Types.ObjectId
  certificateIssued: boolean
  certificateIssuedAt?: Date
  status: "active" | "completed" | "dropped"
}

// Review Types
export interface IReview extends Document {
  _id: Types.ObjectId
  student: Types.ObjectId
  course: Types.ObjectId
  rating: number
  comment: string
  isApproved: boolean
  createdAt: Date
  updatedAt: Date
}

// Quiz Types
export interface IQuiz extends Document {
  _id: Types.ObjectId
  course: Types.ObjectId
  lesson?: Types.ObjectId
  title: string
  description: string
  questions: {
    question: string
    options: string[]
    correctAnswer: number
    explanation?: string
  }[]
  passingScore: number
  timeLimit?: number // in minutes
  attempts: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Assignment Types
export interface IAssignment extends Document {
  _id: Types.ObjectId
  course: Types.ObjectId
  lesson?: Types.ObjectId
  title: string
  description: string
  instructions: string
  dueDate?: Date
  maxScore: number
  attachments: string[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Submission Types
export interface ISubmission extends Document {
  _id: Types.ObjectId
  assignment: Types.ObjectId
  student: Types.ObjectId
  content: string
  attachments: string[]
  score?: number
  feedback?: string
  status: "submitted" | "graded" | "returned"
  submittedAt: Date
  gradedAt?: Date
}

// Certificate Types
export interface ICertificate extends Document {
  _id: Types.ObjectId
  student: Types.ObjectId
  course: Types.ObjectId
  certificateId: string
  issuedAt: Date
  verificationUrl: string
}

// Payment Types
export interface IPayment extends Document {
  _id: Types.ObjectId
  student: Types.ObjectId
  course: Types.ObjectId
  amount: number
  currency: string
  paymentMethod: "stripe" | "paypal" | "bank_transfer"
  transactionId: string
  status: "pending" | "completed" | "failed" | "refunded"
  createdAt: Date
  updatedAt: Date
}

// Wishlist Types
export interface IWishlist extends Document {
  _id: Types.ObjectId
  student: Types.ObjectId
  courses: Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

// Message Types
export interface IMessage extends Document {
  _id: Types.ObjectId
  sender: Types.ObjectId
  recipient: Types.ObjectId
  course?: Types.ObjectId
  subject: string
  content: string
  isRead: boolean
  attachments: string[]
  createdAt: Date
  updatedAt: Date
}

// Notification Types
export interface INotification extends Document {
  _id: Types.ObjectId
  user: Types.ObjectId
  title: string
  message: string
  type: "course" | "payment" | "system" | "message" | "assignment"
  isRead: boolean
  data?: any
  createdAt: Date
  updatedAt: Date
}

// Analytics Types
export interface ICourseAnalytics extends Document {
  _id: Types.ObjectId
  course: Types.ObjectId
  date: Date
  views: number
  enrollments: number
  completions: number
  revenue: number
  avgRating: number
  totalRatings: number
}

// Payout Types
export interface IPayout extends Document {
  _id: Types.ObjectId
  instructor: Types.ObjectId
  amount: number
  currency: string
  period: {
    start: Date
    end: Date
  }
  status: "pending" | "processing" | "completed" | "failed"
  paymentMethod: string
  transactionId?: string
  createdAt: Date
  updatedAt: Date
}
