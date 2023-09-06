const { mongoose, mongo, Schema } = require("mongoose");
const PromptSchema = new mongoose.Schema({
    creator:{
        type:Schema.Types.ObjectId,
        ref:"users",
        required:[true,'creator is required']
    },
    prompt:{
        type:String,
        required:[true,'prompt is required']
    },
    tag:{
        type:String,
        required:[true,'tag is required']
    }
}) 
const Prompt = mongoose.models.prompts || mongoose.model('prompts',PromptSchema)
module.exports = Prompt;  
