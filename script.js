const cityName = document.getElementById('cityName')
const temperature = document.getElementById('temperature')
const weatherType = document.getElementById('weatherType')


const fetchWeather = () => {

    fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=fd582670436692008725c351eb4985b0')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        console.log(json.name)
        console.log((json.main.temp).toFixed(1))
        console.log(json.weather[0].description) //här kanske vi får ändra! om det kommer fler objekt i arrayen.
        cityName.innerHTML = `STAD: ${json.name}`
        temperature.innerHTML =`TEMPERATUREN ÄR: ${(json.main.temp).toFixed(1)}`
        weatherType.innerHTML =`BESKRIVNING: ${json.weather[0].description}`
    })

    
}
fetchWeather()