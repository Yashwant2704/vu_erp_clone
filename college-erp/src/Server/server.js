const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

// MySQL connection setup
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Yjn@270304', // Change this to your MySQL password
  database: 'erp'
});

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database');

  // Initialize the database and tables
  initializeDatabase();
});

// Function to initialize the database and create tables if they don't exist
function initializeDatabase() {
  // Ensure the database is created and used
  connection.query('CREATE DATABASE IF NOT EXISTS erp', (err) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    connection.query('USE erp', (err) => {
      if (err) {
        console.error('Error using database:', err);
        return;
      }
      createTables();
    });
  });
}

// Function to create tables if they don't exist
function createTables() {
  const tableCreationQueries = [
    `
      CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        prn VARCHAR(20) NOT NULL
      )
    `,
    `
      CREATE TABLE IF NOT EXISTS fee_payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `,
    `
      CREATE TABLE IF NOT EXISTS requested_documents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        document_type VARCHAR(255) NOT NULL,
        request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        verified BOOLEAN DEFAULT false
      )
    `,
    `
      CREATE TABLE IF NOT EXISTS exam_forms (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        exam_name VARCHAR(255) NOT NULL,
        submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `,
    
      `CREATE TABLE IF NOT EXISTS subjects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        name VARCHAR(255) NOT NULL
      )`,
    `
      CREATE TABLE IF NOT EXISTS hall_ticket_details (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        exam_name VARCHAR(255) NOT NULL,
        exam_date DATE NOT NULL,
        venue VARCHAR(255) NOT NULL
      )
    `,
    `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `
  ];

  tableCreationQueries.forEach(query => {
    connection.query(query, (err) => {
      if (err) {
        console.error('Error creating table:', err);
      }
    });
  });

  console.log('All necessary tables are created or already exist');
}

// Routes

// Get all student details
app.get('/student-details', (req, res) => {
  connection.query('SELECT * FROM students', (err, results) => {
    if (err) {
      console.error('Error fetching student details:', err);
      res.status(500).json({ error: 'Error fetching student details' });
      return;
    }
    res.json(results);
  });
});


// Get student details by ID
app.get('/search-student', (req, res) => {
  const { id } = req.query; // Extract student_id from query parameters

  // Check if student_id is provided
  if (!id) {
    return res.status(400).json({ error: 'Student ID is required' });
  }

  // Fetch student details by ID from the database
  connection.query('SELECT * FROM students WHERE student_id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching student details:', err);
      return res.status(500).json({ error: 'Error fetching student details' });
    }

    // Check if any students were found
    if (results.length === 0) {
      return res.status(404).json({ error: 'No student found with this ID' });
    }

    // Return the student details
    res.json(results);
  });
});


// Fee payment endpoint
app.post('/pay-fees', (req, res) => {
  const { student_id, amount } = req.body;

  if (!student_id || !amount) {
    res.status(400).json({ error: 'Student ID and amount are required' });
    return;
  }

  if (isNaN(student_id) || parseInt(student_id) <= 0) {
    res.status(400).json({ error: 'Student ID must be a positive integer' });
    return;
  }

  if (isNaN(amount) || parseFloat(amount) <= 0) {
    res.status(400).json({ error: 'Amount must be a positive number' });
    return;
  }

  connection.query('SELECT student_id FROM students WHERE student_id = ?', [student_id], (err, results) => {
    if (err) {
      console.error('Error checking student existence:', err);
      res.status(500).json({ error: 'Failed to check student existence' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: `Student with ID ${student_id} does not exist` });
      return;
    }

    connection.query(
      'INSERT INTO fee_payments (student_id, amount, payment_date) VALUES (?, ?, NOW())',
      [student_id, parseFloat(amount)],
      (err) => {
        if (err) {
          console.error('Error processing payment:', err);
          res.status(500).json({ error: 'Failed to process payment' });
          return;
        }
        res.json({ message: `Payment of ${amount} received successfully for student ID ${student_id}!` });
      }
    );
  });
});

// Fetch fee payment receipts
app.get('/fee-receipts', (req, res) => {
  const { student_id } = req.query;
  let query = 'SELECT * FROM fee_payments';
  const params = [];

  if (student_id) {
    query += ' WHERE student_id = ?';
    params.push(student_id);
  }

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Error fetching fee payment receipts:', err);
      res.status(500).json({ error: 'Error fetching fee payment receipts' });
      return;
    }
    res.json(results);
  });
});

// Request documents
app.post('/certificate/request', (req, res) => {
  const { student_id, documentType } = req.body;

  if (!student_id || !documentType) {
    res.status(400).json({ error: 'Student ID and document type are required' });
    return;
  }

  connection.query(
    'INSERT INTO requested_documents (student_id, document_type) VALUES (?, ?)',
    [student_id, documentType],
    (err, results) => {
      if (err) {
        console.error('Error requesting document:', err);
        res.status(500).json({ error: 'Error requesting document' });
        return;
      }
      res.json({ status: `Document "${documentType}" requested successfully for student ID ${student_id}!`, requestId: results.insertId });
    }
  );
});

// Fetch all requested documents
app.get('/certificate/requested-documents', (req, res) => {
  connection.query('SELECT * FROM requested_documents', (err, results) => {
    if (err) {
      console.error('Error fetching requested documents:', err);
      res.status(500).json({ error: 'Error fetching requested documents' });
      return;
    }
    res.json(results);
  });
});


app.put('/certificate/requested-documents/:id/verify', (req, res) => {
  const { id } = req.params;

  connection.query('UPDATE requested_documents SET verified = true WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error marking document as verified:', err);
      res.status(500).json({ error: 'Error marking document as verified' });
      return;
    }

    res.json({ message: `Document with ID ${id} marked as verified` });
  });
});

// Delete document by ID
app.delete('/certificate/requested-documents/:id', (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM requested_documents WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting document:', err);
      res.status(500).json({ error: 'Error deleting document' });
      return;
    }

    res.json({ message: `Deleted document with ID ${id}` });
  });
});




// Register endpoint
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
    if (err) {
      console.error('Error registering user:', err);
      return res.status(500).json({ error: 'Failed to register user' });
    }
    res.json({ message: 'User registered successfully' });
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  console.log('Request received at /login endpoint');
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Error checking user existence:', err);
      return res.status(500).json({ error: 'Failed to check user existence' });
    }

    if (results.length === 0) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    const user = results[0];
    const passwordMatch = bcrypt.compareSync(password, user.password);
    console.log('Password match:', passwordMatch);

    if (!passwordMatch) {
      console.log('Invalid password');
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Send a success response
    res.json({ message: 'Login successful', username: user.username });
  });
});



// Submit exam form
app.post('/exam/submit', (req, res) => {
  const { student_id, examName } = req.body;

  if (!student_id || !examName) {
    res.status(400).json({ error: 'Student ID and exam name are required' });
    return;
  }

  connection.query(
    'INSERT INTO exam_forms (student_id, exam_name) VALUES (?, ?)',
    [student_id, examName],
    (err, results) => {
      if (err) {
        console.error('Error submitting exam form:', err);
        res.status(500).json({ error: 'Error submitting exam form' });
        return;
      }
      res.json({ status: `Exam form for "${examName}" submitted successfully for student ID ${student_id}!`, formId: results.insertId });
    }
  );
});

// Fetch all exam forms
app.get('/exam/forms', (req, res) => {
  connection.query('SELECT * FROM exam_forms', (err, results) => {
    if (err) {
      console.error('Error fetching exam forms:', err);
      res.status(500).json({ error: 'Error fetching exam forms' });
      return;
    }
    res.json(results);
  });
});


app.post('/register-subjects', (req, res) => {
  const { student_id, subjects } = req.body;

  // Validate student_id and subjects array
  if (!student_id || !Array.isArray(subjects) || subjects.length === 0) {
    return res.status(400).json({ error: 'Student ID and subjects array are required' });
  }

  // Prepare the data for bulk insert
  const subjectValues = subjects.map(subject => [student_id, subject.id, subject.name]);

  // Insert subjects into database (assuming you have a 'subjects' table)
  connection.query('INSERT INTO subjects (student_id, id, name) VALUES ?', [subjectValues], (err, results) => {
    if (err) {
      console.error('Error registering subjects:', err); // Log detailed error
      return res.status(500).json({ error: 'Failed to register subjects' });
    }
    res.json({ message: 'Subjects registered successfully' });
  });
});


// Fetch registered subjects by student ID
app.get('/subjects/:student_id', (req, res) => {
  const { student_id } = req.params;

  if (!student_id) {
    return res.status(400).json({ error: 'Student ID is required' });
  }

  // Fetch subjects from the 'subjects' table
  connection.query('SELECT * FROM subjects WHERE student_id = ?', [student_id], (err, results) => {
    if (err) {
      console.error('Error fetching subjects:', err);
      return res.status(500).json({ error: 'Error fetching subjects' });
    }

    res.json(results);
  });
});




// Fetch hall ticket details
app.get('/examination/hall-ticket', (req, res) => {
  const { student_id } = req.query;

  if (!student_id) {
    res.status(400).json({ error: 'Student ID is required' });
    return;
  }

  connection.query(
    'SELECT * FROM hall_ticket_details WHERE student_id = ?',
    [student_id],
    (err, results) => {
      if (err) {
        console.error('Error fetching hall ticket details:', err);
        res.status(500).json({ error: 'Error fetching hall ticket details' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'No hall ticket details found for the given student ID' });
        return;
      }

      res.json(results[0]);
    }
  );
});


// Submit hall ticket details
app.post('/examination/hall-ticket', (req, res) => {
  const { student_id, examName, examDate, venue } = req.body;

  // Validate input data
  if (!student_id || !examName || !examDate || !venue) {
    return res.status(400).json({ error: 'Student ID, exam name, exam date, and venue are required' });
  }

  // Insert hall ticket details into the database
  connection.query(
    'INSERT INTO hall_ticket_details (student_id, exam_name, exam_date, venue) VALUES (?, ?, ?, ?)',
    [student_id, examName, examDate, venue],
    (err, results) => {
      if (err) {
        console.error('Error submitting hall ticket details:', err);
        return res.status(500).json({ error: 'Failed to submit hall ticket details' });
      }
      res.json({ message: 'Hall ticket details submitted successfully!', hallTicketId: results.insertId });
    }
  );
});



// Add a new endpoint to handle adding a student
app.post('/add-student', (req, res) => {
  const { studentId, name, prn } = req.body;

  // Validate input data
  if (!studentId || !name || !prn) {
    return res.status(400).json({ error: 'Student ID, name, and PRN are required' });
  }

  // Insert student data into the database
  connection.query(
    'INSERT INTO students (student_id, name, prn) VALUES (?, ?, ?)',
    [studentId, name, prn],
    (err, results) => {
      if (err) {
        console.error('Error adding student:', err);
        return res.status(500).json({ error: 'Failed to add student' });
      }

      // Send a success response
      res.json({ success: true, message: 'Student added successfully', studentId: results.insertId });
    }
  );
});


// Route to handle DELETE request for deleting a student by student_id
app.delete('/search-student', (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Student ID is required in query parameter' });
  }

  // Perform deletion from MySQL database
  connection.query('DELETE FROM students WHERE student_id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting student:', err);
      return res.status(500).json({ error: 'Failed to delete student' });
    }

    console.log('Deleted student:', result);
    res.json({ message: `Deleted student with student_id ${id}` });
  });
});


// Start server
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Server listening on port ${PORT}`);
});
