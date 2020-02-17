
//HTML
const container = document.getElementById('weather')
const conSunset = document.getElementById('sunset')
const conSunrise = document.getElementById('sunrise')
const conForecast = document.getElementById('forecast')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=3053f069033c799a9b5c60d9d3887e6c')

.then((response) => {
  return response.json()
})

//Reminder, rounded to 1 decimal place 
.then((json) => {
  container.innerHTML = `<h2> ${json.name} is ${json.main.temp.toFixed(1)}&#730<sup>C</sup> and 
  ${json.weather[0].description}.</h2>`

    const sunrise = new Date (json.sys.sunrise*1000);
    const sunriseTime = sunrise.toLocaleTimeString([], {timeStyle: 'short'});

    const sunset = new Date (json.sys.sunset*1000);
    const sunsetTime = sunset.toLocaleTimeString([], {timeStyle: 'short'});

    conSunrise.innerHTML = `<h2> Sunrise ${sunriseTime}</h2>`
    conSunset.innerHTML = `<h2> Sunset ${sunsetTime} </h2>`
})

fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=3053f069033c799a9b5c60d9d3887e6c')

.then((response) => {
  return response.json()
})

.then((json) => {

  const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'));

  filteredForecast.forEach((day) => {
    const date = new Date(day.dt * 1000)
    const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    let dayOfWeek = weekdays[date.getDay()];

    conForecast.innerHTML += `<h2>${dayOfWeek} <span>${day.main.temp.toFixed(1)}&#730<sup>C</sup></span></h2>`
  })
})
