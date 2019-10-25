const apiKey = '79a5016dc063fba5a823f15d23b3fb1f'
let city = 'Stockholm, Sweden'
fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        document.getElementById("weather").innerHTML += `Wheater in ${json.name} now:<br>${json.weather[0].description}<br>Temperature: ${json.main.temp.toFixed(1)}`
    })