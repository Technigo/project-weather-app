const API_KEY = '461046c1b035d88b328cf5cc47778c02'
const API_URL_WEATHER = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`
const API_URL_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`

const temperature = document.getElementById('temperatureId')
const mainIcon = document.getElementById('cityIconId')
const cityName = document.getElementById('cityNameId')
const description = document.getElementById('descriptionId')
const sunrise = document.getElementById('sunriseId')
const sunset = document.getElementById('sunsetId')
const forecastContent = document.getElementById('mainForecastDataId')


// Get weather info for Stockholm
fetch(API_URL_WEATHER)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        //Present the temperature (rounded to 1 decimal place), the city name and what type of weather it is
        temperature.innerHTML = `${json.main.temp.toFixed(1)}°C`
        cityName.innerHTML = `${json.name}`
        description.innerHTML = `${json.weather[0].description}`

        //Set the current weather image
        const weatherImgConst = json.weather[0].icon;
        mainIcon.src =`./assets/${weatherImgConst}.png`

        //Set the time for sunrise and sunset 
        const sunriseValue = new Date(json.sys.sunrise * 1000)
        const sunriseTime = sunriseValue.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })
        const sunsetValue = new Date(json.sys.sunset * 1000)
        const sunsetTime = sunsetValue.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })
        sunrise.innerText = `Sunrise: ${sunriseTime}`
        sunset.innerText = `Sunset: ${sunsetTime}`
    })
    .catch((err) => {
        console.error('Caught error: ${err}')
    })

// Get 5 days weather forecast
fetch(API_URL_FORECAST)
    .then((response) => {
        return response.json()
    })

    .then((json) => {
        //Show a forecast for the next 5 days when time is 12:00
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
        filteredForecast.forEach(day => {
            //Set weekday
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', {
                weekday: "long"
            })
            //Get weather image from API
            const weatherImgId = day.weather[0].icon;

            //Get weather description from API
            const description = day.weather[0].description;

            //Get min and max values from API
            const feels = day.main.feels_like.toFixed(); //Gets feels like and max temp from API and rounds it up
            const max = day.main.temp_max.toFixed();

            //Present result in HTML
            forecastContent.innerHTML += `<div class="forecast-container"> <p class="forecast-day">${dayName}</p> <img class="forecast-icon" src='./assets/${weatherImgId}.png'> <p class="forecast-description">${description}</p> <p class="forecast-minmax">${max}°C / ${feels}°C</p> </div>`

        })
    })
    .catch((err) => {
        console.error('Caught error: ${err}')
    })