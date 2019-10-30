const container = document.getElementById('stockholm')
const place = document.getElementById('location')
const weather = document.getElementById('weather')
const temp = document.getElementById('temp')


fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=136131579df2be1e6059803ccc6e55b2')
.then ((response) => {
    return response.json()
})

.then ((json) => {
    console.log(json)

    place.innerHTML = (json.name)
    weather.innerHTML = (json.weather[0].description)
    temp.innerHTML = (json.main.temp)

    
    })