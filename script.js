//DOM get element from HTML
const temSunTime = document.getElementById('temperature-sun-time')
const remindImgText = document.getElementById('remind-img-text')
const sevenDaysTemperature = document.getElementById('even-days-temperature')

//DOM create in JS
// 1- left corner 





//fetch API, weather in Helsinki
const weatherInfo = () => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Helsinki,Finland&units=metric&appid=0a3f5beba05e6db2d5da18ddf3283c92')
    .then(response => response.json())
    .then(data => {
        remindTestCityName(data)
        console.log (data)})
}
weatherInfo()


const remindTestCityName = (param) => {
    let dayWeather = param.weather[0].main
    let description = param.weather[0].description
    let temperature = Math.round(param.main.temp)
    let cityName = param.name
    if (dayWeather === 'clear') {
        temSunTime.innerHTML = `
        <P> ${description} | ${temperature}</p>`
        remindImgText.innerHTML = `
        <h3 id="remind-text">Get your sunnies on. ${cityName} is looking rather great today.</h3>`
    } else if (dayWeather === 'rain' || 'Drizzle') {
        temSunTime.innerHTML = `
        <P> ${description} | ${temperature}</p>`
        remindImgText.innerHTML = `
        <h3 id="remind-text">Don't forget your umbrella. It's wet in ${cityName} today.</h3>`
    } else if (dayWeather === 'cloudy') {
        temSunTime.innerHTML = `
        <P> ${description} | ${temperature}</p>`
        remindImgText.innerHTML = `
        <h3 id="remind-text">Light a fire and get cosy. ${cityName} is looking grey today.</h3>`
    } 
    
}

