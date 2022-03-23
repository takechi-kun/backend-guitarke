const connection = require("../../DatabaseConnection/db");
const jwt = require("jsonwebtoken");
const verifyEmailToken = (req, res) => {
  var { token, user_id } = req.params;
  const { exp } = jwt.decode(token);
  if (Math.floor(Date.now() / 1000) >= exp) {
    res.send({ message: "Link Verify is Expired." });
    connection.execute(
      `DELETE FROM users WHERE user_id = ? and verify = "false"`,
      [user_id]
    );
  } else {
    connection
      .execute(`SELECT verify FROM users WHERE user_id = ?`, [user_id])
      .then(([rows]) => {
        if (rows.length >= 1) {
          if (rows[0].verify === "true") {
            res.send({ message: "Your Verify is Active!" });
          } else {
            res.send({ message: "Success!" });
            connection.execute(
              `UPDATE users SET verify = "true" WHERE  user_id = ?`,
              [user_id]
            );
          }
        } else {
          res.send({ message: "User Not Found" });
        }
      });
  }
};
module.exports.verifyEmailToken = verifyEmailToken;
