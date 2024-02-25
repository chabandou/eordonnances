import mongoose from "mongoose";

export async function connectToMongoDB() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
}