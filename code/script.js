// Base URL
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Your API key
const API_KEY = '958c2b8d78ace5950d5c51dc2972950f';

// Set the city and country for the weather forecast
let city = 'Stockholm';
let country = 'Sweden';
const units = 'metric'; // Use metric units (Celsius)

// Construct the URL for current weather data
const url = `${BASE_URL}?q=${city},${country}&units=${units}&APPID=${API_KEY}`;

// Construct the URL for forecast data
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=${units}&APPID=${API_KEY}`;

// DOMs
const temperatureElement = document.getElementById("temperature");
const locationElement = document.getElementById("location");
const conditionElement = document.getElementById("condition");
const conditionIconElement = document.getElementById("conditionIcon");
const sunriseElement = document.getElementById("sunriseTime");
const sunsetElement = document.getElementById("sunsetTime");
const timeElement = document.getElementById("time");
const forecastElement = document.getElementById("forecast");


// Function to fetch and display current weather data
const getWeatherData = () => {
    fetch(url)
      .then(response => response.json())
      .then(json => {
        // Get data from the API response
        const temperature = Math.round(json.main.temp);
        const location = json.name; 
        const condition = json.weather[0].description; 
        const iconCode = json.weather[0].icon;
        const sunriseTime = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const sunsetTime = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Get the current local time
        const localTime = new Date();
        const formattedTime = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Update the HTML elements with the weather data
        temperatureElement.textContent = `${temperature}`;
        locationElement.textContent = `${location}`;
        conditionElement.textContent = `${condition}`;
        conditionIconElement.src = `http://openweathermap.org/img/wn/${iconCode}.png`;
        conditionIconElement.alt = condition;
        sunriseElement.textContent = `Sunrise: ${sunriseTime}`;
        sunsetElement.textContent = `Sunset: ${sunsetTime}`;
        timeElement.textContent = `Time: ${formattedTime}`;

        // Set the background based on the weather condition
        setWeatherBackground(json.weather[0].main);

      });
  }

// Function to set the background image based on weather condition
const setWeatherBackground = (weatherCondition) => {
  const imageBackground = document.getElementById('imageBackground');
  
  switch(weatherCondition.toLowerCase()) {
    case 'clear':
      imageBackground.style.backgroundImage = "url('/assets/clear-sky.jpg')";
      break;
    case 'clouds':
      imageBackground.style.backgroundImage = "url('/assets/cloudy.jpg')";
      break;
    case 'rain':
    case 'drizzle':
      imageBackground.style.backgroundImage = "url('/assets/rainy.jpg')";
      break;
    case 'thunderstorm':
      imageBackground.style.backgroundImage = "url('/assets/thunderstorm.jpg')";
      break;
    case 'snow':
      imageBackground.style.backgroundImage = "url('/assets/snowy.jpg')";
      break;
    case 'mist':
    case 'smoke':
    case 'haze':
    case 'fog':
      imageBackground.style.backgroundImage = "url('/assets/misty.jpg')";
      break;
    default:
      imageBackground.style.backgroundImage = "url('/assets/default.jpg')";
  }
};


// Function to fetch and display forecast data
const getForecastData = () => {
  fetch(FORECAST_URL)
    .then(response => response.json())
    .then(json => {
      // Process the forecast data
      let forecastData = processForecastData(json.list);
      // If we don't have 5 days of forecast, fill in with additional data
      if (forecastData.length < 5) {
        forecastData = fillForecastData(forecastData, json.list);
      }
      // Display the processed forecast data
      displayForecast(forecastData);
    });
};

// Function to process the raw forecast data
const processForecastData = (list) => {
  const today = new Date().getDate();
  
  return list
    // Transform each item into an object with the data we need
    .map(item => ({
      date: new Date(item.dt * 1000),
      icon: item.weather[0].icon,
      temp: Math.round(item.main.temp)
    }))
    // Filter out today's weather and nighttime forecasts
    .filter(item => {
      const hour = item.date.getHours();
      return item.date.getDate() !== today && hour >= 6 && hour <= 18;
    })
    // Reduce to max 5 items, one per day
    .reduce((acc, item) => {
      if (acc.length < 5 && (acc.length === 0 || item.date.getDate() !== acc[acc.length - 1].date.getDate())) {
        acc.push(item);
      }
      return acc;
    }, []);
};

// Function to fill in missing forecast days if we don't have 5
const fillForecastData = (forecast, list) => {
  const today = new Date().getDate();
  let i = 0;
  
  while (forecast.length < 5 && i < list.length) {
    const date = new Date(list[i].dt * 1000);
    if (date.getDate() !== today && (forecast.length === 0 || date.getDate() !== forecast[forecast.length - 1].date.getDate())) {
      forecast.push({
        date: date,
        icon: list[i].weather[0].icon,
        temp: Math.round(list[i].main.temp)
      });
    }
    i++;
  }
  
  return forecast;
};

// Function to display the forecast data in the HTML
const displayForecast = (forecastData) => {
  // Clear any existing forecast
  forecastElement.innerHTML = '';
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Create and append a forecast item for each day
  forecastData.forEach(day => {
      const dayName = daysOfWeek[day.date.getDay()];
      const forecastItem = document.createElement('div');
      forecastItem.classList.add('forecast-item');
      forecastItem.innerHTML = `
          <div class="forecast-section">
            <span class="forecast-day">${dayName}</span>
            <img src="http://openweathermap.org/img/wn/${day.icon}.png" alt="Weather icon">
            <span class="forecast-temp">${day.temp}°C</span>
          </div>
      `;  
      forecastElement.appendChild(forecastItem);
  });
};

// Call both functions to initialize the weather app
getWeatherData();
getForecastData();