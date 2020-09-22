// TODAY'S FORECAST

const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=20216c09e09f267ccc58282554c77ecf';
const container = document.getElementById('main');
const weatherHeader = document.getElementById('weather-header');

const tempToday = document.getElementById('temp-today');
const descriptionToday = document.getElementById('description-today')
const sunriseToday = document.getElementById('sunrise-today')
const sunsetToday = document.getElementById('sunset-today')


fetch(apiUrl)
.then((response) => {
    return response.json()
})

.then((weatherObject) => {
    // Update weather in Stockholm
    weatherHeader.innerHTML = weatherObject.name;
    //console.log(weatherObject)
    tempToday.innerHTML = `${Math.round(weatherObject.main.temp * 10) / 10} °C`;
    descriptionToday.innerHTML = weatherObject.weather[0].description   
    
    const sunriseValue = weatherObject.sys.sunrise
    const sunsetValue = weatherObject.sys.sunset

    const sunriseConverted = new Date (sunriseValue * 1000)
    const sunsetConverted = new Date (sunsetValue * 1000)

    const sunriseToLocaleString = sunriseConverted.toLocaleTimeString ('SE', {hour: '2-digit', minute: '2-digit', hour12: false,})
    const sunsetToLocaleString = sunsetConverted.toLocaleTimeString ('SE', {hour: '2-digit', minute: '2-digit', hour12: false,})

    sunriseToday.innerHTML = `${sunriseToLocaleString}`
    sunsetToday.innerHTML = `${sunsetToLocaleString}`

});

// FIVE DAY FORECAST 

const apiUrlFiveDay = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=20216c09e09f267ccc58282554c77ecf';
const forecastDay2 = document.getElementById('day2')
const forecastDay3 = document.getElementById('day3')
const forecastDay4 = document.getElementById('day4')
const forecastDay5 = document.getElementById('day5')
const forecastDay6 = document.getElementById('day6')

fetch(apiUrlFiveDay)
.then((response) => {
    return response.json()
})

.then((weatherForecast) => {
    forecastDay2.innerHTML = `${Math.round(weatherForecast.list[0].main.temp * 10) / 10} °C`;
    forecastDay3.innerHTML = `${Math.round(weatherForecast.list[1].main.temp * 10) / 10} °C`;
    forecastDay4.innerHTML = `${Math.round(weatherForecast.list[2].main.temp * 10) / 10} °C`;
    forecastDay5.innerHTML = `${Math.round(weatherForecast.list[3].main.temp * 10) / 10} °C`;
    forecastDay6.innerHTML = `${Math.round(weatherForecast.list[4].main.temp * 10) / 10} °C`;
    
});


