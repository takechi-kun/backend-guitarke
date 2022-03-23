const connection = require("../DatabaseConnection/db");

const getSongDetail = (req, res, next) => {
    const songname = req.params.songname
    const artist = req.params.artist
    connection.query(`SELECT * FROM songs WHERE songname = ? AND artist = ?`, [songname,artist])
    .then(([rows]) => {
        return res.send(rows)   
    }).catch((error) => {
        console.log(error)
    })
}

module.exports.getSongDetail = getSongDetail
