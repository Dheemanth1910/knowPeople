const mongoose = require('mongoose');

// Connection URL for local MongoDB server
const mongoDBUrl = 'mongodb://localhost:27017';

// Connect to MongoDB
mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true }); // The .connect() method return a promise. 

// Get the default connection
const db = mongoose.connection;

// Event listeners to handle connection events
db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});


// Close the MongoDB connection when the Node.js process is terminated
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});
