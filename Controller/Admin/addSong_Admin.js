const connection = require("../../DatabaseConnection/db");
const createRandomSongId = require("./createRandomSongId");

const addSong_Admin = (req, res, next) => {
  var { songname, artist, tempo, capo, tuningguitar, time_signature, lyric } = req.body;
  if (songname === "" || artist === "" || tempo === "" || lyric === "") {
    return res.status(400).json({
      error: true,
      message: "Field is required.",
    });
  }
  if (capo === "" || tuningguitar === "" || time_signature === "") {
    return res.status(400).json({
      error: true,
      message: "Please Select Capo / Tuning Guitar / Time Signature",
    });
  }

  if (parseInt(tempo) < 20) {
    return res.status(400).json({
      error: true,
      message: "Tempo should more than 20 Bpm!",
    });
  }

  if (parseInt(tempo) > 200) {
    return res.status(400).json({
      error: true,
      message: "Tempo should less than 200 Bpm",
    });
  }
  connection
    .execute("SELECT * FROM songs WHERE songname = ? and artist = ?", [
      songname,
      artist,
    ])
    .then(([rows]) => {
      if (rows.length >= 1) {
        return res.status(401).json({
          error: true,
          message: "This song already exists",
        });
      } else {
        var song_id = createRandomSongId.createRandomSongId(10);
        connection
          .execute(
            `INSERT INTO songs (song_id, songname, artist, tempo, capo, tuning_guitar, time_signature, lyric) VALUES (?,?,?,?,?,?,?,?)`,
            [
              song_id,
              songname,
              artist,
              tempo,
              capo,
              tuningguitar,
              time_signature,
              lyric,
            ]
          )
          .then(() => {
            res.status(201).json({
              message: "Add Success",
            });
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json({
              error: true,
              message: error,
            });
          });
      }
    });
};

module.exports.addSong_Admin = addSong_Admin;
