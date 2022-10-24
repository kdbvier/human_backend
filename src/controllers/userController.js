const db = require("../config/db_connection");

const getUserInfo = async (req, res, next) => {
  try {
    const { wallet } = req.query;
    db.query(
      `SELECT * FROM user WHERE wallet = "${wallet}"`,
      async (err, result) => {
        if (err) return next(err);
        if (result.length) {
          return res.send(result[0]);
        }
        return res.status(404).send({ msg: "User not registered" });
      }
    );
  } catch (error) {
    return next(error);
  }
};
const getUsers = async (req, res, next) => {
  try {
    db.query(`SELECT * FROM user`, async (err, result) => {
      if (err) return next(err);
      if (result.length) {
        return res.send(result);
      }
      return res.status(404).send({ msg: "No Users" });
    });
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
        if (_err) return next(_err);
        return res.send(_result);
      }
    );
  } catch (error) {
    return next(error);
  }
};
const editUserInfo = async (req, res, next) => {
  try {
    const { hash } = req.query;
    const keys = Object.keys(req.body);
    let condition = [];
    keys.forEach((element) => {
      condition.push(`${element} = "${req.body[element]}"`);
    });
    const query = condition.join(",");
    db.query(
      `UPDATE user SET ${query} WHERE hash="${hash}"`,
      async (err, result) => {
        if (err) return next(err);
        db.query(
          `SELECT * FROM user WHERE hash = "${hash}"`,
          (sErr, sResult) => {
            if (sErr) return next(sErr);
            return res.send(sResult[0]);
          }
        );
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserInfo, getUsers, editUserInfo, registerUserInfo };
