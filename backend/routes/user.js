import express from "express"
import { isAuthenticated, isSignIn } from "../controllers/auth.js";
import { checkUserName, getUser, getUserById, getUserByusername } from "../controllers/user.js";
const router = express.Router();




router.param("userId",getUserById);
router.param("username",getUserByusername)



router.get("/user/:userId",isSignIn,isAuthenticated,getUser)
router.get("/checkusername",checkUserName)
router.get("/user/username/:username",getUser)



export default router;

