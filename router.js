const express = require("express");
const userController = require("./src/controllers/userController");
const saleHistoryController = require("./src/controllers/saleHistoryController");
const nftController = require("./src/controllers/nftController");
const followController = require("./src/controllers/followingListController");
const router = express.Router();

//============================//
//        User Info           //
//============================//

router.get("/get_all_users", userController.getUsers);
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
router.get("/sale_history/top_seller", saleHistoryController.getTopSeller);
router.get(
  "/sale_history/top_collection",
  saleHistoryController.getTopCollection
);
router.get(
  "/sale_history/get_sale_history",
  saleHistoryController.getSaleHistory
);
router.get(
  "/sale_history/get_historical_data",
  saleHistoryController.getHistoricalData
);

//============================//
//         Nft History        //
//============================//

router.post("/nfts/register_nft", nftController.registerNft);
router.get("/nfts/get_new_nft", nftController.getNewNfts);

//============================//
//         Follow List        //
//============================//

router.post("/follow/register_follow", followController.registerFollow);
router.get("/follow/get_follow_info", followController.getFollowInfo);

module.exports = router;
