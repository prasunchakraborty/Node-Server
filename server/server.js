const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const {ObjectID} = require("mongodb");

const {mongoose} = require("./db/mongoose");
const {Users} = require("./models/users");
const {Movies} = require("./models/movies");

const PORT = process.env.PORT || 3000

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
            res.status(400).send(`${err["name"]}: ${err["message"]}`);
        }
        res.send(resp);
    });
});

app.get("/movies",(req,res)=>{
    Movies.find((err,resp)=>{
        if(err){
            res.status(400).send(err);
        };
        res.send({resp})
    });
});

app.get("/movies/:id",(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(404).send();
    }
    Movies.findById(req.params.id,(err,resp)=>{
        if(err){
            res.status(400).send(err);
        };
        if(!resp){
            return res.status(404).send();
        };
        res.send({resp});
    });
});

app.delete("/movies/:id",(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(404).send();
    };
    Movies.findByIdAndDelete(req.params.id,(err,resp)=>{
        if(err){
            res.status(400).send(err);
        };
        if(!resp){
            return res.status(404).send();
        };
        res.send({resp});
    });

});

app.patch("/movies/:id",(req,res)=>{
    let body = _.pick(req.body,['watched']);
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    };
    
    if (!_.isBoolean(body.watched)){
        body.Watched=false;
    }
    else{
        body.Watched = body.watched;
    }
    
    Movies.findByIdAndUpdate(id,body,{new: true},(err,resp)=>{
        if(err){
            res.status(400).send(err);
        };
        if(!resp){
            return res.status(404).send();
        };
        res.send({resp});
    });

});

app.post("/users",(req,res)=>{
    let body = _.pick(req.body,['name','email','password'])
    let user = new Users(body);
    user.save((err,resp)=>{
        if(err){
            res.status(400).send(err);
        };
        res.send(resp);
    });
});

app.listen(PORT,()=>{
    console.log(`The App is running on port ${PORT}`);
});
