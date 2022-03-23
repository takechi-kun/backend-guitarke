const connection = require("../../DatabaseConnection/db");

const getSong_Admin = (req, res, next) => {
  const song_id = req.params.song_id;
  connection
    .query("SELECT * FROM songs where song_id LIKE ?", song_id)
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

module.exports.getSong_Admin = getSong_Admin;
