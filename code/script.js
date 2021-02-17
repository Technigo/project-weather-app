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

// Global variables
const API_KEY = "d54b10c260730aa99d10c1f676d759e6"
let city = "Stockholm"

const sunTime = (time) => {
    let fixedTime = new Date(time * 1000).toLocaleTimeString('sv-SE', {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
    return fixedTime;
};

fetch(`http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        const temp = Math.floor(data.main.temp)  
        const condition = data.weather[0].description
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.weather[0].icon}.svg`
        const sunriseText = sunTime(data.sys.sunrise);
        const sunsetText = sunTime(data.sys.sunset);
        bigIcon.innerHTML = `<img class="big-image" id="big-icon" src="${icon}"/>`
        shortDescription.innerText = `${condition}`   
        temperature.innerHTML = `${temp} <span class="celsius">°C</span>`
        sunrise.innerText = `Sunrise: ${sunriseText}`
        sunset.innerText = `Sunset: ${sunsetText}`
        console.log(temp) 
    })

    
let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
        filteredForecast.forEach((forecastItem) => {
            let loopOverWeek = weekdays[(new Date(forecastItem.dt_txt).getDay())]
            let loopOverTemp = Math.floor(forecastItem.main.temp);
            let icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${forecastItem.weather[0].icon}.svg`;

            console.log(bigIcon);
            
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