
const today = document.getElementById ("today")
const icon = document.getElementById ("icon")
const sun = document.getElementById ("sun")
const text = document.getElementById ("text")
const week = document.getElementById ("week")


const fetchToday = () => {
fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=725ee441189d3e16a4e4aa74b081805e")
    .then((response) => {
       return response.json()
    })
    .then ((json) => {
        console.log(json)
        // Variables for rounded temperature + sunrise and sunset calculations
        let temperatureRound = Math.round(json.main.temp)
        const sunrise = json.sys.sunrise
        const sunriseHour = new Date(sunrise*1000).getHours()
        const sunriseMinute = new Date(sunrise*1000).getMinutes();
        const sunriseTime = `${sunriseHour}.${sunriseMinute}`
        const sunset = json.sys.sunset
        const sunsetHour = new Date(sunset*1000).getHours()
        const sunsetMinute = new Date(sunset*1000).getMinutes();
        const sunsetTime = `${sunsetHour}.${sunsetMinute}`
        weather.innerHTML = 
        `<h4>${json.weather[0].main} | ${temperatureRound}°</h4>`
        // If/else function to make sure a zero is added before the time if the sun rises before 10 am
        if (sunriseHour < 10) {
        sun.innerHTML = 
        `<h4>sunrise 0${sunriseTime}<br>
        sunset ${sunsetTime}
        </h4>`
        }
        
        else {
        sun.innerHTML = 
        `<h4>sunrise ${sunriseTime}<br>
        sunset ${sunsetTime}
        </h4>`
        }
        
        if (json.weather[0].main == "Clear"){
        icon.innerHTML = `<img src="assets/noun_Sunglasses_2055147.svg"/>`
        text.innerHTML = `<h2>Get your sunnies on. ${json.name} is looking rather great today. </h2>`
        }
        else if (json.weather[0].main == "Rain"){
        icon.innerHTML = `<img src="assets/noun_Umbrella_2030530.svg"/>`
        text.innerHTML = `<h2>Don't forget your umbrella. It's wet in ${json.name} today.</h2>`
        }
        else if (json.weather[0].main == "Clouds"){
        icon.innerHTML = `<img src="assets/noun_Cloud_1188486.svg"/>`
        text.innerHTML = `<h2>Light a fire and get cosy. ${json.name} is looking grey today. </h2>`
        }
    })
}
    

const fetchForecast = () => {
fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=725ee441189d3e16a4e4aa74b081805e")
    .then((response) => {
        return response.json()
    })
    .then ((jsonForecast) => {
        console.log(jsonForecast)
        jsonForecast.list.forEach ((forecast) => {
        displayForecast(forecast)
        })
    })
}

const decideFirstDay = (dayNumber) => {
    switch (dayNumber){
        case 0:
        weekday = "sun"
        break

        case 1:
        weekday = "mon"
        break

        case 2:
        weekday = "tue"
        break

        case 3:
        weekday = "wed"
        break

        case 4:
        weekday = "thu"
        break

        case 5:
        weekday = "fri"
        break

        case 6:
        weekday = "sat"
        break
    }}

    
    const displayForecast = (forecast) => {  
        thisDay = new Date(forecast.dt*1000).getDay();
        decideFirstDay(thisDay)
        let forecastMaxRound = Math.round(forecast.main.temp_max)
        const today = new Date().getDay()
        midDayForecast = new Date(forecast.dt*1000).getHours()
        if (today !== thisDay && midDayForecast === 13){
        week.innerHTML += `<p>${weekday}</p><p>${forecastMaxRound} °C</p>`
        } 
   
    }

fetchToday()
fetchForecast()
