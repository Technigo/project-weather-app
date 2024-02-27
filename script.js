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

//DOM objects
const weatherForecast = document.getElementById("weather-table");
//Functions

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=b1ece640cf177e8a4f0764d4ae7ac9d1"
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
    const maxTemp = data.main.temp_max.toFixed(1);
    const minTemp = data.main.temp_min.toFixed(1);
    const day = formatDayOrTime(data.dt, "day");
    const iconID = data.weather[0].icon;
    console.log(day);
    console.log(sunsetTime, sunriseTime, city);
    console.log(maxTemp, minTemp);
    handleWeeklyWeather(day, iconID, minTemp, maxTemp);
  });

const formatDayOrTime = (unixTime, timeOrDay) => {
  let formattedTime = new Date(unixTime * 1000);
  console.log("Fomartted time:", formattedTime);
  if (timeOrDay === "day") {
    const day = days[formattedTime.getDay()];
    return day;
  } else {
    const hours = formattedTime.getHours();
    const minutes = "0" + formattedTime.getMinutes();
    formattedTime = `${hours}:${minutes.slice(-2)}`;
    return formattedTime;
  }
};

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
