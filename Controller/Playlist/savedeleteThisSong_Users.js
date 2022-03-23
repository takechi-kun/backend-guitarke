const connection = require("../../DatabaseConnection/db");

const saveSong_Users = (req, res, next) => {
  var { username, your_tempo, song_id } = req.body;
  connection
  .execute(
    `INSERT INTO playlist (username, your_tempo, song_id) VALUES (?,?,?)`,
    [username, your_tempo, song_id]
  )
  .then((result) => {
    return res.send(result);
  })
  .catch((error) => {
    return res.status(500).json({ message: error });
  });
};

module.exports.saveSong_Users = saveSong_Users;


const deleteSong_Users = (req, res, next) => {
  const { username, song_id } = req.params;
  connection.query(
      "delete from playlist where username = ? AND song_id = ?",
      [username, song_id]
    )
    .then((result) => {
      return res.send(result)
    })
    .catch((error) => {
      return res.status(500).json({ message: error });
    });
}

module.exports.deleteSong_Users = deleteSong_Users



const checkExistSong_Users = (req, res, next) => {
  const { username, song_id } = req.params ;
  connection
  .execute(
    "SELECT * FROM playlist WHERE username = ? AND song_id = ?",
    [username, song_id]
  )
  .then(([rows]) => {
    if (rows.length >= 1) {
      return res.status(201).json({
        message: "Saved",
      });
    } else {
      return res.status(201).json({
          message: "NotSaved",
        });
    }
  })
  .catch((error) => {
    return res.status(500).json({ message: error });
  });
}

module.exports.checkExistSong_Users = checkExistSong_Users
