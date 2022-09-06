const stad = document.getElementById('stad')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=fed8be257d06e9a0aa60731701ed1473')
    .then ((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)

        stad.innerHTML = `<h1>The citys name is ${json.name}</h1>`

        const shortSunrise = json.sys.sunrise;
        const shortSunset = json.sys.sunset;

        let sunrise = new Date (shortSunrise * 1000);

        let sunset = new Date (shortSunset * 1000);

        let sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
        let sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

        let number = json.main.temp;
        let rounded = Math.round(number * 10) / 10;

        // var number = 12.3456789
        //var rounded = Math.round(number * 10) / 10

        stad.innerHTML +=`<p>${json.weather[0].main} | ${rounded}°C</p>`
        stad.innerHTML +=`<p>sunrise ${sunriseTime}</p>`
        stad.innerHTML +=`<p>sunset ${sunsetTime}</p>` 


    })

// https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=fed8be257d06e9a0aa60731701ed1473