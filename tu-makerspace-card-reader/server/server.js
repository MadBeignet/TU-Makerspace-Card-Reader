const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('../.cert/key.pem', 'utf8');
var certificate = fs.readFileSync('../.cert/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
db.sequelize.sync();
var corsOptions = {
  origin: ["http://localhost:3000","https://localhost:3000"]
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// set port, listen for requests 
// The backend server still listens for http reqests for dev reasons. 
// shouldnt matter as no sensitive info could be scraped because this is only used for dev purposes.
const HTTPPORT = process.env.PORT || 8080;
const HTTPSPORT= process.env.PORT || 8443;
require("./app/routes/user.routes")(app);
require("./app/routes/machine.routes")(app);
require("./app/routes/logs.routes")(app);

httpServer.listen(HTTPPORT, () => {
  console.log(`Server is running on port ${HTTPPORT}.`);
});

httpsServer.listen(HTTPSPORT, () => {
  console.log(`Server is running on port ${HTTPSPORT}.`);
});