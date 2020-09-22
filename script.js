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
    tempToday.innerHTML = weatherObject.main.temp
    descriptionToday.innerHTML = weatherObject.weather[0].description   
    sunriseToday.innerHTML = new Date ((weatherObject.sys.sunrise) * 1000)
    sunsetToday.innerHTML = new Date ((weatherObject.sys.sunset) * 1000)

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
    forecastDay2.innerHTML = weatherForecast.list[0].main.temp
    forecastDay3.innerHTML = weatherForecast.list[1].main.temp
    forecastDay4.innerHTML = weatherForecast.list[2].main.temp
    forecastDay5.innerHTML = weatherForecast.list[3].main.temp
    forecastDay6.innerHTML = weatherForecast.list[4].main.temp
    
});


