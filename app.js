const express = require('express');
const request = require('request');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use('/assets', express.static(path.join(__dirname, '../assets')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/weather/:location', (req, res) => {
    const apiKey = 'ca905a3d24754ef335a4b66c8f4a1b53';
    const location = req.params.location;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const data = JSON.parse(body);
            const weatherInfo = {
                name: data.name,
                temperature: data.main.temp,
                description: data.weather[0].description,
                
            };
            res.send(weatherInfo);
        } else {
            res.status(404).send('Location not found');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
