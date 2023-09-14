// All global variables
const cityName = document.getElementById("cityName"); // Change variable name from city to cityName to differentiate with the variable "city" below
const tempToday = document.getElementById("tempToday");
const tempTextCelsius = document.getElementById("tempTextCelsius"); // NEW
const localTime = document.getElementById("localTime"); // NEW
const weatherDescription = document.getElementById("weatherDescription");
const mainIcon = document.getElementById("mainIcon");
const sunriseText = document.getElementById("sunriseText");
const sunsetText = document.getElementById("sunsetText");

const forecastWeekdays = document.getElementById("forecastWeekdays"); // NEW
const forecastIcon = document.getElementById("forecastIcon"); // NEW
const forecastTemp = document.getElementById("forecastTemp"); // NEW
const forecastWind = document.getElementById("forecastWind"); // NEW
const inputField = document.getElementById("inputField"); // NEW

const searchBtn = document.getElementById("searchBtn"); // NEW
const switchBtn = document.getElementById("switchBtn"); // NEW

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

        // Display main weather icon
        let { icon } = json.weather[0];
        mainIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" />`; 
        
        // Display current time (hours:minutes) using the data on time and timezone (in seconds) as an epoch timestamp multiplied by 1000
        const currentLocalTime = new Date((json.dt+json.timezone)*1000);
        const localTimeValue = currentLocalTime.toLocaleTimeString("en-GB", {timeStyle: "short", timeZone: "UTC"});
        localTime.innerText = `Time: ${localTimeValue}`;

        // UG Below: Sunrise here we go - "Making" the sunriseTime, using "Date() and putting json.sys..sunrise which is the system-time from a certain "unix"-timestamp in the 70s(link to info in instructions. So json.sys.sunrise + json.timezone together, times 1000 so we get the milliseconds)
        const sunriseTime = new Date((json.sys.sunrise + json.timezone)*1000);       
        sunriseTime.setMinutes(sunriseTime.getMinutes() + sunriseTime.getTimezoneOffset())
        // The timestyle and short makes the time in the ==:== format.
        const sunriseShort = sunriseTime.toLocaleTimeString(['en-GB'], { timeStyle: 'short' });        
        const sunsetTime = new Date((json.sys.sunset + json.timezone)*1000);
        sunsetTime.setMinutes(sunsetTime.getMinutes() + sunsetTime.getTimezoneOffset())
        const sunsetShort = sunsetTime.toLocaleTimeString(['en-GB'], { timeStyle: 'short' });
        // And this swaps the html between sunrise and sunset 
        sunriseText.innerHTML = `<p>Sunrise</p> <p class="time-data">${sunriseShort}</p>`;
        sunsetText.innerHTML = `<p>Sunset</p> <p class="time-data">${sunsetShort}</p>`;
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
            // Find out the weekday of today
            const today = new Date().toString().split(" ")[0];

            // Filter the weather forecast data so it only contains data at 12:00 every day
            const filteredForecastData = json.list.filter((dataPoint) => (dataPoint.dt_txt.includes("12:00")));
            console.log(filteredForecastData); // to be deleted before hand-in
            
            filteredForecastData.forEach((dataPoint) => {
                // Convert data in dt in the filtered weather forecast data to date and time and extract the weekday from there
                const weekDay = new Date(dataPoint.dt * 1000).toString().split(" ")[0];
                let { icon } = dataPoint.weather[0]; // the whole object with icon id, weather code and description is needed to be able to identify the corresponding icon
                const temp = dataPoint.main.temp.toFixed(1);
                const windSpeed = dataPoint.wind.speed;

                // Compare the weekday of today with the days of the forecast and only display forecast from tomorrow onwards
                if (weekDay != today) {
                    forecastWeekdays.innerHTML += `<p>${weekDay}</p>`;
                    forecastTemp.innerHTML += `<p>${temp}°C</p>`;
                    forecastIcon.innerHTML += `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" />` //Source for weather codes and icons: https://openweathermap.org/weather-conditions
                    forecastWind.innerHTML += `<p>${windSpeed}m/s</p>`;
                }
            });
             
        })
}

// Search function
const searchFunction = () => {
    // Initialize a variable to store the value of the user's input
    let searchedCity = inputField.value;

    // Update today's weather and five-day-forecast for the city by invoking the previous functions
    todaysWeather(searchedCity);
    fiveDaysForecast(searchedCity);

    // Empty the input field when the input has been sent
    inputField.value = "";

    // Reset the five day forecast
    forecastWeekdays.innerHTML = "";
    forecastTemp.innerHTML = "";
    forecastIcon.innerHTML = "";
    forecastWind.innerHTML = "";
}

// Function to switch to next city
const switchCity = () => {
    // Reset the five day forecast
    forecastWeekdays.innerHTML = "";
    forecastTemp.innerHTML = "";
    forecastIcon.innerHTML = "";
    forecastWind.innerHTML = "";

    if (city === "London") {
        todaysWeather("Hanoi");
        fiveDaysForecast("Hanoi");
        city = "Hanoi";
    } else if (city === "Hanoi") {
        todaysWeather("New York");
        fiveDaysForecast("New York");
        city = "New York";
    } else if (city === "New York") {
        todaysWeather("Melbourne");
        fiveDaysForecast("Melbourne");
        city = "Melbourne";
    } else if (city === "Melbourne") {
        todaysWeather("Cape Town");
        fiveDaysForecast("Cape Town");
        city = "Cape Town";
    } else if (city === "Cape Town") {
        todaysWeather("Dubai");
        fiveDaysForecast("Dubai");
        city = "Dubai";
    } else {
        todaysWeather("London");
        fiveDaysForecast("London");
        city = "London";
    }
}

// Invoke functions for today's weather and five-day forecast with the base city as argument
todaysWeather("London");
fiveDaysForecast("London");

// Add event listener to the search button (type="submit") to invoke the search function when the button is clicked on
searchBtn.addEventListener("click", searchFunction);

// Add event listener to the input field to invoke the search function when key "Enter" is pressed
inputField.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        searchFunction();
    }
})

// Add event listener to the switch button to invoke the switchCity function when the button is clicked on
switchBtn.addEventListener("click", switchCity);