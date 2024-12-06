import express from "express";
import {
  UserRegister,
  Signin,
  Signout,
  tokenRefresh,
} from "../controller/UserController.js";

const router = express.Router();

router.post("/add", UserRegister);
router.post("/", Signin);
router.delete("signout", Signout);
router.post("/Token", tokenRefresh);

export default router;
