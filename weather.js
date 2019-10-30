const container = document.getElementById('weather')

/* fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ead60d2e1c3fff29cccec12bd6a43922')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        container.innerHTML = `<h1>Current weather in ${json.name}</h2>`

        const temp = Math.round(+json.main.temp)

        container.innerHTML += `<p> The temperature is ${temp} °C.</p>`

        json.weather.forEach((element) => {
            container.innerHTML += `<p> The overal weather: ${element.description}. </p>`
        })

        //Declare variable for the time of sunrise/sunset and get them in hours:minutes:seconds GMT
        const sunrise = new Date(json.sys.sunrise * 1000);
        const sunset = new Date(json.sys.sunset * 1000)

        //Declare new variable to show only hh:mm
        const sunriseShort = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
        const sunsetShort = sunset.toLocaleTimeString([], { timeStyle: 'short' })

        container.innerHTML += `<p> Sunrise ${sunriseShort} AM.</p>`
        container.innerHTML += `<p> Sunset ${sunsetShort} PM.</p>`
    })
    .catch((err) => {
        console.log('caught errors', err)
    }) */

fetch('http://api.openweathermap.org/data/2.5/forecast?q=Lisbon,Portugal&units=metric&APPID=ead60d2e1c3fff29cccec12bd6a43922')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        container.innerHTML = `<h1>Current weather in ${json.city.name}</h2>`

        // // TO DZIAŁA DLA POJEDYNCZEGO DNIA, ALE NIE DLA PROGNOZY

        /*  const temp = Math.round(+json.main.temp)
         container.innerHTML += `<p> The temperature is ${temp} °C.</p>` */

        // TU WYWALA MI BUGA, BO NIE MOZE ZNALEZC ELEMENTU WEATHER W PIERWSZEJ ARRAY

        /*  json.list[""].weather.forEach((element) => {
             container.innerHTML += `<p> The overal weather: ${element.description}. </p>`
         }) */

        json.list.forEach((day) => {
            container.innerHTML += `<p> The overal weather: ${day.weather[0].description}. </p>`
        })

        // TO DZIAŁA DLA POJEDYNCZEGO DNIA, ALE NIE DLA PROGNOZY

        /* json.weather.forEach((element) => {
            container.innerHTML += `<p> The overal weather: ${element.description}. </p>`
        }) */


        //Declare variable for the time of sunrise/sunset and get them in hours:minutes:seconds GMT
        const sunrise = new Date(json.city.sunrise * 1000);
        const sunset = new Date(json.city.sunset * 1000)

        //Declare new variable to show only hh:mm
        const sunriseShort = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
        const sunsetShort = sunset.toLocaleTimeString([], { timeStyle: 'short' })

        container.innerHTML += `<p> Sunrise ${sunriseShort} AM.</p>`
        container.innerHTML += `<p> Sunset ${sunsetShort} PM.</p>`
    })
    .catch((err) => {
        console.log('caught errors', err)
    })