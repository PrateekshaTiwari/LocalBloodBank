const mysql = require("mysql");

//used mysql workbench for local connection of database, We can use google cloud platform's
//sql to create an instance online remote  
var mysqlConnection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "password",
    database : "LocalBloodBank",
    multipleStatements : true
}); 

mysqlConnection.connect((err)=>{
    if(!err){
        console.log("Connection to database Successful");
    }
    else{
        console.log("Connection to database failed");
    }
});

module.exports = mysqlConnection;