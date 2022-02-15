const weatherInfo = document.getElementById('weatherInfo')
const weatherText = document.getElementById('weatherText')
const weatherForecast = document.getElementById('weatherForecast')


//Current weather
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=03f905d87366cf6f2d73c99817aed154';

//Forecast
//const API_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=03f905d87366cf6f2d73c99817aed154'

fetch(API_URL)
    //Open the package
    .then((res) => res.json())
    //Do something with the data
    .then((data) => {  
        console.log(data)

        //We created the variables here 
        let temp = data.main.temp
        let weather = data.weather[0].description
        let sunrise = data.sys.sunrise
        let sunset = data.sys.sunset
        
        //First section
        weatherInfo.innerHTML += `<p>Temp: ${Math.round(temp)}</p>`
        weatherInfo.innerHTML += `<p>Weather: ${weather}</p>`
        weatherInfo.innerHTML += `<p>Sunrise: ${new Date(sunrise*1000).toLocaleTimeString([], {timeStyle: 'short'})}</p>`
        weatherInfo.innerHTML += `<p>Sunset: ${new Date(sunset*1000).toLocaleTimeString([], {timeStyle: 'short'})}</p>`

        //Second section
         weatherText.innerHTML += `<h1>${data.name}</h1>`

        
});

    //Third section

    //We will have to make a new fetch when working with the forecast
    //We got help from this question https://stackoverflow.com/c/technigo/questions/2180