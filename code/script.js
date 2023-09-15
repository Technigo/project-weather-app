
const currentWeather_URL = `https://api.openweathermap.org/data/2.5/weather?q=`
// const fiveDayWeather_URL = `https://api.openweathermap.org/data/2.5/forecast?q=`
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key} // Coordinates by location name

const API_KEY = `5261612a788e0fbd6e1f5336fd150afe`

const cityName = "Visby";

const currentWeather = `${currentWeather_URL}${cityName}&appid=${API_KEY}&units=metric`
// const fiveDayWeather = `${fiveDayWeather_URL}${cityName}&appid=${API_KEY}&units=metric`



// https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid={API key}&units=metric



//-----------------------------------
//Function that fetches the currentweather

const fetchCurrentWeather = () => {
  fetch(currentWeather) // Use the variable currentWeather here
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {

      console.log(data);
       // console.log(data.main.temp);
// Extract the temperature data (in Celsius) from the API response
const cityName = data.name;
const currentTemperatures = data.main.temp.toFixed(1);
const weatherDescription = data.weather[0].description; // Get the weather description
const windSpeed = data.wind.speed;



//---------------------------------------------------------

const weatherID = data.weather[0].id;

console.log(weatherID);



//---------------------------------------------------------


const sunRise = data.sys.sunrise;
const sunSet = data.sys.sunset;
const timeZone = data.timezone;

//---------------------------------------------------------



// Find the DOM element with id "temperature"
const currentTemperature = document.getElementById('temperature');
const locationName = document.getElementById('locationName');
const windSpeedElement = document.getElementById('windSpeed');
const weatherDescriptionElement = document.getElementById('weatherDescription'); 
//const weatherIconElement = document.getElementById("weatherIcon"); // Add this line

const sunRiseElement = document.getElementById('sunrise');
const sunSetElement = document.getElementById('sunset');
const weatherIDElement = document.getElementById('weather-symbol');



//---------------------------------------------------------


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



//---------------------------------------------------------

// Update the DOM with the current temperature
locationName.textContent = cityName;

currentTemperature.textContent = `${currentTemperatures}°C`;
windSpeedElement.textContent = `${windSpeed} m/s`;
weatherDescriptionElement.textContent = `${weatherDescription}`; // Update the weather description
// weatherIconElement.textContent = `${weatherIcon}`;

sunRiseElement.textContent = `${sunriseTimeStringGMT}`;

sunSetElement.textContent = `${sunsetTimeStringGMT}`;






//---------------------------------------------------------


// weatherIDElement.textContent = `${weatherID}`;


console.log(weatherDescription);

// imageElement = document.getElementById("imageElement");

// imageElement.src = "./images/test.png";

// Get a reference to the image element by its id
let imageElement = document.getElementById("imageElement");

// Check if 'weatherID' is exactly "800"
if (weatherID === "800") {
    // Set the src attribute to "test6.png" in the "images" folder
    imageElement.src = "./images/test6.png";
} else if (/^2\d{2}$/.test(weatherID)) {
    // Set the src attribute to "test.png" in the "images" folder
    imageElement.src = "./images/test.png";
} else if (/^3\d{2}$/.test(weatherID)) {
    // Set the src attribute to "test2.png" in the "images" folder
    imageElement.src = "./images/test2.png";
} else if (/^5\d{2}$/.test(weatherID)) {
    // Set the src attribute to "test3.png" in the "images" folder
    imageElement.src = "./images/test3.png";
} else if (/^6\d{2}$/.test(weatherID)) {
    // Set the src attribute to "test4.png" in the "images" folder
    imageElement.src = "./images/test4.png";
} else if (/^8\d{2}$/.test(weatherID)) {
    // Set the src attribute to "test7.png" in the "images" folder
    imageElement.src = "./images/test7.png";
} else {
    // Set a default image source if 'weatherID' doesn't match any pattern
    imageElement.src = "./images/default.png"; // You can change this to your desired default image
}



//---------------------------------------------------------

    
    })

   .catch(error => {
      console.error('Error:', error);
    });
};

// Call the fetchCurrentWeather function to initiate the fetch request
fetchCurrentWeather();