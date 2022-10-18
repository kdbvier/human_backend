const db = require("../config/db_connection");
const registerFollow = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    db.query(
      `SELECT * FROM follow_list WHERE from_address = "${from}" and to_address="${to}"`,
      async (err, result) => {
        if (err) return next(err);
        if (result.length) {
          db.query(
            `DELETE FROM follow_list WHERE from_address = "${from}" and to_address="${to}"`,
            async (_err, _result) => {
              if (_err) return next(_err);
              return res.send({ msg: "Success" });
            }
          );
        } else {
          db.query(
            `INSERT INTO follow_list (from_address, to_address) VALUES ("${from}","${to}")`,
            async (_err, _result) => {
              if (_err) return next(_err);
              return res.send({ msg: "Successfully Registered" });
            }
          );
        }
      }
    );
  } catch (err) {
    return next(err);
  }
};

const getFollowInfo = async (req, res, next) => {
  try {
    const { address } = req.query;
    const queryPromise1 = () => {
      return new Promise((resolve, reject) => {
        db.query(
          `SELECT to_address FROM follow_list WHERE from_address="${address}"`,
          (err, result) => {
            if (err) return reject(err);
            return resolve(result);
          }
        );
      });
    };
    const queryPromise2 = () => {
      return new Promise((resolve, reject) => {
        db.query(
          `SELECT from_address FROM follow_list WHERE to_address="${address}"`,
          (err, result) => {
            if (err) return reject(err);
            return resolve(result);
          }
        );
      });
    };
    const [from, to] = await Promise.all([queryPromise1(), queryPromise2()]);
    return res.send({ from: from, to: to });
  } catch (err) {
    return next(err);
  }
};

module.exports = { registerFollow, getFollowInfo };
