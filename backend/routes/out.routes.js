const express = require("express");
const router = express.Router();


const controller = require("../controllers/out.controller");


//Register user
router.post("/register", controller.register);

//Login user
router.post("/login", controller.login);


module.exports = router;



