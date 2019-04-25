const mongoose = require("mongoose");

let schema = mongoose.Schema({
    Name :{
        type: String,
        required: true,
    },
    Catagory:{
        type: String,
        default: "anonymous"
    },
    Watched:{
        type: Boolean,
        default:false
    },
    Series:{
        type:String,
        default:"Solo"
    }
});

let Movies = mongoose.model("Movies",schema);
module.exports = {Movies};