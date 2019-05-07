var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data =[
    {
        name: "Cloud's Rest", 
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Car_Camping.jpg/640px-Car_Camping.jpg",
        description: "Bacon ipsum dolor amet pig buffalo kielbasa sausage jerky bacon rump pork loin flank ball tip shoulder pork. Salami turducken leberkas pastrami, pork cow sirloin rump capicola venison frankfurter t-bone. Andouille meatball rump pork chop, prosciutto shankle tongue. Drumstick fatback bresaola meatloaf tenderloin flank porchetta ground round rump landjaeger frankfurter boudin. Ribeye meatball porchetta ball tip bacon spare ribs tail venison tongue leberkas bresaola boudin andouille sausage.",
        author: {
            id: "588c2e092403d111454fff76",
            username: "Meatball"
        }
    },
    {
        name: "Desert  Mesa", 
        image: "https://upload.wikimedia.org/wikipedia/commons/3/39/Tenting_at_Joseph_A._Citta.jpg",
        description: "Bacon ipsum dolor amet pig buffalo kielbasa sausage jerky bacon rump pork loin flank ball tip shoulder pork. Salami turducken leberkas pastrami, pork cow sirloin rump capicola venison frankfurter t-bone. Andouille meatball rump pork chop, prosciutto shankle tongue. Drumstick fatback bresaola meatloaf tenderloin flank porchetta ground round rump landjaeger frankfurter boudin. Ribeye meatball porchetta ball tip bacon spare ribs tail venison tongue leberkas bresaola boudin andouille sausage.",
        author: {
            id: "588c2e092403d111454fff71",
            username: "Baconator"
        }
    },
    {   name: "Mountain Getaway",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Biskeri-_Camping_I_IMG_7238.jpg/640px-Biskeri-_Camping_I_IMG_7238.jpg",
        description: "Idyllic, quiet, and beautiful. No one else should come here.",
        author: {
            id: "5cb06f0e46cec50add61f5d5",
            username: "Colin"
        }
        
    },
    {
        name: "Canyon Floor", 
        image: "https://upload.wikimedia.org/wikipedia/commons/2/21/Camping_at_Head_of_Fionn_Loch_-_geograph.org.uk_-_47709.jpg",
        description: "Bacon ipsum dolor amet pig buffalo kielbasa sausage jerky bacon rump pork loin flank ball tip shoulder pork. Salami turducken leberkas pastrami, pork cow sirloin rump capicola venison frankfurter t-bone. Andouille meatball rump pork chop, prosciutto shankle tongue. Drumstick fatback bresaola meatloaf tenderloin flank porchetta ground round rump landjaeger frankfurter boudin. Ribeye meatball porchetta ball tip bacon spare ribs tail venison tongue leberkas bresaola boudin andouille sausage.",
        author: {
            id: "588c2e092403d111454fff77",
            username: "Turducken"
        }
    }
    ];

function seedDB() {
    //Remove all campgrounds
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
            console.log("ERROR");
        }
        console.log("Removed campgrounds");
        //Add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                    console.log("Seeding ERROR");
                } else {
                    console.log("Campground added successfully");
                    //Add comment to campground
                    Comment.create(
                    {
                        text: "This place is great. But no internet.",
                        author: {
                            id: "588c2e092403d111454fff71",
                            username: "Baconator"
                            }
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                            console.log("ERROR adding comment");
                        } else {
                            //console.log(comment);
                            campground.comments.push(comment._id);
                            campground.save();
                            console.log("Comment created successfully");
                        }
                    });
                }
            });
        });
    });
    
    
    
}

module.exports = seedDB;