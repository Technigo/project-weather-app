const currentForecastImage = document.getElementById("forecastImage");
const multidayForecast = document.getElementById("multidayForecast");
const currentForecast = document.getElementById("currentForecast");
const today = new Date();
const apiKey = "61a23a5c50a7b6f6de8daad2de48ae27";
const forecastLocation = "Stockholm,SE";
const forecastData = [];

// Fetch data from Open Weather map
const handleWeatherForecast = json => {
  console.log(json);
  getForecastData(json);
  forecastData.forEach(displayForecast);
  forecastData.forEach(displayCurrentForecast);
};

const getForecastData = json => {
  const filterForecastData = json.list.filter(weather => {
    const forecast = {};
    forecast.city = json.city.name;
    // Sunset and sunrise information
    const timestampSunrise = new Date(json.city.sunrise * 1000);
    const timestampSunset = new Date(json.city.sunset * 1000);
    forecast.sunrise = timestampToHoursAndMinutes(timestampSunrise);
    forecast.sunset = timestampToHoursAndMinutes(timestampSunset);
    // Populate forecast object
    const weatherTime = new Date(weather.dt_txt);
    forecast.date = timestampToDate(weatherTime);
    forecast.time = timestampToHoursAndMinutes(weatherTime);

    //forecast.weekday = timestampToWeekday(weatherTime);
    forecast.weekday = isToday(today, weatherTime);

    forecast.temperature = Math.floor(weather.main.temp);
    forecast.temperatureMin = Math.floor(weather.main.temp_min);
    forecast.temperatureMax = Math.floor(weather.main.temp_max);
    forecast.description = weather.weather[0].description;
    forecast.icon = weather.weather[0].icon;
    forecast.id = weather.weather[0].id;

    // Add forecast object to array
    forecastData.push(forecast);
  });
};

forecastData.forEach(
  (displayCurrentForecast = (item, index) => {
    if (index === 0) {
      // Current temperature
      let output;
      output = `<h1>Today's weather in ${item.city}</h1>`;
      output += "<p class='current-weather'>";
      output += `${item.temperature}&#176;`;
      output += `${item.description}`;
      output += "</p>";
      output += "<p class='sun-information'>";
      output += `<span class="sunrise">Sunrise: ${item.sunrise}</span>`;
      output += `<span class="sunset">Sunset: ${item.sunset}</span>`;
      output += "</p>";
      currentForecast.innerHTML = output;

      getWeatherConditionImage(item.id);
    }
    console.log(item.sunset);
  })
);

forecastData.forEach(
  (displayForecast = (item, index) => {
    const currentDay = item.weekday;
    let previousItem = index - 1;
    console.log(previousItem);

    //const yesterday = previousItem.weekday;
    if (index === 0) {
      multidayForecast.innerHTML = `<h2>${item.weekday} ${item.date}</h2>`;
    } else if (
      forecastData[index].weekday !== forecastData[previousItem].weekday
    ) {
      multidayForecast.innerHTML += `<h2>${item.weekday} ${item.date}</h2>`;
    }
    let output = "<p class='forecast-time'>";
    output += `<span class="time">${item.time}</span>`;
    output += `<span class="max-temperature">${item.temperatureMax}</span>`;
    output += `<span class="min-temperature">${item.temperatureMin}</span>`;
    output += `<img class="weather-icon" src="https://openweathermap.org/img/wn/${item.icon}@2x.png" alt="${item.description}"/>`;
    output += "</p>";
    multidayForecast.innerHTML += output;
  })
);

const timestampToHoursAndMinutes = timestamp => {
  return timestamp.toLocaleTimeString([], { timeStyle: "short" });
};

const timestampToDate = timestamp => {
  return timestamp.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long"
  });
};

const timestampToWeekday = timestamp => {
  return timestamp.toLocaleDateString("en-GB", {
    weekday: "long"
  });
};

// Check if weekday is today
const isToday = (today, currentWeekday) => {
  // If the date is equal to today's date
  if (today.getDate() === currentWeekday.getDate()) {
    // Return Today instead of weekday name
    return "Today";
  } else {
    // Else return weekday name
    return timestampToWeekday(currentWeekday);
  }
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
    currentForecastImage.style.backgroundImage = "url('clear.jpg')";
  } else if (weatherConditionNumber >= 801 && weatherConditionNumber <= 804) {
    console.log("Clouds");
    currentForecastImage.style.backgroundImage = "url('overcast.jpg')";
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
