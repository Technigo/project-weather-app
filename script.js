const cityName = document.getElementById('cityName')
const temperature = document.getElementById('temperature')
const weatherType = document.getElementById('weatherType')
const forecastWrapper = document.getElementById('forecastWrapper')
const forecastDay = document.getElementById('forecastDay')
const forecastTemp = document.getElementById('forecastTemp')


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
            temperature.innerHTML = `TEMPERATUREN ÄR: ${(json.main.temp).toFixed(1)}`
            weatherType.innerHTML = `BESKRIVNING: ${json.weather[0].description}`
            //jennys del sunrise sunset



            //den andra delen weather forecast hej hej
        })






}

fetchWeather()

const fetchForecast = () => {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=fd582670436692008725c351eb4985b0')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        console.log(json.list[0])
        
        //filter the forecast API to only show weather at 12 for each day
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
        console.log(filteredForecast)
        filteredForecast.forEach((fiveForecast) => {
            console.log(fiveForecast.main.temp.toFixed(0))
        


            
        })
        filteredForecast.forEach((day) => {
            const date = new Date(day.dt * 1000) //variable to get "right" date, converting from seconds to milliseconds
            let dayName = date.toLocaleDateString("en-US", {weekday: "short"})
            console.log(`${dayName}`)
        })
    })

    
    
}

fetchForecast()
