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

        //weatherText.innerHTML += `<img src="../icons/umbrella.svg" /> <h1>Don't forget your umbrella. It's wet in ${data.name} today.</h1>`


        //weatherText.innerHTML += `<h1>${data.name}</h1>`

        if (todaysWeather === "Rain" || todaysWeather === "Drizzle") {
            //HTML.classList.add("Rain", "Drizzle");
            weatherText.innerHTML += `<img src="../icons/umbrella.svg" /> <h1>Don't forget your umbrella. It's wet in ${data.name} today.</h1>`
        } else if (todaysWeather === "Clear") {
            //HTML.classList.add("clear");
            weatherText.innerHTML += `<p> Get your sunnies on. ${data.name} is looking rather great today. </p>`
        } else if (todaysWeather === "Clouds") {
            //HTML.classList.add("Clouds");
            weatherText.innerHTML += `<p> Light a fire and get cosy. ${data.name} is looking grey today. </p>`
        } else if (todaysWeather === "Snow") {
            //HTML.classList.add("Snow");
            weatherText.innerHTML += `<p> Light a fire and get cosy. Stockholm is looking snowy today. </p>`
        } else  {
          weatherText.innerHTML += `<p> There is ${todaysWeather} in ${data.name} today. </p>`
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


    //We got help from this question https://stackoverflow.com/c/technigo/questions/2180 so//