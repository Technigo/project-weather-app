const showLocation = document.getElementById('weather')
const showSunriseTime = document.getElementById('showSunriseTime')
const showSunsetTime = document.getElementById('showSunsetTime')

fetch('http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=5efe76b9dced790a8b8d34af9bba77d8&units=metric')
    .then((response) => {
        return response.json()
    })

    .then((json) =>{
        showLocation.innerHTML = `<h1>${json.name}</h1>`
        showTemperature.innerHTML = `<h1>${json.main.temp}°</h1>`
        showMainWeather.innerHTML = `<h1>${json.weather[0].main}</h1>`

        let sunsetInMillisecond = json.sys.sunrise
        let sunsetTime = new Date(sunsetInMillisecond).toLocaleTimeString()
        showSunsetTime.innerHTML = `<h1> ${sunsetTime}</h1>`

        let sunriseInMillisecond = json.sys.sunrise
        let sunriseTime = new Date(sunriseInMillisecond).toLocaleTimeString()
        showSunriseTime.innerHTML = `<h1> ${sunriseTime}</h1>`
    
        if (showTemperature > '15') {
            document.body.style.backgroundColor = '#B0B7c6';
        } else {
            document.body.style.backgroundColor = "#ff8d88";
        }
    })
    
    


    