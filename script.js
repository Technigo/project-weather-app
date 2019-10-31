const container = document.getElementById('stockholm')
const place = document.getElementById('location')
const weather = document.getElementById('weather')
const temp = document.getElementById('temp')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')


fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=136131579df2be1e6059803ccc6e55b2')
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

    sunrise.innerHTML = (sunriseTime)
    sunset.innerHTML = (sunsetTime)
        
    })
    