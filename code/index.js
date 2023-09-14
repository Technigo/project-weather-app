// Dom Section
const tempElement = document.getElementById("temp");
const daysForecast = document.querySelectorAll(".day");
const iconsForecast = document.querySelectorAll(".icon");
const tempsForecast = document.querySelectorAll(".temp-forecast");
const windForecast = document.querySelectorAll(".wind-forecast")
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const cityName = document.getElementById("city");
const descriptionEl = document.getElementById("desc");
const windMain = document.getElementById("wind");
const iconMain = document.getElementById("icon-main");
const dateNameToday = document.getElementById("date");
const timeToday = document.getElementById("time");
const searchBar = document.getElementById("icon-search");
const searchDelete = document.getElementById("icon-close")


const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "64dc0a4bc655c3566178e4cae018559e";
const lat = "Stockholm";
const lon = "Sweden";
const URL = `${baseUrl}q=${lat},${lon}&units=metric&APPID=${apiKey}`

searchBar.addEventListener("click", () => {
  if (searchWrapper.style.display === "none") {
    searchBar.style.display = "none";
    searchWrapper.style.display = "flex";
  } else {
    searchWrapper.style.display = "none";
  }
})
searchDelete.addEventListener("click", () => {
  if (searchWrapper.style.display === "flex") {
    searchBar.style.display = "flex";
    searchWrapper.style.display = "none";
  }
})

const fetchWeatherAsync = async () => {
  const response = await fetch(URL).catch((err) => console.log("my ERROR", err));
  const data = await response.json()
  console.log(data)
  updateHTML(data)

}
fetchWeatherAsync()

// forecast API

const baseAPIForecast = "https://api.openweathermap.org/data/2.5/forecast?";
const URLForecast = `${baseAPIForecast}q=${lat},${lon}&units=metric&APPID=${apiKey}`

// dates forecast and today date
const daysName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = new Date();

const todayWeekDay = daysName[today.getDay()];

date.innerText = todayWeekDay

const nextFiveDAys = [];

for (let index = 1; index < 6; index++) {
  const date = new Date(today);

  date.setDate(today.getDate() + index);
  const dayName = daysName[date.getDay()];
  nextFiveDAys.push(dayName)

}

daysForecast.forEach((dayForc, index) => {
  dayForc.innerText = (nextFiveDAys[index]).substr(0, 3)
});

// fetch forecast

const fetchForecastAsync = async () => {
  const responseForecast = await fetch(URLForecast).catch((err) => console.log("ERROR", err));
  const data = await responseForecast.json();

  iconsForecast.forEach((icon, index) => {
    const iconNum = data.list[index].weather[0].icon;
    icon.src = `https://openweathermap.org/img/wn/${iconNum}@2x.png`

  });
  tempsForecast.forEach((temp, index) => {
    const temperture = data.list[index].main.temp;
    temp.innerText = `${Math.floor(temperture)} °C`
  });

  windForecast.forEach((wind, index) => {
    const windSpeed = data.list[index].wind.speed;
    wind.innerText = `${Math.floor(windSpeed)} m/s`
  })



}
fetchForecastAsync()


const updateHTML = (data) => {

  console.log(data)
  const sunriseMilli = data.sys.sunrise;
  const sunsetMilli = data.sys.sunset;
  const timeZone = data.timezone;

  // sunrise and sunset time
  let newSunrise = new Date((sunriseMilli + timeZone + (new Date().getTimezoneOffset() * 60)) * 1000).toLocaleTimeString([], { timeStyle: 'short' });
  let newSunset = new Date((sunsetMilli + timeZone + (new Date().getTimezoneOffset() * 60)) * 1000).toLocaleTimeString([], { timeStyle: 'short' });

  // console.log(newSunrise);
  // console.log(newSunset);

  sunrise.innerText = newSunrise
  sunset.innerText = newSunset

  tempElement.innerText = `${Math.floor(data.main.temp)}°C`;
  windMain.innerText = `${Math.floor(data.wind.speed)} m/s`;
  cityName.innerText = data.name;
  descriptionEl.innerText = data.weather[0].description;
  iconMain.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  // time now
  let newTime = new Date((data.dt + timeZone + (new Date().getTimezoneOffset() * 60)) * 1000).toLocaleTimeString([], { timeStyle: 'short' });

  timeToday.innerText = `Time: ${newTime}`

}

