const header = document.getElementById("header")
const main = document.getElementById("main")
const container = document.getElementById("container")

let weather = []
let weatherObject = []
let temperatureNow = ""

header.innerHTML = `
<h1>Hej</h1>
`
fetch ("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8be7a87323d320c7bae11d84fa0a7c61")
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        weather = json.weather
        weatherObject = weather[0]
        console.log (json)
        temperatureNow = Math.round(json.main.temp)
        main.innerHTML = `There is ${weatherObject.description} and ${temperatureNow} degrees in ${json.name} today.`;
    })
