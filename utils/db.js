import mongoose from "mongoose";
export async function connectDB() {
    mongoose.set('strictQuery', true)
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    } catch (error) {
        console.log(error)
    }

}