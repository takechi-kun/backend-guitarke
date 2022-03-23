const connection = require("../../DatabaseConnection/db");

const updateSong_Admin = (req, res, next) => {
  var { songname, artist, tempo, capo, tuningguitar, time_signature ,lyric } = req.body;
  var { song_id } = req.params;
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
    .execute(
      "UPDATE songs SET songname = ?, artist = ?, tempo = ?, capo = ?, tuning_guitar = ? , time_signature = ? , lyric = ? WHERE song_id = ?",
      [songname, artist, tempo, capo, tuningguitar, time_signature, lyric, song_id]
    )
    .then(() => {
      res.status(201).json({
        message: "Update Success",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: true,
        message: error,
      });
    });
};

module.exports.updateSong_Admin = updateSong_Admin;
