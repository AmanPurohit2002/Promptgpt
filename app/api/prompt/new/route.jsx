import connectedToDb from "@utils/db";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
    const {prompt,userId,tag}=await req.json();

    try {
        await connectedToDb();

        const newPrompt = new Prompt({ creator: userId, prompt, tag });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt),{status:200})
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
};
