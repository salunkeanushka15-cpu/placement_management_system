const express = require("express"); //give me the express toolbox(loads the express library)
const router = express.Router(); //creates a mini express app called router(router=a sub-app for auth related routes)

const authController = require("../controllers/auth.controller"); //importing another file(contains login and  register)

const verifyToken = require("../middleware/auth.middleware"); //importing the middleware function for verifying token (to protect routes that require authentication)
const checkRole = require("../middleware/role.middleware"); //importing the middleware factory function for checking user roles (to protect routes that require specific roles)

router.post("/register", authController.register); //when someone send request to /register--> run the register() function from authcontroller.js
router.post("/login", authController.login); //when someone send request to /login--> run the login() function from authcontroller.js

//this is a test protected route
router.get(
    "/profile",
    verifyToken,
    (req,res)=>{
        res.status(200).json({
            message:"Protected Route accessed",
            user:req.user
        })
    }

);

router.get(
    "/student-dashboard",
    verifyToken,
    checkRole("student"),
    (req,res)=>{
        res.status(200).json({
            message:"Welcome Student",
            user:req.user
        });
    }
);

router.get(
    "/tpo-dashboard",
    verifyToken,
    checkRole("TPO"),
    (req,res)=>{
        res.status(200).json({
            message:"Welcome TPO",
            user:req.user
        });
    }
);

module.exports = router; //allows other files to use this router.

//this file just tells the express....which function should handle which url...




