const db = require("../config/db_connection");

const getUserInfo = async (req, res, next) => {
  try {
    const { wallet } = req.query;
    db.query(
      `SELECT * FROM user WHERE wallet = "${wallet}"`,
      async (err, result) => {
        if (err) return next(err);
        if (result.length) {
          return res.send(result);
        } else {
          return res.status(404).send({ msg: "User not registered" });
        }
      }
    );
  } catch (error) {
    return next(error);
  }
};
const registerUserInfo = async (req, res, next) => {
  try {
    const { wallet, hash } = req.body;
    db.query(
      `INSERT INTO user (wallet, hash) VALUES ("${wallet}","${hash}")`,
      async (_err, _result) => {
        if (err) return next(error);
        return res.send(_result);
      }
    );
  } catch (error) {
    return next(error);
  }
};
const editUserInfo = async (req, res, next) => {
  try {
    const { wallet } = req.query;
    const keys = Object.keys(req.body);
    let condition = [];
    keys.forEach((element) => {
      condition.push(`${element} = "${req.body[element]}"`);
    });
    const query = condition.join(",");
    db.query(
      `UPDATE user SET ${query} WHERE wallet="${wallet}"`,
      (err, result) => {
        if (err) return next(err);
        return res.send(result);
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserInfo, editUserInfo, registerUserInfo };
