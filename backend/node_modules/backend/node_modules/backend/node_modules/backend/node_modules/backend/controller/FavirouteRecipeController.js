const favouriteRecipe = require("../model/FavouriteRecipe");


const addRecipe = async (req, res, next) => {

    const { image, name } = req.body;

    const favouriteRecipe = new favouriteRecipe({
        image,
        name
    });

    try {
        //save document in database
        await favouriteRecipe.save();
    } catch (err) {
        console.log(err);
    }

    return res.status(201).json({ message: "Successfully added !!", favouriteRecipe })

}