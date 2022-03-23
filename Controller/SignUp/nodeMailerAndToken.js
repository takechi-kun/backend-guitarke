const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const JWT_GUITARKE = "GUITARKE64";
const nodeMailerAndToken = (gmail, username, user_id, response) => {
  var token = jwt.sign({ user_id }, JWT_GUITARKE, {
    expiresIn: 60 * 15 // expires in 15 minute
  });

  var confirm = `http://localhost:3000/verify_email/confirm/${user_id}/${token}`;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "guitarke.project@gmail.com",
      pass: "pfurzvjyyjvntipy",
    },
  });

  const mailOptions = {
    from: "GuitarKe <guitarke.project@gmail.com>",
    to: gmail,
    subject: "Confirm Your Account.",
    html: `
    <h2>Hello ${username} </h2><br>
    <p>Please confirm your account. Your account is expiring in 15 minutes</p> 
    <p>If you don't confirm account, Your account is delete!</p> 
    <br>
    <p>Link Verify is <a href="${confirm}">here</a></p>
    <br>
    <p>GuitarKe</p>
    `,
  };

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      console.log(error)
      return response.status(500).json({ message: error });
    } else {
      return response.status(201).json({ message: "success" });
    }
  });
  response.status(200).send({ auth: true, token: token });
};

module.exports.nodeMailerAndToken = nodeMailerAndToken;
