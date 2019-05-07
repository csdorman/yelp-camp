var express         = require("express");
var app             = express();
var bodyParser      = require("body-parser");
var mongoose        = require("mongoose");
var flash           = require("connect-flash");    
var passport        = require("passport");
var LocalStrategy   = require("passport-local");
var methodOverride  = require("method-override");
//Campground Schema module
var Campground      = require("./models/campground");
var Comment         = require("./models/comment");
var User            = require("./models/user");

var seedDB          = require("./seeds"); 

//Variables for routes
var campgroundRoutes    = require("./routes/campgrounds");
var commentRoutes       = require("./routes/comments");
var indexRoutes         = require("./routes/index");

//seedDB(); //Seeding the DB with data
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "This secret will never be cracked!!!!!!!",
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Pass logged-in user (or undefined) info
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started");
});