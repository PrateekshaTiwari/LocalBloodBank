require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function(req,res){
    res.render("home");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.get("/find", function(req,res){
    res.render("find");
});

app.get("/more", function(req,res){
    res.render("more");
})

app.listen(3000, function(){
    console.log("Server is running at port 3000");
});