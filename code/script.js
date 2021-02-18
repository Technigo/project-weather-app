// All the DOM selectors stored as short variables
const shortDescription = document.getElementById("shortDescription")
const body = document.getElementById("body")
const temperature = document.getElementById("temperature")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const description = document.getElementById("description")
const forecast = document.getElementById("forecast")
const icon = document.getElementById("icon")
const bigIcon = document.getElementById("big-icon")
const today = document.getElementById("today")

// Global variables
const API_KEY = "d54b10c260730aa99d10c1f676d759e6";
let city = "Stockholm"

const sunTime = (time) => {
    const fixedTime = new Date(time * 1000).toLocaleTimeString('sv-SE', {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
    return fixedTime;
};

const getWeatherData = (data) => {
    const temp = Math.floor(data.main.temp);
    const condition = data.weather[0].description;
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const sunriseText = sunTime(data.sys.sunrise);
    const sunsetText = sunTime(data.sys.sunset);
    bigIcon.innerHTML = `<img src="${icon}"/>`;
    shortDescription.innerText = `${condition}`;   
    temperature.innerHTML = `${temp} <span class="celsius">°C</span>`;
    sunrise.innerText = `sunrise: ${sunriseText}`;
    sunset.innerText = `sunset: ${sunsetText}`;
    let changeBackground = new Date().getHours();
    console.log(changeBackground);
        if (changeBackground > 20 && changeBackground < 6) {
            today.style.background = "linear-gradient(to bottom, #222350, #313263, #404176, #4f518a, #5f619f)"
        } 
}

fetch(`http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        getWeatherData(data);
    });

    
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'));
        filteredForecast.forEach((forecastItem) => {
            const loopOverWeek = weekdays[(new Date(forecastItem.dt_txt).getDay())];
            const loopOverTemp = Math.floor(forecastItem.main.temp);
            const icon = `https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}@2x.png`;

            forecast.innerHTML +=  `
            <div>
                <p>${loopOverWeek}</p>
                <div>   
                    <img class="small-icons" src="${icon}">
                    <p>${loopOverTemp} °C</p>
                </div>
            </div>`
        });
    });