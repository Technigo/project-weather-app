//DOMs
const changeCity = document.getElementById("changeCity");
const weatherContainer = document.getElementById("weather-container");
const todaysWeather = document.getElementById("today");
const dayContainer = document.getElementsByClassName("day-container");
const cityBtn = document.getElementById("cityBtn");
const backgroundImg = document.getElementById("backgroundImg");
const cityInput = document.getElementById("cityInput");

let WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=5000cd66a9090b2b62f53ce8a59ebd9e`;

let FIVE_DAYS = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=5000cd66a9090b2b62f53ce8a59ebd9e`;

// Global variables
let city = "";
const timezoneOffset = new Date().getTimezoneOffset() * 60;

// The function creates an image for Javascript injection later into the HTML
const createWeatherImg = (url, alt) => {
    let weather = document.createElement("img");
    weather.src = url;
    weather.alt = alt;
    return weather;
};

// Creating images for different weather types
const cloudyImg = createWeatherImg("./assets/cloud-icon.png", "clouds");
const rainImg = createWeatherImg("./assets/rain-icon.png", "rain");
const sunImg = createWeatherImg("./assets/sun-icon.png", "sun");
const windImg = createWeatherImg("./assets/wind-icon.png", "wind");
const stormImg = createWeatherImg("./assets/storm-icon.png", "storm");
const snowImg = createWeatherImg("./assets/snow-icon.png", "snow");
const partlycloudyImg = createWeatherImg(
    "./assets/partly-cloudy-icon.png",
    "partly cloudy"
);

//Creating images for sunrise and sunset
const sunriseImg = createWeatherImg("./assets/sunrise-icon.png", "sunrise");
const sunsetImg = createWeatherImg("./assets/sunset-icon.png", "sunset");

fetch(WEATHER_API)
    .then((res) => res.json())
    .then((data) => {
        setBackgroundWeather(data);
        let timezone = data.timezone
        const timeOfSunrise = getTimeOf(data.sys.sunrise, timezone);
        const timeOfSunset = getTimeOf(data.sys.sunset, timezone)
        changeHeaderInnerHTML(data, timeOfSunrise, timeOfSunset);
    })
    .catch((error) => console.error("AAAAAAH!", error))
    .finally(() => console.log("YAY!"));

//Variables to prevent choosing past dates.
//const currentDate = new Date()
//const formattedDate = currentDate.toISOString().split('T')[0]

// Five day forecast
fetch(FIVE_DAYS)
    .then((res) => res.json())
    .then((data) => {
        const filteredForecast = data.list.filter((item) =>
            item.dt_txt.includes("12:00")
        );
        createFiveDayForecast(filteredForecast);
    });


function createFiveDayForecast(filteredForecast) {
    for (let i = 0; i < 5; i++) {

        chooseWeatherIcon(filteredForecast, i);
        const days = new Date(filteredForecast[i].dt_txt).toLocaleDateString(
            "en-US",
            { weekday: "long" }
        );
        const forecastTemp = Math.round(filteredForecast[i].main.temp * 10) / 10;
        const forecastWeather = filteredForecast[i].weather.description;
        createFiveDaysInnerHTML(days, forecastTemp);
    }
};

//Creates a weather icon based on the forecasted weather
function chooseWeatherIcon(filteredForecast, i) {
    let main = filteredForecast[i].weather[0].main;
    if (main === "Clouds") {
        weatherImg = cloudyImg;
    } else if (main === "Rain") {
        weatherImg = rainImg;
    } else {
        weatherImg = sunImg;
    }
};

//Creates innerHTML for each day in the forecast
function createFiveDaysInnerHTML(days, forecastTemp) {
    weatherContainer.innerHTML += `
        <section class="day"> 
        <span class="forcast-day">${days}</span> 
        <span class="forcast-temp">${forecastTemp} °C </span> 
        <span class="forcast-weather"><img src=${weatherImg.src} alt=${weatherImg.alt} class="forecast-weather"/></span>
        </section>
      
      `;
};

//Translates seconds into a date string
function getTimeOf(time, timezone) {
    return new Date(
        (time + timezone + timezoneOffset) * 1000
    ).toLocaleTimeString("sv-GB", { hour: "2-digit", minute: "2-digit" });
};

//Creates innerHTML to display todays weather and temperatures in the header
function changeHeaderInnerHTML(data, timeOfSunrise, timeOfSunset) {
    today.innerHTML += `
        <h1>${data.name}</h1>
        <h2>${Math.round(data.main.temp * 10) / 10} °C</h2>
        <h5>Feels like: ${Math.round(data.main.feels_like * 10) / 10} °C</h5>
        <img src=${weatherImg.src} alt=${weatherImg.alt} class= "today-weather"/>
        <h3>${data.weather.map((item) => item.description)}</h3>
        <h5 class="windpar"> <img src=${windImg.src} alt=${windImg.alt} class= "wind-icon"/>${Math.round(data.wind.speed * 10) / 10} m/s</h5>
        <p class="sunrisepar"><img src=${sunriseImg.src} alt=${sunriseImg.alt} class= "sunrise"/>Sunrise: ${timeOfSunrise}</p>
        <p class="sunsetpar"><img src=${sunsetImg.src} alt=${sunsetImg.alt} class= "sunset"/>Sunset: ${timeOfSunset}</p>
    `;
};

//Changes background image in header depending on todays weather prognosis
function setBackgroundWeather(data) {
    let main = data.weather.map((item) => item.main);
    if (main.includes("Clouds")) {
        weatherImg = cloudyImg;
        document.querySelector("header").style.background =
            "url(./assets/cloudy-day.jpg)";
        document.querySelector("header").style.backgroundSize = "cover";
        document.querySelector("header").style.backgroundPosition = "center";
    } else if (main.includes("Rain")) {
        weatherImg = rainImg;
        document.querySelector("header").style.background =
            "url(./assets/rainy-day.jpg)";
        document.querySelector("header").style.backgroundSize = "cover";
        document.querySelector("header").style.backgroundPosition = "center";
    } else if (main.includes("Drizzle")) {
        weatherImg = rainImg;
        document.querySelector("header").style.background =
            "url(./assets/rainy-day.jpg)";
        document.querySelector("header").style.backgroundSize = "cover";
        document.querySelector("header").style.backgroundPosition = "center";
    } else if (main.includes("Snow")) {
        weatherImg = snowImg;
        document.querySelector("header").style.background =
            "url(./assets/snowy-day.jpg)";
        document.querySelector("header").style.backgroundSize = "cover";
        document.querySelector("header").style.backgroundPosition = "center";
    } else {
        weatherImg = sunImg;
        document.querySelector("header").style.background =
            "url(./assets/sunny-weather.jpg)";
        document.querySelector("header").style.backgroundSize = "cover";
        document.querySelector("header").style.backgroundPosition = "center";
    }
};
//Eventlisteners
// DON"T DELETE, TO USE LATER!
changeCity.addEventListener('change', (e) => {
    let city = e.target.value

});

// cityBtn.addEventListener('click', (e) => {
//     console.log("button event", e)
//     console.log("bitton value", cityBtn.value)

// })
//     let FIVE_DAYS = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=5000cd66a9090b2b62f53ce8a59ebd9e`;
//     myFetch1()

// cityBtn.addEventListener('click', (WEATHER_API, FIVE_DAYS) => {
//     fetchFunction?????
// })backgroundImg.innerHTML += `
//<header id="backgroundSunny" class="background-sunny"></header>
//<section id="today" class="today"><h1>${data.name}</h1>
//<h2>${Math.round(data.main.temp * 10) / 10} °C</h2>
//<img src=${weatherImg.src} alt=${weatherImg.alt} class= "today-weather"/>
//<h3>${data.weather.map((item) => item.description)}</h3>
//<p class="sunrisepar"><img src=${sunriseImg.src} alt=${sunriseImg.alt} class= "sunrise"/>Sunrise: ${timeOfSunrise}</p>
//
//</section>
//`;
