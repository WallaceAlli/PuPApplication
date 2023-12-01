

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const connection = mysql.createPool({
    host     : 'pickuppal.crnfzjphbive.us-east-2.rds.amazonaws.com', // Your connection adress (localhost).
    user     : 'admin',     // Your database's username.
    password : 'pickuppal',        // Your database's password.
    database : 'pupdatabase',   // Your database's name.
    port: '3306'
  });
  
  // Starting our app.
  const app = express();
  
  // Creating a GET route that returns data from the 'users' table.
  app.get('/faculty', function (req, res) {
      // Connecting to the database.
      connection.getConnection(function (err, connection) {
  
      // Executing the MySQL query (select all data from the 'users' table).
      connection.query('select * FROM faculty', function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;
  
        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results)
      });
    });
  });
  
  // Starting our server.
  app.listen(3003, () => {
   console.log('Go to http://localhost:3000/faculty so you can see the data.');
  });