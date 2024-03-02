////////////////////README: Global variables////////////////
const baseURL = "https://api.openweathermap.org/data/2.5/";
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const iconURL = "https://openweathermap.org/img/wn/";
const apiKey = "a6996a952d949efcc9c698344f4005c6";
const weatherEndpoint = "weather";
const forecastEndpoint = "forecast";
const queryUnits = "metric";
const weatherConditions = {
  thunderstorm:
    "Stay indoors and keep an eye on weather updates and take shelter if necessary.",
  drizzle:
    "Expect drizzle today. Bring a light rain jacket or umbrella for added comfort outdoors.",
  snow: "Snow is expected today. Exercise caution while driving and wear your ice shoes",
  atmosphere:
    "Drive safely! Poor atmosphere is reducing visibility on the roads.",
  rain: "Bring your umbrella today! Stay dry and plan your commute accordingly.",
  clear:
    "Enjoy the clear skies today! Get your sunnies on to stay protected from the sunshine.",
  clouds:
    "It's a cloudy day. Grab a light jacket and enjoy the cooler temperatures and cozy atmosphere.",
};

///////////////////README: DOM objects/////////////////
const currentTemp = document.getElementById("current-temp");
const city = document.getElementById("city");
const currentWeatherCondition = document.getElementById(
  "current-weather-condition"
);
const weatherForecast = document.getElementById("weather-table");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const buttonIcon = document.getElementById("button-icon");
const forecastField = document.getElementById("forecast-field");
const currentWeatherField = document.getElementById("current-weather-field");
const buttonField = document.getElementById("button-field");
const weatherIcon = document.getElementById("weather-icon");
const weatherAdviceContainer = document.getElementById(
  "weather-advice-container"
);
const weatherAdvice = document.querySelector("h2");
const loader = document.getElementById("loader-container");
const searchBtn = document.querySelector(".searchButton");
const searchInput = document.querySelector(".searchTerm");
const searchBar = document.querySelector(".search");

///////////////////Functions//////////////////
//       Formating functions      ///
// Function that formats the unix time
const formatUnixTime = unixTime => {
  // convert unix time to milliseconds
  let formattedTime = new Date(unixTime * 1000);
  // get hours from the date time
  const hours = formattedTime.getHours();
  // add 0 to minutes in case we get minutes with single integer e.g. 8 -> 08
  const minutes = "0" + formattedTime.getMinutes();
  // get the last two elements in the minutes string, if 08 -> 08 whereas 052 -> 52
  formattedTime = `${hours}:${minutes.slice(-2)}`;
  return formattedTime;
};

// Function that capitalizes the first letter
const capitalizeFirstLetter = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Function that gets the current date and returns date in year-month-day format and the day index
const getAndFormatCurrentDate = () => {
  let date = new Date();
  const dayIndex = date.getDay();
  // format the date to e.g. 2024-02-29
  date = date.toISOString().split("T")[0];
  return [date, dayIndex];
};

// Function that returns an array of the weather details for next four days.
const generateFourDaysWeather = (
  forecastData,
  currentDayIndex,
  currentDate
) => {
  let fourDaysWeather = forecastData.list
    .filter(weather => {
      return !weather.dt_txt.includes(currentDate);
    })
    .slice(0, 32); // Cut off the weather details of today and the day in 5 days since they are not the full data
  let weatherData = [];
  for (let i = 0; i < 4; i++) {
    // get the daily weather of next four days weather
    let dailyWeather = fourDaysWeather.splice(0, 8);
    // set the icon id based on the weather condition at 12:00
    const icon = dailyWeather[3].weather[0].icon;
    // sort the daily weather in asending order based on the temp value
    dailyWeather.sort((a, b) => a.main.temp - b.main.temp);
    dailyWeather = {
      // get the day's name
      day: dayNames.at(currentDayIndex - 6 + i),
      // get the min temp based on the sorting - the first weather condition has the min temp value
      minTemp: Math.round(dailyWeather[0].main.temp),
      // get the max temp based on the sorting - the last weather condition has the max temp value
      maxTemp: Math.round(dailyWeather.at(-1).main.temp),
      iconID: icon,
    };
    // add each day's weather formatted conditions to the array
    weatherData.push(dailyWeather);
  }
  return weatherData;
};

//     DOM Manipulation Functions    ///
// Function that manipulates the DOM objects of the current weather
const handleCurrentWeather = data => {
  city.innerText = data.name;
  sunrise.innerText = formatUnixTime(data.sys.sunrise);
  sunset.innerText = formatUnixTime(data.sys.sunset);
  // round the temp to 1 decimal place
  currentTemp.innerText = data.main.temp.toFixed(1);
  // weatherDescription is in a format where the first letter is upper
  let weatherDescription = data.weather[0].main;
  currentWeatherCondition.innerText = weatherDescription;
  // convert the weatherDescription to lower case to align with the property name of weatherConditions
  weatherDescription = weatherDescription.toLowerCase();
  // atmosphere has multiple weather descriptions
  if (!(weatherDescription in weatherConditions)) {
    weatherDescription = "atmosphere";
  }
  weatherAdvice.textContent = weatherConditions[weatherDescription];
  // remove all the existing class name for current weather field
  currentWeatherField.className = "";
  // add the weather condition class so the background reflects current weather
  currentWeatherField.classList.add(weatherDescription);
  weatherIcon.src = `./assets/${weatherDescription}.png`;
  // display the weather icon and button
  weatherIcon.style.display = "block";
  buttonField.style.display = "block";
};

const manipulateWeatherTable = weeklyWeather => {
  forecastField.className = "";
  weatherForecast.innerHTML = "";
  weeklyWeather.forEach(weather => {
    weatherForecast.innerHTML += `<tr>
    <td class="forecast-day">${capitalizeFirstLetter(weather.day)}</td>
    <td class="forecast-icon">
      <img
        src="${iconURL}${weather.iconID}@2x.png"
      />
    </td>
    <td class="forecast-range">${weather.maxTemp}° / ${weather.minTemp}°C</td>
  </tr>`;
  });
};

//        Promise-based functions      //
// Function that fetches geolocation API and returns a promise object
const getPosition = () => {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
};

// Function that fetches two APIs i.e. current weather API & weather forecast API at once and formats the data for both current weather and weather forecast, then manipulates DOM objects to display the formatted data.
const processWeatherAPIs = queryParam => {
  const fetchWeatherAPI = fetch(
    `${baseURL}${weatherEndpoint}?${queryParam}&units=${queryUnits}&APPID=${apiKey}`
  );
  const fetchForecastAPI = fetch(
    `${baseURL}${forecastEndpoint}?${queryParam}&units=${queryUnits}&APPID=${apiKey}`
  );
  const fetchResponses = Promise.all([fetchWeatherAPI, fetchForecastAPI]);
  fetchResponses.then(responses => {
    const weatherRes = responses[0];
    const forecastRes = responses[1];
    if (!(weatherRes.ok || forecastRes.ok)) {
      alert("Location not found, try to search a place accurately.");
    } else {
      weatherRes.json().then(data => handleCurrentWeather(data));
      forecastRes.json().then(data => {
        const [currentDate, currentDayIndex] = getAndFormatCurrentDate();
        const weeklyWeather = generateFourDaysWeather(
          data,
          currentDayIndex,
          currentDate
        );
        // turn off the loader before displaying data
        manipulateWeatherTable(weeklyWeather);
      });
    }
  });
};

////////Event Listener////////
buttonIcon.addEventListener("click", () => {
  forecastField.classList.toggle("hide");
  currentWeatherField.classList.toggle("show");
  buttonField.classList.toggle("move");
  weatherAdviceContainer.classList.toggle("show-quote");
});

searchBar.addEventListener("submit", event => {
  event.preventDefault();
  if (searchInput.value) {
    // reset the button position and the status of weather advice section
    buttonField.classList.remove("move");
    weatherAdviceContainer.classList.remove("show-quote");
    processWeatherAPIs(`q=${searchInput.value}`);
    // reset the search bar
    searchInput.value = "";
  }
});
/////////Execution//////////

getPosition()
  .then(pos => {
    const { latitude: lat, longitude: lon } = pos.coords;
    return [lat, lon];
  })
  .then(res => {
    processWeatherAPIs(`lat=${res[0]}&lon=${res[1]}`);
  })
  .catch(err => {
    alert(
      `${err.message}. Please use the search bar to search for a city/country to start off.`
    );
  })
  .finally(() => {
    loader.style.display = "none";
    searchBar.style.display = "flex";
  });
