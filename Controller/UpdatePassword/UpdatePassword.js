const connection = require("../../DatabaseConnection/db");
const bcrypt = require("bcrypt");
const UpdatePassword = (req, res, next) => {
  const { user_id, current_password, new_password, confirm_newpassword } = req.body;
  const mediumRegex = new RegExp(
    "^(?=.{8,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$",
    "g"
  );

  if (!current_password || !new_password || !confirm_newpassword) {
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
      message: "New Password should less than 15",
    });
  }
  if (new_password !== confirm_newpassword) {
    return res.status(401).json({
      error: true,
      message: "New Password Not Match",
    });
  }

  connection
    .execute("select * from users where user_id = ?", [user_id])
    .then(([rows]) => {
        bcrypt
          .compare(current_password, rows[0].password)
          .then((result) => {
            if (!result) {
              return res.status(401).json({
                error: true,
                message: "Current Password Not Match",
              });
            } else {
              bcrypt.hash(new_password, 10).then((hash) => {
                connection
                  .execute("UPDATE users SET password = ? WHERE user_id = ?", [
                    hash,
                    user_id,
                  ])
                  .then(() => {
                    return res.status(201).json({
                      message: "Update Password Success",
                    });
                  })
                  .catch((error) => {
                    return res.status(500).json({ message: error });
                  });
              });
            }
          })
          .catch((error) => {
            return res.status(501).json({
              error: true,
              message: "error1",
            });
          });
      
    })
    .catch((error) => {
      return res.status(501).json({
        error: true,
        message: "error2",
      });
    });
};

module.exports.UpdatePassword = UpdatePassword;
