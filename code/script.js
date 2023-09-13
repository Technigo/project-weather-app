// All global variables
const cityName = document.getElementById("cityName"); // Change variable name from city to cityName to differentiate with the variable "city" below
const tempToday = document.getElementById("tempToday");
const tempTextCelsius = document.getElementById("tempTextCelsius"); // NEW
const localTime = document.getElementById("localTime"); // NEW
const weatherDescription = document.getElementById("weatherDescription");
const forecastWeekdays = document.getElementById("forecastWeekdays"); // NEW
const forecastIcon = document.getElementById("forecastIcon"); // NEW
const forecastTemp = document.getElementById("forecastTemp"); // NEW
const forecastWind = document.getElementById("forecastWind"); // NEW

const APIKEY = "a0251d9b53172abcbe6a9263f3d13544"; // Change name to CAPITAL as it won't change throughout the file
let city = "London"; // Initiate variable "city" in order to update it later when switching to other cities

// Function to display data about today's weather, using the city as the argument
const todaysWeather = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${APIKEY}`)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        console.log(json); // to be deleted before hand-in
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
        const localTimeValue = currentLocalTime.toLocaleTimeString("en-GB", {timeStyle: "short", timeZone: "UTC"});
        localTime.innerText = `Time: ${localTimeValue}`;
    })
}

// Function to display five-day weather forecast
const fiveDaysForecast = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${APIKEY}`)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            console.log(json); // to be deleted before hand-in
            // Filter the weather forecast data so it only contains data at 12:00 every day
            const filteredForecastData = json.list.filter((dataPoint) => (dataPoint.dt_txt.includes("12:00")));
            console.log(filteredForecastData); // to be deleted before hand-in
            
            filteredForecastData.forEach((dataPoint) => {
                // Convert data in dt in the filtered weather forecast data to date and time and extract the weekday from there
                const weekDay = new Date(dataPoint.dt * 1000).toString().split(" ")[0];
                let { icon } = dataPoint.weather[0]; // the whole object with icon id, weather code and description is needed to be able to identify the corresponding icon
                const temp = dataPoint.main.temp.toFixed(1);
                const windSpeed = dataPoint.wind.speed;

                forecastWeekdays.innerHTML += `<p>${weekDay}</p>`;
                forecastTemp.innerHTML += `<p>${temp}°C</p>`;
                forecastIcon.innerHTML += `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" />` //Source for weather codes and icons: https://openweathermap.org/weather-conditions
                forecastWind.innerHTML += `<p>${windSpeed}m/s</p>`;
            });
             
        })
}

// Invoke functions for today's weather and five-day forecast with the base city as argument
todaysWeather("London");
fiveDaysForecast("London");
