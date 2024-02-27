//Global variables
const baseURL = "https://api.openweathermap.org/data/2.5/weather";
const days = {
  0: "mon",
  1: "tue",
  2: "wed",
  3: "thu",
  4: "fri",
};
const iconURL = "https://openweathermap.org/img/wn/";
const apiKey = "";

//DOM objects
const weatherForecast = document.getElementById("weather-table");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

//Functions
// Function that formats the day or time stamp
const formatDayOrTime = (unixTime, timeOrDay) => {
  let formattedTime = new Date(unixTime * 1000);
  console.log("Fomartted time:", formattedTime);
  switch (timeOrDay) {
    case "day":
      const day = days[formattedTime.getDay()];
      return day;
    default:
      const hours = formattedTime.getHours();
      // add 0 to minutes in case we get minutes with single integer e.g. 8 -> 08
      const minutes = "0" + formattedTime.getMinutes();
      // get the last two elements in the minutes string
      formattedTime = `${hours}:${minutes.slice(-2)}`;
      return formattedTime;
  }
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
    const sunsetTime = formatDayOrTime(data.sys.sunset);
    const sunriseTime = formatDayOrTime(data.sys.sunrise);
    sunrise.innerText = sunriseTime;
    sunset.innerText = sunsetTime;
    const maxTemp = data.main.temp_max.toFixed(1);
    const minTemp = data.main.temp_min.toFixed(1);
    const day = formatDayOrTime(data.dt, "day");
    const iconID = data.weather[0].icon;
    const weatherCondition = data.weather[0].main;
    console.log(day);
    console.log(sunsetTime, sunriseTime, city);
    console.log(maxTemp, minTemp);
    console.log(weatherCondition);
    handleWeeklyWeather(day, iconID, minTemp, maxTemp);
  });

const capitalizeFirstLetter = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const handleWeeklyWeather = (day, iconID, minTemp, maxTemp) => {
  for (let i = 0; i < 5; i++) {
    weatherForecast.innerHTML += `<tr class=${day}>
      <td class="day">${capitalizeFirstLetter(day)}</td>
      <td class="weather-icon">
        <img
          src="${iconURL}${iconID}@2x.png"
        />
      </td>
      <td class="weather-range">${maxTemp}° / ${minTemp}°C</td>
    </tr>`;
  }
};
