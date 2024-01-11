const mysql = require('mysql2');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

// Accessing a specific environment variable
const port = process.env.PORT || 3000; // Default to port 3000 if PORT is not defined
console.log("on est là")
console.log("db host : " + process.env.DB_HOST)

// Accessing multiple environment variables       
const dbConfig = {
  host: process.env.DB_HOST || "mysql-db",
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || undefined
};


// // sleep time expects milliseconds
// function sleep (time) {
//   return new Promise((resolve) => setTimeout(resolve, time));
// }

// sleep(50000).then(() => {
//   // Do something after the sleep!

  const connection = mysql.createConnection(dbConfig);

  // Connect to the database
  mysql.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database');
    
    // Define a basic route
    app.get('/', (req, res) => {
      res.send('Hello, World!');
    });

    // Start the server after a delay of 10 seconds
    setTimeout(() => {
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    }, 10000); // 10 seconds delay

  });

  // Perform database operations here...

  // Close the connection when done
  // connection.end((err) => {
  //   if (err) {
  //     console.error('Error closing MySQL connection:', err);
  //   }
  //   console.log('Connection closed');
  // });

  // Close the database connection when the Node.js process exits
  process.on('SIGINT', () => {
    connection.end();
    process.exit();
  });

// });

