
//STEP 1: constructing the BASE URL 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid='
const API_KEY = '1bd3fe8b6571a9e92c6d24232e62bdc8'

const URL = `${BASE_URL}${API_KEY}`

console.log(URL)

//STEP 2: URL for Weather Forecast
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&appid='

const forecastURL = `${FORECAST_URL}${API_KEY}`

console.log(forecastURL)


// DOM Selectors
const weatherLocation = document.getElementById("location");
const temperature = document.getElementById("temp");
const weatherCondition = document.getElementById("condition");
const sunriseDisplay = document.getElementById("sunriseID");
const sunsetDisplay = document.getElementById("sunsetID");

//FUNCTIONS
// Function to convert UNIX timestamp to readable time format
const convertUnixToTime = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000);
  //Round the number to a format without seconds
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

//Function to make the background adapt to the weathercondition
const makeElementSunny = (element) => {
  element.classList.remove("weather-card")
  element.classList.add("weather-card-sunny")
}
//Fetching data from the IPA for current weather
fetch(URL)
  .then(response => response.json())
  .then(data => {
    console.log(data);

    const stockholm = data.name;
    const stockholmTemp = data.main.temp;
    const roundedTemp = Math.round(stockholmTemp);
    const displayCondition = data.weather[0].description;;

    //changing the innerHTML for city, temp and condition. 
    weatherLocation.innerText = `${stockholm}`;
    temperature.innerHTML =
      `<span class="temp-number">${roundedTemp}</span><span class="temp-unit">°C</span>`;
    weatherCondition.innerText = `${displayCondition}`;

    //Get the sunrise and sunset
    const sunriseTime = convertUnixToTime(data.sys.sunrise);
    const sunsetTime = convertUnixToTime(data.sys.sunset);

    // Display sunrise and sunset times
    sunriseDisplay.innerText = `Sunrise ${sunriseTime}`;
    sunsetDisplay.innerText = `Sunset ${sunsetTime}`;

    // switch(displayCondition) {
    //   case "Clear":
    //     makeElementSunny(document.getElementById("--"))
    //     break
    //   case "Cloudy":
    //     ...
    //     break
    // }

    // if (displayCondition == "Clear") {
    //   makeElementSunny(document.getElementById("--"))
    // } else if()

  })
  .catch(error => console.error('Error fetching data:', error));


//Fetching data from the forecastURL
fetch(forecastURL)
  .then(response => response.json())
  .then(data => {
    console.log(data)


    // Helper function to format timestamp to date string (YYYY-MM-DD)
    const formatDate = (timestamp) => {
      const date = new Date(timestamp * 1000);
      return date.toISOString().split('T')[0]; // Get only the date part
    };

    // Initialize an object to hold daily min and max temps
    const dailyTemps = {};

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

    // Extract the next four days' temperatures
    const nextFourDays = Object.entries(dailyTemps).slice(0, 4).map(([date, temps]) => ({
      date,
      min: temps.min,
      max: temps.max,
    }));

    console.log(nextFourDays); // Output the result
  })
  .catch(error => {
    console.error('Error fetching weather data:', error); // Handle errors
  });




