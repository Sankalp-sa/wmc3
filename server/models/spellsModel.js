import mongoose from "mongoose";

const spellSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        audio:{
            data: Buffer,
            contentType: String
        },
        image_url: { type: String, required: true },
        category: { type: String, required: true },
    }
);

const spellsModel = mongoose.model("spells", spellSchema);

export default spellsModel;
