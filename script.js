const container = document.getElementById('weather');
//const weatherDescription = json.weather[0].description
/* const cloud {
  name: "Cloud",
  image: "assets/cloud.png",
  info: "Today there is a cloudy sky, might be smart to bring an umbrella."
}
const sun {
  name: "Sun",
  image: "assets/sunny.png",
  info: "Sky is clear and remember the sunglasses."
}
const rain {
  name: "Rain",
  iamge: "assets/rain.png",
  info: "Today's accessories are the famous rainboots and a fancy umbrella."
}
const sunCloud {
  name: "Sun & cloud",
  image: "assets/suncloud.png",
  info: "Almost a clear sky, sunny with some cute clouds."
}
const clear {
  name: "Clear",
  image: "assets/clear.png",
  info: "Vision is clear, no need for worries."
}
const snow {
  name: "Snow",
  image: "assets/snow.png",
  info: "Bring your thermo pants it's snowing today."
} */



fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=80c5dd84564bfbfbbae5184faea61c48')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const unixTimestampSunrise = json.sys.sunrise
    const unixTimestampSunset = json.sys.sunset

    const sunrise = new Date(unixTimestampSunrise * 1000)
    const sunset = new Date(unixTimestampSunset * 1000)

    const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
    const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

    container.src = json.weather[0].description.image
    container.innerHTML += `<h1>${json.name}</h1>`
    container.innerHTML += `<p>Temp is ${json.main.temp.toFixed(1)}</p>`
    container.innerHTML += `<p>Sunrise: ${sunriseTime}</p>`
    container.innerHTML += `<p>Sunset: ${sunsetTime}</p>`
  })