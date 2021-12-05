import express from "express"
const router = express.Router();
import { isAuthenticated, isSignIn } from "../controllers/auth.js";
import { getImage, getImageById, uploadImage } from "../controllers/image.js";
import {getUserById } from "../controllers/user.js";


router.param("userId",getUserById);
router.param("imageId",getImageById);

router.post("/image/imageupload/:userId",isSignIn,isAuthenticated,uploadImage)
router.get("/image/:imageId/:userId",isSignIn,isAuthenticated,getImage)


export default router;