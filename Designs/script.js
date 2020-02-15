const container =  document.getElementById('weatherInfo')
const containerSunrise = document.getElementById("sunrise")
const containerSunset = document.getElementById("sunset")

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=69828f6ac304f247815bc18fa686b778')
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    container.innerHTML = `<h1>${myJson.name} ${myJson.main.temp} c and ${myJson.weather[0].description}</h1>`
 
  })

  fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=69828f6ac304f247815bc18fa686b778')
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    let sunrise = new Date(myJson.sys.sunrise * 1000)
    let sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' });

    let sunset = new Date(myJson.sys.sunset * 1000)
    let sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' });

    containerSunrise.innerHTML = `<h2> Sunrise: ${sunriseTime} </h2>`
 
    containerSunset.innerHTML = `<h2> Sunset: ${sunsetTime} </h2>`
  })

  
 

 