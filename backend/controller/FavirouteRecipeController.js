import FavouriteRecipe from "../model/FavouriteRecipe.js";

export const addRecipe = async (req, res, next) => {
  const { UID, image, name } = req.body;

  const favouriteRecipe = new FavouriteRecipe({
    UID,
    image,
    name,
  });

  try {
    await favouriteRecipe.save();
  } catch (err) {
    console.log(err);
  }

  return res
    .status(201)
    .json({ message: "Successfully added !!", favouriteRecipe });
};

//view all
export const viewfav = async (req, res, next) => {
  FavouriteRecipe.find()
    .then((FavouriteRecipe) => {
      res.json(FavouriteRecipe);
    })
    .catch((err) => {
      console.log(err);
    });
};

//remove fav
export const removeFAV = async (req, res, next) => {
  let favID = req.params._id;

  try {
    await FavouriteRecipe.findByIdAndDelete(favID);
    res.status(200).send({ status: "Favourite Removed !!" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error removing !!" });
  }
};

