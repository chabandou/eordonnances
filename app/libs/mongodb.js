import mongoose from "mongoose";

export async function connectToMongoDB(name) {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log(`MongoDB connected from ${name}`);
    } catch (error) {
        console.log(error);
    }
}