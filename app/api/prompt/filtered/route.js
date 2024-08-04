import Prompt from "@models/prompt"
import { connectDB } from "@utils/db"

export const POST = async (req, res) => {
    const { text } = await req.json()
    console.log('in')
    try {
        let posts;
        if (text.length !== 0) {
            posts = await Prompt.find({
                $or:
                    [
                        { tag: { $regex: text, $options: 'i' } },
                        { prompt: { $regex: text, $options: 'i' } }
                    ,]
            }).populate('creator')
            if (posts.length === 0) {
                return new Response(JSON.stringify({msg:"no prompt found"}), { status: 200 })}   
        }
        return new Response(JSON.stringify(posts), { status: 201 })
    } catch (error) {
        return new Response({ "msg": error.message }, { status: 404 })
    }

}

