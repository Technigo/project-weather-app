const weatherInfo = document.getElementById('weatherInfo')
const weatherText = document.getElementById('weatherText')
const weatherForecast = document.getElementById('weatherForecast')



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
        weatherInfo.innerHTML += `<p>Temp: ${Math.round(temp)}</p>`
        weatherInfo.innerHTML += `<p>Weather: ${weather}</p>`
        weatherInfo.innerHTML += `<p>Sunrise: ${new Date(sunrise * 1000).toLocaleTimeString([], { timeStyle: 'short' })}</p>`
        weatherInfo.innerHTML += `<p>Sunset: ${new Date(sunset * 1000).toLocaleTimeString([], { timeStyle: 'short' })}</p>`

        //Second section 
        //weatherText.innerHTML += `<h1>${data.name}</h1>`

        if (todaysWeather === "Rain" || todaysWeather === "Drizzle") {
            //HTML.classList.add("Rain", "Drizzle");
            weatherText.innerHTML += `<p>Don't forget your umbrella. It's wet in ${data.name} today.</p>`
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
            let daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let inputDate = new Date(date.replace(' ', 'T'));
            return daysInWeek[inputDate.getDay()];
        }

        filteredForecast.forEach((forecast) => {
            let daysInWeek = returnWeekDay(forecast.dt_txt);
            weatherForecast.innerHTML += `<p> ${daysInWeek} ${Math.round(forecast.main.temp)}°</p>`
        })

    });


    //We got help from this question https://stackoverflow.com/c/technigo/questions/2180 so//