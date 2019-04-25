const mongoose = require("mongoose");

let schema = mongoose.Schema({
    Name :{
        type: String,
        require: true,
    },
    Email:{
        type: String,
        require:true
    }
});

let User = mongoose.model("User",schema);
module.exports = {User};