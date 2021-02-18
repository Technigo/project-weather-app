const CURRENT_WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?q=Paris&units=metric&appid=9aeed004b4643ec679ac5d430384d994"
const FORECAST_URL = "http://api.openweathermap.org/data/2.5/forecast?q=Paris&units=metric&appid=9aeed004b4643ec679ac5d430384d994"

const cityName = document.getElementById("cityName")
const currentTemperature = document.getElementById("currentTemperature")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const currentWeatherContainer = document.getElementById("currentWeatherContainer")
const icon = document.getElementById("icon")
const weatherMessage = document.getElementById("weatherMessage")
const weekDays = document.getElementById("weekDays")
const temperatureForecast = document.getElementById("temperatureForecast")
const forecastInformation = document.getElementById("forecastInformation")

//Function to get current weather information and changing inner.HTML accordingly
const fetchCurrentWeather = () => {
    fetch(CURRENT_WEATHER_URL)
        .then(response => {
            if(response.ok){
                return response.json()
            } else {
                throw "Something went wrong!"
            }
        })
        .then((data) => {
            console.log(data)
            const timezoneOffset = new Date().getTimezoneOffset() * 60;
            const sunriseDate = new Date((data.sys.sunrise + data.timezone + timezoneOffset) * 1000)
            const sunsetDate = new Date((data.sys.sunset + data.timezone + timezoneOffset) * 1000)

            const weatherDescription = data.weather[0].description   
            const cloudIcon = "../icons/noun_Cloud_1188486.svg"
            const sunglassesIcon = "../icons/noun_Sunglasses_2055147.svg"
            const umbrellaIcon = "../icons/noun_Umbrella_2030530.svg"
            
            //Showing temperature, sunrise, sunset and city name
            currentTemperature.innerHTML = `<p>${data.weather[0].main} | ${data.main.temp.toFixed(0)}&deg;<p>` 
            sunrise.innerHTML += `<p>Sunrise  ${sunriseDate.getHours()}:${sunriseDate.getMinutes()}<p>`
            sunset.innerHTML += `<p>Sunset ${sunsetDate.getHours()}:${sunsetDate.getMinutes()}<p>`
            cityName.innerHTML += `<h1>${data.name}<h1>`

            //Showing proper icon and text depending on weatherDescription
            if (weatherDescription === "clear sky"){
                icon.innerHTML += `<img src=${sunglassesIcon}></img>`
                weatherMessage.innerHTML += `<h2>Get your sunnies on! ${data.name} is looking rather great today.</h2>`
                
                let container = document.getElementById("container");
                let forecast = document.getElementById("forecast");
                container.style.backgroundColor = "#F7E9B9";
                container.style.color = "#2A5510";
                //Change the color for border bottom!!!

            } else if (weatherDescription === "thunderstorm" || "rain" || "shower rain" || "snow"){
                icon.innerHTML += `<img src=${umbrellaIcon}> </img>`
                weatherMessage.innerHTML += `<h2>Don't forget your umbrella. It's wet in ${data.name} today.</h2>`
            } else {
                icon.innerHTML += `<img src=${cloudIcon}> </img>`
                weatherMessage.innerHTML += `<h2>Light a fire, get cosy ${data.name} is looking grey today.</h2>`
            }        
        })
        // Method to catch errors during fetch()
        .catch(error => { 
            currentWeatherContainer.innerHTML = `<h1>${error}. "Something went wrong!"<h1>`
        })
}
//Calling the function
fetchCurrentWeather()

//Function to get forecast weather information and changing inner.HTML accordingly
const fetchForecastWeather = () => {
    fetch(FORECAST_URL)
        .then(response => {
            if(response.ok){
                return response.json()
            } else {
                throw "Something went wrong!"
            }
        })
        .then((data) => {
            //filter the information so it is only shown for same time (12:00) every day 
            const filteredForecast = data.list.filter(item => item.dt_txt.includes("12:00"))
            //Looping through the filtered weather array to get and show weekday and temperature information
            filteredForecast.forEach((data) => { 
                const date = new Date(data.dt * 1000)
                // Make a Date object for right now
                const now = new Date();
                // Compare the forecast's day with the day right now
                const isTodaysForecast = date.getDay() === now.getDay();
                const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
                let dayOfTheWeek = weekdays[date.getDay()]
                // We don't want to include this forecast if it is for today
                    if(!isTodaysForecast){
                        //Is there a better way to create a space in the text?
                        forecastInformation.innerHTML += `<h3 id="forecast" class="forecast">${dayOfTheWeek}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        ${data.main.temp.toFixed(0)}&deg;</h3>`
                        //.toFixed(1) rounds the temperature to 1 decimal   
                    }
               
            })
        })
        // Method to catch errors during fetch()
        .catch(error => { 
            currentWeatherContainer.innerHTML = `<h1>${error}. "Something went wrong!"<h1>`
        })
}
//Calling the function
fetchForecastWeather()

