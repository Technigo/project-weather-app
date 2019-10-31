const container = document.getElementById('stockholm')
const place = document.getElementById('location')
const weather = document.getElementById('weather')
const temp = document.getElementById('temp')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const forecast = document.getElementById('forecast')

// FORECAST functions

//group items in list
const handle5DayForecast = (json) => {
    console.log(json)
    const dates = {}
    //iterate over items in list
    json.list.forEach((weather) => {
        // remove time stamp from date
        const date = weather.dt_txt.split(' ')[0]
        //if date is in the array, add weather
        if (dates[date]) {
            dates[date].push(weather)

        } //if date is not in array, add object
        else {
            dates[date] = [weather]
        }
    }) 
    
    //iterate over each day / objects (turning object into array) (dates is the object?)
    Object.entries(dates).forEach((item, index) => {
        if (index === 0) {
            return
        }
        const date = item[0]
        const weatherValues = item[1]

        //calculate (temp) values        
        const temps = weatherValues.map((value) => value.main.temp)

        //use spread ... to turn array into numbers
        const minTemp = Math.min(...temps)
        const maxTemp = Math.max(...temps)

        forecast.innerHTML += `<li>${date} -  ${minTemp.toFixed(0)} to ${maxTemp.toFixed(0)}°</li>`
    })
}

//create day from date
const date = new Date()
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
console.log(dayNames[date.getDay()])


        

    // TODAYS weather
fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=3234696c6c8945542b6d5204a0d55386')
.then ((response) => {
    return response.json()
})

.then ((json) => {
    console.log(json)

    place.innerHTML = (json.name)
    temp.innerHTML = (json.main.temp)
    weather.innerHTML = (json.weather[0].description)

    //Declare variable for the time of sunrise/sunset and get them in hours:minutes:seconds GMT
    const sunriseCalc = new Date(json.sys.sunrise * 1000);
    const sunsetCalc = new Date(json.sys.sunset * 1000)

    //Declare new variable to show only hh:mm
    const sunriseTime = sunriseCalc.toLocaleTimeString([], { timeStyle: 'short' })
    const sunsetTime = sunsetCalc.toLocaleTimeString([], { timeStyle: 'short' })

    sunrise.innerHTML += (sunriseTime)
    sunset.innerHTML = (sunsetTime)
        
    })

    //FORECAST

fetch('http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&cnt=40&APPID=3234696c6c8945542b6d5204a0d55386')
    
.then ((response) => {
    return response.json()

})

.then (handle5DayForecast)