const cityName = document.getElementById('cityName')
const temperature = document.getElementById('temperature')
const weatherType = document.getElementById('weatherType')
const forecastWrapper = document.getElementById('forecastWrapper')
const forecastDay = document.getElementById('forecastDay')
const forecastTemp = document.getElementById('forecastTemp')
const forecastItems = document.getElementById('forecastItems')


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
        
        //filter the forecast API to only show weather at 12 for each day
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00')) //Håll koll på denna, fungerar beroend tid
        
        //getting the forecast days (name of the day)
        filteredForecast.forEach((day) => {
            const weekDay = new Date(day.dt * 1000).toLocaleDateString('en', {weekday: 'short'})

            const mainTemp = day.main.temp.toFixed(1)

            forecastItems.innerHTML += `
                <li>
                    <span>${weekDay}</span>
                    <span>${mainTemp}°</span>
                </li>
                `             
        })
       
    }) 
}

fetchForecast()
