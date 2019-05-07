var mongoose = require("mongoose");

//Schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    author: {
        id: {type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: "String"
    },
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
        }
    ]
});
//Export Campground model back to app.js
module.exports = mongoose.model("Campground", campgroundSchema);
