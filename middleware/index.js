var Campground = require("../models/campground");
var Comment = require("../models/comment");
//Middleware goes in here
var middlewareObj = {};


//Check ownership of campground
middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    //Check if user is logged in
    if(req.isAuthenticated()){
        //Find campground in DB
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            } else {
                //Prevent server crash by replacing id string with equal amt of gibberish
                if(!foundCampground) {
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }
                //If yes, do they own campground?
                //Must use ".equals" method since "===" will not work. "foundCampground." is not string
                if(foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                        //Not owned -> redirect
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("back");
                }
            }
        });
    //Not logged in -> redirect
    } else {
        req.flash("error", "You need to be logged in to do that");
        console.log("You must be logged in to access this feature.");
        res.redirect("back");
    }
};

//Check ownership of comment
middlewareObj.checkCommentOwnership = function(req, res, next) {
    //Check if user is logged in
    if(req.isAuthenticated()){
        //Find campground in DB
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                 //Prevent server crash by replacing id string with equal amt of gibberish
                if(!foundComment) {
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }
                //If yes, do they own comment?
                //Must use ".equals" method since "===" will not work. foundComment. is not string
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    //Not owned -> redirect
                    req.flash("error", "You don't have permission to do that");    
                    res.redirect("back");
                }
            }
        });
    //Not logged in -> redirect
    } else {
        req.flash("error", "You must be logged in to do that");
        console.log("You must be logged in to access this feature.");
        res.redirect("back");
    }
};

//Check if user is logged in
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that.");
    res.redirect("/login");
};

module.exports = middlewareObj;