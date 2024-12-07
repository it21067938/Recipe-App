import express from "express";
import {
  addRecipe,
  viewfav,
  removeFAV,
} from "../controller/FavirouteRecipeController.js";

const router = express.Router();

router.post("/add", addRecipe);
router.get("/view", viewfav);
router.delete("/remove/:_id", removeFAV);

export default router;
