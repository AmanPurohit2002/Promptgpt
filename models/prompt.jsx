import { models,model,Schema } from "mongoose";

const promptSchema=new Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    prompt:{
        type:String,
        required:[true,"Prompt is required"]
    },
    tag:{
        type:String,
        require:[true,"tag is required"]

    }

})

const Prompt=models.Prompt || model("Prompt",promptSchema);

export default Prompt;