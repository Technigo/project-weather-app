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
  }
  let output = "<p class='forecast-details'>";
  output += `<span class="time">${currentForecast.time}</span> `;
  output += `<span class="max-temperature">Max: <br/>${currentForecast.temperatureMax}&#176;</span> `;
  output += `<span class="min-temperature">Min: <br/>${currentForecast.temperatureMin}&#176;</span> `;
  output += `<img class="weather-icon" src="assets/icons/${currentForecast.icon}.svg" alt="${currentForecast.description}. Icon by Nook Fulloption from the Noun Project."/>`;
  output += "</p>";
  multidayForecast.innerHTML += output;
};

// Time in hours and minutes
const timestampToHoursAndMinutes = timestamp => {
  return timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

// Date with day in month and month name (long version)
const timestampToDate = timestamp => {
  const day = timestamp.toLocaleDateString([], {
    day: "numeric"
  });
  const month = timestamp.toLocaleDateString([], {
    month: "numeric"
  });

  let monthName;

  if (month === "1") {
    monthName = months[0];
  } else if (month === "2") {
    monthName = months[1];
  } else if (month === "3") {
    monthName = months[2];
  } else if (month === "4") {
    monthName = months[3];
  } else if (month === "5") {
    monthName = months[4];
  } else if (month === "6") {
    monthName = months[5];
  } else if (month === "7") {
    monthName = months[6];
  } else if (month === "8") {
    monthName = months[7];
  } else if (month === "9") {
    monthName = months[8];
  } else if (month === "10") {
    monthName = months[9];
  } else if (month === "11") {
    monthName = months[10];
  } else if (month === "12") {
    monthName = months[11];
  }
  return `${day} ${monthName}`;
};

// Weekday name (long version)
const timestampToWeekday = timestamp => {
  const weekday = timestamp.toLocaleDateString([], {
    weekday: "long"
  });
  if (weekday === "måndag") {
    return "monday";
  } else if (weekday === "tisdag") {
    return "tuesday";
  } else if (weekday === "onsdag") {
    return "wednesday";
  } else if (weekday === "torsdag") {
    return "thursday";
  } else if (weekday === "fredag") {
    return "friday";
  } else if (weekday === "lördag") {
    return "saturday";
  } else if (weekday === "söndag") {
    return "sunday";
  }
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

// Set different classed depending on weather condition
const getWeatherConditionImage = weatherConditionNumber => {
  const currentForecastImage = document.getElementById("siteHeader");

  // Stormy
  if (weatherConditionNumber >= 200 && weatherConditionNumber <= 232) {
    siteHeader.setAttribute("class", "site-header currently-stormy");

    // Rainy
  } else if (
    (weatherConditionNumber >= 300 && weatherConditionNumber <= 321) ||
    (weatherConditionNumber >= 500 && weatherConditionNumber <= 531)
  ) {
    siteHeader.setAttribute("class", "site-header currently-rainy");

    // Snowy
  } else if (weatherConditionNumber >= 600 && weatherConditionNumber <= 622) {
    siteHeader.setAttribute("class", "site-header currently-snowy");

    // Misty
  } else if (weatherConditionNumber >= 701 && weatherConditionNumber <= 781) {
    siteHeader.setAttribute("class", "site-header currently-misty");

    // Clear
  } else if (weatherConditionNumber === 800) {
    siteHeader.setAttribute("class", "site-header currently-clear");

    // Cloudy
  } else if (weatherConditionNumber >= 801 && weatherConditionNumber <= 804) {
    siteHeader.setAttribute("class", "site-header currently-cloudy");

    // I fno condition should match use default
  } else {
    siteHeader.setAttribute("class", "site-header");
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
