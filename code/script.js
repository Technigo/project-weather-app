const weatherInfo = document.getElementById('weatherInfo')
const weatherText = document.getElementById('weatherText')
const weatherForecast = document.getElementById('weatherForecast')
const tempAndWeather = document.getElementById('tempAndWeather')

//Current weather
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=03f905d87366cf6f2d73c99817aed154';

//Forecast
const API_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=03f905d87366cf6f2d73c99817aed154'

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
        let todaysWeather = data.weather[0].main

        //First section
        tempAndWeather.innerHTML += `<p>${weather} | </p>`
        tempAndWeather.innerHTML += ` <p>${Math.round(temp)} °C</p>`

        weatherInfo.innerHTML += `<p>sunrise ${new Date(sunrise * 1000).toLocaleTimeString([], { timeStyle: 'short' })}</p>`
        weatherInfo.innerHTML += `<p>sunset ${new Date(sunset * 1000).toLocaleTimeString([], { timeStyle: 'short' })}</p>`

        //Second section 

        //If rain or drizzle: shows umbrella icon and blue background color
        if (todaysWeather === "Rain" || todaysWeather === "Drizzle") {
            weatherText.innerHTML += `<img src="./icons/umbrella.svg" /> <h1>Don't forget your umbrella. It's wet in ${data.name} today.</h1>`
            document.body.style.color = '#164A68'
            document.body.style.backgroundColor = '#A3DEF7'

        //Clear sky shows icon with sunglasses and yellow background color
        } else if (todaysWeather === "Clear") {
            weatherText.innerHTML += `<img src="./icons/sunglasses.svg" /> <h1> Get your sunnies on. ${data.name} is looking rather great today. </h1>`
            document.body.style.color = '#2A5510'
            document.body.style.backgroundColor = '#F7E9B9'

            //If cloudy, snowy and all other weather categories shows cloud icon and light pink background color

        } else if (todaysWeather === "Clouds") {
            weatherText.innerHTML += `<img src="./icons/cloud.svg" /> <h1> Light a fire and get cosy. ${data.name} is looking grey today. </h1>`
            document.body.style.color = '#F47775'
            document.body.style.backgroundColor = '#F4F7F8'

        } else if (todaysWeather === "Snow") {
            weatherText.innerHTML += `<img src="./icons/cloud.svg" /> <h1> Light a fire and get cosy. ${data.name} is looking snowy today. </h1>`
            document.body.style.color = '#F47775'
            document.body.style.backgroundColor = '#F4F7F8'

        } else  {
          weatherText.innerHTML += `<h1> There is ${todaysWeather} in ${data.name} today. </h1>`
          document.body.style.color = '#F47775'
          document.body.style.backgroundColor = '#F4F7F8'
        }  

    });


//Third section  


fetch(API_FORECAST)
    .then((res) => res.json())


    .then((json) => {

        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))

        let returnWeekDay = (date) => {
            let daysInWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
            let inputDate = new Date(date.replace(' ', 'T'));
            return daysInWeek[inputDate.getDay()];
        }

        filteredForecast.forEach((forecast) => {
            let daysInWeek = returnWeekDay(forecast.dt_txt);
            weatherForecast.innerHTML += `<div class="border-bottom"><div class="days"> ${daysInWeek}</div><div class="temp"> ${Math.round(forecast.main.temp)}°</div></div>`
        })

    });
