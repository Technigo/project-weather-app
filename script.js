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
      return "Monday";
      break;
    case 2:
      return "Tuesday";
      break;
    case 3:
      return "Wednesday";
      break;
    case 4:
      return "Thursday";
      break;
    case 5:
      return "Friday";
      break;
    case 6:
      return "Saturday";
      break;
    default:
      return "Sunday";
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
  list.forEach(obj => {
    let day = toWeekday(obj.dt_txt);
    weatherForecast.innerHTML += `
    <p>${day}</p>
    <i>${pickIcon(obj.weather[0].icon)}</i>
    <p>${Math.floor(obj.main.temp_max)} / ${Math.floor(
      obj.main.temp_min
    )} °C</p>
    <p>${obj.weather[0].description}</p>
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
