import React from "react";
import { BrowserRouter ,Routes,Route } from "react-router-dom";
import Navbar from "./core/Navbar.js";
import Profile from "./user/Profile.js";
import SignUp from "./user/Signup";
import SignIn from "./user/SingnIn";

const Router=()=>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<SignIn/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path=":username" element={<Profile/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;


