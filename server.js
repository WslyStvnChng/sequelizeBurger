var express = require("express");
var bodyParser = require("body-parser");

var db = require("./models");

var PORT = process.env.PORT || 8000;
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./controllers/burgersController.js")(app)

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("Listening on port:%s", PORT);
  });
})

