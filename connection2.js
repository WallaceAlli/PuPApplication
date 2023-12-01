  const express = require('express');
  const app = express();
  const port = 3000;
  
  app.use(express.json()); // Parse JSON bodies
  
  // Your MySQL configuration
  const mysql = require('mysql');
  const connection = mysql.createConnection({
    host     : 'pickuppal.crnfzjphbive.us-east-2.rds.amazonaws.com', // Your connection adress (localhost).
    user     : 'admin',     // Your database's username.
    password : 'pickuppal',        // Your database's password.
    database : 'pupdatabase',   // Your database's name.
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
  });
  
  // Your route for handling the insert
  app.post('/queue', (req, res) => {
    const {     
        idStudent,
        idGuardian,
        studentFirst,
        parentFirst,
        parentLast,
        parentCar,
        studentLast,
        type, } = req.body;
  
    // Your SQL insert query
    const insertQuery = 'INSERT INTO queue (idStudent,idGuardian,studentFirst,parentFirst,parentLast,parentCar,studentLast,type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  
    // Execute the query
    connection.query(insertQuery, [idStudent, idGuardian, studentFirst, parentFirst, parentLast, parentCar, studentLast, type], (err, results) => {
      if (err) {
        console.error('Error executing query: ' + err.stack);
        res.status(500).send('Error executing query');
        return;
      }
  
      console.log('Inserted row id: ' + results.insertId);
      res.status(200).send('Data inserted successfully');
    });
  });
  
  // Starting our server.
  app.listen(3001, () => {
   console.log('Go to http://localhost:3001/queue so you can see the data.');
  });