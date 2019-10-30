const container = document.getElementById('weather')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ead60d2e1c3fff29cccec12bd6a43922')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        container.innerHTML = `<h1>Current weater in ${json.name}</h2>`

        json.weather.forEach((element) => {
            container.innerHTML += `<p>The weather in Stockholm is ${element.description}.</p>`
        })

        container.innerHTML += `<p>The temperature is between ${json.main.temp_max} and ${json.main.temp_min}.</p>`
    })
    .catch((err) => {
        console.log('caught errors', err)
    })