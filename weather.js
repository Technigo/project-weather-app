const container = document.getElementById('weather')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ead60d2e1c3fff29cccec12bd6a43922')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        container.innerHTML = `<h1>Current weater in ${json.name}</h2>`

        const temp = Math.round(+json.main.temp)

        container.innerHTML += `<p> The temperature is ${temp}. </p>`

        json.weather.forEach((element) => {
            container.innerHTML += `<p> The overal weather: ${element.description}. </p>`
        })

        //Declare variable for the time of sunrise/sunset and get them in hours:minutes:seconds GMT
        const sunrise = new Date(json.sys.sunrise * 1000);
        const sunset = new Date(json.sys.sunset * 1000)

        //Declare new variable to show only hh:mm
        const sunriseShort = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
        const sunsetShort = sunset.toLocaleTimeString([], { timeStyle: 'short' })

        container.innerHTML += `<p> Sunrise ${sunriseShort} </p>`
        container.innerHTML += `<p> Sunset ${sunsetShort} </p>`
    })
    .catch((err) => {
        console.log('caught errors', err)
    })

/* fetch('http://api.openweathermap.org/data/2.5/forecast?q=Wanaka,NewZealand&units=metric&APPID=ead60d2e1c3fff29cccec12bd6a43922')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        container.innerHTML = `<h1>Current weater in ${json.city.name}</h2>`

        json.weather.forEach((element) => {
            container.innerHTML += `<p> The overal weather: ${element.description}. </p>`
        })

        container.innerHTML += `<p> The temperature is between ${json.main.temp_max} and ${json.main.temp_min}. </p>`

        //Declare variable for the time of sunrise/sunset
        const unixTimestampSunrise = json.sys.sunrise
        const unixTimestampSunset = json.sys.sunset

        //To get sunrise/sunset time in hours:minutes:seconds
        const sunrise = new Date(unixTimestampSunrise * 1000)
        const sunset = new Date(unixTimestampSunset * 1000)

        //Declare new variable to show only hh:mm
        const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
        const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

        container.innerHTML += `<p> Sunrise ${sunriseTime} </p>`
        container.innerHTML += `<p> Sunset ${sunriseTime} </p>`
    })
    .catch((err) => {
        console.log('caught errors', err)
    }) */