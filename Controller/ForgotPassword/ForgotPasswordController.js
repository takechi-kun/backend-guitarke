const bcrypt = require("bcrypt");
const connection = require("../../DatabaseConnection/db");

const ForgotPasswordController = (req, res, next) => {
  const { email_username, new_password, confirmpassword } = req.body;
  var mediumRegex = new RegExp(
    "^(?=.{8,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$",
    "g"
  );
  if (!email_username || !new_password || !confirmpassword) {
    return res.status(400).json({
      error: true,
      message: "Field is required.",
    });
  }

  if (!mediumRegex.test(new_password)) {
    return res.status(401).json({
      error: true,
      message:
        "Password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character ",
    });
  }
  if (new_password.length > 15) {
    return res.status(401).json({
      error: true,
      message: "Password should less than 15",
    });
  }
  if (new_password !== confirmpassword) {
    return res.status(401).json({
      error: true,
      message: "Password Not Match",
    });
  }

  connection
    .execute("SELECT * FROM users WHERE email = ? or username = ?", [email_username, email_username])
    .then(([rows]) => {
      if (rows.length < 1) {
        return res.status(401).json({
          error: true,
          message: "Username/email isn't SignUp",
        });
      } else {
        bcrypt
          .hash(new_password, 10)
          .then((hash) => {
            connection
              .execute(
                "UPDATE users SET password = ? WHERE email = ? or username = ?;",
                [hash, email_username, email_username]
              )
              .then(() => {
                res.status(201).json({
                  message: "Reset Password Success",
                });
              })
              .catch((error) => {
                return res.status(500).json({ message: error });
              });
          })
          .catch((error) => {
            return res.status(500).json({ message: error });
          });
      }
    });
};

module.exports.ForgotPasswordController = ForgotPasswordController;
