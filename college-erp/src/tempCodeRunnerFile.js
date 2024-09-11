const express = require('express');
const mysql = require('mysql');

const app = express();

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Yjn@270304',
  database: 'erp'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');

  // Create the database if it doesn't exist
  connection.query('CREATE DATABASE IF NOT EXISTS your_database_name', (err) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Database created or already exists');

    // Use the database
    connection.query('USE your_database_name', (err) => {
      if (err) {
        console.error('Error using database:', err);
        return;
      }
      console.log('Using database');

      // Create the students table if it doesn't exist
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS students (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          prn VARCHAR(20) NOT NULL,
          seat INT NOT NULL
          -- Add more columns as needed
        )
      `;
      connection.query(createTableQuery, (err) => {
        if (err) {
          console.error('Error creating table:', err);
          return;
        }
        console.log('Students table created or already exists');
      });
    });
  });
});

// Define routes
app.get('/student-details', (req, res) => {
  connection.query('SELECT * FROM students', (err, results) => {
    if (err) {
      console.error('Error fetching student details:', err);
      res.status(500).send('Error fetching student details');
      return;
    }
    res.json(results);
  });
});

// Add more routes for other endpoints as needed

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
