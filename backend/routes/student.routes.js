const express = require("express"); //give me the express toolbox(loads the express library)
const router = express.Router(); //creates a mini express app called router(router = a sub-app for student profile related routes)

const studentController = require("../controllers/student.controller"); //importing another file

const verifyToken = require("../middleware/auth.middleware"); //importing the middleware function for verifying token (to protect routes that require authentication)
const checkRole = require("../middleware/role.middleware"); //importing the middleware factory function for checking user roles (to protect routes that require specific roles)

router.post(
    "/profile",
    verifyToken,
    checkRole("student"),
    studentController.createStudentProfile
);

module.exports = router; //allows other file to use this router
