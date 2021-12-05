import express from "express"
import { isAuthenticated, isSignIn } from "../controllers/auth";
import { getUserById } from "../controllers/user";
const router = express.Router();


router.param("userId",getUserById);

router.get("/user/:userId",isSignIn,isAuthenticated,)