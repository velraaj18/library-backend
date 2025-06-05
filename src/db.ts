import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

export const connectDB = async() => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
}