const db = require("../config/db_connection");

const registerNft = async (req, res, next) => {
  try {
    const { token_id, collection, transaction_hash } = req.body;
    db.query(
      `INSERT INTO nfts (token_id, collection, transaction_hash) VALUES ("${token_id}","${collection}","${transaction_hash}")`,
      async (err, result) => {
        if (err) return next(err);
        return res.send({ msg: "Successfully Registered" });
      }
    );
  } catch (err) {
    return next(err);
  }
};

const getNewNfts = async (req, res, next) => {
  try {
    db.query(`SELECT * FROM nfts ORDER BY time DESC LIMIT 5`, (err, result) => {
      if (err) return next(err);
      return res.send(result);
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = { registerNft, getNewNfts };
