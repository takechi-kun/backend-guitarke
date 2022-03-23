const connection = require("../../DatabaseConnection/db");

const countPlayListSong_Users= (req, res, next) => {
    const username = req.params.username
    connection
    .query("SELECT COUNT(song_id) as countsong FROM playlist where username = ?", username)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((error) => {
      return res.status(500).json({
        error: true,
        message: error,
      });
    });
}

module.exports.countPlayListSong_Users = countPlayListSong_Users


const getAllSongPlayList_Users = (req, res, next) => {
    const username = req.params.username
    //connection.query("SELECT * FROM playlist where username = ?", username)
    connection.query("SELECT songs.songname, songs.artist, songs.song_id FROM songs INNER JOIN playlist ON songs.song_id = playlist.song_id where playlist.username = ?;", username)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((error) => {
      return res.status(500).json({
        error: true,
        message: error,
      });
    });
}

module.exports.getAllSongPlayList_Users = getAllSongPlayList_Users

