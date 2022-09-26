const db = require("../config/db_connection");

const putSaleHistory = async (req, res, next) => {
  try {
    const { from, to, denom, collection, token_id, amount } = req.body;
    db.query(
      `INSERT INTO selling_history (from_a, to_a, denom, amount, collection, token_id) VALUES ("${from}","${to}","${denom}", ${amount}, "${collection}","${token_id}")`,
      async (err, result) => {
        if (err) return next(err);
        return res.send({ msg: "Successfully Registered" });
      }
    );
  } catch (err) {
    return next(err);
  }
};

module.exports = { putSaleHistory };
