const connection = require("../../DatabaseConnection/db");

const getAllSong_Admin = (req, res, next) => {
  connection
    .query("SELECT * FROM songs")
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

module.exports.getAllSong_Admin = getAllSong_Admin;
