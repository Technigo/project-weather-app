const weatherContainer = document.getElementById('weatherContainer')


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

        weatherContainer.innerHTML += `<h1>${data.name}</h1>`
        weatherContainer.innerHTML += `<p>Temp: ${Math.round(data.main.temp)}</p>`
        weatherContainer.innerHTML += `<p>Weather: ${data.weather[0].description}</p>`

        data.weather.forEach((weather) => {
            weatherContainer.innerHTML += `
                <p>Weather: ${weather.main}</p>
            
            `
        })
});
