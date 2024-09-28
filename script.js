
 //Current weather API
//ea9a90c62aeaaa3811505087d195520e
//https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ea9a90c62aeaaa3811505087d195520e

// base URL + api key

// //Forecast API 
// https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=ea9a90c62aeaaa3811505087d195520e


//Current Weather API
//True constants (SNAKECASE)
const API_KEY = "ea9a90c62aeaaa3811505087d195520e"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID="

const URL = (`${BASE_URL}${API_KEY}`)

console.log (URL)

 //Forecast Weather API
//True constants (SNAKECASE)
const FORECAST_API_KEY = "ea9a90c62aeaaa3811505087d195520e"
const FORECAST_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID="

const FORECAST_URL = (`${FORECAST_BASE_URL}${API_KEY}`)

console.log (FORECAST_URL)

// DOM Selectors
const temperatureDisplay = document.getElementById("temperature");
const conditionDisplay = document.getElementById("condition");
const sunriseDisplay = document.getElementById("sunriseTime");
const sunsetDisplay = document.getElementById("sunsetTime");
const weatherImg = document.getElementById("weatherImage");
const weatherMsg = document.getElementById("weatherMessage");
const forecast = document.getElementById("forecastList");

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

    })
    .catch(error => console.error('Error fetching weather data:', error)); // Handle errors

  // Fetch Forecast weather data

  fetch(FORECAST_URL)
  .then (response=> response.json())
   .then(forecastData => {

    // Clear previous forecast list if necessary
    forecastList.innerHTML = ''


     // Loop through the first 7 days of the forecast
     for (let i = 0; i < 5; i++) {
        const forecast = forecastData.list[i * 8 + 6]; // Get the forecast for 12 PM each day

        // Check if the forecast exists
        if (forecast) {
            // Get the week day and temperature
            const weekDay = new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
            const temperature = Math.round(forecast.main.temp);

            // Create a new list item
            const listItem = document.createElement('li');
            listItem.textContent = `${weekDay}: ${temperature}°C`;
            
            // Append the list item to the forecast list
            forecastList.appendChild(listItem);

            console.log(forecast)
        }
     }
    })


    


.catch(error => console.error('Error fetching forecast data:', error));


    function updateUI(temperature, weatherDescription) {
        const weatherContainer = document.getElementById("weatherContainer");
        let weatherMessage //Use let since the variable weatherMessage will change depending on weather

        // Update background and text color based on weather condition
        if (weatherDescription.toLowerCase().includes("rain") || 
            weatherDescription.toLowerCase().includes("drizzle")|| 
            weatherDescription.toLowerCase().includes("mist")) {
            weatherContainer.style.backgroundColor = "#BDE8FA" // Blue for rain
            weatherContainer.style.color = "#164A68" // Rainy font color
            weatherImg.src = "assets/design-2/noun_Umbrella.svg"
            weatherMessage = "Don’t forget your umbrella.<br>It’s wet in Stockholm today."
        } else if (weatherDescription.toLowerCase().includes("few clouds")) {
             weatherContainer.style.backgroundColor = "#F7E9B9" //  Yellow for clear sky
             weatherContainer.style.color = "#2A5510" // Green font color 
             weatherImg.src = "assets/design-2/noun_Sunglasses.svg" 
            weatherMessage = `Get your sunnies on. There are a few clouds, but it's still a lovely day in Stockholm.`
        } else if (weatherDescription.toLowerCase().includes("scattered clouds")) {
            weatherContainer.style.backgroundColor = "#F7E9B9" //  Yellow for clear sky
            weatherContainer.style.color = "#2A5510" // Green font color 
            weatherImg.src = "assets/design-2/noun_Sunglasses.svg" 
           weatherMessage = `There are some scattered clouds, but it's still a lovely day in Stockholm.`
         } else if (weatherDescription.toLowerCase().includes("clear")) {
             weatherContainer.style.backgroundColor = "#F7E9B9" // Yellow for clear sky
             weatherContainer.style.color = "#2A5510" // Green font color
             weatherImg.src = "assets/design-2/noun_Sunglasses.svg"
             weatherMessage = `Get your sunnies on.<br>Stockholm is looking rather great today.`
         } else if (weatherDescription.toLowerCase().includes("clouds"|| weatherDescription.toLowerCase().includes("fog")
            || weatherDescription.toLowerCase().includes("haze")|| weatherDescription.toLowerCase().includes("snow"))) {
            weatherContainer.style.backgroundColor = "#FFFFFF"; // White background
            weatherContainer.style.color = "#F47775" // Orange font color
            weatherImg.src = "assets/design-2/noun_Cloud.svg"
            weatherMessage = "Light a fire and get cosy.<br>Stockholm is looking grey today."  
        } else {
            weatherContainer.style.backgroundColor = "white"; // Fallback background
            weatherContainer.style.color = "black"; // Fallback font color
            weatherImg.src = "assets/design-2/sad-face-3.svg"
            weatherMessage = `The weather description cannot be picked up at the moment`
        
        }

        weatherMsg.innerHTML = weatherMessage; // Update the weather message display
    }