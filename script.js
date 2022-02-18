const weatherContainer = document.getElementById("weatherContainer");
const today = document.getElementById("today");
const temperature = document.getElementById("temperature");
const city = document.getElementById("city");
const weatherDescription = document.getElementById("weatherDescription");
const weatherForecast = document.getElementById("weatherForecast");
const sunContainer = document.getElementById("sunContainer");
const mainContainer = document.getElementById("mainContainer");
const timeInHr = new Date().getHours();
const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=856500266ed2a8bc92cf454b0800d15c";
const API_Weather_URL =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=856500266ed2a8bc92cf454b0800d15c";
const london =
  "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=856500266ed2a8bc92cf454b0800d15c";
const dubai =
  "http://api.openweathermap.org/data/2.5/weather?q=Dubai&units=metric&APPID=856500266ed2a8bc92cf454b0800d15c";
const bangkok =
  "http://api.openweathermap.org/data/2.5/weather?q=Bangkok&units=metric&APPID=856500266ed2a8bc92cf454b0800d15c";
const sydney =
  "http://api.openweathermap.org/data/2.5/weather?q=Sydney&units=metric&APPID=856500266ed2a8bc92cf454b0800d15c";

// Fetching the stockholm weather

let timezone;
fetch(API_URL) //this is when we send something to BE
  .then((res) => res.json()) //this is when we receive the data from BE
  .then((data) => {
    const icon = data.weather[0].icon;

    weatherContainer.innerHTML = ` 
    
    <h1 class="temperature" id="temperature">${data.main.temp}°C</h1>
    <h1 class="cityToday" id="city">${data.name} </h1>
        <h3 class="cityToday" id="city"><img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon"/> ${data.weather[0].description} </h3>
        `;

    /* sunrise & sunset */
    const sunriseSec = data.sys.sunrise;
    const sunsetSec = data.sys.sunset;
    timezone = data.timezone;
    const sunrise = convertUTCToSunTime(sunriseSec, data.timezone);
    const sunset = convertUTCToSunTime(sunsetSec, data.timezone);
    sunContainer.innerHTML = ` 
    <h4 class="sunrise" id="sunRise" > Sunrise  ${sunrise} </h4> 
    <img class="sunrise-icon" src="./images/sunrise.png">
    <h4 class="sunset" id="sunSet"> Sunset ${sunset}</h4>
    <img class="sunset-icon" src="./images/sunset.png">`;
  });

// setting bg Image based on day/night
if (timeInHr >= 6 && timeInHr <= 17) {
  mainContainer.style.backgroundImage = `url(./images/day.jpg)`;
  mainContainer.style.backgroundSize = "cover";
} else if (timeInHr >= 18) {
  mainContainer.style.backgroundImage = `url(./images/night.jpg)`;
  mainContainer.style.backgroundSize = "cover";
  mainContainer.style.color = "white";
} else {
  mainContainer.style.backgroundImage = `url(./images/night.jpg)`;
  mainContainer.style.backgroundSize = "cover";
  mainContainer.style.color = "white";
}

fetch(API_Weather_URL)
  .then((res) => res.json())
  .then((data) => {
    const dataOfFiveDays = data.list;
    const daysFromData = dataOfFiveDays.map((data) => {
      return convertUTCToDate(data.dt);
    });
    const uniqueDays = [...new Set(daysFromData)];

    //step 2. get Weekdays
    const weekdays = uniqueDays.map((day) =>
      new Date(day).toLocaleDateString("en-GB", { weekday: "short" })
    );

    //step 3. split data based on dates
    const dayOne = splitDataByDay(0);
    const dayTwo = splitDataByDay(1);
    const dayThree = splitDataByDay(2);
    const dayFour = splitDataByDay(3);
    const dayFive = splitDataByDay(4);
    function splitDataByDay(uniqueDayIndex) {
      return dataOfFiveDays.filter((data) => {
        const date = convertUTCToDate(data.dt);
        if (date === uniqueDays[uniqueDayIndex]) {
          return data;
        }
      });
    }

    //stpe 3. get Weather icon by current hour
    const dayOneIcon = getIcon(dayOne);
    const dayTwoIcon = getIcon(dayTwo);
    const dayThreeIcon = getIcon(dayThree);
    const dayFourIcon = getIcon(dayFour);
    const dayFiveIcon = getIcon(dayFive);
    const iconsArr = [
      dayOneIcon,
      dayTwoIcon,
      dayThreeIcon,
      dayFourIcon,
      dayFiveIcon,
    ];
    function getIcon(dataOfDay) {
      let icon;
      const currHour = new Date().getHours();
      dataOfDay.forEach((data) => {
        const dataHour = convertUTCToHours(data.dt);
        if (dataHour <= currHour && dataHour + 3 > currHour) {
          icon = data.weather[0].icon;
        }
      });
      if (!icon) {
        icon = dataOfDay[0].weather[0].icon;
      }

      return icon;
    }

    //step 4. get Min max temperature of each day
    const dayOneMinMax = getMinMax(dayOne);
    const dayTwoMinMax = getMinMax(dayTwo);
    const dayThreeMinMax = getMinMax(dayThree);
    const dayFourMinMax = getMinMax(dayFour);
    const dayFiveMinMax = getMinMax(dayFive);
    function getMinMax(dataOfDay) {
      let minTemp = [];
      let maxTemp = [];
      dataOfDay.forEach((data) => {
        minTemp.push(data.main.temp_min);
        maxTemp.push(data.main.temp_max);
      });
      const minTemperature = Math.min(...minTemp);
      const maxTemperature = Math.max(...maxTemp);
      return { maxTemperature, minTemperature };
    }

    const minMaxArr = [
      dayOneMinMax,
      dayTwoMinMax,
      dayThreeMinMax,
      dayFourMinMax,
      dayFiveMinMax,
    ];

    //step 5. display
    for (let i = 0; i < 5; i++) {
      const { maxTemperature, minTemperature } = minMaxArr[i];
      weatherForecast.innerHTML += `
  <div class="weekly-weather">
    <span class="weekday">${weekdays[i]}</span>
    <img class="temperature-icon"src="http://openweathermap.org/img/wn/${iconsArr[i]}.png" alt="weather icon"/>
    <span class="temperature2">${maxTemperature} &#176; / ${minTemperature} &#176;C</span>
    </div>
  `;
    }
  });

function convertUTCToSunTime(UTCsec, timezone) {
  const UTCstring = new Date(
    (UTCsec + timezone + new Date().getTimezoneOffset() * 60) * 1000
  ).toTimeString();
  const timeWithSec = UTCstring.split(":");
  return `${timeWithSec[0]}: ${timeWithSec[1]}`;
}

function convertUTCToDate(UTCsec) {
  const UTCstring = new Date(
    (UTCsec + timezone + new Date().getTimezoneOffset() * 60) * 1000
  ).toDateString();
  return UTCstring;
}

function convertUTCToHours(UTCsec) {
  const UTCstring = new Date(
    (UTCsec + timezone + new Date().getTimezoneOffset() * 60) * 1000
  ).getHours();
  return UTCstring;
}

// Different cities

fetch(london)
  .then((response) => response.json())
  .then((data2) => {
    const todaysTemp = data2.main.temp_max.toFixed(0);
    console.log("london", data2);
    otherCity.innerHTML += `
    <p  class="city" id="london">${data2.name}</p>
   <p  class="city" id="london">${todaysTemp}°C</p>
   `;
  });

fetch(dubai)
  .then((response) => response.json())
  .then((data3) => {
    const todaysTemp = data3.main.temp_max.toFixed(0);
    console.log("dubai", data3);
    otherCity.innerHTML += `
    <p class="city" id="dubai">${data3.name}</p>
   <p class="city" id="dubai" >${todaysTemp}°C</p>
`;
  });
fetch(bangkok)
  .then((response) => response.json())
  .then((data4) => {
    const todaysTemp = data4.main.temp_max.toFixed(0);
    console.log("bangkok", data4);
    otherCity.innerHTML += `
    <p class="city" id="bangkok">${data4.name}</p>
   <p class="city" id="bangkok">${todaysTemp}°C</p`;
  });
fetch(sydney)
  .then((response) => response.json())
  .then((data5) => {
    const todaysTemp = data5.main.temp_max.toFixed(0);
    console.log("sydney", data5);
    otherCity.innerHTML += `
    <p class="city" id="sydney">${data5.name}</p>
   <p class="city" id="sydney">${todaysTemp}°C</p`;
  });
