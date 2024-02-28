//Global variables
const baseURL = "https://api.openweathermap.org/data/2.5/weather";
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const iconURL = "https://openweathermap.org/img/wn/";
const apiKey = "a6996a952d949efcc9c698344f4005c6";
const weatherEndpoint = "weather";
const forecastEndpoint = "forecast";

//DOM objects
const currentTemp = document.getElementById("current-temp");
const city = document.getElementById("city");
const weatherCondition = document.getElementById("weather-condition");
const weatherForecast = document.getElementById("weather-table");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const button = document.getElementById("button-icon");
const forecastField = document.getElementById("forecast-field");
const currentWeatherField = document.getElementById("current-weather-field");
const buttonField = document.getElementById("button-area");
const timeIcon = document.getElementById("time-icon-container");

//Functions
// Function that formats the day or time stamp
const formatUnixTime = unixTime => {
  let formattedTime = new Date(unixTime * 1000);
  console.log("Fomartted time:", formattedTime);
  const hours = formattedTime.getHours();
  // add 0 to minutes in case we get minutes with single integer e.g. 8 -> 08
  const minutes = "0" + formattedTime.getMinutes();
  // get the last two elements in the minutes string
  formattedTime = `${hours}:${minutes.slice(-2)}`;
  return formattedTime;
};

const displayCurrentWeather = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${apiKey}`
  )
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      console.log(data);
      city.innerText = data.name;
      let sunsetTime = data.sys.sunset;
      let sunriseTime = data.sys.sunrise;
      const currentTime = data.dt;
      // compare the current time with the sunset and sunrise time so as to adjust the image and background color
      if (currentTime > sunsetTime || currentTime < sunsetTime) {
        timeIcon.src = "./assets/night.png";
        button.src = "./assets/button-icon-night.png";
        currentWeatherField.classList.remove("morning");
        currentWeatherField.classList.add("night");
      } else {
        timeIcon.src = timeImgPath.day;
        currentWeatherField.classList.remove("night");
        currentWeatherField.classList.add("morning");
      }
      sunsetTime = formatUnixTime(sunsetTime);
      sunriseTime = formatUnixTime(sunriseTime);
      console.log(sunriseTime, sunsetTime);
      sunrise.innerText = sunriseTime;
      sunset.innerText = sunsetTime;
      currentTemp.innerText = data.main.temp;
      console.log(currentTime);
      // const maxTemp = data.main.temp_max.toFixed(1);
      // const minTemp = data.main.temp_min.toFixed(1);
      // const iconID = data.weather[0].icon;
      weatherCondition.innerText = data.weather[0].main;
      console.log(sunsetTime, sunriseTime, city);
      console.log(weatherCondition);
    });
};

const capitalizeFirstLetter = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
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

const displayWeatherForecast = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${apiKey}`
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
      minTemp: dailyWeather[0].main.temp,
      // get the max temp based on the sorting - the last weather condition has the max temp value
      maxTemp: dailyWeather.at(-1).main.temp,
      iconID: icon,
    };
    // add each day's weather formatted conditions to the array
    weatherData.push(dailyWeather);
  }
  return weatherData;
};

button.addEventListener("click", () => {
  forecastField.classList.toggle("hide");
  console.log(forecastField.classList);
  console.log(forecastField);
  currentWeatherField.classList.toggle("show");
  buttonField.classList.toggle("move");
});

// Execution

displayCurrentWeather();
displayWeatherForecast();
