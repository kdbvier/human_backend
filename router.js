const express = require("express");
const userController = require("./src/controllers/userController");
const saleHistoryController = require("./src/controllers/saleHistoryController");
const router = express.Router();

//============================//
//        User Info           //
//============================//

router.get("/get_user_info", userController.getUserInfo);
router.post("/edit_user_info", userController.editUserInfo);
router.post("/register_user_info", userController.registerUserInfo);

//============================//
//        Sale History        //
//============================//

router.post(
  "/sale_history/put_sale_history",
  saleHistoryController.putSaleHistory
);
module.exports = router;
