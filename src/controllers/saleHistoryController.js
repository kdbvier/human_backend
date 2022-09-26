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

const getTopSeller = async (req, res, next) => {
  try {
    const { days } = req.query;
    const nowTime = new Date(Date.now() - 86400000 * Number(days))
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    db.query(
      `SELECT *,SUM(amount) FROM selling_history WHERE time>("${nowTime}") GROUP BY from_a ORDER BY SUM(amount) DESC LIMIT 10`,
      async (err, result) => {
        if (err) return next(err);
        return res.send(result);
      }
    );
  } catch (err) {
    return next(err);
  }
};

const getTopCollection = async (req, res, next) => {
  try {
    db.query(
      `SELECT *,SUM(amount) FROM selling_history GROUP BY collection ORDER BY SUM(amount) DESC LIMIT 4`,
      (err, result) => {
        if (err) return next(err);
        return res.send(result);
      }
    );
  } catch (err) {
    return next(err);
  }
};

module.exports = { putSaleHistory, getTopSeller, getTopCollection };
