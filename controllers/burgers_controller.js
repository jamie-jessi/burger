var burger = require("../models/burger.js"); //imports model to use its databae functions
var express = require("express"); //imports express
var router = express.Router();

//routes and respective logic
router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/", function(req, res) {
    burger.create([
        "burger_name"
    ], [
        req.body.burger_name
    ], function() {
        res.redirect("/");
    });
});

router.put("/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update({
        devoured: true
    }, condition, function() {
        res.redirect("/");
    });
});

router.delete("/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    burger.delete(condition, function() {
        res.redirect("/");
    });
});

module.exports = router; //exports route for server.js