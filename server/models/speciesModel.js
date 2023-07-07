import mongoose from "mongoose";

const speciesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true,
    }
})

const Species = mongoose.model("Species", speciesSchema);

export default Species;