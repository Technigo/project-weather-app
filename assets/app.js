const apiKey = '814d96ad744ce195b2f067b83d92321c'; // Your API key
const lat = 46.5197; // Latitude for Lausanne
const lon = 6.6323;  // Longitude for Lausanne
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`; // API endpoint

// Function to fetch weather data
async function getWeatherData() {
    try {
        const response = await fetch(apiUrl); // Fetch weather data from API
        if (!response.ok) {
            throw new Error('Error fetching weather data'); // Handle fetch error
        }

        const data = await response.json(); // Parse the response to JSON
        displayCurrentWeather(data); // Display current weather data
        displayForecast(data);  // Display the 7-day forecast
    } catch (error) {
        console.error(error); // Log any errors that occur during the fetch
    }
}

// Function to display current weather information
function displayCurrentWeather(data) {
    const currentTemp = Math.round(data.list[0].main.temp); // Get current temperature and round it
    const description = data.list[0].weather[0].description; // Get weather description
    const icon = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`; // Get weather icon URL

    document.getElementById('current-temp').textContent = `${currentTemp}°C`; // Update temperature in the DOM
    document.getElementById('weather-description').textContent = `Lausanne is looking ${description} today.`; // Update description
    document.getElementById('weather-icon').src = icon; // Update weather icon in the DOM

    // Convert sunrise and sunset times from UNIX to human-readable format
    const sunrise = new Date(data.city.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(data.city.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('sunrise').textContent = sunrise; // Update sunrise time
    document.getElementById('sunset').textContent = sunset;   // Update sunset time
}

// Function to display the 7-day weather forecast
function displayForecast(data) {
    // Filter the forecast data for times around noon (12:00:00)
    const dailyForecasts = data.list.filter(forecast => forecast.dt_txt.includes('12:00:00'));

    // Ensure we have exactly 7 forecasts (one for each day)
    for (let i = 0; i < 7; i++) {
        const dayTemp = Math.round(dailyForecasts[i].main.temp); // Get and round the temperature
        const dayName = new Date(dailyForecasts[i].dt_txt).toLocaleDateString('en-US', { weekday: 'short' }); // Get the day name
        document.getElementById(`day${i+1}-temp`).textContent = `${dayName} ${dayTemp}°C`; // Update the DOM with day and temperature
    }
}

// Call the function to fetch and display weather data when the page loads
getWeatherData();
