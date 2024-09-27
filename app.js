// API key for OpenWeatherMap
const API_KEY = 'fb560f0e3d208f655263c202ebe8452d';

// Base URLs for current weather and 5-day forecast
const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// City for which to fetch the weather
let city = 'Stockholm,Sweden';

// DOM selectors for current weather
const cityElement = document.getElementById('location');
const tempElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');
const sunriseElement = document.getElementById('sunrise');
const sunsetElement = document.getElementById('sunset');

// DOM selector for the forecast display
const forecastElement = document.getElementById('forecast');

// Array of weekday names
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Function to convert Unix time to a readable time format (e.g., 13:00)
function convertUnixToTime(unixTime) {
    const date = new Date(unixTime * 1000); // Convert seconds to milliseconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`; // Ensure two-digit minutes
}

// Fetch current weather data
fetch(`${CURRENT_WEATHER_URL}?q=${city}&units=metric&APPID=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        console.log('Current Weather:', data); // Log data for debugging

        // Extract data from the response
        const location = data.name;
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const sunrise = data.sys.sunrise;
        const sunset = data.sys.sunset;

        // Inject current weather data into the DOM
        cityElement.innerText = location;
        tempElement.innerText = temperature;
        descriptionElement.innerText = description;
        humidityElement.innerText = humidity;
        windElement.innerText = windSpeed;

        // Display sunrise and sunset times
        sunriseElement.innerText = convertUnixToTime(sunrise);
        sunsetElement.innerText = convertUnixToTime(sunset);
    })
    .catch(error => {
        console.error('Error fetching current weather:', error);
        alert('Failed to retrieve current weather data. Please try again later.');
    });

// Fetch forecast data
fetch(`${FORECAST_URL}?q=${city}&units=metric&APPID=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        console.log('Forecast Data:', data); // Log data for debugging

        const forecastList = data.list; // List of forecast entries

        // Object to store the forecast for each day at 12:00 PM
        const forecastByDay = {};

        // Iterate through each forecast entry
        forecastList.forEach(entry => {
            const dateTime = entry.dt_txt; // Get the date and time as a string
            const time = dateTime.split(' ')[1]; // Extract the time part (HH:MM:SS)

            // We are only interested in the forecast for 12:00 PM
            if (time === '12:00:00') {
                const date = dateTime.split(' ')[0]; // Get the date part (YYYY-MM-DD)
                if (!forecastByDay[date]) {
                    forecastByDay[date] = entry;
                }
            }
        });

        // Extract data for the next 4 days and display
        const forecastDays = Object.keys(forecastByDay).slice(0, 4);
        if (forecastDays.length === 0) {
            forecastElement.innerHTML = '<p>No forecast data available at 12:00 PM.</p>';
        } else {
            forecastElement.innerHTML = ''; // Clear the previous forecast data
            forecastDays.forEach(date => {
                const forecast = forecastByDay[date];
                const temperature = Math.round(forecast.main.temp);
                const weatherDescription = forecast.weather[0].description;

                // Convert the date string to a Date object and get the day name
                const dayOfWeek = new Date(date).getDay();
                const dayName = weekdays[dayOfWeek]; // Get the day name using the weekdays array

                // Create a new element for each day's forecast
                const forecastItem = document.createElement('div');
                forecastItem.innerHTML = `
                    <p><strong>${dayName}</strong></p>
                    <p>Temperature at 12:00 PM: ${temperature} °C</p>
                    <p>Weather: ${weatherDescription}</p>
                `;
                forecastElement.appendChild(forecastItem);
            });
        }
    })
    .catch(error => {
        console.error('Error fetching forecast:', error);
        alert('Failed to retrieve forecast data. Please try again later.');
    });
