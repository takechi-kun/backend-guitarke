const connection = require("../../DatabaseConnection/db");

const deleteSong_Admin = (req, res, next) => {
  const { song_id } = req.params;
  // query("DELETE from songs WHERE song_id = ?", song_id)
  connection
    .query("delete songs, playlist from songs left join playlist on songs.song_id = playlist.song_id where songs.song_id = ?", song_id)
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

module.exports.deleteSong_Admin = deleteSong_Admin;
   