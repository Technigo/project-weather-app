
//Repeatable variables
const baseURL = 'https://api.openweathermap.org/data/2.5/'
const weather = ['weather','forecast']
const apiKey = '1fdca83a9693b3d0d79182ed5ca69207'
let cityName = null

const upperContainer = document.getElementById('upperContainer')
const lowerContainer = document.getElementById('lowerContainer')
const cityForm = document.querySelector('form');

//Eventlistener that invokes daily weather and forecast function
cityForm.addEventListener('submit', (event) => {

    event.preventDefault()

    cityName = cityForm.city.value
    cityForm.reset();

    getWeather(cityName)
    getForecast(cityName)

})

//Daily weather function
const getWeather = (cityName) => {
    
    fetch(`${baseURL}${weather[0]}?q=${cityName}&units=metric&APPID=${apiKey}`)
        .then(response => response.json())
        .then((result) => {

            let temperature = Math.round(result.main.temp * 10)/10
            let timeAM = new Date(result.sys.sunrise * 1000)
            let timePM = new Date(result.sys.sunset * 1000)
            
            console.log(result)
            upperContainer.innerHTML = `<section class="locationToday">${result.name}</section>`
            upperContainer.innerHTML += `<section class="tempToday">${temperature}°C</section>`
            upperContainer.innerHTML += `<section class="condToday">${result.weather[0].description}</section>`
            upperContainer.innerHTML += `<section class="sunriseToday">Sunrise ${timeAM.toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute: '2-digit'})}</section>`
            upperContainer.innerHTML += `<section class="sundownToday">Sundown ${timePM.toLocaleTimeString('en-US', {hour12: false,  hour: '2-digit', minute: '2-digit'})}</section>`
        });
};

//Forecast function
const getForecast = (cityName) => {

    fetch(`${baseURL}${weather[1]}?q=${cityName}&units=metric&APPID=${apiKey}`)
        .then(response => response.json())
        .then((result) => {

            console.log(result)
            
            const filteredForecast = result.list.filter(item => item.dt_txt.includes('12:00'))
            filteredForecast.forEach((day) => {

                let weekDay = new Date(day.dt*1000)
                let dayName = weekDay.toLocaleDateString('en-US', {weekday: 'long',})
                let temperature = Math.round(day.main.feels_like * 10)/10

                lowerContainer.innerHTML += `<section class="dailyForecast">${dayName} ${temperature}°C</section>`

            })          
        })
}