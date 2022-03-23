
require("dotenv").default
const bcrypt = require("bcrypt");
const utilSignIn = require("../../utils/utilSignIn");
const jwt = require("jsonwebtoken");
const connection = require("../../DatabaseConnection/db");

const SignInController = (req, res) => {
  const { email_username, password } = req.body;
  if (!email_username || !password) {
    return res.status(400).json({
      error: true,
      message: "Field is required.",
    });
  }
  connection
    .execute("SELECT * FROM users WHERE email = ? or username = ?;", [
      email_username,
      email_username,
    ])
    .then(([rows]) => {
      if (rows.length !== 0) {
        if (rows[0].verify === "false") {
          return res.status(401).json({
            message: "Please Verify in Your Mail",
          });
        } else {
          return bcrypt.compare(password, rows[0].password)
          .then((result) => {
            if (!result) {
              return res.status(401).json({
                error: true,
                message: "Email/Username or Password invalid",
              });
            } else {
              const userData = {
                user_id: rows[0].user_id,
                username: rows[0].username,
                email: rows[0].email,
                roles: rows[0].roles
              };
              const token = utilSignIn.generateToken(userData);
              return res.json({ user: userData, token });
            }
          })
          .catch((error) => {
            return res.status(401).json({
              message: "Email/Username or Password invalid",
            });
          });
        }
      } else {
        return res.status(401).json({
          message: "Email/Username doessn't SignUp",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: error,
      });
    });
};

module.exports.SignInController = SignInController;


const verifyToken = (req, res) => {
  const token = req.body.token || req.query.token
  //const token = req.body.token || req.query.token || req.headers["authorization"];
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required!",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, function (error, user) {
    if (error) {
      //console.log(error)
      return res.status(401).json({
        message: "Invalid token or token is expired!",
      });
    }
    const userData = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      roles: user.roles
    }
    return res.json({ user: userData, token });
  });
};
module.exports.verifyToken = verifyToken;



