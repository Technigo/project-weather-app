const city = document.getElementById("city")
const container = document.getElementById("weather")
const temp = document.getElementById("temp")
const description = document.getElementById("description")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const theImageTitle = document.getElementById('imageTitle')
const theWeekForecast = document.getElementById('weekForecast')
const theImage = document.querySelector('.image')

const theImageBottom = document.querySelectorAll('.imageBottom')
const theDate = document.getElementById('date')
const theTypeWeather = document.getElementById('typeOfWeather')
const theMintemp = document.getElementById('tempMin')
const theMaxtemp = document.getElementById('tempMax')





fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=af5a0362fe5ef8c9629c3d3323931ba3')
.then((response) => {
    return response.json()
})
.then((json) => {
    console.log(json)
    city.innerHTML = `<h2/>${json.name}</h2>`
    container.innerHTML = `<h2/>${json.weather[0].main} ${json.weather[0].icon} ${json.main.temp.toFixed(1)} &#8451</h2>`
    
   
    const sunriseConversion = new Date(json.sys.sunrise * 1000)
    const sunsetConversion = new Date(json.sys.sunset * 1000)
    const sunriseTime = sunriseConversion.toLocaleTimeString([], { timeStyle: 'short' })
    const sunsetTime = sunsetConversion.toLocaleTimeString([], { timeStyle: 'short' })
    sunrise.innerHTML = `🌅Sunrise: ${sunriseTime}`
    sunset.innerHTML = `🌇 Sunset: ${sunsetTime}`
})

const handle5DayForecast = (json) => {
    const dates = {}
    json.list.forEach((weather) => {
        const date = weather.dt_txt.split(' ')[0]
        if (dates[date]) {

            dates[date].push(weather)
        } else {
            dates[date] = [weather]
        }
    })
//// Five day forecast, can be made cleaner looking? //////
    Object.entries(dates).forEach((item, index) => {
        if (index === 0) {
            return
        }
        const date = item[0]
        const weatherValues = item[1]

        const temps = weatherValues.map((value) => value.main.temp)
        const minTemp = Math.min(...temps)
        const maxTemp = Math.max(...temps)

        forecastDiv.innerHTML += `<li> ${date} - min: ${Math.round(minTemp)}, max: ${Math.round(maxTemp)}</li>`
    })
}

fetch(`http://api.openweathermap.org/data/2.5/forecast?q=Stockholm&&Sweden&units=metric&appid=af5a0362fe5ef8c9629c3d3323931ba3`)
    .then((response) => {
        return response.json()
  
    })
.then((json) => {
    console.log(json)
    json.list.forEach((item) => {
        const day = item.dt
        const dayConverted = new Date(day * 1000);
        let dayHours = dayConverted.getHours()
        let dayWeekday = dayConverted.getDay()
        let theDayWeekdayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        let month = dayConverted.getMonth() + 1
        const temperaturemin = Math.round(item.main.temp_min * 10 ) / 10
        const temperaturemax = Math.round(item.main.temp_max * 10 ) / 10
        
        if(dayHours === 13){

            theDayWeekdayArr.forEach((el, index) => {
                if(dayWeekday === index) {
                    theDate.innerHTML += `<p>${el} ${dayConverted.getDate()}/${month}</p>`
                }
            })

            item.weather.forEach((el) => {
                const id = el.id

                theMaxtemp.innerHTML += `<p>&nbsp;${temperaturemax}&#176;C</p>`
            }) 
        }
        if(dayHours === 7) {
            theMintemp.innerHTML += `<p>${temperaturemin} </p>`
        }
    })
})
const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
