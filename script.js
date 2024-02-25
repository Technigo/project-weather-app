// DOM
const todaysWeather = document.getElementById("weather-today");
const weatherForecast = document.getElementById("weather-forecast");

// Pick icon
const pickIcon = iconId => {
  switch (iconId) {
    case "02d":
      return "🌤️";
      break;
    case "03d":
      return "⛅️";
      break;
    case "04d":
      return "☁️";
      break;
    case "09d":
      return "🌧️";
      break;
    case "10d":
      return "🌦️";
      break;
    case "11d":
      return "⛈️";
      break;
    case "13d":
      return "❄️";
      break;
    case "50d":
      return "😶‍🌫️";
      break;

    default:
      return "☀️";
      break;
  }
};

// Filter forecast
const fiterForecast = json => {
  return json.list.filter(obj => obj.dt_txt.includes("12:00"));
};

// convert to weekday
const toWeekday = date => {
  const day = new Date(date).getDay();
  switch (day) {
    case 1:
      return "Mon";
      break;
    case 2:
      return "Tue";
      break;
    case 3:
      return "Wed";
      break;
    case 4:
      return "Thu";
      break;
    case 5:
      return "Fri";
      break;
    case 6:
      return "Sat";
      break;
    default:
      return "Sun";
      break;
  }
};

// function to print current weather to DOM
const printToDOM = json => {
  console.log(json);

  todaysWeather.innerHTML = `
  <p>${Math.floor(json.main.temp)}</p>
  <p>${json.name}</p>
  <p>${json.weather[0].description}</p>
  `;
};
// function to print Forecast to DOM
const printForecast = json => {
  console.log(json);
  const list = fiterForecast(json);
  console.log(list);
  weatherForecast.innerHTML = "";
  list.forEach(obj => {
    let day = toWeekday(obj.dt_txt);
    weatherForecast.innerHTML += `
      <div class="forecast-day">
        <p class="forecast-day-label">${day}</p>
        <i class="weather-icon">${pickIcon(obj.weather[0].icon)}</i>
        <p>${Math.floor(obj.main.temp_max)} / ${Math.floor(
      obj.main.temp_min
    )} °C</p>
      </div>
    `;
  });
};

// API for current weather
fetch(
  "https://api.openweathermap.org/data/2.5/weather?lat=57.791667&lon=13.418611&units=metric&appid=22a9947f80352a8e0b470d4aaefb4388"
)
  .then(response => response.json())
  .then(jsonWeather => printToDOM(jsonWeather))
  .catch(err => console.log("Error: ", err));

// API for forecast
fetch(
  "https://api.openweathermap.org/data/2.5/forecast?lat=57.791667&lon=13.418611&units=metric&appid=22a9947f80352a8e0b470d4aaefb4388"
)
  .then(response => response.json())
  .then(jsonForecast => printForecast(jsonForecast))
  .catch(err => console.log("Error: ", err));
