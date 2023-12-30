import connectedToDb from "@utils/db";
import Prompt from "@models/prompt";

// get a single post
export const GET=async(req,{params})=>{
    try {
        await connectedToDb();

        const prompt=await Prompt.findById(params.id).populate('creator');

        if(!prompt){
            return new Response("Prompt not found",{status:404})
        }

        return new Response(JSON.stringify(prompt),{status:200})
    } catch (error) {
        return new Response("Failed to fecth a prompt",{status:500})
    }
}


// patch (update a single post)

export const PATCH=async (req,{params})=>{
    const {prompt,tag}=await req.json();

    try {
        await connectedToDb();

        const existingPrompt=await Prompt.findByIdAndUpdate(params.id,
            {
                prompt:prompt,
                tag:tag
            });

        // if(!existingPrompt){
        //     return new Response("Prompt not found",{status:404})
        // }

        // existingPrompt.prompt=prompt;
        // existingPrompt.tag=tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt),{status:200});
    } catch (error) {
        return new Response("failed to update a prompt",{status:500})
    }
}


// delete a single post

export const DELETE=async (req,{params})=>{
    try {
        await connectedToDb();

        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted succesfully",{status:200})


    } catch (error) {
        return new Response("Faied to delete prompt",{status:404})
    }
} 