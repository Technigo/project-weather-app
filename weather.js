const container = document.getElementById('weatherApp')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=4836efb5df99b8aff3e5800f795a77c0')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        //Declare variable for the time of sunrise/sunset
        const timeStampSunrise = json.sys.sunrise
        const timeStampSunset = json.sys.sunset
        console.log(timeStampSunrise)
        console.log(timeStampSunset)

        //To get sunrise/sunset time in hours:minutes:seconds
        const sunrise = new Date(timeStampSunrise * 1000)
        const sunset = new Date(timeStampSunset * 1000)
        console.log(sunrise)
        console.log(sunset)

        //Declare new variable to show only hh:mm
        const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
        const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })
        console.log(sunriseTime)
        console.log(sunsetTime)

        container.innerHTML += `<h1>${json.name}</h1>`
        container.innerHTML += `<h1>${json.main.temp} C</h1>`
        container.innerHTML += `<h3>Sunrise: ${sunriseTime}</h3>`
        container.innerHTML += `<h3>Sunset: ${sunsetTime}</h3>`
    })


    //container.innerHTML = `<h1>There are ${json.number} people in space right now</h1>`

   // json.people.forEach((person) => {
      //  container.innerHTML += `<p>${person.name} is on the ${person.craft}</p>`