const forecastToday = document.getElementById("forecastToday");
const temperatureToday = document.getElementById("temperatureToday");
const forecastImage = document.getElementById("forecastImage");
const weatherDescriptionToday = document.getElementById(
  "weatherDescriptionToday"
);
const sun = document.getElementById("sun");
const forecastCity = document.getElementById("city");
const fourDayForecast = document.getElementById("forecast");
const today = new Date();
const apiKey = "61a23a5c50a7b6f6de8daad2de48ae27";
const forecastLocation = "Stockholm,SE";

// Fetch data from Open Weather map
const handleWeatherForecast = json => {
  console.log(json);

  getForecastNow(json);
  getFourDayNoonForecast(json);
};

const getForecastNow = json => {
  // City
  const city = json.city.name;
  forecastCity.innerHTML = city;

  // Sunset and sunrise information
  const timestampSunrise = new Date(json.city.sunrise * 1000);
  const timestampSunset = new Date(json.city.sunset * 1000);
  const sunrise = convertTimestampToTime(timestampSunrise);
  const sunset = convertTimestampToTime(timestampSunset);

  sun.innerHTML = `<span class="sunrise">Sunrise: ${sunrise}</span>`;
  sun.innerHTML += `<span class="sunset">Sunset: ${sunset}</span>`;

  // Current weather condition and description
  const currentWeatherCondition = json.list[0].weather[0].id;
  const currentWeatherDescription = json.list[0].weather[0].description;
  getWeatherConditionImage(currentWeatherCondition);
  weatherDescriptionToday.innerHTML += currentWeatherDescription;

  // Current temperature
  const currentTemperature = Math.round(json.list[0].main.temp);
  temperatureToday.innerHTML += `${currentTemperature}&#176;`;
};
// Check if weekday is today
const isToday = (currentWeekday, forecastWeekday) => {
  // If the date is equal to today's date
  if (currentWeekday.getDate() === forecastWeekday.getDate()) {
    // Return Today instead of weekday name
    return "Today";
  } else {
    // Else return weekday name
    return convertTimestampToWeekday(forecastWeekday);
  }
};

// Get forecast for noon (except today)
const getFourDayNoonForecast = json => {
  const onlyNoonForecast = json.list.filter(forecastItem => {
    const forecastItemTime = new Date(forecastItem.dt_txt);
    if (
      forecastItemTime.getHours() === 12 &&
      forecastItemTime.getDate() !== today.getDate()
    ) {
      const forecastTimestamp = new Date(forecastItem.dt_txt);
      const forecastDate = convertTimestampToDayInMonth(forecastTimestamp);
      const forecastTime = convertTimestampToTime(forecastTimestamp);
      const forecastWeekday = isToday(today, forecastTimestamp);
      const forecastTemperature = Math.floor(forecastItem.main.temp);

      let forecastWeatherDescription;
      let forecastWeatherIcon;

      forecastItem.weather.forEach(forecastWeather => {
        forecastWeatherDescription = forecastWeather.description;
        forecastWeatherIcon = forecastWeather.icon;
      });
      //Flytta upp från nedanför, behöver inte returnerna något behöver inte ha variablerna utanför heller?
      fourDayForecast.innerHTML += `<p class="forecast-details"><span class="forecast-weekday">${forecastWeekday}</span><span class="forecast-time">${forecastTime}</span><span class="forecast-date">${forecastDate}</span> 
      <span class="forecast-temperature">${forecastTemperature} &#176;</span><span class="forecast-description">${forecastWeatherDescription}</span><span class="icon"><img src="https://openweathermap.org/img/wn/${forecastWeatherIcon}@2x.png" alt="${forecastWeatherDescription}"</span></p>`;
    }
  });
};

const convertTimestampToTime = timestamp => {
  return timestamp.toLocaleTimeString([], { timeStyle: "short" });
};

const convertTimestampToDayInMonth = timestamp => {
  return timestamp.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long"
  });
};

const convertTimestampToWeekday = timestamp => {
  return timestamp.toLocaleDateString("en-GB", {
    weekday: "long"
  });
};

// Get different images depending on weather condition
const getWeatherConditionImage = weatherConditionNumber => {
  if (weatherConditionNumber >= 200 && weatherConditionNumber <= 232) {
    console.log("Thunderstorm");
  } else if (
    (weatherConditionNumber >= 300 && weatherConditionNumber <= 321) ||
    (weatherConditionNumber >= 500 && weatherConditionNumber <= 531)
  ) {
    console.log("Rain");
  } else if (weatherConditionNumber >= 600 && weatherConditionNumber <= 622) {
    console.log("Snow");
  } else if (weatherConditionNumber >= 701 && weatherConditionNumber <= 781) {
    console.log("Mist, dust or smoke");
  } else if (weatherConditionNumber === 800) {
    console.log("Clear sky");
    forecastImage.style.backgroundImage = "url('clear.jpg')";
  } else if (weatherConditionNumber >= 801 && weatherConditionNumber <= 804) {
    console.log("Clouds");
    forecastImage.style.backgroundImage = "url('overcast.jpg')";
  } else {
    console.log("Can't forecast weather");
  }
};

fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=${forecastLocation}&units=metric&APPID=${apiKey}`
)
  // If promise is fulfilled convert response to json and return it
  .then(response => {
    return response.json();
  })

  .then(handleWeatherForecast);
