const testy = document.getElementById('testy');

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm&units=metric&APPID=c480de5f69ca98d1993a4dae3213642e')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(`json:`, json)

        let round = Math.round(json.main.temp * 10 ) / 10;
        console.log(round)

        console.log(json.weather[0].description)

        const sunriseUnix = json.sys.sunrise;                   // Unix timestamp
        const sunriseTime = new Date(sunriseUnix * 1000);       //Gives us the time in "human" form (as a date), mult. by 1000 to get it in ms.
        const sunriseShort = sunriseTime.toLocaleTimeString([], { timeStyle: 'short' });        //Transforms it into just the Hour/minutes and AM/PM. Select the short variant to get the time with minutes and not seconds.
        const sunsetTime = new Date(json.sys.sunset * 1000);
        const sunsetShort = sunsetTime.toLocaleTimeString([], { timeStyle: 'short' }); 

        testy.innerHTML = `<p>City: ${json.name}</p>`;
        testy.innerHTML += `<p>Temperature: ${round} °C</p>`;
        testy.innerHTML += `<p>Weather: ${json.weather[0].description}</p>`;


        testy.innerHTML += `<p>sunrise: ${sunriseShort}</p>`;
        testy.innerHTML += `<p>sunset: ${sunsetShort}</p>`;
    })
    .catch((err) => {
        console.log(`error caught:`, err)
    })

   