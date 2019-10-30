const container = document.getElementById('weather')

// WEATHER FOR TODAY IN STOCKHOLM

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ead60d2e1c3fff29cccec12bd6a43922')
    .then((response) => {
        return response.json()
    })
    .then((json) => {

        // description

        /* json.weather.forEach((element) => {
            container.innerHTML = `<p> The overal weather: ${element.description}. </p>`
        }) */

        // temperature

        /* const temp = Math.round(+json.main.temp)
        container.innerHTML += `<p> The temperature is ${temp} °C.</p>` */

        // description and temperature together

        const temp = Math.round(+json.main.temp)
        const despcription = json.weather.forEach((element) => {
            container.innerHTML = `<p> ${element.description} | ${temp} °C. </p>`
        })

        //time of sunrise/sunset in hours:minutes:seconds GMT

        const sunrise = new Date(json.sys.sunrise * 1000);
        const sunset = new Date(json.sys.sunset * 1000)

        //time as hh:mm

        const sunriseShort = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
        const sunsetShort = sunset.toLocaleTimeString([], { timeStyle: 'short' })

        container.innerHTML += `<p> sunrise ${sunriseShort}</p>`
        container.innerHTML += `<p> sunset ${sunsetShort}</p>`

        // city

        const city = json.name

        container.innerHTML += `<h1>Current weather in ${city}</h2>`

    })
    .catch((err) => {
        console.log('caught errors', err)
    })


// WEATHER FORECAST IN LISBON - TRIAL AND ERROR, BUT MOSTLY ERRORS

/* const handle5daysforecast = (json) => {
    const dates = {}

    json.list.forEach((weather) => {
        const date = weather.dt_txt.split(' ')[0]
        if (dates[date]) {
            dates[date].push(weather)
        } else {
            dates[date] = [weather]
        }
    })
}

console.log('dates')

AND IT DOESN'T PRINT OUT DATES, UNFORTUNATELY

Object.entries('dates').forEach((item) => {
    const date = item[0]
    const weatherValues = item[1]

    const temps = weatherValues.map((value) => {
        return value.main.temp
    })
    const minTemp = Math.min(...temps)
})

fetch('http://api.openweathermap.org/data/2.5/forecast?q=Lisbon,Portugal&units=metric&APPID=ead60d2e1c3fff29cccec12bd6a43922')
    .then((res) => res.json())
    .then(handle5daysforecast)
    .catch((err) => {
        console.log('caught errors', err)
    })

 */
/* fetch('http://api.openweathermap.org/data/2.5/forecast?q=Lisbon,Portugal&units=metric&APPID=ead60d2e1c3fff29cccec12bd6a43922')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        container.innerHTML = `<h1>Current weather in ${json.city.name}</h2>` */

//Declare variable for the time of sunrise/sunset and get them in hours:minutes:seconds GMT
/*        const sunrise = new Date(json.city.sunrise * 1000);
       const sunset = new Date(json.city.sunset * 1000) */

//Declare new variable to show only hh:mm
/*        const sunriseShort = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
       const sunsetShort = sunset.toLocaleTimeString([], { timeStyle: 'short' })

       container.innerHTML += `<p> Sunrise ${sunriseShort} AM.</p>`
       container.innerHTML += `<p> Sunset ${sunsetShort} PM.</p>` */

// MATH.ROUND WORKS ONLY FOR SINGLE DAY

/*  const temp = Math.round(+json.main.temp)
 container.innerHTML += `<p> The temperature is ${temp} °C.</p>` */

// DESCRIPTION FROM ALL ARRAYS

/*     json.list.forEach((day) => {
        container.innerHTML += `<p> The overall weather: ${day.weather[0].description}. </p>`
    })

}) */
/* .catch((err) => {
    console.log('caught errors', err)
}) */