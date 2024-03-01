//Global variables
const baseURL = "https://api.openweathermap.org/data/2.5/";
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const iconURL = "https://openweathermap.org/img/wn/";
const apiKey = "a6996a952d949efcc9c698344f4005c6";
const weatherEndpoint = "weather";
const forecastEndpoint = "forecast";
const queryUnits = "metric";
const weatherConditions = {
  thunderstorm:
    "Stay indoors and don't forget your umbrella. Keep an eye on weather updates and take shelter if necessary.",
  drizzle:
    "Expect drizzle today. Bring a light rain jacket or umbrella for added comfort outdoors.",
  snow: "Snow is expected throughout the day. Exercise caution while driving and consider alternative transportation if possible.",
  atmosphere:
    "Drive safely! Poor atmosphere is reducing visibility on the roads.",
  rain: "Don't forget your umbrella today! Heavy rain is expected, so stay dry and plan your commute accordingly.",
  clear:
    "Enjoy the clear skies today! Get your sunnies on to stay protected from the sunshine.",
  clouds:
    "It's a cloudy day. Grab a light jacket and enjoy the cooler temperatures and cozy atmosphere.",
};

//DOM objects
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

//Functions
// Function that formats the day or time stamp
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

const getPosition = () => {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
};

const displayCurrentWeather = (lat, lon) => {
  fetch(
    `${baseURL}${weatherEndpoint}?lat=${lat}&lon=${lon}&units=${queryUnits}&APPID=${apiKey}`
  )
    .then(response => response.json())
    .then(data => {
      return handleCurrentWeather(data);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      console.log("Finished loading current weather.");
    });
};

const capitalizeFirstLetter = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const handleCurrentWeather = data => {
  console.log(data);
  city.innerText = data.name;
  let sunsetTime = data.sys.sunset;
  let sunriseTime = data.sys.sunrise;
  console.log(sunsetTime);
  console.log(sunriseTime);
  sunsetTime = formatUnixTime(sunsetTime);
  sunriseTime = formatUnixTime(sunriseTime);
  console.log(sunriseTime, sunsetTime);
  sunrise.innerText = sunriseTime;
  sunset.innerText = sunsetTime;
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
  weatherIcon.style.display = "block";
  console.log(sunsetTime, sunriseTime, city);
  console.log(currentWeatherCondition);
};

const manipulateWeatherTable = weeklyWeather => {
  weeklyWeather.forEach(weather => {
    weatherForecast.innerHTML += `<tr class="day">
    <td class="day">${capitalizeFirstLetter(weather.day)}</td>
    <td class="weather-icon">
      <img
        src="${iconURL}${weather.iconID}@2x.png"
      />
    </td>
    <td class="weather-range">${weather.maxTemp}° / ${weather.minTemp}°C</td>
  </tr>`;
  });
};

const displayWeatherForecast = (lat, lon) => {
  fetch(
    `${baseURL}${forecastEndpoint}?lat=${lat}&lon=${lon}&units=${queryUnits}&APPID=${apiKey}`
  )
    .then(response => response.json())
    .then(data => {
      console.log(data);
      console.log(data.list);
      const [currentDate, currentDayIndex] = getAndFormatCurrentDate();
      console.log(currentDate);
      console.log(currentDayIndex);
      const weeklyWeather = generateFourDaysWeather(
        data,
        currentDayIndex,
        currentDate
      );
      console.log(weeklyWeather);
      manipulateWeatherTable(weeklyWeather);
    });
};

const getAndFormatCurrentDate = () => {
  let date = new Date();
  const dayIndex = date.getDay();
  // format the date to e.g. 2024-02-29
  date = date.toISOString().split("T")[0];
  return [date, dayIndex];
};

const generateFourDaysWeather = (
  forecastData,
  currentDayIndex,
  currentDate
) => {
  let fourDaysWeather = forecastData.list
    .filter(weather => {
      return !weather.dt_txt.includes(currentDate);
    })
    .slice(0, 32); // Get the next four days weather
  console.log(fourDaysWeather);
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

// buttonIcon.addEventListener("click", () => {
//   forecastField.classList.toggle("hide");
//   currentWeatherField.classList.toggle("show");
//   buttonField.classList.toggle("move");
//   weatherAdviceContainer.classList.toggle("show-quote");
// });

// Execution

let lat, lon;

// const asyncCurrentWeather = function (lat, lon) {
//   return new Promise(function (resolve) {
//     displayCurrentWeather(resolve, lat, lon);
//   });
// };

loader.style.display = "flex";
getPosition()
  .then(pos => {
    console.log(pos.coords);
    ({ latitude: lat, longitude: lon } = pos.coords);
  })
  .then(() => {
    console.log("Start processing the current weather");
    return displayCurrentWeather(lat, lon);
  })
  .then(res => {
    console.log(res);
    console.log("Start processing the forcast");
    return displayWeatherForecast(lat, lon);
  })
  .then(() => {
    console.log("finish loading weather forecast");
    console.log("Moved here");
    loader.style.display = "none";
    console.log("Moved to button control");
    buttonField.style.display = "block";
    buttonIcon.addEventListener("click", () => {
      forecastField.classList.toggle("hide");
      currentWeatherField.classList.toggle("show");
      buttonField.classList.toggle("move");
      weatherAdviceContainer.classList.toggle("show-quote");
    });
  });

// const currentTime = data.dt;

// console.log(currentTime);

// compare the current time with the sunset and sunrise time so as to adjust the image and background color
// if (currentTime > sunsetTime || currentTime < sunriseTime) {
//   weatherIcon.src = "./assets/night.png";
//   buttonIcon.src = "./assets/button-icon-night.png";
//   console.log(currentWeatherField.classList[1]);
//   currentWeatherField.classList.remove("morning");
//   currentWeatherField.classList.add("night");
// } else {
//   currentWeatherField.classList.remove("night");
//   currentWeatherField.classList.add("morning");
//   currentWeatherField.classList.forEach(x => console.log(x));
// }
// format sunset and sunrise time from unix time to e.g. 17:52
