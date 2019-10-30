const forecastToday = document.getElementById("forecastToday");
const temperatureToday = document.getElementById("temperatureToday");
const weatherDescriptionToday = document.getElementById(
  "weatherDescriptionToday"
);
const sunriseToday = document.getElementById("sunriseToday");
const sunsetToday = document.getElementById("sunsetToday");
const forecastLocation = document.getElementById("location");
const fourDayForecast = document.getElementById("forecast");

// Fetch data from Open Weather map
fetch(
  "http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,SE&units=metric&APPID=61a23a5c50a7b6f6de8daad2de48ae27"
)
  // If promise is fulfilled convert response to json and return it
  .then(response => {
    return response.json();
  })
  // Console log json
  .then(json => {
    console.log(json);
    const location = json.city.name;
    const sunrise = new Date(json.city.sunrise * 1000);
    const sunset = new Date(json.city.sunset * 1000);

    forecastLocation.innerHTML = location;
    fourDayForecast.innerHTML = `<h2>Forcast for the next four days</h2>`;

    // Convert the time to a string that displays local time, use timestyle short to display hours and minutes

    const sunriseTime = toShortTime(sunrise);
    const sunsetTime = toShortTime(sunset);

    sunriseToday.innerHTML = `Sunrise: ${sunriseTime}`;
    sunsetToday.innerHTML = `Sunset: ${sunsetTime}`;
    // sunsetToday.innerHTML = `Sunset: ${sunsetTime}`;

    const today = new Date();
    const onlyTodaysForecast = () => {
      todaysForecast = json.list.filter(listitem => {
        const thisDate = new Date(listitem.dt_txt);
        let weatherDescription;
        let weatherTemperature;
        if (
          thisDate.getHours() === 12 &&
          thisDate.getDate() === today.getDate()
        ) {
          listitem.weather.forEach(weatherInformation => {
            weatherDescription = weatherInformation.description;
            weatherTemperature = Math.floor(listitem.main.temp);
          });
          weatherDescriptionToday.innerHTML = `${weatherDescription}`;
          temperatureToday.innerHTML = `${weatherTemperature} &#8451;`;
        }
      });
    };
    onlyTodaysForecast();
    const onlyNoonForecast = () => {
      // only print the forecast for noon
      const noonForecast = json.list.filter(listitem => {
        const thisTime = new Date(listitem.dt_txt);
        if (
          thisTime.getHours() === 12 &&
          thisTime.getDate() !== today.getDate()
        ) {
          const fullDateTime = new Date(listitem.dt_txt);
          const forecastTime = toShortTime(fullDateTime);
          const forecastDate = toDayInMonth(fullDateTime);
          const forecastWeekday = toTodayOrWeekday(today, fullDateTime);

          let weatherDescription;

          listitem.weather.forEach(weatherInformation => {
            return (weatherDescription = weatherInformation.description);
          });

          fourDayForecast.innerHTML += `<p><span class="forecast-weekday">${forecastWeekday}</span> <span class="forecast-date">${forecastDate}</span> 
          <span class="temperature">${Math.floor(
            listitem.main.temp
          )} &#8451;</span><span class="weather-description">${weatherDescription}</span></p>`;
        }
      });
    };
    onlyNoonForecast();
  });

// Check if weekday is today
const toTodayOrWeekday = (currentWeekday, thisWeekday) => {
  // If the date is equal to today's date
  if (currentWeekday.getDate() === thisWeekday.getDate()) {
    // Return Today instead of weekday name
    return "Today";
  } else {
    // Else return weekday name
    return toWeekday(thisWeekday);
  }
};
const toShortTime = fullformat => {
  return fullformat.toLocaleTimeString([], { timeStyle: "short" });
};

const toDayInMonth = fullformat => {
  return fullformat.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long"
  });
};

const toWeekday = fullformat => {
  return fullformat.toLocaleDateString("en-GB", {
    weekday: "long"
  });
};
