const containerWeather = document.querySelector("#container-weather")
const containerForecast = document.querySelector("#container-forecast")

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const getWeather = fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=bb54e9dec92e93ad760de1e57539382a")
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        let sunrise = new Date(data.sys.sunrise * 1000)
        let sunset = new Date(data.sys.sunset * 1000)
        console.log(data.sys.sunrise)
        containerWeather.innerHTML = `
        <img src="./Design-1/assets/Group36.png">
        <h1>${Math.round(data.main.temp)}<span>°C</span></h1>
        <h2>${data.name}</h2>
        <h3>${data.weather[0].description}</h3>
        <h3 class="sun">
            <span>sunrise</span>
            <span>${sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span>sunset</span>
            <span>${sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </h3>
        `
    })

const getForecast = fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=bb54e9dec92e93ad760de1e57539382a")
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
        console.log(filteredForecast)
        for (let i = 0; i < filteredForecast.length; i++) {
            let weekday = new Date(filteredForecast[i].dt * 1000)
            containerForecast.innerHTML += `
            <div class="weekdays">
                <span>${days[weekday.getDay()]}</span>
                <span class="temperature">
                    <img src="./Design-1/assets/Group36.png">
                    <span>${Math.round(filteredForecast[i].main.temp)}°C</span>
                </span>
            </div>
            `
        }
    })

let time = new Date(1613456456 * 1000)
console.log(time.toLocaleTimeString())
console.log(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
console.log(`${time.getHours()}: ${time.getMinutes()} `)

console.log(time.toDateString())
let day = days[time.getDay()]
console.log(day)