const mongoose = require("mongoose");

const favirouteRecipeShema = new mongoose.Schema({
    img : {
        type: String,
        required: true,
    },
    name : {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("FavirouteRecipe", favirouteRecipeShema);