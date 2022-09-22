const express = require("express");
const userController = require("./src/controllers/userController");
const router = express.Router();

//============================//
//        User Info           //
//============================//

router.get("/get_user_info", userController.getUserInfo);
router.post("/edit_user_info", userController.editUserInfo);
router.post("/register_user_info", userController.registerUserInfo);
module.exports = router;
