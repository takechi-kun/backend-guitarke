const bcrypt = require("bcrypt");
const connection = require("../../DatabaseConnection/db");
const nodeMailerAndToken =require("./nodeMailerAndToken")
const createRandomId = require("./createRandomId")


const SignUpController = (req, res) => {
  var { email, username, password, confirmpassword } = req.body;
  var check_valid_mail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var mediumRegex = new RegExp(
    "^(?=.{8,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$",
    "g"
  );
  if (
    email === "" ||
    username === "" ||
    password === "" ||
    confirmpassword === ""
  ) {
    return res.status(400).json({
      error: true,
      message: "Field is required.",
    });
  }
  if (!check_valid_mail.test(email)) {
    return res.status(401).json({
      error: true,
      message: "Invalid Email!",
    });
  }
  if (username.length < 5) {
    return res.status(401).json({
      error: true,
      message: "Username should more than 5!",
    });
  }
  if (!mediumRegex.test(password)) {
    return res.status(401).json({
      error: true,
      message:
        "Password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character ",
    });
  }
  if (password.length > 15) {
    return res.status(401).json({
      error: true,
      message: "Password should less than 15",
    });
  }
  if (password !== confirmpassword) {
    return res.status(401).json({
      error: true,
      message: "Password Not Match",
    });
  }
  connection
    .execute("SELECT * FROM users WHERE email = ? or username = ?", [
      email,
      username,
    ])
    .then(([rows]) => {
      if (rows.length >= 1) {
        return res.status(401).json({
          error: true,
          message: "Username/Email haved already exist.",
        });
      } else {
        bcrypt
        .hash(password, 10)
        .then((hash) => {
          var user_id = createRandomId.createRandomId(20);
          connection.execute(
              `INSERT INTO users (user_id, username, email, password, verify, roles) VALUES (?,?,?,?,"false", "User")`,
              [user_id, username, email, hash]
            )
            .then(() => {
              nodeMailerAndToken.nodeMailerAndToken(email, username, user_id, res)
            })
            .catch((error) => {
              console.log(error)
              return res.status(500).json({ message: error });
            });
        })
        .catch((error) => {
          console.log(error)
          return res.status(500).json({ message: error });
        });
      }
    });
};

module.exports.SignUpController = SignUpController;



