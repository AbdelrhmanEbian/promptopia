import Prompt from "@models/prompt"
import { connectDB } from "@utils/db"

export const GET = async (req, {params}) => {
    try {
        await connectDB()
        const post = await Prompt.findById(params.id).populate('creator')
        if (!post) {
            new Response('no prompt found', { status: 404 })
        }
        return new Response(JSON.stringify(post), { status: 201 })
    } catch (error) {
        return new Response(error.message, { status: 500 })
    }
}
export const PATCH = async (req, {params}) =>{
    const {prompt , tag} = await req.json()
    try {
        await connectDB()
        const post = await Prompt.findByIdAndUpdate(params.id, {prompt, tag}, {new:true})
        if (!post) return new Response('no prompt found', { status: 404 })
        return new Response(post, { status: 200 })
    }catch (error) {
        return new Response('error', { status: 500 })
    }
}
export const DELETE = async (req, {params}) =>{
    try {
        await connectDB()
        const post = await Prompt.findByIdAndDelete(params.id)
        if (!post) return new Response('no prompt found', { status: 404 })
        return new Response('deleted', { status: 200 })
    }catch (error) {
        return new Response('error', { status: 500 })
    }
}
