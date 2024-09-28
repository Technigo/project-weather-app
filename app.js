// API key for OpenWeatherMap
const API_KEY = 'fb560f0e3d208f655263c202ebe8452d';

// Base URLs for current weather and 5-day forecast
const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// Default city
let city = 'Stockholm';

// DOM selector for current weather and forecast display
const currentWeatherElement = document.getElementById('currentWeather');  // Container for current weather
const forecastElement = document.getElementById('forecast');              // Container for forecast

// Array of weekday names
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Reference to the search icon and input field
const searchIcon = document.getElementById('searchIcon');
const cityInput = document.getElementById('cityInput');
const searchContainer = document.querySelector('.search-container'); // Reference to the container of the input and icon

// Listen for a click on the magnifying glass icon to show the input field
searchIcon.addEventListener('click', function () {
    searchContainer.classList.toggle('active'); // Toggle the 'active' class to expand the input field
    if (searchContainer.classList.contains('active')) {
        cityInput.focus(); // Automatically focus the input when it becomes visible
    } else {
        cityInput.blur(); // Remove focus when the field is hidden
    }
});

// Listen for the "Enter" keypress to trigger the search
cityInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const cityInputValue = cityInput.value.trim(); // Get input value and remove spaces
        if (cityInputValue) {
            city = cityInputValue; // Update the city with the user's input
            fetchWeatherData(city); // Fetch new weather data
            fetchForecastData(city); // Fetch new forecast data
            cityInput.value = ''; // Clear input field after search
        } else {
            alert('Please enter a city name.');
        }
    }
});

// Function to convert Unix time to a readable time format (e.g., 13:00)
function convertUnixToTime(unixTime) {
    const date = new Date(unixTime * 1000); // Convert seconds to milliseconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`; // Ensure two-digit minutes
}

// Function to set the background image based on the weather condition
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

// Function to fetch current weather data for the given city
function fetchWeatherData(city) {
    fetch(`${CURRENT_WEATHER_URL}?q=${city}&units=metric&APPID=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log('Current Weather:', data); // Log data for debugging

            // Extract data from the response
            const location = data.name;
            const temperature = Math.round(data.main.temp);
            const description = data.weather[0].description;
            const sunrise = convertUnixToTime(data.sys.sunrise);
            const sunset = convertUnixToTime(data.sys.sunset);
            const currentTime = new Date().getTime() / 1000; // Get current time in seconds
            const isDaytime = currentTime >= data.sys.sunrise && currentTime < data.sys.sunset; // Check if it's daytime

            // Set background image based on weather description and time of day
            setBackground(description.toLowerCase(), isDaytime);

            // Inject current weather data into the DOM using innerHTML
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

// Function to fetch forecast data for the given city
function fetchForecastData(city) {
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
                    const windSpeed = forecast.wind.speed; // Extract wind speed from forecast data

                    // Convert the date string to a Date object and get the day name
                    const dayOfWeek = new Date(date).getDay();
                    const dayName = weekdays[dayOfWeek]; // Get the day name using the weekdays array

                    // Create a new element for each day's forecast
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

// Fetch the default city weather and forecast on page load
fetchWeatherData(city);
fetchForecastData(city);
