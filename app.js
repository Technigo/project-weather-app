// API key for OpenWeatherMap
const API_KEY = 'fb560f0e3d208f655263c202ebe8452d';

// URLs for current weather and 5-day forecast
const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// Default city
let city = 'Stockholm';

// DOM selector for current weather and forecast 
const currentWeatherElement = document.getElementById('currentWeather');
const forecastElement = document.getElementById('forecast');

// Array of weekday names
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// search icon and input field
const searchIcon = document.getElementById('searchIcon');
const cityInput = document.getElementById('cityInput');
const searchContainer = document.querySelector('.search-container');


searchIcon.addEventListener('click', function () {
    searchContainer.classList.toggle('active');
    if (searchContainer.classList.contains('active')) {
        cityInput.focus();
    } else {
        cityInput.blur();
    }
});

// Trigger the search
cityInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const cityInputValue = cityInput.value.trim();
        if (cityInputValue) {
            city = cityInputValue;
            fetchWeatherData(city);
            fetchForecastData(city);
            cityInput.value = '';
        } else {
            alert('Please enter a city name.');
        }
    }
});

// Function to convert time format 
function convertUnixToTime(unixTime) {
    const date = new Date(unixTime * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

// Function to change background image based on the weather 
function setBackground(weatherDescription, isDaytime) {
    if (isDaytime) {
        if (weatherDescription.includes('clear')) {
            currentWeatherElement.style.backgroundImage = "url('daytime-clear.jpg')";
        } else if (weatherDescription.includes('clouds')) {
            currentWeatherElement.style.backgroundImage = "url('daytime-cloudy.jpg')";
        } else {
            currentWeatherElement.style.backgroundImage = "url('daytime.jpg')";
        }
    } else {
        if (weatherDescription.includes('clear')) {
            currentWeatherElement.style.backgroundImage = "url('night-clear.jpg')";
        } else if (weatherDescription.includes('clouds')) {
            currentWeatherElement.style.backgroundImage = "url('night-cloudy.jpg')";
        } else {
            currentWeatherElement.style.backgroundImage = "url('night.jpg')";
        }
    }
    currentWeatherElement.style.backgroundSize = "cover";
}

// Function to fetch current weather
function fetchWeatherData(city) {
    fetch(`${CURRENT_WEATHER_URL}?q=${city}&units=metric&APPID=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log('Current Weather:', data);

            // Data from the response
            const location = data.name;
            const temperature = Math.round(data.main.temp);
            const description = data.weather[0].description;
            const sunrise = convertUnixToTime(data.sys.sunrise);
            const sunset = convertUnixToTime(data.sys.sunset);
            const currentTime = new Date().getTime() / 1000;
            const isDaytime = currentTime >= data.sys.sunrise && currentTime < data.sys.sunset;

            // Set background image based on weather description and time of day
            setBackground(description.toLowerCase(), isDaytime);

            // Data for current weather
            currentWeatherElement.innerHTML = `
                <div id="currentWeather">
                    <p class="temperature">${temperature}°C</p>
                    <p class="location">${location}</p>
                    <p class="time">Time: ${convertUnixToTime(data.dt)}</p>
                    <p class="description">${description}</p>
                    <div class="sun-info">
                        <p>sunrise <span>${sunrise}</span></p>
                        <p>sunset <span>${sunset}</span></p>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error fetching current weather:', error);
            alert('Failed to retrieve current weather data. Please try again later.');
        });
}

// Fetch forecast data 
function fetchForecastData(city) {
    fetch(`${FORECAST_URL}?q=${city}&units=metric&APPID=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log('Forecast Data:', data);

            const forecastList = data.list;

            const forecastByDay = {};

            forecastList.forEach(entry => {
                const dateTime = entry.dt_txt;
                const time = dateTime.split(' ')[1];

                if (time === '12:00:00') {
                    const date = dateTime.split(' ')[0];
                    if (!forecastByDay[date]) {
                        forecastByDay[date] = entry;
                    }
                }
            });

            // Data for the next 4 days 
            const forecastDays = Object.keys(forecastByDay).slice(0, 4);
            if (forecastDays.length === 0) {
                forecastElement.innerHTML = '<p>No forecast data available at 12:00 PM.</p>';
            } else {
                forecastElement.innerHTML = '';
                forecastDays.forEach(date => {
                    const forecast = forecastByDay[date];
                    const temperature = Math.round(forecast.main.temp);
                    const windSpeed = forecast.wind.speed;

                    const dayOfWeek = new Date(date).getDay();
                    const dayName = weekdays[dayOfWeek];

                    forecastElement.innerHTML += `
                        <div class="forecast-item">
                            <p class="day"><strong>${dayName}</strong></p>
                            <p class="temp">${temperature}°C</p>
                            <p class="wind">${windSpeed} m/s</p>
                        </div>
                    `;
                });
            }
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
            alert('Failed to retrieve forecast data. Please try again later.');
        });
}

// Invoking the functions 
fetchWeatherData(city);
fetchForecastData(city);
