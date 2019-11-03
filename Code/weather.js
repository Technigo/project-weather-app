const apiKey = "61a23a5c50a7b6f6de8daad2de48ae27";
const forecastLocation = "Stockholm,SE";
const forecastData = [];
const today = new Date();

const handleWeatherForecast = json => {
  // Filter and store certain data from the json file in objects
  // that are stored in the array forecastData
  const filterForecastData = json.list.filter(data => {
    // Forecast object to store information for different days
    const forecast = {};

    // City name
    forecast.city = json.city.name;

    // Sunset and sunrise information
    const timestampSunrise = new Date(json.city.sunrise * 1000);
    const timestampSunset = new Date(json.city.sunset * 1000);
    forecast.sunrise = timestampToHoursAndMinutes(timestampSunrise);
    forecast.sunset = timestampToHoursAndMinutes(timestampSunset);

    // Date, time and weekday information
    const forecastTime = new Date(data.dt * 1000);
    forecast.date = timestampToDate(forecastTime);
    forecast.time = timestampToHoursAndMinutes(forecastTime);
    forecast.weekday = isToday(today, forecastTime);

    // Temperature information
    forecast.temperature = Math.round(data.main.temp);
    forecast.temperatureMin = Math.round(data.main.temp_min);
    forecast.temperatureMax = Math.round(data.main.temp_max);

    // Weather description, icon and id
    forecast.description = data.weather[0].description;
    forecast.icon = data.weather[0].icon;
    forecast.id = data.weather[0].id;

    // Add forecast object to array
    forecastData.push(forecast);
  });

  forecastData.forEach(displayCurrentForecast);
  forecastData.forEach(displayMultidayForecast);
};

const displayCurrentForecast = (currentForecast, index) => {
  const siteHeader = document.getElementById("siteHeader");

  // If forecast is the first in the array print current forecast info
  if (index === 0) {
    let output;

    siteHeader.innerHTML = `<h1 class="site-title">Today's weather in <span class="city">${currentForecast.city}</span></h1>`;
    output = "<p class='current-weather'>";
    output += `<span class="current-temperature">${currentForecast.temperature}&#176;</span>`;
    output += `<img class="current-weather-icon" src="assets/icons/${currentForecast.icon}-w.svg" alt="${currentForecast.description}"/>`;
    output += `<span class="current-weather-description">${currentForecast.description}</span>`;
    output += "</p>";
    output += "<p class='sun-information'>";
    output += `<img class="sun-icon sunrise" src="assets/icons/sunrise-w.svg" alt="Sunrise. Icon by Nook Fulloption from the Noun Project."/>`;
    output += `<span class="sunrise">${currentForecast.sunrise}</span> `;
    output += `<img class="sun-icon sunset" src="assets/icons/sunset-w.svg" alt="Sunset. Icon by Nook Fulloption from the Noun Project."/>`;
    output += `<span class="sunset">${currentForecast.sunset}</span>`;
    output += "</p>";
    siteHeader.innerHTML += output;

    // Get the weather image for the current weather using the weather id
    getWeatherConditionImage(currentForecast.id);
  }
};

const displayMultidayForecast = (currentForecast, index) => {
  const multidayForecast = document.getElementById("multidayForecast");
  const currentDay = currentForecast.weekday;
  let previousIndex = index - 1;

  // If it is the first forecast in the array print heading with weekday and date info
  if (index === 0) {
    multidayForecast.innerHTML = `<h2 class="day">${currentForecast.weekday} <span class="date">${currentForecast.date}</span></h2>`;

    // If the current forecast day isn't the same as the previously printed forecast, print a new heading
  } else if (currentDay !== forecastData[previousIndex].weekday) {
    multidayForecast.innerHTML += `<h2 class="day">${currentForecast.weekday} <span class="date">${currentForecast.date}</span></h2>`;

    // Else print forecast details
  } else {
    let output = "<p class='forecast-details'>";
    output += `<span class="time">${currentForecast.time}</span> `;
    output += `<span class="max-temperature">Max: <br/>${currentForecast.temperatureMax}&#176;</span> `;
    output += `<span class="min-temperature">Min: <br/>${currentForecast.temperatureMin}&#176;</span> `;
    output += `<img class="weather-icon" src="assets/icons/${currentForecast.icon}.svg" alt="${currentForecast.description}. Icon by Nook Fulloption from the Noun Project."/>`;
    output += "</p>";
    multidayForecast.innerHTML += output;
  }
};

// Time in hours and minutes
const timestampToHoursAndMinutes = timestamp => {
  return timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
};

// Date with day in month and month name (long version)
const timestampToDate = timestamp => {
  return timestamp.toLocaleDateString([], {
    day: "numeric",
    month: "long"
  });
};

// Weekday name (long version)
const timestampToWeekday = timestamp => {
  return timestamp.toLocaleDateString([], {
    weekday: "long"
  });
};

// Check if weekday is today
const isToday = (today, currentWeekday) => {
  // If the date is equal to today's date return "Today" instead of weekday name
  if (today.getDate() === currentWeekday.getDate()) {
    return "Today";

    // Else return weekday name
  } else {
    return timestampToWeekday(currentWeekday);
  }
};

// Get different images depending on weather condition
const getWeatherConditionImage = weatherConditionNumber => {
  const currentForecastImage = document.getElementById("siteHeader");

  if (weatherConditionNumber >= 200 && weatherConditionNumber <= 232) {
    console.log("Thunderstorm");
    currentForecastImage.style.backgroundImage = "url('clear.jpg')";
    siteHeader.classList.add("currently-stormy");
  } else if (
    (weatherConditionNumber >= 300 && weatherConditionNumber <= 321) ||
    (weatherConditionNumber >= 500 && weatherConditionNumber <= 531)
  ) {
    console.log("Rain");
    currentForecastImage.style.backgroundImage = "url('clear-mobile.jpg')";
    siteHeader.classList.add("currently-rainy");
  } else if (weatherConditionNumber >= 600 && weatherConditionNumber <= 622) {
    console.log("Snow");
    currentForecastImage.style.backgroundImage = "url('clear.jpg')";
    siteHeader.classList.add("currently-snowing");
  } else if (weatherConditionNumber >= 701 && weatherConditionNumber <= 781) {
    console.log("Mist, dust or smoke");
    siteHeader.classList.add("currently-misty");
  } else if (weatherConditionNumber === 800) {
    console.log("Clear sky");
    currentForecastImage.style.backgroundImage = "url('clear.jpg')";
    siteHeader.classList.add("currently-sunny");
  } else if (weatherConditionNumber >= 801 && weatherConditionNumber <= 804) {
    console.log("Clouds");
    siteHeader.classList.add("currently-cloudy");
    //currentForecastImage.style.backgroundImage = "url('overcast.jpg')";
  } else {
    console.log("Can't forecast weather");
    currentForecastImage.style.backgroundImage = "url('clear.jpg')";
    siteHeader.classList.add("default");
  }
};

// Fetch data from Open Weather map
fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=${forecastLocation}&units=metric&APPID=${apiKey}`
)
  .then(response => {
    return response.json();
  })
  .then(handleWeatherForecast);
