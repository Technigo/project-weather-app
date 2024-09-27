//ea9a90c62aeaaa3811505087d195520e
//https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ea9a90c62aeaaa3811505087d195520e
// base URL + api key

// //Forecast API 
// https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=ea9a90c62aeaaa3811505087d195520e


//True constants (SNAKECASE)
const API_KEY = "ea9a90c62aeaaa3811505087d195520e"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID="

const URL = (`${BASE_URL}${API_KEY}`)

console.log (URL)

// DOM Selectors
const temperatureDisplay = document.getElementById("temperature");
const conditionDisplay = document.getElementById("condition");
const sunriseDisplay = document.getElementById("sunriseTime");
const sunsetDisplay = document.getElementById("sunsetTime");
const weatherImg = document.getElementById("weatherImage");
const weatherMsg = document.getElementById("weatherMessage");
const forecast = document.getElementById("forecastContainer");

// Fetch weather data
fetch(URL)
    .then(response => response.json())
    .then(data => {
        const stockholmTemp = data.main.temp;
        const weatherCondition = data.weather[0].description; // Get the weather condition
        const roundedTemp = Math.round(stockholmTemp);
        const sunrise = data.sys.sunrise;
        const sunset = data.sys.sunset;

        // Display the temperature and condition
        temperatureDisplay.innerText = `${roundedTemp}°C`;
        conditionDisplay.innerText = `${weatherCondition}`;

        // Convert and display sunrise and sunset times
        const convertUnixToTime = (unixTimestamp) => {
        const date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert to milliseconds
        const hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Pad single-digit minutes with a zero
        return `${hours}:${minutes}`; // Return time in HH:MM format
        }

        const sunriseTime = convertUnixToTime(sunrise);
        const sunsetTime = convertUnixToTime(sunset);
        sunriseDisplay.innerText = `${sunriseTime}`;
        sunsetDisplay.innerText = `${sunsetTime}`;

        // Call the updateUI function to change background color and message
        updateUI(roundedTemp, weatherCondition);

        // Log the temperature and data for debugging
        console.log(data); // Log inside the promise chain
    })
    .catch(error => console.error('Error fetching weather data:', error)); // Handle errors

    function updateUI(temperature, weatherDescription) {
        const weatherContainer = document.getElementById("weatherContainer");
        let weatherMessage;
    
        // Log weather description for debugging
        console.log("Weather Description:", weatherDescription.toLowerCase());
    
        // Update background and text color based on weather condition
        if (weatherDescription.toLowerCase().includes("rain") || weatherDescription.toLowerCase().includes("drizzle")) {
            weatherContainer.style.backgroundColor = "#BDE8FA" // Blue for rain
            weatherContainer.style.color = "#164A68" // Rainy font color
            weatherImg.src = "assets/umbrella.png"
            weatherMessage = "Don’t forget your umbrella. It’s wet in Stockholm today."
        } else if (weatherDescription.toLowerCase().includes("clear")) {
            weatherContainer.style.backgroundColor = "#F7E9B9" // Yellow for clear sky
            weatherContainer.style.color = "#2A5510" // Sunny font color
            weatherImg.src = "assets/sunglasses.png"
            weatherMessage = `Get your sunnies on. Stockholm is looking rather great today.`
        } else if (weatherDescription.toLowerCase().includes("clouds")) {
            weatherContainer.style.backgroundColor = "#FFFFFF"; // Gray for cloudy
            weatherContainer.style.color = "#F47775" // Cloudy font color
            weatherImg.src = "assets/cloud.png"
            weatherMessage = "Light a fire and get cosy. Stockholm is looking grey today."
        } else {
            weatherContainer.style.backgroundColor = "white"; // Default background
            weatherContainer.style.color = "black"; // Default font color
            weatherImg.src = "assets/fallback_image_url.jpg";
            weatherMessage = `The weather cannot be picked up at the moment`;
        }
    
        weatherMsg.textContent = weatherMessage; // Update the weather message display
    }