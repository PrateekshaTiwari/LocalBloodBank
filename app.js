require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
var axios = require("axios").default;
const ejs = require("ejs");
const newsRouter = require('./views/news')
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


app.post("/find", function(req,res){
    const query=req.body.cityname;
    var options = {
        method: 'GET',
        url: 'https://trueway-places.p.rapidapi.com/FindPlaceByText',
       // params: {text: 'blood bank, saket nagar, kanpur', language: 'en'},
       params: {text: 'blood bank,'+query, language: 'en'},
        headers: {
          'x-rapidapi-key': '55e0ca442bmshbbc6b2ccd48264ap1ace4fjsn61865348c81f',
          'x-rapidapi-host': 'trueway-places.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data);
          const detail=response.data;
          res.render("search", {
            n:"Name: ",
            name: detail.results[0].name,
            ad:"Address: ",
            addr: detail.results[0].address,
            la:"Latitude: ",
            lat: detail.results[0].location.lat,
            lo:"Longitude: ",
            long: detail.results[0].location.lng,
          });
      }).catch(function (error) {
          console.error(error);
      });
      
    });

   
  
    
    app.use('/article', newsRouter);
/**app.get("/more", function(req,res){
    res.render("more");
})**/

app.listen(3000, function(){
    console.log("Server is running at port 3000");
});