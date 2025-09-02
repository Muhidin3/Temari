import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URL as string

export default async function connectDB(){
    if (!MONGODB_URI) { 
    throw new Error('MONGODB_URI is not defined');
  }

  if (mongoose.connection.readyState >= 1) {
    console.log('Already connected to MongoDB');
    return mongoose.connection;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Database connected successfully');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', (error as Error).message);
    throw error;
  }

}