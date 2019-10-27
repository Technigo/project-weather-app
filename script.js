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
            container.innerHTML = `<h1>In ${json.name} the temperature is ${temperature} and we have ${desc} today.</h1>`
        })
    
    })