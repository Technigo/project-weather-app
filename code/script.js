const containerToday = document.getElementById("todays-weather");
const containerFiveDays = document.getElementById("five-day-weather");
const containerWeather = document.getElementById("weather");
const dots = document.getElementById("dot-container");

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Malmoe,Sweden&units=metric&APPID=778e796f3254363f06afef1bc4ea2b4f"
)
  .then(response => {
    return response.json();
  })
  .then(json => {
    const sunriseTime = timeFormat(json.sys.sunrise);
    const sunsetTime = timeFormat(json.sys.sunset);

    containerToday.innerHTML = `<h2>${json.name}</h2>`;
    containerToday.innerHTML += `<p>${temperatureFormat(
      json.main.temp
    )}°C and ${json.weather[0].description}
    </p>`;

    containerToday.innerHTML += `<p>Sunrise: ${sunriseTime}<br>
    Sunset: ${sunsetTime}</p>`;

    if (temperatureFormat(json.main.temp) < 10) {
      containerWeather.style.background =
        "linear-gradient(15deg, rgba(34,122,224,1) 0%, rgba(81,217,255,1) 100%)";
    } else if (temperatureFormat(json.main.temp) > 20) {
      containerWeather.style.background =
        "linear-gradient(15deg, rgba(78,221,134,1) 0%, rgba(249,255,179,1) 100%)";
    } else {
      containerWeather.style.background =
        "linear-gradient(15deg, rgba(226,44,44,1) 0%, rgba(246,255,115,1) 100%)";
    }
  });

fetch(
  "https://api.openweathermap.org/data/2.5/forecast?q=Malmoe,Sweden&units=metric&APPID=778e796f3254363f06afef1bc4ea2b4f"
)
  .then(response => {
    return response.json();
  })
  .then(json => {
    const filteredForecast = json.list.filter(item =>
      item.dt_txt.includes("12:00")
    );

    filteredForecast.forEach(day => {
      containerFiveDays.innerHTML += `<p>${weekdayFormat(
        day.dt
      )} ${temperatureFormat(day.main.temp)}°C feels like: ${temperatureFormat(
        day.main.feels_like
      )}°C</p>`;
    });
  });

const timeFormat = timeStamp => {
  const time = new Date(timeStamp * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
  return time;
};

const weekdayFormat = timeStamp => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let date = new Date(timeStamp * 1000);

  let dayOfWeek = weekdays[date.getDay()];
  return dayOfWeek;
};

const temperatureFormat = temp => {
  let tempFormat = Math.round(temp * 10) / 10;
  return tempFormat.toFixed(1);
};
