const forecastToday = document.getElementById("forecastToday");
const temperatureToday = document.getElementById("temperatureToday");
const forecastImage = document.getElementById("forecastImage");
const weatherDescriptionToday = document.getElementById(
  "weatherDescriptionToday"
);
const sunriseToday = document.getElementById("sunriseToday");
const sunsetToday = document.getElementById("sunsetToday");
const forecastCity = document.getElementById("city");
const fourDayForecast = document.getElementById("forecast");
const today = new Date();
console.log(`Idag${today}`);
const apiKey = "61a23a5c50a7b6f6de8daad2de48ae27";
const forecastLocation = "Stockholm,SE";

const handleTodaysWeatherForecast = json => {};
// Fetch data from Open Weather map
const handleWeatherForecast = json => {
  console.log(json);
  const city = json.city.name;

  const sunset = new Date(json.city.sunset * 1000);

  forecastCity.innerHTML = city;
  fourDayForecast.innerHTML = `<h2>Forecast for the next four days</h2>`;

  // Convert the time to a string that displays local time, use timestyle short to display hours and minutes

  const timeSunset = convertTimestampToTime(sunset);

  sunsetToday.innerHTML = `Sunset: ${timeSunset}`;
  getTodaysSunrise(json);

  const getTodaysWeatherDescription = () => {
    const thisWeatherDescription = json.list[0].weather[0].description;
    console.log(`${thisWeatherDescription}`);
    weatherDescriptionToday.innerHTML += thisWeatherDescription;
  };
  getTodaysWeatherDescription();
  const getTodaysTemperature = () => {
    const thisTemp = Math.round(json.list[0].main.temp);
    console.log(`${temperatureToday}`);
    temperatureToday.innerHTML += `${thisTemp}&#176;`;
  };

  getTodaysTemperature();

  onlyNoonForecast(json);
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

const onlyNoonForecast = json => {
  // only print the forecast for noon
  const noonForecast = json.list.filter(listitem => {
    const thisTime = new Date(listitem.dt_txt);
    if (thisTime.getHours() === 12 && thisTime.getDate() !== today.getDate()) {
      const fullDateTime = new Date(listitem.dt_txt);
      const forecastDate = convertTimestampToDayInMonth(fullDateTime);
      const forecastWeekday = isToday(today, fullDateTime);

      let weatherDescription;
      let weatherIcon;
      let weatherId;

      listitem.weather.forEach(weatherInformation => {
        return (
          (weatherDescription = weatherInformation.description),
          (weatherIcon = weatherInformation.icon),
          (weatherId = weatherInformation.id)
        );
      });
      console.log(`This weather id: ${weatherId}`);
      getWeatherConditionImage(weatherId);
      console.log(weatherId === 804);
      console.log(weatherIcon);
      fourDayForecast.innerHTML += `<p class="forecast-details"><span class="forecast-weekday">${forecastWeekday}</span> <span class="forecast-date">${forecastDate}</span> 
      <span class="forecast-temperature">${Math.floor(
        listitem.main.temp
      )} &#176;</span><span class="forecast-description">${weatherDescription}</span><span class="icon"><img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${weatherDescription}"</span></p>`;
      if (weatherDescription === "overcast clouds") {
        document.body.style.backgroundImage =
          "url('http://127.0.0.1:5500/overcast.jpg')";
      } else {
        document.body.style.backgroundImage =
          "url('http://127.0.0.1:5500/scattered-clouds.jpg')";
      }
    }
  });
};

const getTodaysSunrise = json => {
  const sunrise = new Date(json.city.sunrise * 1000);
  console.log(`Sunrise${json.city.sunrise}`);
  const timeSunrise = convertTimestampToTime(sunrise);
  console.log(`KOnv${timeSunrise}`);
  return (sunriseToday.innerHTML = `Sunrise: ${timeSunrise}`);
};

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
  } else if (weatherConditionNumber >= 801 && weatherConditionNumber <= 804) {
    console.log("Clouds");
  } else {
    console.log("Can't forecast weather");
  }
};

fetch(
  `http://api.openweathermap.org/data/2.5/forecast?q=${forecastLocation}&units=metric&APPID=${apiKey}`
)
  // If promise is fulfilled convert response to json and return it
  .then(response => {
    return response.json();
  })
  // Console log json
  .then(handleWeatherForecast);
