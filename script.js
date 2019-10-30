const containerSthlm = document.getElementById("stockholm-weather")
//const currentTemp = document.getElementById("current-temp")
//const currentType = document.getElementById("current-type")
//const sunRiseSunSet = document.getElementById("sunrise-sunset")


fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=42da1ed967bb60f77a80f7975f8783b9')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        containerSthlm.innerHTML = `<h1>Todays weather in ${json.name}</h1> <h2>${json.main.temp}</h2>`

        json.weather.forEach((weatherType) => {
            containerSthlm.innerHTML += `<p>${weatherType.description}</p>`
        })

    })
