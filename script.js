const topSection = document.getElementById('topSection')
const main = document.getElementById('main')
const degrees = document.getElementById('degrees')
const city = document.getElementById('city')
const condition = document.getElementById('condition')
const sunriseSunset = document.getElementById('sunriseSunset')
const button = document.getElementById('button')
const forecast = document.getElementById('forecast')
const weekDay = document.getElementById('forecast-weekday')
const weatherIcon = document.getElementById('forecast-icon')
const minTemp = document.getElementById('forecast-min-temp')
const maxTemp = document.getElementById('forecast-max-temp')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Reykjavik&appid=fa2755c779ce094fc80f2fa365eea704&units=metric')
.then((response) => {
    return response.json()
})
.then((json) => {
    degrees.innerHTML = `${json.main.temp.toFixed(1)}°C`;
    city.innerHTML = json.name;
    condition.innerHTML = json.weather[0].description;
    })




















































































fetch('https://api.openweathermap.org/data/2.5/forecast?lat=64.1355&lon=-21.8954&appid=fa2755c779ce094fc80f2fa365eea704&units=metric')
.then((response) => {
    return response.json()
})
.then((fiveDay) => {
    //two filters, to be able to get a low and high temperature
    const filteredForecastNoon = fiveDay.list.filter(item => item.dt_txt.includes('12:00:00'));
    const filteredForecastMidnight = fiveDay.list.filter(item => item.dt_txt.includes('00:00:00'));

//Getting the variables from our filtered list
// let minTemp = filteredForecastMidnight.forEach((item) => {item.main.temp_min.toFixed(1)}) //Minimum temperature
// let maxTemp = filteredForecastNoon.forEach((item) => {item.main.temp_max.toFixed(1)}) //Maximum temperature
// console.log(filteredForecastMidnight);

//Getting the day name (noon)
filteredForecastNoon.forEach((item) => {
    const date = new Date(item.dt * 1000);
    let dayName =  date.toLocaleDateString("en-US", {weekday: "long"});

    // Looping through the array and deciding on the icon depending on weather forecast
    let mainWeather = item.weather[0].main
    if (mainWeather === "Snow") {
        weatherImg = 'icons8-snow-64.png'
    } else if (mainWeather === "Rain") {
        weatherImg = 'icons8-rain-64.png'
    } else if (mainWeather === "Thunderstorm") {
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

weekDay.innerHTML += `
<p>${dayName}</p>`
weatherIcon.innerHTML += `<p>
<img src=${weatherImg} /></p>`
maxTemp.innerHTML += `
<p>${item.main.temp.toFixed(1)} °C / </p>`
})

filteredForecastMidnight.forEach((item) => {
minTemp.innerHTML += `
<p>&nbsp;${item.main.temp.toFixed(1)} °C</p>
`
})

})







