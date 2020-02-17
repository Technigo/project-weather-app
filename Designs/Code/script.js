

const cityName = document.getElementById('city')
const cityTemp = document.getElementById('temp')
const cityWeatherdescript = document.getElementById('Descript')
const citySunrise = document.getElementById('sunrise')
const citySunset = document.getElementById('sunset')



fetch('http://api.openweathermap.org/data/2.5/weather?q=New%20York&units=metric&APPID=bb2b0bb45cd18a1f48ff2ac55b77750a')
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

