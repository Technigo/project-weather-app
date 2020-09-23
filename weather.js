const apiUrlForecast = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=461046c1b035d88b328cf5cc47778c02'
const apiUrlFiveDays = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=461046c1b035d88b328cf5cc47778c02'
const container = document.getElementById('weather')
const weeklyWeather = document.getElementById('weekly-weather')

fetch(apiUrlForecast)
    .then((response) => {
        return response.json()
    })

    .then((json) => {
        //Present the  temperature (rounded to 1 decimal place), the city name and what type of weather it is
        container.innerHTML = `<h1> ${json.main.temp.toFixed(1)}°C</h1>`
        container.innerHTML += `<p>${json.name}<p>`
        container.innerHTML += `<p>Type of weather: ${json.weather[0].description}</p>`

        //Show the time for sunrise and sunset 
        const sunrise = new Date(json.sys.sunrise * 1000)
        const sunriseTime = sunrise.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })
        container.innerHTML += `<p>Sunset: ${sunriseTime}</p>`
        const sunset = new Date(json.sys.sunset * 1000)
        const sunsetTime = sunset.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })
        container.innerHTML += `<p>Sunset: ${sunsetTime}</p>`
    })
    .catch((err) => {
        console.log('Caught error: ${err}')
    })


fetch(apiUrlFiveDays)
    .then((response) => {
        return response.json()
    })

    .then((json) => {
        //Show a forecast for the next 5 days and show the min and max temperature for each day, 
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
        console.log(filteredForecast)
        filteredForecast.forEach(day => {

            let date = new Date(day.dt * 1000);
            let dayName = date.toLocaleDateString(undefined, {
                weekday: "long"
            })
            let dayTemp = day.main.temp.toFixed(1);
            let dayTempMin = day.main.temp_min.toFixed(1);

            weeklyWeather.innerHTML += `<p> ${dayName} ${dayTemp}°C/${dayTempMin}°C<p>`
        })
    })
    .catch((err) => {
        console.log('Caught error: ${err}')
    })