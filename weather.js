const API_KEY = '461046c1b035d88b328cf5cc47778c02'
const API_URL_WEATHER = `http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`
const API_URL_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`

const temperature = document.getElementById('temperature')
const weatherImg = document.getElementById('weather-img')
const cityName = document.getElementById('city-name')
const weatherDesc = document.getElementById('weather-desc')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const forecastInfo = document.getElementById('forecast-info"');


// Get weather info for Stockholm
fetch(API_URL_WEATHER)
    .then((response) => {
        return response.json()
    })

    .then((json) => {
        //Present the temperature (rounded to 1 decimal place), the city name and what type of weather it is
        temperature.innerHTML = `${json.main.temp.toFixed(1)}°C`
        cityName.innerHTML = `${json.name}`
        weatherDesc.innerHTML = `${json.weather[0].description}`

        //Set the current weather image
        const weatherImgConst = json.weather[0].icon;
        weatherImg.src = `./assets/${weatherImgConst}.png`

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
        console.log('Caught error: ${err}')
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
                const dayName = date.toLocaleDateString('en-US', {weekday: "long"})
                //Get weather image from API
                const weatherImgId = day.weather[0].icon;

                //Get weather description from API
                const description = day.weather[0].description;

                //Get min and max values from API
                const min = day.main.feels_like.toFixed(); //Gets min and max temp from API and rounds it up
                const max = day.main.temp_max.toFixed();
                
                //Present result in HTML
                        forecastInfo.innerHTML += `<div class="forecast-container">`
                        forecastInfo.innerHTML += `<p class="forecast-day">${dayName}</p>`
                        forecastInfo.innerHTML += `<img class="forecast-img" src='./assets/${weatherImgId}.png'>`
                        forecastInfo.innerHTML += `<p class="forecast-description">${description}</p>`
                        forecastInfo.innerHTML += `<p class="forecast-minmax">${max}°C / ${min}°C</p> </div>`
                          
        })
    })
    .catch((err) => {
        console.log('Caught error: ${err}')
    })

  