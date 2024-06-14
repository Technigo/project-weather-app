require('dotenv').config();
const express = require('express');
const app = express();
const fetch = require('node-fetch');

app.get('/weather', async (req, res) => {
    const query = req.query.q;
    const response = await fetch(`${API_URL}weather?q=${city},${country}&units=${units}&APPID=${API_KEY}`);
    const data = await response.json();
    res.send(data);
});

app.get('/forcast', async (req, res) => {
  const query = req.query.q;
  const response = await fetch(`${API_URL}forcast?q=${city},${country}&units=${units}&APPID=${API_KEY}`);
  const data = await response.json();
  res.send(data);
});

app.listen(3000, () => console.log('Server running on port 3000'));