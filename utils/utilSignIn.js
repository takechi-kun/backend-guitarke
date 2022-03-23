require("dotenv").config();
var jwt = require("jsonwebtoken");

function generateToken(user) {
  if (!user) return null;
  var u = {
    user_id: user.user_id,
    username: user.username,
    email: user.email,
    roles: user.roles
  };
  return jwt.sign(u, process.env.JWT_SECRET, {
    //expiresIn: 60 * 2 // 2 minutes
    expiresIn: 60 * 60 * 8, //  8 hours 
  });
}


module.exports = {
  generateToken,
};


