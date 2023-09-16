//Define API URLs and location.
const currentWeather_URL = `https://api.openweathermap.org/data/2.5/weather?q=`
const fiveDayWeather_URL = `https://api.openweathermap.org/data/2.5/forecast?q=`

let cityName = "Stockholm";// Default city is sthlm
const API_KEY = `5261612a788e0fbd6e1f5336fd150afe`
let currentWeather = `${currentWeather_URL}${cityName}&appid=${API_KEY}&units=metric`
let fiveDayWeather = `${fiveDayWeather_URL}${cityName}&appid=${API_KEY}&units=metric`
const forecastContainer = document.getElementById('forecastContainer');



//-----------------------------------
//Function that fetches the currentweather

const fetchCurrentWeather = () => {
  fetch(currentWeather) 
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {

      // console.log(data);
       
// These variables extract specific weather-related data from the OpenWeatherMap API response.
const cityName = data.name;
const currentTemperatures = data.main.temp.toFixed(1);// Sets temperature with one decimal
const weatherDescription = data.weather[0].description; // Get the weather description
const windSpeed = data.wind.speed;
const weatherID = data.weather[0].id;
const sunRise = data.sys.sunrise;
const sunSet = data.sys.sunset;
const timeZone = data.timezone;

// Find the DOM element 
const currentTemperature = document.getElementById('temperature');
const locationName = document.getElementById('locationName');
const windSpeedElement = document.getElementById('windSpeed');
const weatherDescriptionElement = document.getElementById('weatherDescription'); 
const sunRiseElement = document.getElementById('sunrise');
const sunSetElement = document.getElementById('sunset');
const weatherIDElement = document.getElementById('weather-symbol');


const sunriseTime = new Date((sunRise + timeZone) * 1000); // Multiply by 1000 to convert to milliseconds
const sunsetTime = new Date((sunSet + timeZone) * 1000); // Multiply by 1000 to convert to milliseconds

// Extract hours and minutes from the sunrise time
const sunriseHours = sunriseTime.getHours();
const sunriseMinutes = sunriseTime.getMinutes();

// Extract hours and minutes from the sunset time
const sunsetHours = sunsetTime.getHours();
const sunsetMinutes = sunsetTime.getMinutes();

// Format the sunrise and sunset times as strings with hours and minutes
const sunriseTimeString = `${sunriseHours.toString().padStart(2, '0')}:${sunriseMinutes.toString().padStart(2, '0')}`;
const sunsetTimeString = `${sunsetHours.toString().padStart(2, '0')}:${sunsetMinutes.toString().padStart(2, '0')}`;
const sunriseTimeStringGMT = sunriseTime.toISOString().substr(11, 5);
const sunsetTimeStringGMT = sunsetTime.toISOString().substr(11, 5);

// Update the weather description
weatherDescriptionElement.textContent = `${cityName} is reporting a ${weatherDescription} with a wind speed of ${windSpeed} m/s.`; 

//Sunrise sunset icons in description.
sunRiseElement.textContent = `☀️⬆ ${sunriseTimeStringGMT}`;
sunSetElement.textContent = `☀️⬇ ${sunsetTimeStringGMT}`;






//Function that displays weather icon based on weather id value fron the API.

function getWeatherText(weatherID) {
  if (weatherID >= 200 && weatherID < 300) {
    return "🌩️";
  } else if (weatherID >= 300 && weatherID < 500) {
    return "🌧️";
  } else if (weatherID >= 500 && weatherID < 600) {
    return "🌧️";
  } else if (weatherID >= 600 && weatherID < 700) {
    return "🌨️";
  } else if (weatherID >= 700 && weatherID < 800) {
    return "🌫️";
  } else if (weatherID === 800) {
    return "☀️";
  } else if (weatherID >= 801 && weatherID < 900) {
    return "☁️";
  } else {
    return "❌";
  }
}

const weatherText = getWeatherText(weatherID);

const weatherSymbolDiv = document.getElementById('weather-symbol');
if (weatherSymbolDiv) {
  weatherSymbolDiv.innerText = weatherText;
}

locationName.textContent = cityName;

// Update the DOM with the current temperature
currentTemperature.textContent = `${currentTemperatures}°C`;

})

.catch(error => {
   console.error('Error:', error);
 });
};


//Function that fetches the 5 day weather
const fetchFiveDayWeather = () => {
  // Clear any existing forecast data in the container
  forecastContainer.innerHTML = '';
  fetch(fiveDayWeather)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Extract the list of forecasts from the fetched data
      const forecastList = data.list;

      // Filter the forecasts to include only data at 12:00 PM
      const filteredForecast = forecastList.filter((item) =>
        item.dt_txt.includes("12:00")
      );

      // Function to get the day from a timestamp
      const getDay = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString("en", { weekday: "short" });
      };

      // Iterate through the filtered data and add it to the forecast container
      filteredForecast.forEach((forecast) => {
        const day = getDay(forecast.dt);
        const temperature = Math.round(forecast.main.temp * 10) / 10;

        // Add the day and temperature on the same line
        forecastContainer.innerHTML += `
        <div class="forecast-row">
        <div class="forecast-item">
          <span class="day-forecast">${day}</span>
          <span class="temperature-forecast">${temperature}°C</span>
        </div>
      </div>`;
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};
fetchCurrentWeather();
  fetchFiveDayWeather();


// Function to update the weather based on city input
const updateWeatherByCity = () => {
  const inputField = document.getElementById('location');
  cityName = inputField.value;

  // Update the currentWeather and fiveDayWeather URLs with the new cityName
  currentWeather = `${currentWeather_URL}${cityName}&appid=${API_KEY}&units=metric`;
  fiveDayWeather = `${fiveDayWeather_URL}${cityName}&appid=${API_KEY}&units=metric`;

  // Call the fetch functions again to update weather data based on the new city
  fetchCurrentWeather();
  fetchFiveDayWeather();

  // Clear the input field
  inputField.value = '';
};


// Add an event listener for the 'Enter' key press
const inputField = document.getElementById('location');
inputField.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    updateWeatherByCity();
  }
});

// Add an event listener for the search button click
const searchButton = document.getElementById('searchBtn');
searchButton.addEventListener('click', () => {
  updateWeatherByCity();
});

//fetchCurrentWeather();