const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Middleware to enable CORS (you can adjust origin restrictions as needed)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Endpoint to proxy weather API requests
app.get('/weather', async (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${hUp6XnjoQEfBX0teyVTSwnPy6qEgJzLP}&q=${lat},${lon}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve HTML page
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
