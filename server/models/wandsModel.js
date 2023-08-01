import mongoose from "mongoose";

// Wand Schema
const wandSchema = new mongoose.Schema(
    {
        owner: { type: String, required: true },
        description: { type: String, required: true },
        image_url: { type: String },
        wandImage:{
            data: Buffer,
            contentType: String
        },
        wood: { type: mongoose.Schema.Types.ObjectId, ref: "wood", required: true },
        core: { type: mongoose.Schema.Types.ObjectId, ref: "core", required: true },
        length: { type: String, required: true },
    }
);

const wandsModel = mongoose.model("wands", wandSchema);

// Wood Schema
const woodSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        binomialName: { type: String, required: true },
        image_url: { type: String },
    }
);

const woodModel = mongoose.model("wood", woodSchema);

// Core Schema
const coreSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        image_url: { type: String },
    }
);

const coreModel = mongoose.model("core", coreSchema);

export { wandsModel, woodModel, coreModel };