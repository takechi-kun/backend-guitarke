const connection = require("../DatabaseConnection/db");

const updateYourTempo = (req, res, next) => {
  var { username, your_tempo, song_id } = req.body;
  
  if (!your_tempo) {
    return res.status(400).json({
      error: true,
      message: "Field is required.",
    });
  }

  connection
    .execute(
      "UPDATE playlist SET your_tempo = ? WHERE username = ? AND song_id = ?",
      [your_tempo, username, song_id]
    )
    .then(([rows]) => {
      return res.send(rows);
    })
    .catch((error) => {
      console.log(error); 
    });
};

module.exports.updateYourTempo = updateYourTempo;


const checkYourTempo = (req, res, next) => {
  var { username, song_id } = req.params;
  connection
    .query(
      "SELECT * FROM playlist WHERE username = ? AND song_id = ?",
      [username, song_id]
    )
    .then(([rows]) => {
      return res.send(rows);
    })
    .catch((error) => {
      console.log(error);
      return res.send("null");
    });
};

module.exports.checkYourTempo = checkYourTempo;
