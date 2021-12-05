import express from "express"
import { isAuthenticated, isSignIn } from "../controllers/auth.js";
import { getUser, getUserById } from "../controllers/user.js";
const router = express.Router();


router.param("userId",getUserById);

router.get("/user/:userId",isSignIn,isAuthenticated,getUser)


export default router;