
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const Route = require("./Route/route");
app.use(Route);

app.listen(port , () => {
  console.log("Server 5000 is Running");
});
