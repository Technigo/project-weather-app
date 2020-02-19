// WEATHER GENERAL INFORMATION

const apiWeather = "https://api.openweathermap.org/data/2.5/weather?id=2673730&units=metric&appid=cb1cb364426bfa018c80b0e628ac10c8";
fetch(apiWeather)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);

    const location = json.name;
    document.getElementById("location").innerHTML += `${location}`;

    const temp = json.main.temp;
    const temp1 = temp.toFixed(0.1);
    document.getElementById("temp").innerHTML += `${temp1}°C`;

    // Weather icon https://openweathermap.org/weather-conditions
    const weatherConditions = json.weather[0].id;
    if (weatherConditions >= 200 && weatherConditions <= 232) {
      weatherIcon.src = "assets/day_icons/thunderstorm.png"
    } else if (weatherConditions >= 300 && weatherConditions <= 321) {
      weatherIcon.src = "assets/day_icons/shower_rain.png"
    } else if (weatherConditions >= 500 && weatherConditions <= 531) {
      weatherIcon.src = "assets/day_icons/rain.png"
    } else if (weatherConditions >= 600 && weatherConditions <= 622) {
      weatherIcon.src = "assets/day_icons/snow.png"
    } else if (weatherConditions >= 701 && weatherConditions <= 781) {
      weatherIcon.src = "assets/day_icons/mist.png"
    } else if (weatherConditions === 800) {
      weatherIcon.src = "assets/day_icons/clear_sky.png"
    } else if (weatherConditions === 801) {
      weatherIcon.src = "assets/day_icons/few_clouds.png"
    } else if (weatherConditions === 802) {
      weatherIcon.src = "assets/day_icons/scattered_clouds.png"
    } else if (weatherConditions >= 803 && weatherConditions <= 804) {
      weatherIcon.src = "assets/day_icons/broken_clouds.png"
    }

    const description = json.weather[0].description;
    document.getElementById("description").innerHTML += `${description}`;

    const humidity = json.main.humidity;
    document.getElementById("humidity").innerHTML += ` ${humidity} %`;

    const windSpeed = json.wind.speed;
    document.getElementById("windSpeed").innerHTML += ` ${windSpeed} m/s`;

    const sunriseTime = json.sys.sunrise;
    const sunsetTime = json.sys.sunset;
    let sunrise = new Date(sunriseTime * 1000);
    let sunset = new Date(sunsetTime * 1000);
    document.getElementById("sunrise").innerHTML += ` ${sunrise.getHours()}:${sunrise.getMinutes()}`;
    document.getElementById("sunset").innerHTML += ` ${sunset.getHours()}:${sunset.getMinutes()}`;
  });

// WEATHER FORECAST 5 DAYS

const apiForecast = "https://api.openweathermap.org/data/2.5/forecast?id=2673730&units=metric&APPID=cb1cb364426bfa018c80b0e628ac10c8"
fetch(apiForecast)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);

    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'));
    const containerFiveDays = document.getElementById("containerFiveDays");

    filteredForecast.forEach((day) => {
      const date = new Date(day.dt * 1000)
      console.log(day);

      const weekDaysString = date.toLocaleDateString("en-US", { weekday: "short" });

      containerFiveDays.innerHTML += `<p> ${weekDaysString} ${day.main.temp.toFixed(0)} °C</p>`
    })
  });

// this one is jut to wait for the page to load
document.addEventListener('DOMContentLoaded', () => {

  const themeStylesheet = document.getElementById('theme');
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    // if it's light -> go dark
    if (themeStylesheet.href.includes('light')) {
      themeStylesheet.href = 'dark-theme.css';
      themeToggle.innerText = 'Switch to light mode';
    } else {
      // if it's dark -> go light
      themeStylesheet.href = 'light-theme.css';
      themeToggle.innerText = 'Switch to dark mode';
    }
    localStorage.setItem('theme', 'dark-theme.css');

  })
})
