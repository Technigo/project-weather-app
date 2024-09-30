// Current weather API
// ea9a90c62aeaaa3811505087d195520e
// Base URL + API key
//https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ea9a90c62aeaaa3811505087d195520e
//https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=ea9a90c62aeaaa3811505087d195520e

// True constants (SNAKECASE)
const API_KEY = "ea9a90c62aeaaa3811505087d195520e";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const FORECAST_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast?q=";

let CITY = "Stockholm"; // Dynamic city variable

// DOM Selectors
const temperatureDisplay = document.getElementById("temperature");
const conditionDisplay = document.getElementById("condition");
const sunriseDisplay = document.getElementById("sunriseTime");
const sunsetDisplay = document.getElementById("sunsetTime");
const weatherImg = document.getElementById("weatherImage");
const weatherMsg = document.getElementById("weatherMessage");
const forecastList = document.getElementById("forecastList");
const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");

// Function to fetch weather data
function fetchWeatherData() {
    const URL = `${BASE_URL}${CITY}&units=metric&APPID=${API_KEY}`;
    const FORECAST_URL = `${FORECAST_BASE_URL}${CITY}&units=metric&APPID=${API_KEY}`;

    // Fetch current weather data
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            if (!data || data.cod !== 200) {
                throw new Error('City not found')
            }
            const stockholmTemp = data.main.temp;
            const weatherCondition = data.weather[0].description; 
            const roundedTemp = Math.round(stockholmTemp);
            const sunrise = data.sys.sunrise;
            const sunset = data.sys.sunset;
            const timezoneOffset = data.timezone; // Timezone offset in seconds

            temperatureDisplay.innerText = `${roundedTemp}°C`;
            conditionDisplay.innerText = `${weatherCondition}`;
        
    // Function to convert UNIX timestamp to readable time format (24-hour clock)
            const convertUnixToTime = (unixTimestamp, timezoneOffset) => {
                const date = new Date((unixTimestamp + timezoneOffset)* 1000);
                const hours = date.getUTCHours();
                const minutes = String(date.getUTCMinutes()).padStart(2, '0');
                return `${hours}:${minutes}`;
            }
    // Convert and display sunrise and sunset times with timezone offset (so it is local time showing for the selected city)
            const sunriseTime = convertUnixToTime(sunrise, timezoneOffset);
            const sunsetTime = convertUnixToTime(sunset, timezoneOffset);
            sunriseDisplay.innerText = `${sunriseTime}`;
            sunsetDisplay.innerText = `${sunsetTime}`;

            updateUI(roundedTemp, weatherCondition);
        })
        .catch(error => console.error('Error fetching weather data:', error));

    // Fetch Forecast weather data
    fetch(FORECAST_URL)
        .then(response => response.json())
        .then(forecastData => {
            forecastList.innerHTML = '';

            for (let i = 1; i <= 5; i++) {
                const indexForNoon = (i * 8) + 1; 
                const forecast = forecastData.list[indexForNoon];

                if (forecast) {
                    const weekDay = new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
                    const temperature = Math.round(forecast.main.temp);

                    const listItem = document.createElement('li');
                    listItem.textContent = `${weekDay}: ${temperature}°C`;
                    forecastList.appendChild(listItem);
                }
            }
        })
        .catch(error => console.error('Error fetching forecast data:', error));
}

// Initial fetch for the default city
fetchWeatherData();

// Event listener for the search button
searchButton.addEventListener("click", () => {
    CITY = cityInput.value.trim(); // Update city variable with input value
    if (CITY) {
        fetchWeatherData(); // Fetch new weather data for the entered city
    }
});

// Event listener for the Enter key in the input field
cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") { // Check if the pressed key is Enter
        searchButton.click(); // Trigger the click event of the search button
    }
});

function updateUI(temperature, weatherDescription) {
    const weatherContainer = document.getElementById("weatherContainer");
    const searchButton = document.getElementById ("searchButton")
    const currentTime = new Date(); // Get the current time
    const sunset = new Date(sunsetTime * 1000); // Convert sunset time (already fetched) to Date object
    let weatherMessage; // Use let since the variable weatherMessage will change depending on weather

    // Update background and text color based on weather condition
    if (weatherDescription.toLowerCase().includes("rain") || 
        weatherDescription.toLowerCase().includes("drizzle") || 
        weatherDescription.toLowerCase().includes("mist")) {
        weatherContainer.style.backgroundColor = "#BDE8FA"; // Blue for rain
        weatherContainer.style.color = "#164A68"; // Rainy font color
        searchButton.style.backgroundColor ="#164A68"
        weatherImg.src = "assets/design-2/noun_Umbrella.svg";
        weatherMessage = `Don’t forget your umbrella.<br>It’s wet in ${CITY} today.`;

    } else if (weatherDescription.toLowerCase().includes("few clouds")) {
        weatherContainer.style.backgroundColor = "#F7E9B9"; // Yellow for clear sky
        weatherContainer.style.color = "#2A5510"; // Green font color
        searchButton.style.backgroundColor ="#2A5510"
        weatherImg.src = "assets/design-2/noun_Sunglasses.svg";
        weatherMessage = `Get your sunnies on. There are a few clouds, but it's still a lovely day in ${CITY}.`;

    } else if (weatherDescription.toLowerCase().includes("scattered clouds")) {
        weatherContainer.style.backgroundColor = "#F7E9B9"; // Yellow for clear sky
        weatherContainer.style.color = "#2A5510"; // Green font color
        searchButton.style.backgroundColor ="#2A5510"
        weatherImg.src = "assets/design-2/noun_cloud.svg";
        weatherMessage = `There are some scattered clouds, but it's still a lovely day in ${CITY}.`;
        
    } else if (weatherDescription.toLowerCase().includes("clear")) {
        // Daytime clear sky
        weatherContainer.style.backgroundColor = "#F7E9B9"; // Yellow for clear sky
        weatherContainer.style.color = "#2A5510"; // Green font color
        searchButton.style.backgroundColor ="#2A5510"
        weatherImg.src = "assets/design-2/noun_Sunglasses.svg";
        weatherMessage = `Get your sunnies on.<br>${CITY} is looking rather great today.`;

        // Check if it's after sunset for clear skies
        if (currentTime > sunset) {
            // Sunset condition
            weatherContainer.style.backgroundColor = "#F7E9B9"; // Keep the yellow for sunset
            weatherContainer.style.color = "#F47775"; // Orange font color
            searchButton.style.backgroundColor ="#F47775"
            weatherImg.src = "assets/design-2/sunset.png"; // Change to sunset image
            weatherMessage = `The sun has set.<br>Enjoy the evening and night in ${CITY}!`;
        }
    } else if (weatherDescription.toLowerCase().includes("clouds") || 
               weatherDescription.toLowerCase().includes("fog") ||
               weatherDescription.toLowerCase().includes("haze")) {
        weatherContainer.style.backgroundColor = "#FFFFFF"; // White background
        weatherContainer.style.color = "#F47775"; // Orange font color
        searchButton.style.backgroundColor ="#F47775"
        weatherImg.src = "assets/design-2/noun_Cloud.svg";
        weatherMessage = `Light a fire and get cosy.<br>${CITY} is looking grey today.`;
    
    } else if (weatherDescription.toLowerCase().includes("snow")) {
        weatherContainer.style.backgroundColor = "#BDE8FA"; // Blue for cold weather
        weatherContainer.style.color = "#164A68"; // Blue font color
        searchButton.style.backgroundColor ="#164A68" //Blue font color
        weatherImg.src = "assets/design-2/snow.png";
        weatherMessage = `It is snowing today in ${CITY}.<br> Put on your winter clothes and get ready to play in the snow!`;

    } else if (weatherDescription.toLowerCase().includes("thunderstorm")) {
        weatherContainer.style.backgroundColor = "#BDE8FA"; // Blue for storm
        weatherContainer.style.color = "#164A68"; // Blue font color
        searchButton.style.backgroundColor ="#164A68" //Blue font color
        weatherImg.src = "assets/design-2/thunderstorm.png";
        weatherMessage = `Stormy weather ahead in ${CITY} today!<br> Seek shelter and avoid outdoor activities.`;
    } else {
        weatherContainer.style.backgroundColor = "white"; // Fallback background
        weatherContainer.style.color = "black"; // Fallback font color
        searchButton.style.backgroundColor ="black" //Blue font color
        weatherImg.src = "assets/design-2/sad-face-3.svg";
        weatherMessage = `The weather description cannot be picked up at the moment.`;
    }

    weatherMsg.innerHTML = weatherMessage; // Update the weather message display
}
