const containerSthlm = document.getElementById("stockholm-weather")



fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=42da1ed967bb60f77a80f7975f8783b9')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        //Declare variable for the time of sunrise/sunset
        const unixTimestampSunrise = json.sys.sunrise
        const unixTimestampSunset = json.sys.sunset

        //To get sunrise/sunset time in hours:minutes:seconds
        const sunrise = new Date(unixTimestampSunrise * 1000)
        const sunset = new Date(unixTimestampSunset * 1000)

        //Declare new variable to show only hh:mm
        const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
        const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

        containerSthlm.innerHTML = `<h1>Todays weather in ${json.name}</h1> <h2>${json.main.temp.toFixed(1)}</h2>`

        json.weather.forEach((weatherType, weatherIcon) => {
            containerSthlm.innerHTML += `<p>${weatherType.description}</p>`
            containerSthlm.innerHTML += `<img src="http://openweathermap.org/img/wn/10d@2x.png" ${weatherIcon.icon} />`
        })
        containerSthlm.innerHTML += `<p>Sunrise ${sunriseTime} Sunset${sunsetTime}</p>`
    })
