import connectedToDb from "@utils/db";
import Prompt from "@models/prompt";


export const GET=async( req,{params})=>{
    try {
        await connectedToDb();

        const prompt=await Prompt.find({
            creator:params.id
        }).populate('creator')

        return new Response(JSON.stringify(prompt),{status:200})
    } catch (error) {
        return new Response("Failed to fetch the prompts ",{status:500})
    }
}