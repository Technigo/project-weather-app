// API key name: technigo-weather-app

// API key: 00cf2e54cabfd29c16426be71518c00a

// API URL: https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=YOUR_API_KEY

// const asyncFunction = async() => {
// 	try {
// 		const response = await fetch(URL);
// 		const data = await response.json();
// 		//Do something here
// 	} catch (error) {
// 		console.log('This is the error: ' error)
// 	}
// }

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
    <span>Time: ${getUTCTime(data.timezone).getUTCHours()}:${getUTCTime(
      data.timezone
    ).getUTCMinutes()} </span>
    <div class="flex-left">
      <p>${data.weather[0].main}</p>
      <img src="${weatherIcon}" alt="current image icon" />
    </div>
    <div class="flex-space-around">
      <p>sunrise ${formatTime(sunriseDate)}</p>
      <p>sunset ${formatTime(sunsetDate)}</p>
    </div>
    `;

    //Add icon to
  } catch (error) {
    console.log("This is the error: ", error);
  }
};

asyncFunction("bangkok,thailand");

// Function to format the time as HH:MM (24-hour format)
function formatTime(date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
