const city = document.getElementById('city')
const temperature = document.getElementById('temperature')
const description = document.getElementById('description')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const forecast = document.getElementById('forecast')


//This is for the main weather forecast for today

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=abebf12bf91dc9d039d1075966f84a6d')
    .then((response) => {
        return response.json()
    })
    .then((json) =>{
        let decimal = json.main.temp
        let number = Math.round(decimal * 10) / 10;
        let fixed = number.toFixed(1)
        city.innerHTML= (`City: ${json.name}`);
        temperature.innerHTML+= (`Temperature: ${fixed}°C`);
        /*made the rounded decimal works*/
        description.innerHTML= (`${json.weather[0].description}`) /*made it work by targeting the weather index zero, and the description within that index zero GREAT JOB!!!*/
        const sunriseConvert = new Date((json.sys.sunrise) * 1000);
        const sunriseTime = sunriseConvert.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        sunrise.innerHTML = (`Sunrise: ${sunriseTime}`)

        const sunsetConvert = new Date((json.sys.sunset) * 1000);
        const sunsetTime = sunsetConvert.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        sunset.innerHTML = (`Sunset: ${sunsetTime}`)
    });

    
//This is for the 4-days forecast, todays forecast is in the main-forecast
const getDay = (weekday) => {
    const dates = new Date(weekday * 1000); //Timestamp to milliseconds
    return dates.toLocaleDateString('en', {weekday: 'long'}); //Setting how to show day
    }

  

fetch ('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=abebf12bf91dc9d039d1075966f84a6d')
    .then((response) =>{
        return response.json()
    })
    .then ((json) => {
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
        forecast.innerHTML += `
        <div class="days">${getDay(filteredForecast[1].dt)}</div>
        <div class="dayDescription">${filteredForecast[1].weather[0].description}</div>
        <div class="temp">Temp: ${filteredForecast[1].main.temp.toFixed(1)}°</div>
        <div class="feelsLike">Feels like:${filteredForecast[1].main.feels_like.toFixed(1)}°</div>

        <div class="days">${getDay(filteredForecast[2].dt)}</div>
        <div class="temp">${filteredForecast[2].main.temp.toFixed(1)}°</div>
        <div class="temp">Temp: ${filteredForecast[2].main.temp.toFixed(1)}°</div>
        <div class="feelsLike">Feels like:${filteredForecast[2].main.feels_like.toFixed(1)}°</div>

        <div class="days">${getDay(filteredForecast[3].dt)}</div>
        <div class="temp">${filteredForecast[3].main.temp.toFixed(1)}°</div>
        <div class="temp">Temp: ${filteredForecast[3].main.temp.toFixed(1)}°</div>
        <div class="feelsLike">Feels like:${filteredForecast[3].main.feels_like.toFixed(1)}°</div>

        <div class="days">${getDay(filteredForecast[4].dt)}</div>
        <div class="temp">${filteredForecast[4].main.temp.toFixed(1)}°</div>
        <div class="temp">Temp: ${filteredForecast[4].main.temp.toFixed(1)}°</div>
        <div class="feelsLike">Feels like:${filteredForecast[4].main.feels_like.toFixed(1)}°</div>

        `
    })