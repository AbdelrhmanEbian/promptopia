import Prompt from "@models/prompt"
import { connectDB } from "@utils/db"
export const GET = async () => {
    try {
        await connectDB()
        const posts = await Prompt.find({}).populate('creator')
        return new Response(JSON.stringify(posts), { status: 201 })
    } catch (error) {
        return new Response(error.message, { status: 500 })
    }
}