const containerWeather = document.querySelector("#container-weather")
const containerForecast = document.querySelector("#container-forecast")
const hamburger = document.querySelector("#hamburger")
const menu = document.querySelector("#menu")
const stockholmButton = document.querySelector("#stockholm-button")
const barcelonaButton = document.querySelector("#barcelona-button")
const sydneyButton = document.querySelector("#sydney-button")

hamburger.addEventListener("click", () => {
    toggle()
})

const toggle = () => {
    menu.classList.toggle("hidden")
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const getWeather = (location) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=bb54e9dec92e93ad760de1e57539382a`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
            let sunrise = new Date(data.sys.sunrise * 1000)
            let sunset = new Date(data.sys.sunset * 1000)
            console.log(data.sys.sunrise)
            containerWeather.innerHTML += `
        
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
            if (Date.now() > (data.sys.sunset * 1000)) {
                console.log("late")
                containerWeather.style.background = "linear-gradient(0deg, rgba(104,104,171,1) 0%, rgba(12,11,91,1) 100%)"
            } else {
                console.log("early")
            }
        })
}

console.log((Date.now()))

const getForecast = (location) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&APPID=bb54e9dec92e93ad760de1e57539382a`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
            const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
            console.log(filteredForecast)
            for (let i = 0; i < filteredForecast.length; i++) {
                let weekday = new Date(filteredForecast[i].dt * 1000)
                let description = filteredForecast[i].weather[0].main.toLowerCase()
                containerForecast.innerHTML += `
            <div class="weekdays">
                <span>${days[weekday.getDay()]}</span>
                <span class="temperature">
                    <img src="./assets/${description}.jpg">
                    <span>${Math.round(filteredForecast[i].main.temp)}°C</span>
                </span>
            </div>
            `
            }
        })
}


stockholmButton.addEventListener("click", () => {
    getWeather("Stockholm,Sweden")
    getForecast("Stockholm,Sweden")
    toggle()
})
barcelonaButton.addEventListener("click", () => {
    getWeather("Barcelona,Spain")
    getForecast("Barcelona,Spain")
    toggle()
})
sydneyButton.addEventListener("click", () => {
    getWeather("Sydney,Australia")
    getForecast("Sydney,Australia")
    toggle()
})