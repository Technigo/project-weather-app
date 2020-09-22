const baseURL = 'http://api.openweathermap.org/data/2.5/'
const weather = ['weather','forecast']
const apiKey = '1fdca83a9693b3d0d79182ed5ca69207'
let cityName = 'Stockholm,Sweden'

const container = document.getElementById('weather')
console.log(container)

const getWeather = () => {
    fetch(`${baseURL}${weather[0]}?q=${cityName}&units=metric&APPID=${apiKey}`)
        .then(response => response.json())
        .then((result) => {

            let temperature = Math.round(result.main.temp * 10)/10
            let timeAM = new Date(result.sys.sunrise * 1000)
            let timePM = new Date(result.sys.sunset * 1000)
            
            console.log(timeAM)
            container.innerHTML = `Temperature today: ${temperature}`
            container.innerHTML += `Location: ${result.name}`
            container.innerHTML += `Forecast: ${result.weather[0].description}`
            container.innerHTML += `Sunrise at: ${timeAM}`
            container.innerHTML += `Sundown at: ${timePM}`
        });
};

const getForecast = () => {
    fetch(`${baseURL}${weather[1]}?q=${cityName}&units=metric&APPID=${apiKey}`)
        .then(response => response.json())
        .then((result) => {

            const filteredForecast = result.list.filter(item => item.dt_txt.includes('12:00'))
            filteredForecast.forEach((day) => {

               // console.log(day)
                container.innerHTML += `Date: ${day.dt_txt} Temperature: ${day.main.temp}`

            })

            
        })

}

getWeather()
getForecast()
//https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=1fdca83a9693b3d0d79182ed5ca69207
//http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=1fdca83a9693b3d0d79182ed5ca69207
