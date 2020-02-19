
// The APIs

const cityToday = 'http://api.openweathermap.org/data/2.5/weather?q=New%20York&units=metric&APPID=bb2b0bb45cd18a1f48ff2ac55b77750a'
const cityForecast = 'http://api.openweathermap.org/data/2.5/forecast?q=New%20York&units=metric&appid=bb2b0bb45cd18a1f48ff2ac55b77750a'

// My DOM selector 

const buttonChoose = document.getElementById('buttonChoose')
const cityName = document.getElementById('city')
const cityTemp = document.getElementById('temp_dec')
const cityWeatherdescript = document.getElementById('Descript')
const citySunrise = document.getElementById('sunrise')
const citySunset = document.getElementById('sunset')
const weekday = ('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')


const showWeather = (city) => {

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=bb2b0bb45cd18a1f48ff2ac55b77750a`)
    .then((Response) => {
        return Response.json()
    })
    .then((json) => {
    
        cityName.innerHTML = json.name 
        cityTemp.innerHTML = `<p> ${json.weather[0].description}&#x3021;${json.main.temp.toFixed(0)} &#8451; </p>`
    
        const sunriseConvert = new Date((json.sys.sunrise + json.timezone) *1000)
        const sunriseTime = sunriseConvert.toLocaleDateString([],{ timeStyle: 'short'})
    
        sunrise.innerHTML = `Sunrise: ${sunriseTime}`
    
        const sunsetConvert = new Date((json.sys.sunset + json.timezone) *1000)  
        const sunsetTime = sunsetConvert.toLocaleDateString([],{ timeStyle: 'short' })
    
        sunset.innerHTML = `Sunset: ${sunsetTime}` 
    
        if(json.main.temp.toFixed(0) < 6) {
            weatherCard.classList.toggle('cold')
            text_cold.innerHTML = `<p> Quite cold today,<br>put on an extra shirt if needed.</p>`
        } else if (json.main.temp.toFixed(0) > 6) {
            weatherCard.classList.toggle('warm')
            text_warm.innerHTML = `<p> It's quite warm today,<br>maybe enjoy a nice picknick outside.</p>`
        } else {
        }  
    })
    
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=bb2b0bb45cd18a1f48ff2ac55b77750a`)
    .then((Response) => {
        return Response.json()
    })
    .then((json) => {
    
       const forecastFilter = json.list.filter(item => item.dt_txt.includes('03:00'))
       forecastFilter.forEach((weekday) => {
    
        const fiveDaysForecast = new Date(weekday.dt * 1000)
        const showDay = fiveDaysForecast.toLocaleDateString('en-US', {weekday: 'long'})
    
        weekdayForecast.innerHTML += `<p> ${showDay}&#x3021;${Math.round(weekday.main.temp.toFixed(0))} &#8451; </p> `
    
       })
    })
    
}
buttonChoose.addEventListener('click', showWeather('New York'));


