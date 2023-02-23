const myAPIKey = `0885d110db76ae5dbaae0c2672772fdf`
const API_today = `http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${myAPIKey}`
const API_forecast = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${myAPIKey}`
//DOM Selectors
const temperature = document.getElementById("temperature")
const feelsLike = document.getElementById("feels-like")
const city = document.getElementById("city")
const weatherDescription = document.getElementById("weather-description")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const forecastWrapper = document.getElementById("forecast-wrapper")
const weatherTodayWrapper = document.getElementById("weather-today-wrapper")



//Weather for today
fetch(API_today)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        //temperature
        let rawTemp = json.main.temp 
        let roundedTemp = rawTemp.toFixed(0)
        temperature.innerHTML = `<h1>${roundedTemp}&deg;C</h1>`
        //feels like
        feelsLike.innerHTML += `<span>${json.main.feels_like.toFixed(0)}&deg;C</span>`
        //city
        let currentCity = json.name
        city.innerHTML = `<h2>${currentCity}</h2>`
        //weather description
        let weatherDes = json.weather.map((element) => (element.description))
        weatherDescription.innerHTML = `<h3>${weatherDes}</h3>`
    })

//Sunrise & Sunset



//Weather forecast for Stockholm for 5 days  
fetch(API_forecast)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00')) //filters out only the forecast at 12.00 each day
        console.log(filteredForecast)
        
        filteredForecast.map((day) => {
            const date = new Date(day.dt * 1000) //Convert Unix timestamp to time in JavaScript
            const forecastDate = date.toLocaleDateString("en-GB", {
                    day: "numeric"
           })
            const dayName = date.toLocaleDateString("en-GB", {
                 weekday: "short"
            })
            const weatherIconCode = `${day.weather[0].icon}`
            const temp = `${day.main.temp.toFixed(0)}`
            
            console.log(date, dayName, weatherIconCode, temp)    

            forecastWrapper.innerHTML += `
            <div class ="forecast-row">
                <span class = "day">${forecastDate} ${dayName}</span>
                <img class = "forecast-icon" src="https://openweathermap.org/img/wn/${weatherIconCode}@2x.png"/> 
                <span class = "temperature"> ${temp}</span>
            </div>
            `

            //Change style based on weather conditions
            const weatherCondition = json.list[0].weather[0].main
           
            console.log(weatherCondition)
            if (weatherCondition.includes("Clouds")) {
                const cloudsLink = ``
                weatherTodayWrapper.style.background ='url('+cloudsLink+') center left  / cover no-repeat, no-repeat';

            } else if (weatherCondition.includes("Rain" || "Drizzle")) {
                const rainLink = ``
                weatherTodayWrapper.style.background ='url('+rainLink+') center left  / cover no-repeat, no-repeat';

            } else if (weatherCondition.includes("Thunderstorm")) {  
                const thunderStormLink = ``
                weatherTodayWrapper.style.background ='url('+thunderStormLink+') center left  / cover no-repeat, no-repeat';

            } else if (weatherCondition.includes("Snow")) {
                const snowLink = ""
                weatherTodayWrapper.style.background ='url('+snowLink+') center left  / cover no-repeat, no-repeat';
            } else if (weatherCondition.includes("Clear")) {

            } else {
                //something neutral
            }
           


        })
    })

