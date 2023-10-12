// API key name: technigo-weather-app

// API key: 00cf2e54cabfd29c16426be71518c00a

// API URL: https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=YOUR_API_KEY

// Get all data from Weather API using fetch and console log the object/array
// Save key to variable
// Save data to variable

//Globals
const apiKey = "00cf2e54cabfd29c16426be71518c00a";
// const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${apiKey}`;
const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=`;
const suffix = `&units=metric&APPID=${apiKey}`;

// Elements
const weatherData = document.getElementById("header__weather-data");

//A function that adjusts for timezone in the API object
const getUTCTime = (secondsToAdd) => {
  let millisecondsToAdd = secondsToAdd * 1000;
  const currentTimeUTC = new Date();
  const adjustTime = new Date(
    currentTimeUTC.setMilliseconds(
      currentTimeUTC.getMilliseconds() + millisecondsToAdd
    )
  );
  return adjustTime;
};

const asyncFunction = async (city) => {
  try {
    const apiCallUrl = apiURL + city + suffix;
    console.log(apiCallUrl);
    // Take the argument from the function as "city", merge the APIUrl with the "city" argument and add suffix API detail
    // Add the result of this into one string that can be used to query the API
    const response = await fetch(apiCallUrl);
    const data = await response.json();
    console.log(data);

    // SUNSET & SUNRISE UPDATE
    // Replace these values with your actual timestamps

    // Create Date objects from the timestamps
    const sunriseDate = new Date(data.sys.sunrise * 1000);
    const sunsetDate = new Date(data.sys.sunset * 1000);

    // ICON UPDATE
    const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    //The HTML base for rendering queries
    weatherData.innerHTML = `
    <h1>
    ${parseInt(data.main.temp)}
    </h1>
    <h2>${data.name}</h2>
    <span>Time: ${getUTCTime(data.timezone).getUTCHours().toString().padStart(2, '0')}:${getUTCTime(
      data.timezone
    ).getUTCMinutes().toString().padStart(2, '0')} </span>
    <div class="flex-left">
      <p>${data.weather[0].main}</p>
      <img src="${weatherIcon}" alt="current image icon" />
    </div>
    <div class="flex-space-around">
      <p>sunrise ${formatTime(sunriseDate)}</p>
      <p>sunset ${formatTime(sunsetDate)}</p>
    </div>
    `;
    // Get the forecast
    getForecast(data.coord.lat, data.coord.lon)
    //Add icon to
  } catch (error) {
    console.log("This is the error: ", error);
  }
};

asyncFunction("vancouver");



// Get forecast for the coming 4 days (Sebastian)

//Make a function that takes 2 arguments, latitude and longitude

const getForecast = async(latitude, longitude) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}${suffix}`);
    const data = await response.json();
    // Get an array of the forecasts
    const forecastArray = [...data.list];
  
    // Filter out only forecasts for 9 ó clock
    const filteredArray = forecastArray.filter((day) =>{
      return day.dt_txt.toLowerCase().endsWith("09:00:00");
    })
    // Loop over the filteredArray get the day of the week from dt and save it as a variable called "dayOfTheWeek"
    filteredArray.forEach((day, index)=>{
      if (index < 4){
        let timestamp = day.dt;
        let date = new Date(timestamp * 1000);
        let dayOfTheWeek = date.toLocaleDateString("en-US", { weekday: "short" });
        // Render the needed data on the page
        document.querySelector('.forecast__container').innerHTML += `
        <div class="forecast__single-day-flex">
          <span class="forecast__day">${dayOfTheWeek}</span>
          <span class="forecast__image"><img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="" /></span>
          <span class="forecast__temp">${parseInt(day.main.temp)} °C</span>
          <span class="forecast__wind">${day.wind.speed}m/s</span>
        </div>      
        ` 
      } else return;
    })
  }catch (error) {
    console.log("Could not contact the weather forecast API", error);
  }
}


// In the function, create the html for every day with template literals

// Function to format the time as HH:MM (24-hour format)
function formatTime(date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

