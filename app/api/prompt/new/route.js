import Prompt from "@models/prompt"
import { connectDB } from "@utils/db"

export const POST =async (req,res)=>{
    const {userId,prompt,tag} = await req.json()
    try {
        await connectDB()  
        const newPrompt = await Prompt.create({
            creator:userId,
            prompt,
            tag
        })     
        return new Response(JSON.stringify(newPrompt),{status:201})
    } catch (error) {
        return new Response({"msg":error.message},{status:404})
    }
 
}

