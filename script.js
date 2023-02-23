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
        // Convert Unix timestamps to date objects
        const sunrise = new Date(json.sys.sunrise * 1000);
        const sunset = new Date(json.sys.sunset * 1000);
        
        container.innerHTML = `
        <h1> ${json.name} </h1>
        <h2> ${(Math.round(json.main.temp))}°C</h2>
        <h3> ${json.weather[0].description}</h3>
        <h4> sunrise ${sunrise.toLocaleTimeString()} sunset ${sunset.toLocaleTimeString()}  </h4>
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
        