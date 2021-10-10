const expres = require("express");
const dataRouter = express.Router()
const mysql = require("mysql");
const mysqlConnection = require('../connection');

/*
database schema of DATA to store registered users details --->

CREATE TABLE IF NOT EXISTS `data` (
  `id` int NOT NULL COMMENT 'primary key',
  `data_name` varchar(255) NOT NULL COMMENT 'data name',
  `data_age` int(11) NOT NULL COMMENT 'data age',
  `data_bloodgroup` double NOT NULL COMMENT 'data bloodgroup',
  `data_email` varchar(255) NOT NULL COMMENT 'data email',                   
  `data_number` int NOT NULL COMMENT 'data number',
) AUTO_INCREMENT=1 DEFAULT CHARSET=UTF-8 COMMENT='datatable demo table';

*/

dataRouter.get('/data', function (req, res) {
    console.log(req);
    connection.query('SELECT * FROM data', function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 }); 

 dataRouter.post('/data', function (req, res) {
    var postData  = req.body;
    connection.query('INSERT INTO data SET ?', postData, function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });

module.exports = dataRouter;