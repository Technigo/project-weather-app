//Global variables
const baseURL = "https://api.openweathermap.org/data/2.5/weather";
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// --current day index = 3 -> "Wed"--
// -3 -> "THU"
// -2 -> "Fri"
// -1 -> "Sat"
// 0 -> "Sun"
// --current day index = 5 -> "Fri"--
// -1 -> "Sat"
// 0 -> "Sun"
// 1 -> "Mon"
//2 -> "Tue"
// --current day index = 0 -> "Sun"--
// -6 -> "Mon"
// -5
// currentDayIndex + 1 - 7;-6
// currentDayIndex + 2 - 7;-5
// currentDayIndex + 3 - 7;-4
// currentDayIndex + 4 - 7;-3
const iconURL = "https://openweathermap.org/img/wn/";
const apiKey = "a6996a952d949efcc9c698344f4005c6";
const weatherEndpoint = "weather";
const forecastEndpoint = "forecast";

//DOM objects
const weatherForecast = document.getElementById("weather-table");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

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

fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${apiKey}`
)
  .then(response => {
    console.log(response);
    return response.json();
  })
  .then(data => {
    console.log(data);
    const city = data.name;
    const sunsetTime = formatUnixTime(data.sys.sunset);
    const sunriseTime = formatUnixTime(data.sys.sunrise);
    sunrise.innerText = sunriseTime;
    sunset.innerText = sunsetTime;
    const maxTemp = data.main.temp_max.toFixed(1);
    const minTemp = data.main.temp_min.toFixed(1);
    const iconID = data.weather[0].icon;
    const weatherCondition = data.weather[0].main;
    console.log(sunsetTime, sunriseTime, city);
    console.log(maxTemp, minTemp);
    console.log(weatherCondition);
    console.log(iconID);
  });

const capitalizeFirstLetter = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const displayWeeklyWeather = weeklyWeather => {
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
      displayWeeklyWeather(weeklyWeather);
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
    .slice(0, 32);
  console.log(fourDaysWeather);
  let weatherData = [];
  for (let i = 0; i < 4; i++) {
    let dailyWeather = fourDaysWeather.splice(0, 8);
    const icon = dailyWeather[3].weather[0].icon;
    dailyWeather.sort((a, b) => a.main.temp - b.main.temp);
    dailyWeather = {
      day: dayNames.at(currentDayIndex - 6 + i),
      minTemp: dailyWeather[0].main.temp,
      maxTemp: dailyWeather.at(-1).main.temp,
      iconID: icon,
    };
    weatherData.push(dailyWeather);
  }
  return weatherData;
};

displayWeatherForecast();
