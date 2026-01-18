const express = require('express');
const app = express();

const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const symptomRoutes = require('./routes/symptom.route');

// ✅ Proper CORS setup
const corsOptions = {
    origin: process.env.CLIENT_URL, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/symptoms', symptomRoutes);

app.get('/', (req, res) => {
    res.send('MediSense Backend is running');
});

module.exports = app;
