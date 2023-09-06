import Prompt from "@models/prompt"
import { connectDB } from "@utils/db"

export const GET = async (req, {params}) => {
    try {
        await connectDB()
        const posts = await Prompt.find({creator:params.id}).populate('creator')
        return new Response(JSON.stringify(posts), { status: 201 })
    } catch (error) {
        return new Response(error.message, { status: 500 })
    }
}