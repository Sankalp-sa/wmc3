import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    spell:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "spells",
    },
    wand:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "wands",
    },
    character: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "characters",
    },
    species : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Species",
    },
    comment: {
        type: String,
        required: true,
    },
}, { timestamps: true });
 
const CommentModel = mongoose.model("Comment", CommentSchema);

export default CommentModel;