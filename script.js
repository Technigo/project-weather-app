const container = document.getElementById('card')
const forecastDate = document.getElementById('forecastDate')
const forecastTemp = document.getElementById('forecastTemp')
const forecastFeels = document.getElementById('forecastFeels')
const forecastMinMax = document.getElementById('forecastMinMax')


fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=14156af54d10ce159e1b521416adb87f")
    .then((response)=> {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        container.innerHTML = `
        <h1> Check the weather in ${json.name} </h1>
        <h2> The visibility is ${json.visibility}meters</h2>
        <h3> The temperature is ${json.main.temp}°C</h3>
        <h2> ${json.weather[0].description} </h2>
        `
    })

    fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=ddf98774bfc0041a16a7d95948e68934")
        .then((response) => {
            return response.json()
        })
        .then ((json) => {
            console.log(json)

             const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
            console.log(filteredForecast)
            filteredForecast.forEach((weeklyForecast) => {
                forecastTemp.innerHTML += `<span>${weeklyForecast.main.temp.toFixed(0)}\u00B0C</span> `
                forecastFeels.innerHTML += `<span>${weeklyForecast.main.feels_like.toFixed(0)}\u00B0C</span> `
                forecastMinMax.innerHTML += `<span>${weeklyForecast.main.temp_min.toFixed(0)}\u00B0C/${weeklyForecast.main.temp_max.toFixed(0)}\u00B0C</span> `
            })
            filteredForecast.forEach((day) => {
                const date = new Date(day.dt * 1000)
                let dayName = date.toLocaleDateString("en-US", {weekday: "short"})
                forecastDate.innerHTML += `<span>${dayName}</span>`
                })
             })
        