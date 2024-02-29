const today = document.getElementById ("today")
const text = document.getElementById ("text")
const week = document.getElementById ("week")
const icon = document.getElementById ("icon")


fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=725ee441189d3e16a4e4aa74b081805e")
    .then((response) => {
       return response.json()
    })
    .then ((json) => {
        //Added a variable to be able to round up today's temperature
        let temperatureRound = Math.round(json.main.temp)
        console.log(json)
        today.innerHTML = `<h4>
        ${json.weather[0].main} | ${temperatureRound}°<br>
        </h4>`
        if (json.weather[0].main == "Clear"){
        icon.innerHTML = `<img src="assets/noun_Sunglasses_2055147.svg"/>`
        text.innerHTML = `<h2>Get your sunnies on. ${json.name} is looking rather great today. </h2>`
        }
        else if (json.weather[0].main == "Rain"){
        icon.innerHTML = `<img src="assets/noun_Umbrella_2030530.svg"/>`
        text.innerHTML = `<h2>Don't forget your umbrella. It's wet in ${json.name} today.</h2>`
        }
        else if (json.weather[0].main == "Clouds"){
        icon.innerHTML = `<img src="assets/noun_Cloud_1188486.svg"/>`
        text.innerHTML = `<h2>Light a fire and get cosy. ${json.name} is looking grey today. </h2>`
        }
    })
