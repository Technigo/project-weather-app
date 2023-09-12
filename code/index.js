// Dom Section
const tempElement = document.getElementById("temp");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "64dc0a4bc655c3566178e4cae018559e";
const lat = "Stockholm";
const lon = "Sweden";
const URL = `${baseUrl}q=${lat},${lon}&units=metric&APPID=${apiKey}`




const fetchWeatherAsync = async () => {
  const response = await fetch(URL).catch((err) => console.log("my ERROR", err));
  const data = await response.json()
  console.log(data)
  updateHTML(data)
}
fetchWeatherAsync()

// headers
// const URLToAnotherAPI = "http"
// const options = { method: GET headers:{ ApiKey:"" ApiHost:""}, body: JSON.stringfy(data)}
// fetch(URLToAnotherAPI , options)

const updateHTML = (data) => {
  console.log(data)
  console.log(data.name)
  console.log(data.main.temp)
  console.log(data.wind.speed)
  console.log(data.weather[0].description)

  const sunriseMilli = data.sys.sunrise
  const sunsetMilli = data.sys.sunset
  const timeZone = data.timezone
  let newSunrise = new Date((sunriseMilli + timeZone + (new Date().getTimezoneOffset() * 60)) * 1000).toLocaleTimeString([], { timeStyle: 'short' });
  let newSunset = new Date((sunsetMilli + timeZone + (new Date().getTimezoneOffset() * 60)) * 1000).toLocaleTimeString([], { timeStyle: 'short' });
  console.log(newSunrise);
  console.log(newSunset);
  sunrise.innerText = newSunrise
  sunset.innerText = newSunset
  // const sunsetMTime = data.sys.sunset
  // const sunsetTime = sunsetMTime.getMilliseconds();
  // console.log(sunsetTime);

  tempElement.innerText = data.main.temp;


}

