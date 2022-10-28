const db = require("../config/db_connection");

const putRecentViewNft = async (req, res, next) => {
  try {
    const { tokenId, collection, address } = req.body;
    if (!tokenId || !collection || !address)
      return next(new Error("validation error"));
    db.query(
      `INSERT INTO recent_view 
        (token_id, collection, address) 
      VALUES 
        ("${tokenId}","${collection}","${address}") 
      ON DUPLICATE KEY UPDATE  
        comment = "${new Date().toString()}";`,
      async (err, result) => {
        if (err) return next(err);
        return res.send({ msg: "Successfully Registered" });
      }
    );
  } catch (err) {
    return next(err);
  }
};

const getRecentViews = async (req, res, next) => {
  const { address } = req.query;
  if (!address) return next(new Error("please input user address!"));
  db.query(
    `SELECT * FROM recent_view WHERE address = "${address}" ORDER BY time DESC LIMIT 5`,
    (err, result) => {
      if (err) return next(err);
      return res.send(result);
    }
  );
};

module.exports = { putRecentViewNft, getRecentViews };
