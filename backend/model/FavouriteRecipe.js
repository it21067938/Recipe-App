import mongoose from "mongoose";

const favirouteRecipeShema = new mongoose.Schema({
    UID: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
});

export default mongoose.model("FavirouteRecipe", favirouteRecipeShema);
