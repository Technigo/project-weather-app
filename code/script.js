// All global variables
const cityName = document.getElementById("cityName"); // Change variable name from city to cityName to differentiate with the variable "city" below
const tempToday = document.getElementById("tempToday");
const tempTextCelsius = document.getElementById("tempTextCelsius"); // NEW
const localTime = document.getElementById("localTime"); // NEW
const weatherDescription = document.getElementById("weatherDescription");

const APIKEY = "a0251d9b53172abcbe6a9263f3d13544"; // Change name to CAPITAL as it won't change throughout the file
let city = "London"; // Initiate variable "city" in order to update it later when switching to other cities

// Function to display data about today's weather, using the city as the argument
const todaysWeather = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${APIKEY}`)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        console.log(json);
        // Display city name and today's temperature
        cityName.innerText = `${json.name}`;
        tempToday.innerText = `${json.main.temp.toFixed(1)}`;
        tempTextCelsius.innerText = "°C";

        // Display weather description with the first letter of each word capitalized
        const descriptionFromJSON = json.weather[0].description;
        const wordsArray = descriptionFromJSON.split(" ");
        const capitalizedDescription = wordsArray.map((word) => {
            return word[0].toUpperCase() + word.substring(1)
        }).join(" ");
        weatherDescription.innerText = `${capitalizedDescription}`; 
        
        // Display current time (hours:minutes) using the data on time and timezone (in miliseconds) as an epoch timestamp multiplied by 1000
        const currentLocalTime = new Date((json.dt+json.timezone)*1000);
        localTime.innerText = `Time: ${currentLocalTime.getHours()}:${currentLocalTime.getMinutes()}`;
    })
}

todaysWeather("London");


