//API
const todayURL = `https://api.openweathermap.org/data/2.5/weather?q=Majorna,Sweden&units=metric&APPID=150f4ff6ea1bf24cf1f0e1bdecefa90f`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=Majorna,Sweden&units=metric&APPID=150f4ff6ea1bf24cf1f0e1bdecefa90f`;
//DOM
const weatherApp = document.getElementById("weatherAppId");
const todaysWeather = document.getElementById("todaysWeather");
const containerFiveDays = document.getElementById("fiveDaysWeather");

// Global variable that needs to be shared:
let tempRounded;

fetch(todayURL)
  .then(response => {
    return response.json();
  })
  .then(json => {
    const temp = json.main.temp;
    tempRounded = temp.toFixed(0.1);
    const icon = `https://openweathermap.org/img/wn/${json.weather[0].icon}.png`;

    // The header title depending on what the getMessageFromTemp function gives us back
    todaysWeather.innerHTML = `<h1>${getMessageFromTemp(tempRounded)}<br> ${
      json.name} today</h1><img src=${icon} />`;

    json.weather.forEach(today => {
      todaysWeather.innerHTML += `<p>${tempRounded} °C ${
        today.description
        }</p>`;
    });

    //To get sunrise/sunset time in hours:minutes:seconds
    const sunrise = new Date(json.sys.sunrise * 1000);
    const sunset = new Date(json.sys.sunset * 1000);
    //Declare new variable to show only hh:mm
    const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: "short" });
    const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: "short" });
    todaysWeather.innerHTML += `<p>Sunrise: ${sunriseTime}<p>`;
    todaysWeather.innerHTML += `<p>Sunset: ${sunsetTime}<p>`;
    todaysWeather.innerHTML += `<hr class=${getClassFromTemp(tempRounded)} />`

    weatherApp.className = getClassFromTemp(tempRounded);
  });

//Five days forecast
fetch(
  "https://api.openweathermap.org/data/2.5/forecast?q=Majorna,Sweden&units=metric&APPID=150f4ff6ea1bf24cf1f0e1bdecefa90f"
)
  .then(response => {
    return response.json();
  })
  .then(json => {
    const filteredForecast = json.list.filter(item =>
      item.dt_txt.includes("12:00")
    );
    filteredForecast.forEach(day => {
      let date = new Date(day.dt * 1000);
      let dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      const dayTemp = day.main.temp;
      const weekTemp = dayTemp.toFixed(0.1);

      document.getElementById('forecastDay').innerHTML += `<p>${dayName}</p>`
      document.getElementById('forecastTemp').innerHTML += `<p>${weekTemp}&degC</p>`
      document.getElementById('forecastIcon').innerHTML += `<img src=https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png></img>`
    });
  });

const getClassFromTemp = temperature => {
  if (temperature < 2) {
    return 'cold';
  } else if (temperature > 20) {
    return 'hot';
  } else if (temperature > 30) {
    return 'superhot';
  } else {
    return 'normal';
  }
};

const getMessageFromTemp = temperature => {
  if (temperature < 2) {
    return "Stay inside, it's too cold in";
  } else if (temperature > 20) {
    return "It feels like summer in";
  } else if (temperature > 30) {
    return "It's hot like your mama in";
  } else {
    return "Don't forget your jacket in";
  }
};