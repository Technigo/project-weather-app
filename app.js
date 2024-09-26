// API key for OpenWeatherMap
const API_KEY = 'fb560f0e3d208f655263c202ebe8452d';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// City for which to fetch the weather
let city = 'Stockholm,Sweden';

// Construct the final URL by injecting the API key and city
const URL = `${BASE_URL}?q=${city}&units=metric&APPID=${API_KEY}`;

console.log(URL); // Debugging the URL

// DOM selectors
const cityElement = document.getElementById('location');
const tempElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');

// Fetch weather data
fetch(URL)
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log data for debugging

        // Extract data from the response
        const location = data.name;
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        // Injecting data into the DOM
        cityElement.innerText = location;
        tempElement.innerText = temperature;
        descriptionElement.innerText = description;
        humidityElement.innerText = humidity;
        windElement.innerText = windSpeed;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to retrieve weather data. Please try again later.');
    });
