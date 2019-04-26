const mongoose = require("mongoose");
const validator = require("validator")
let schema = mongoose.Schema({
    name :{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require:true,
        trim:true,
        unique:true,
        validate:{
            validator: validator.isEmail,
            message: `{VALUE} is not a valid email`
        }
    },
    password:{
        type: String,
        require:true
    },
    tokens:[{
        access:{
            type:String,
            require:true
        },
        token:{
            type:String,
            require:true
        }
    }]
});

let Users = mongoose.model("User",schema);
module.exports = {Users};