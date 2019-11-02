const currentForecastImage = document.getElementById("siteHeader");
const siteHeader = document.getElementById("siteHeader");
const multidayForecast = document.getElementById("multidayForecast");
const currentForecast = document.getElementById("currentForecast");
const today = new Date();
const apiKey = "61a23a5c50a7b6f6de8daad2de48ae27";
const forecastLocation = "Stockholm,SE";
const forecastData = [];
const dayHeading = document.getElementsByClassName("day");

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
    forecast.sunrise = timestampSunToHoursAndMinutes(timestampSunrise);
    forecast.sunset = timestampSunToHoursAndMinutes(timestampSunset);
    // Populate forecast object
    const weatherTime = new Date(weather.dt * 1000);
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
      siteHeader.innerHTML = `<h1 class="site-title">Today's weather in <span class="city">${item.city}</span></h1>`;
      output = "<p class='current-weather'>";
      output += `<span class="current-temperature">${item.temperature}&#176;</span> `;
      output += `<img class="current-weather-icon" src="assets/${item.icon}.svg" alt="${item.description}"/>`;
      output += `<span class="current-weather-description">${item.description}</span>`;
      output += "</p>";
      output += "<p class='sun-information'>";
      output += `<img class="sun-icon sunrise" src="assets/sunrise.svg" alt="Sunrise. Icon by Nook Fulloption from the Noun Project."/>`;
      output += `<span class="sunrise">${item.sunrise}</span> `;
      output += `<img class="sun-icon sunset" src="assets/sunset.svg" alt="Sunset. Icon by Nook Fulloption from the Noun Project."/>`;
      output += `<span class="sunset">${item.sunset}</span>`;
      output += "</p>";
      siteHeader.innerHTML += output;

      getWeatherConditionImage(item.id);
    }
    console.log(item.sunset);
  })
);

forecastData.forEach(
  (displayForecast = (item, index) => {
    const currentDay = item.weekday;
    let previousItem = index - 1;

    //const yesterday = previousItem.weekday;
    if (index === 0) {
      multidayForecast.innerHTML = `<h2 class="day">${item.weekday} <span class="date">${item.date}</span></h2>`;
    } else if (
      forecastData[index].weekday !== forecastData[previousItem].weekday
    ) {
      multidayForecast.innerHTML += `<h2 class="day">${item.weekday} <span class="date">${item.date}</span></h2>`;
    }
    let output = "<p class='forecast-details'>";
    output += `<span class="time">${item.time}</span> `;
    output += `<span class="max-temperature">Max: ${item.temperatureMax}&#176;</span> `;
    output += `<span class="min-temperature">Min: ${item.temperatureMin}&#176;</span> `;
    output += `<img class="weather-icon" src="assets/${item.icon}.svg" alt="${item.description}. Icon by Nook Fulloption from the Noun Project."/>`;
    output += "</p>";
    multidayForecast.innerHTML += output;
  })
);

const timestampSunToHoursAndMinutes = timestamp => {
  return timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
};

const timestampToHoursAndMinutes = timestamp => {
  return timestamp.toLocaleTimeString([], {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit"
  });
};

const timestampToDate = timestamp => {
  return timestamp.toLocaleDateString([], {
    timeZone: "UTC",
    day: "numeric",
    month: "long"
  });
};

const timestampToWeekday = timestamp => {
  return timestamp.toLocaleDateString([], {
    timeZone: "UTC",
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
    currentForecastImage.style.backgroundImage = "url('clear.jpg')";
  } else if (
    (weatherConditionNumber >= 300 && weatherConditionNumber <= 321) ||
    (weatherConditionNumber >= 500 && weatherConditionNumber <= 531)
  ) {
    console.log("Rain");
    currentForecastImage.style.backgroundImage = "url('clear.jpg')";
  } else if (weatherConditionNumber >= 600 && weatherConditionNumber <= 622) {
    console.log("Snow");
    currentForecastImage.style.backgroundImage = "url('clear.jpg')";
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
    currentForecastImage.style.backgroundImage = "url('clear.jpg')";
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
