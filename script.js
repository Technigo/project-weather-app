const container = document.getElementById('card')
const forecast = document.getElementById('forecast')


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
                forecast.innerHTML += `<h3>${weeklyForecast.dt_txt} |---| ${weeklyForecast.main.temp.toFixed(1)}\u00B0C <h3>
                                        <p>Feels like ${weeklyForecast.main.feels_like}\u00B0C<p>
                                        <p>High: ${weeklyForecast.main.temp_max}\u00B0C Low:${weeklyForecast.main.temp_min}\u00B0C<p>`
            }
            )
            
        
        })
        