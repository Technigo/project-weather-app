const container = document.querySelector("#container")

const getWeather = fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=bb54e9dec92e93ad760de1e57539382a")
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        let sunrise = new Date(data.sys.sunrise)
        let sunset = new Date(data.sys.sunset)
        console.log(data.sys.sunrise)
        container.innerHTML = `
        <p>${data.name}</p>
        <p>${Math.round(data.main.temp)}</p>
        <p>${data.weather[0].description}</p>
        <p>${sunrise}</p>
        <p>${sunset}</p>
        `
    })

const getForecast = fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=bb54e9dec92e93ad760de1e57539382a")
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
        console.log(filteredForecast)
        for (let i = 0; i < filteredForecast.length; i++) {
            container.innerHTML += `
            <p>${Math.round(filteredForecast[i].main.temp)}</p>
            `
        }
    })

