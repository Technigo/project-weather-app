const url = "https://api.openweathermap.org/data/2.5/weather?q=Uppsala,Sweden&units=metric&APPID=f40f4543214ad55ead8d6ca12cb39ee0"
const thursday = document.getElementById("thursday")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const todaysWeather = document.getElementById("dayDescription")
const todaysTemperature = document.getElementById("dayTemperature")

let city = "Stockholm"

const fetchWeather =  async () => {
    try{
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      thursday.innerHTML = data.main.temp
    
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
    todaysWeather.innerHTML = todaysData.weather.description
    todaysTemperature.innerHTML = todaysData.main.temp
    sunrise.innerHTML = new Date(todaysData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    sunset.innerHTML = new Date(todaysData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  catch(error) {
  console.log(error)
  }
};
fetchTodaysWeather()