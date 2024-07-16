const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // For generating UUIDs
const app = express();
const PORT = 3000;
const { ConnectionPool } = require('mssql');

app.use(bodyParser.json());

// Configure MSSQL connection pool
const config = {
  user: 'your_username',
  password: 'your_password',
  server: 'your_server',
  database: 'your_database',
  options: {
    encrypt: true, // Use encryption (if enabled on server)
    enableArithAbort: true // Enable ArithAbort setting
  }
};

// Create MSSQL connection pool
const poolPromise = new ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1); // Exit the application on connection failure
  });

// Middleware to add MSSQL pool to request object
app.use((req, res, next) => {
  req.pool = poolPromise;
  next();
});

// Get all lookups from MSSQL
app.get('/api/lookups', async (req, res) => {
  try {
    const pool = await req.pool;
    const result = await pool.request().query('SELECT * FROM Lookups');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching lookups:', error);
    res.status(500).send('Error fetching data');
  }
});

// Create a new lookup in MSSQL
app.post('/api/lookups', async (req, res) => {
  try {
    const pool = await req.pool;
    const newLookup = req.body;
    newLookup.id = uuidv4(); // Generate a unique ID
    const result = await pool
      .request()
      .input('RevisionSeq', newLookup.RevisionSeq)
      .input('UpdatedBy', newLookup.UpdatedBy)
      .input('UpdateTS', newLookup.UpdateTS)
      .input('LookupType', newLookup.LookupType)
      .input('LookupCode', newLookup.LookupCode)
      .input('LookupDescription', newLookup.LookupDescription)
      .input('AdditionalAttrib01', newLookup.AdditionalAttrib01)
      .input('IsActive', newLookup.IsActive)
      .query(
        `INSERT INTO Lookups (RevisionSeq, UpdatedBy, UpdateTS, LookupType, LookupCode, LookupDescription, AdditionalAttrib01, IsActive)
        VALUES (@RevisionSeq, @UpdatedBy, @UpdateTS, @LookupType, @LookupCode, @LookupDescription, @AdditionalAttrib01, @IsActive)`
      );
    res.status(201).json(newLookup);
  } catch (error) {
    console.error('Error adding lookup:', error);
    res.status(500).send('Error adding lookup');
  }
});

// Update a lookup by ID in MSSQL
app.put('/api/lookups/:id', async (req, res) => {
  try {
    const pool = await req.pool;
    const id = req.params.id;
    const updatedLookup = req.body;
    await pool
      .request()
      .input('Id', id)
      .input('RevisionSeq', updatedLookup.RevisionSeq)
      .input('UpdatedBy', updatedLookup.UpdatedBy)
      .input('UpdateTS', updatedLookup.UpdateTS)
      .input('LookupType', updatedLookup.LookupType)
      .input('LookupCode', updatedLookup.LookupCode)
      .input('LookupDescription', updatedLookup.LookupDescription)
      .input('AdditionalAttrib01', updatedLookup.AdditionalAttrib01)
      .input('IsActive', updatedLookup.IsActive)
      .query(
        `UPDATE Lookups SET
         RevisionSeq = @RevisionSeq,
         UpdatedBy = @UpdatedBy,
         UpdateTS = @UpdateTS,
         LookupType = @LookupType,
         LookupCode = @LookupCode,
         LookupDescription = @LookupDescription,
         AdditionalAttrib01 = @AdditionalAttrib01,
         IsActive = @IsActive
         WHERE id = @Id`
      );
    res.json(updatedLookup);
  } catch (error) {
    console.error('Error updating lookup:', error);
    res.status(500).send('Error updating lookup');
  }
});

// Delete a lookup by ID in MSSQL
app.delete('/api/lookups/:id', async (req, res) => {
  try {
    const pool = await req.pool;
    const id = req.params.id;
    await pool.request().input('Id', id).query('DELETE FROM Lookups WHERE id = @Id');
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting lookup:', error);
    res.status(500).send('Error deleting lookup');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



/*
Explanation
MSSQL Configuration: You define your MSSQL connection settings (config) including server details, database name, and authentication credentials.

Connection Pooling: ConnectionPool from mssql is used to manage multiple connections efficiently.

API Endpoints: Each CRUD operation (GET, POST, PUT, DELETE) interacts with MSSQL using pool.request() to execute SQL queries.

Error Handling: Errors are caught and logged with appropriate status codes sent back to the client.

Notes
Security: Ensure to handle database credentials securely, preferably using environment variables and restricting access.

Testing: Test your API endpoints thoroughly to ensure proper functionality and error handling.

Scalability: Consider scaling your application by handling more complex queries, pagination, and optimizing database interactions.

*/