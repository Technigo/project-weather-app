// All global variables
const cityName = document.getElementById("cityName"); // Change variable name from city to cityName to differentiate with the variable "city" below
const tempToday = document.getElementById("tempToday");
const tempTextCelsius = document.getElementById("tempTextCelsius"); // NEW
const localTime = document.getElementById("localTime"); // NEW
const weatherDescription = document.getElementById("weatherDescription");
const mainIcon = document.getElementById("mainIcon");

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

        // Display main weather icon
        let { icon } = json.weather[0];
        mainIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" />`; 
        
        // Display current time (hours:minutes) using the data on time and timezone (in miliseconds) as an epoch timestamp multiplied by 1000
        const currentLocalTime = new Date((json.dt+json.timezone)*1000);
        localTime.innerText = `Time: ${currentLocalTime.getHours()}:${currentLocalTime.getMinutes()}`;

        
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



todaysWeather("London");


