const express = require("express");
const bodyParser = require("body-parser");

const {mongoose} = require("./db/mongoose");
const {Users} = require("./models/users");
const {Movies} = require("./models/movies");

const app = express();
app.use(bodyParser.json());

app.post("/movies",(req,res)=>{
    let user = new Movies({
        Name:   req.body.name,
        Catagory:req.body.catagory,
        Watched:  req.body.watched,
        Series: req.body.series 
    });
    user.save((err,resp)=>{
        if(err){
            console.log(`${err["name"]}: ${err["message"]}`);
            res.send(`${err["name"]}: ${err["message"]}`);
        }
        res.send(resp);
    })
});

app.listen(3000,()=>{
    console.log("The App is running on port 3000");
});
