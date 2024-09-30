
//STEP 1: constructing the BASE URL 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid='
const API_KEY = '1bd3fe8b6571a9e92c6d24232e62bdc8'

const URL = `${BASE_URL}${API_KEY}`

//STEP 2: URL for Weather Forecast
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&appid='

const forecastURL = `${FORECAST_URL}${API_KEY}`

// DOM Selectors
const weatherLocation = document.getElementById("location");
const temperature = document.getElementById("temp");
const weatherCondition = document.getElementById("condition");
const sunriseDisplay = document.getElementById("sunriseID");
const sunsetDisplay = document.getElementById("sunsetID");
const forecast = document.getElementById("forecastID")
const locationCard = document.getElementById("locationCard")
//DOM Selectors - Images 
const sunImg = document.getElementById("sun");
const cloudsImg = document.getElementById("cloudsImg");
const rainImg = document.getElementById("rainImg");
const brokenCloudsImg = document.getElementById("brokenCloudsImg");
const moonImg = document.getElementById("moonImg")

//FUNCTIONS
//Function to handle errors
const handleError = (errorMessage) => {
  console.error('Error fetching data:', errorMessage);
  forecast.innerHTML = "Unable to retrieve weather data.";
};

// Function to convert UNIX timestamp to readable time format
const convertUnixToTime = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000);
  //Round the number to a format without seconds
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Function to format timestamp to date string (YYYY-MM-DD)
const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toISOString().split('T')[0]; // Get only the date part
};

// Function to get day of the week from date string
const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return daysOfWeek[date.getDay()];
};

// Initialize an object to hold daily min and max temps
const dailyTemps = {};

//Fetching data from the IPA for current weather
fetch(URL)
  .then(response => response.json())
  .then(data => {
    console.log(data);

    const stockholm = data.name;
    const stockholmTemp = data.main.temp;
    const roundedTemp = Math.round(stockholmTemp);
    const displayCondition = data.weather[0].description;

    //changing the innerHTML for city, temp and condition. 
    weatherLocation.innerText = `${stockholm}`;
    temperature.innerHTML =
      `<span class="temp-number">${roundedTemp}</span><span class="temp-unit">°C</span>`;
    weatherCondition.innerText = `${displayCondition}`;

    //Get the sunrise and sunset
    const sunriseTime = convertUnixToTime(data.sys.sunrise);
    const sunsetTime = convertUnixToTime(data.sys.sunset);

    // Display sunrise and sunset times in innerText
    sunriseDisplay.innerText = `Sunrise ${sunriseTime}`;
    sunsetDisplay.innerText = `Sunset  ${sunsetTime}`;

    // Create a new Date object
    const date = new Date();

    // Get the time offset for Stockholm (CET/CEST: Central European Time/ Central European Summer Time)
    const options = {
      timeZone: "Europe/Stockholm",
      hour: "2-digit",
    };

    const stockholmTime = date.toLocaleTimeString("sv-SE", options);

    // Hide all images 
    sunImg.classList.add("hidden");
    cloudsImg.classList.add("hidden");
    rainImg.classList.add("hidden");
    brokenCloudsImg.classList.add("hidden");
    moonImg.classList.add("hidden");

    // Change image & background if condition is sunny/cloudy and if the time is night/day
    switch (true) {
      case displayCondition.includes("clear"):
        if (stockholmTime >= 6 && stockholmTime < 21) {
          // Daytime clear weather
          sunImg.classList.remove("hidden");
          sunImg.classList.add("visible");
          moonImg.classList.add("hidden");
          locationCard.classList.remove("location-card-night");
          locationCard.classList.add("location-card");
        } else {
          // Nighttime clear weather
          moonImg.classList.remove("hidden");
          moonImg.classList.add("visible");
          sunImg.classList.add("hidden");
          locationCard.classList.add("location-card-night");
        }
        break;

      case displayCondition.includes("cloud"):
        if (stockholmTime >= 6 && stockholmTime < 21) {
          // Daytime cloudy weather
          cloudsImg.classList.remove("hidden");
          cloudsImg.classList.add("visible");
          moonImg.classList.add("hidden");
          locationCard.classList.remove("location-card-night");
          locationCard.classList.add("location-card");
        } else {
          // Nighttime cloudy weather
          moonImg.classList.remove("hidden");
          moonImg.classList.add("visible");
          cloudsImg.classList.add("hidden");
          locationCard.classList.add("location-card-night");
        }
        break;

      case displayCondition.includes("rain"):
        if (stockholmTime >= 6 && stockholmTime < 21) {
          // Daytime rainy weather
          rainImg.classList.remove("hidden");
          rainImg.classList.add("visible");
          moonImg.classList.add("hidden");
          locationCard.classList.remove("location-card-night");
          locationCard.classList.add("location-card-rainy");
        } else {
          // Nighttime rainy weather
          moonImg.classList.remove("hidden");
          moonImg.classList.add("visible");
          rainImg.classList.add("hidden");
          locationCard.classList.add("location-card-night");
        }
        break;

      case displayCondition.includes("broken"):
        if (stockholmTime >= 6 && stockholmTime < 21) {
          // Daytime broken clouds
          brokenCloudsImg.classList.remove("hidden");
          brokenCloudsImg.classList.add("visible");
          moonImg.classList.add("hidden");
          locationCard.classList.remove("location-card-night");
          locationCard.classList.add("location-card");
        } else {
          // Nighttime broken clouds
          moonImg.classList.remove("hidden");
          moonImg.classList.add("visible");
          brokenCloudsImg.classList.add("hidden");
          locationCard.classList.add("location-card-night");
        }
        break;

      default:
        locationCard.classList.add("location-card");
        moonImg.classList.add("hidden");
    }

  })
  .catch(error => handleError(error));


// Fetching data from the forecastURL
fetch(forecastURL)
  .then(response => response.json())
  .then(data => {
    console.log(data);

    // Iterate through the weather forecast
    data.list.forEach((forecast) => {
      const date = formatDate(forecast.dt);
      const minTemp = forecast.main.temp_min;
      const maxTemp = forecast.main.temp_max;

      // Initialize the entry for the date if it doesn't exist
      if (!dailyTemps[date]) {
        dailyTemps[date] = { min: minTemp, max: maxTemp };
      } else {
        // Update the min and max temps for the day
        dailyTemps[date].min = Math.min(dailyTemps[date].min, minTemp);
        dailyTemps[date].max = Math.max(dailyTemps[date].max, maxTemp);
      }
    });

    // Extract the next four days' temperatures and convert date to day name
    const nextFourDays = Object.entries(dailyTemps)
      //Getting the current day + the following 4 days
      .slice(0, 5)
      .map(([date, temps]) => ({
        date: getDayOfWeek(date),
        min: temps.min,
        max: temps.max,
      }));

    // Render the forecast data in the browser
    renderForecast(nextFourDays);
  })
  .catch(error => handleError(error));


// Function to render forecast data in the browser
const renderForecast = (forecastData) => {
  forecast.innerHTML = "";
  let forecastContent = "";

  forecastData.forEach(day => {
    forecastContent +=
      `<li class="forecast-item">
        <span class="day-date">${day.date}</span>
        <span class="temp-info">${Math.round(day.min)}° / ${Math.round(day.max)}°C</span>
      </li>`;
  });

  forecast.innerHTML = forecastContent;
};




