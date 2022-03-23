const connection = require("../../DatabaseConnection/db");

const getAllUser_Admin = (req, res, next) => {
  connection
    .query("SELECT * FROM users")
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((error) => {
      return res.status(500).json({
        error: true,
        message: error,
      });
    });
};

module.exports.getAllUser_Admin = getAllUser_Admin;
