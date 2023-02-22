const topSection = document.getElementById('topSection')
const main = document.getElementById('main')
const degrees = document.getElementById('degrees')
const city = document.getElementById('city')
const condition = document.getElementById('condition')
const sunriseSunset = document.getElementById('sunriseSunset')
const button = document.getElementById('button')
const forecast = document.getElementById('forecast')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Reykjavik&appid=fa2755c779ce094fc80f2fa365eea704&units=metric')
.then((response) => {
    return response.json()
})
.then((json) => {
    degrees.innerHTML = `${json.main.temp.toFixed(1)}°C`;
    city.innerHTML = json.name;
    condition.innerHTML = json.weather[0].description;
    })
















































































const weekDay = document.getElementById('main-forecast')
const minTemp = document.getElementById('min-temp')
const maxTemp = document.getElementById('max-temp')
const weatherIcon = document.getElementById('weather-icon')
fetch('https://api.openweathermap.org/data/2.5/forecast?lat=64.1355&lon=-21.8954&appid=fa2755c779ce094fc80f2fa365eea704&units=metric')
.then((response) => {
    return response.json()
})
.then((fiveDay) => {
const result = fiveDay.list.filter(item => item.dt_txt.includes('12:00'));
    list.filter(item => item.dt_txt.includes('00:00:00'))

    //const filteredFiveDayNoon = fiveDay.list.filter(item => item.dt_txt.includes('12:00'));
    //const filteredFiveDayMidnight = fiveDay.list.filter(item => item.dt_txt.includes('00:00:00'));
    

    let minTemp = filteredFiveDayMidnight.forEach((item) => {
        item.main.temp_min.toFixed(1)
    })
    let maxTemp = filteredFiveDayNoon.forEach((item) => {
            item.main.temp_min.toFixed(1)
            
    })

const dayName = filteredFiveDayNoon.forEach((item) => {
let date = new Date(item.dt * 1000);
date.toLocaleDateString("en-US", {weekday: "long"});
    })
   
filteredFiveDayNoon.forEach((item) => {
    let mainWeather = item.weather[0].main
    // Deciding the icon depending on weather forecast
    if (mainWeather === "Snow") {
        weatherImg = 'icons8-snow-64.png'
    } else if (mainWeather === "Rain") {
        weatherImg = 'icons8-rain-64.png'
        weatherImg = 'icons8-thunder-64.png'
    } else if (mainWeather === "Drizzle") {
        weatherImg = 'icons8-wet-64.png'
    } else if (mainWeather === "Mist" || mainWeather === "Fog" || mainWeather === "Ash") {
        weatherImg = 'icons8-mist-64.png'
    } else if (mainWeather === "Clouds") {
        weatherImg = 'icons8-cloud-64.png'
    } else if (mainWeather === "Clear") {
        weatherImg = 'icons8-solar-64.png'
    }
})

fiveDay.forEach(() => {
forecast.innerHTML += `
<p>${dayName}</p>
<img src=${weatherImg} />
<p>${maxTemp} °C</p>
<p>${minTemp} °C</p>
`
})

})







//let date = new Date(item.dt * 1000)
    //let dayName = date.toLocaleDateString("en-US", {weekday: "long"})
/*
    weatherIcon.innerHTML += weatherImg
    weekDay.innerHTML += `<p>${dayName}</p>`
    maxTemp.innerHTML += `${item.main.temp_max.toFixed(1)} °C</p>`
})

filteredFiveDayMidnight.forEach((item) => {
minTemp.innerHTML += `<p>/${item.main.temp_min.toFixed(1)} °C</p>`
})
    console.log(new Date);
    console.log(filteredFiveDayMidnight);
    })
*/


