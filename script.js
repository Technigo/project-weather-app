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

const currentTimeUTC = new Date();

let secondsToAdd;

const asyncFunction = async (city) => {
  try {
    const apiCallUrl = apiURL + city + suffix;
    console.log(apiCallUrl);
    // Take the argument from the function as "city", merge the APIUrl with the "city" argument and add suffix API detail
    // Add the result of this into one string that can be used to query the API
    const response = await fetch(apiCallUrl);
    const data = await response.json();
    console.log(data);

    // TIME UPDATE
    // TODO: Make function of this code
    //Set the seconds to add/subtract from UTC time
    let secondsToAdd = data.timezone;
    let millisecondsToAdd = secondsToAdd * 1000;
    currentTimeUTC.setMilliseconds(
      currentTimeUTC.getMilliseconds() + millisecondsToAdd
    );

    // ICON UPDATE
    const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    // SUNSET & SUNRISE UPDATE
    let sunrise = 1697001284;
    let sunset = 1697039649;
    sunrise = new Date(sunrise * 1000).getHours();
    sunset = new Date(sunset * 1000).toLocaleString();

    console.log(sunrise, sunset);

    //The HTML base for rendering queries
    weatherData.innerHTML = `
    <h1>${data.main.temp}</h1>
    <h2>${data.name}</h2>
    <span>Time: ${currentTimeUTC.getUTCHours()}:${currentTimeUTC.getUTCMinutes()} </span>
    <div>
      <p>${data.weather[0].main}</p>
      <img src="${weatherIcon}" alt="current image icon" />
    </div>
    <div>
      <p>sunrise 07:14</p>
      <p>sunset 17:54</p>
    </div>
    `;

    //Add icon to
  } catch (error) {
    console.log("This is the error: ", error);
  }
};

asyncFunction("stockholm, Sweden");

// Reformat the function to accept the name of the city as an argument
