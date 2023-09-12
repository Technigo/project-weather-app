// All global variables
const cityName = document.getElementById("cityName"); // Change variable name from city to cityName to differentiate with the variable "city" below
const tempToday = document.getElementById("tempToday");
const weatherDescription = document.getElementById("weatherDiscription");

const APIKEY = "a0251d9b53172abcbe6a9263f3d13544"; // Change name to CAPITAL as it won't change throughout the file
let city = "London"; // Initiate variable "city" in order to update it later when switching to other cities

// Display data about today's weather, passing in the city
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${APIKEY}`)
.then((response) => {
    return response.json();
})
.then((json) => {
    console.log(json);
    cityName.innerText = `${json.name}`;
    tempToday.innerText = `${json.main.temp.toFixed(1)}`;
    weatherDescription.innerText = `${json.weather[0].description}`;
})