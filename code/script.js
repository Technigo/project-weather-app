const today = document.getElementById ("today")
const week = document.getElementById ("week")

fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=725ee441189d3e16a4e4aa74b081805e")
    .then((response) => {
       return response.json()
    })
    .then ((json) => {
        today.innerHTML = `<h3>The weather in Stockholm right now is: ${json.main.temp} degrees Celsius</h3>`
    })

fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=725ee441189d3e16a4e4aa74b081805e")
    .then((response) => {
       return response.json()
    })
    .then ((json) => {
    json.list.forEach((forecast) => {
    week.innerHTML += `<p>${forecast.main.temp_min}° / ${forecast.main.temp_max} °C</p>`
    })
    })



 
