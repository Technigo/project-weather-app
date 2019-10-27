const container = document.getElementById('weather')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=9c5547207014dca2db40f4f51bbb601a')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        const temperature = Math.round(json.main.temp * 10 ) / 10
        json.weather.forEach((el) => {
            const desc = el.description
            container.innerHTML = `<h1>The weather for ${json.name}:</h1>`
            container.innerHTML += `<p>The temerature today is: ${temperature}</p>`
            container.innerHTML += `<p>Type of weather: ${desc}</p>`
        })

        const sunrise = json.sys.sunrise
        const sunset = json.sys.sunset
        const sunriseConverted = new Date(sunrise * 1000);
        const sunsetConverted = new Date(sunset * 1000);
        let sunriseMin = sunriseConverted.getMinutes()
        let sunsetMin = sunsetConverted.getMinutes()
        if (sunriseMin < 10 ) { 
            sunriseMin = '0' + sunriseMin;
            } else {
            sunriseMin = sunriseMin + '';
            }
        if (sunsetMin < 10) {
            sunsetMin = '0' + sunsetMin;
        }   else {
            sunsetMin = sunsetMin + '';
        }
        container.innerHTML += `<p>Sunrise at: ${sunriseConverted.getHours()}:${sunriseMin}</p>`
        container.innerHTML += `<p>Sunset at: ${sunsetConverted.getHours()}:${sunsetMin}</p>` 
    })