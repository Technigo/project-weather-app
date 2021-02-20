const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=e205e8ad7da5418f24fd968d3b9c30f1';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&appid=e205e8ad7da5418f24fd968d3b9c30f1'
const currentLocation = document.getElementById('current-location')
const sunriseBox = document.getElementById('sunrise')
const sunsetBox = document.getElementById('sunset')
const forecast = document.getElementById('forecast')
const todaysWeather = document.getElementById('todaysWeather')

//GLOBAL VARIABLES
let icon 
let sunHours

//SET CURRENT TIME
const today = new Date()
let currentTime = `${today.getHours()}:${today.getMinutes()}`

//GET SUNSET AND SUNRISE IN READABLE FORMAT FOR HUMANS 
const sunTime = (time) => {
    sunHours = new Date(time * 1000)
        return sunHours.toLocaleTimeString("sv-SE", {
        hour: "2-digit", 
        minute: "2-digit",
        hour12: false
    })
}

//DISPLAY ICONS DEPENDING ON WEATHER MAIN
const weatherIcon = (item) => {
    
    if (item.weather[0].main === 'Clouds') {
       icon = './ikons/icons8-clouds-96.png'
    } else if (item.weather[0].main === 'Thunderstorm') {
        icon = './ikons/icons8-lightning-bolt-96.png'
    } else if (item.weather[0].main === 'Rain' || item.weather[0].main === 'Drizzle') {
        icon = './ikons/icons8-rain-96.png'
    } else if (item.weather[0].main === 'Snow') {
        icon = './ikons/icons8-snow-96.png'
    } else if (item.weather[0].main === 'Clear') {
        icon = './ikons/icons8-sun-96.png'
    } else {
        icon = './ikons/icons8-fahrenheit-symbol-96.png'
    }    
}

//FETCH API FOR TODAYS WEATHER
fetch(WEATHER_URL)
    .then((response) => {
        return response.json() 
    }) 
    .then((data) => {
        let fixedTemperature = data.main.temp.toFixed()
        
        let sunrise = sunTime(data.sys.sunrise)
        let sunset = sunTime(data.sys.sunset)
    
        currentLocation.innerHTML += `
            <h2 class="city-name">${data.name}</h2>
            <h4>${data.weather[0].description}</h4>
            <h1 class="temperature">${fixedTemperature}&deg;</h1>
        `
        sunriseBox.innerHTML += `
            <img src ="./ikons/icons8-sunrise-96.png"> 
            <h4>${sunrise}</h4>
        `
        sunsetBox.innerHTML += `
            <img src ="./ikons/icons8-moon-and-stars-96.png">
            <h4>${sunset}</h4>
        ` 
        //DISPLAY A THEME OF COLORS FOR DAY-TIME
        if (currentTime >= sunrise && currentTime <= sunset) {
            todaysWeather.classList.add('day')
            document.body.classList.add('background-night')
        }  
    })
    .catch(err => {
        todaysWeather.innerHTML = 'There has unfortunately been an error in our weather update' + err;
    })

//FETCH API FORECAST
fetch(FORECAST_URL)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        const filteringByTime = data.list.filter(item => item.dt_txt.includes('12:00'))
        const timezone = data.city.timezone   
        

        filteringByTime.forEach((item)=> {
            weatherIcon(item)
            const forecastDate = new Date((item.dt + timezone) * 1000)    
            const weekday = {weekday:'long'}
            let fixedTempForecast = item.main.temp.toFixed()
            forecast.innerHTML += `
            <div>
            <p class="forecast-weekday">${forecastDate.toLocaleDateString('en-US', weekday)}</p> 
            <img src=${icon}> 
            <p class="forecast-temp">${fixedTempForecast}&deg;</p>
            </div>
            ` 
           
        })
    })
    .catch(err => {
        todaysWeather.innerHTML = 'There has unfortunately been an error in our weather update' + err;
    })