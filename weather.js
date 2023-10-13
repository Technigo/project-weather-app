const url = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f40f4543214ad55ead8d6ca12cb39ee0"
const body = document.getElementById("body")
const thursday = document.getElementById("thursday")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const weatherDescription = document.getElementById("weatherUpdate")
const todaysWeather = document.getElementById("dayDescription")
const todaysTemperature = document.getElementById("dayTemperature")

let city = "Stockholm"

const pickTodaysDescription = (todaysDescription) => {
  body.classList.remove(...body.classList)

  if
  (todaysDescription === "Clear") {
    body.classList.add("suns-out")
    weatherDescription.innerHTML = `Get your sunnies on. ${city} is looking rather great today.`
  } 
   else if  (todaysDescription === "Clouds") {
    body.classList.add("cloudy")
    weatherDescription.innerHTML = `Time to light a fire and get cosy. ${city} is looking grey today.`
  }
  else if (todaysDescription === "Rain" || todaysDescription === "Thunderstorm" || todaysDescription === "Drizzle" || todaysDescription === "Snow") {
    body.classList.add("rainy")
    weatherDescription.innerHTML = `It's wet in ${city} today. Don't forget your umbrella.`
  } else {
    body.classList.add("unknown")
    weatherDescription.innerHTML = `We don't know what's gonna be like, but be careful in ${city}!`
  }
}


const fetchWeather =  async () => {
    try{
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      thursday.innerHTML = data.main.temp.toFixed(1)
    
    }catch(error) {
  console.error(error)
    }
};
fetchWeather()

const fetchTodaysWeather =  async () => {
  try{
    const todaysResponse = await fetch(url);
    const todaysData = await todaysResponse.json();
    console.log(todaysData)
    todaysWeather.innerHTML = todaysData.weather[0].description
    todaysTemperature.innerHTML = todaysData.main.temp.toFixed(1)
    sunrise.innerHTML = new Date(todaysData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    sunset.innerHTML = new Date(todaysData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    
    pickTodaysDescription(todaysData.weather[0].main)
  }
  catch(error) {
  console.log(error)
  }
};
fetchTodaysWeather()

