const connection = require("../DatabaseConnection/db");

const getSearchSongs = (req, res, next) => {
    const { search }= req.params
    connection.query(`SELECT * FROM songs where songname like '%${search}%' OR artist like '%${search}%' `)
    .then(([rows]) => {
        if(rows.length === 0){
            return res.status(404).send({
                error: true,
                message: "Search Not Found"
              });
        }
        else{
            return res.send(rows)
        }
        
    });
}

module.exports.getSearchSongs = getSearchSongs

