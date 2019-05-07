var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//===================
//AUTH ROUTES
//===================

//LANDING PAGE
router.get("/", function(req, res){
    res.render("landing");
});

//show registration form
router.get("/register", function(req, res) {
    res.render("register");
});

//handle signup logic
router.post("/register", function(req, res){
    //save username as variable for cleaner code
    var newUser = new User({username: req.body.username});
    //add username and password to db
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            console.log(err);
            res.redirect("register");
        } 
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//SHOW LOGIN FORM
router.get("/login", function(req, res){
    res.render("login");
});

//HANDLE LOGIN LOGIC
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

//LOGOUT ROUTE
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You are now logged out");
    res.redirect("/campgrounds");
});

module.exports = router;