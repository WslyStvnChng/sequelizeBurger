var db = require("../models");
module.exports = function(app) {
  // get route -> index
  app.get("/", function(req, res) {
    res.redirect("/burgers");
  });
  app.get("/burgers", function(req, res) {
    // express callback response by calling burger.selectAllBurger
    db.Burger.findAll({}).then(function(burgerData) {
      // wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
      res.render("index", {
        burger_data: burgerData
      });
    });
  });
  // post route -> back to index
  app.post("/burgers/create", function(req, res) {
    // takes the request object using it as input for buger.addBurger
    db.Burger.create({
      burger_name: req.body.burger_name
    }).then(function(dbBurger) {
      console.log(dbBurger);
      res.redirect("/");
    });
  });
  // put route -> back to index
  app.put("/burgers/:id", function(req, res) {
    db.Burger.update(
      {
        devoured: true
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(function(dbBurger) {
      console.log(dbBurger);
      res.end();
    });
  });
};
