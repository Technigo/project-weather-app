
const cityToday = 'http://api.openweathermap.org/data/2.5/weather?q=New%20York&units=metric&APPID=bb2b0bb45cd18a1f48ff2ac55b77750a'
const cityForcast = 'http://api.openweathermap.org/data/2.5/forecast?q=New%20York&units=metric&appid=bb2b0bb45cd18a1f48ff2ac55b77750a'

const cityName = document.getElementById('city')
const cityTemp = document.getElementById('temp')
const cityWeatherdescript = document.getElementById('Descript')
const citySunrise = document.getElementById('sunrise')
const citySunset = document.getElementById('sunset')

const weekday = ('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')
 
fetch(cityToday)
.then((Response) => {
    return Response.json()
})
.then((json) => {

    cityName.innerHTML = json.name 
    cityTemp.innerHTML = `<p> ${json.main.temp.toFixed(0)} &#8451; </p>`
    cityWeatherdescript.innerHTML = json.weather[0].description


    const sunriseConvert = new Date(json.sys.sunrise * 1000) 
    const sunriseTime = sunriseConvert.toLocaleDateString([],{ timeStyle: 'short'})

    sunrise.innerHTML = `Sunrise: ${sunriseTime}`

    const sunsetConvert = new Date(json.sys.sunset * 1000) 
    const sunsetTime = sunsetConvert.toLocaleDateString([],{ timeStyle: 'short' })

    sunset.innerHTML = `Sunset: ${sunsetTime}`    
})

fetch(cityForcast)
.then((Response) => {
    return Response.json()
})
.then((json) => {

   const forecastFilter = json.list.filter(item => item.dt_txt.includes('03:00'))
   forecastFilter.forEach((weekday) => {

    const fiveDaysForecast = new Date(weekday.dt * 1000)
    const showDay = fiveDaysForecast.toLocaleDateString('en-US', {weekday: 'long'})

    weekdayForecast.innerHTML += `<p> ${showDay} ${Math.round(weekday.main.temp.toFixed(0))} &#8451; </p> `


   })

})


