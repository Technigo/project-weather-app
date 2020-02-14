const container = document.getElementById('weatherToday')
const conSunset = document.getElementById('sunset')
const conSunrise = document.getElementById('sunrise')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=3053f069033c799a9b5c60d9d3887e6c')

.then((response) => {
  return response.json()
})

.then((json) => {
  container.innerHTML = `<h1> ${json.name} is ${json.main.temp} celsius and ${json.weather[0].description}.</h1>`

    let sunrise = new Date (json.sys.sunrise*1000);
    let sunriseTime = sunrise.toLocaleTimeString([], {timeStyle: 'short'});

    conSunrise.innerHTML = `<h2> Sunrise: ${sunriseTime} </h2>`

    let sunset = new Date (json.sys.sunset*1000);
    let sunsetTime = sunset.toLocaleTimeString([], {timeStyle: 'short'});

    conSunset.innerHTML = `<h2> Sunset: ${sunsetTime} </h2>`
})