
// const  express= require("express");
import express from "express";
const router =express.Router();

import { signin, signout, signup} from "../controllers/auth.js"
import { body } from "express-validator";



router.post("/signup",
    body("email").isEmail().normalizeEmail().withMessage("Email is not supported"),
    body('password').isLength({min:8}).withMessage("Passwrod should be minimum lenght of 8")
    ,signup)

router.post("/signin",signin)
router.get("/signout",signout)

export default router;