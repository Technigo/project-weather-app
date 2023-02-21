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
        
        testy.innerHTML = `<p>City: ${json.name}</p>`;
        testy.innerHTML += `<p>Temperature: ${round} °C</p>`;
        testy.innerHTML += `<p>Weather: ${json.weather[0].description}</p>`;
    })
    .catch((err) => {
        console.log(`error caught:`, err)
    })

   