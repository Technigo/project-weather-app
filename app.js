// Your OpenWeatherMap API key (just the key, not the entire URL)
const apiKey = 'fb560f0e3d208f655263c202ebe8452d';

// Correct URL for fetching weather data for a city (Stockholm example)
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${apiKey}`;

// Function to fetch weather data
async function getWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error('Weather data could not be retrieved');
        }

        const data = await response.json();

        // Extracting useful information
        const location = data.name;
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        // Updating the DOM with weather data
        document.getElementById('location').textContent = location;
        document.getElementById('temperature').textContent = temperature;
        document.getElementById('description').textContent = description;
        document.getElementById('humidity').textContent = humidity;
        document.getElementById('wind').textContent = windSpeed;

    } catch (error) {
        console.error('Error:', error);
        alert('Failed to retrieve weather data. Please try again later.');
    }
}

// Call the function to fetch and display the weather data
getWeather();
