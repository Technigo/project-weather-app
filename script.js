const weatherContainer = document.getElementById("weatherContainer");
const temperature = document.getElementById("temperature");
const city = document.getElementById("city");
const weatherDescription = document.getElementById("weatherDescription");
//<<<<<<< HEAD
const sunContainer = document.getElementById("sunContainer");

//=======
const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=856500266ed2a8bc92cf454b0800d15c";
const API_Weather_URL =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=856500266ed2a8bc92cf454b0800d15c";

//>>>>>>> sherin
//v2 -Dynamic (based on user input value) fetch request
// movieSearchBar.addEventListener('change', (event)=>{
//<<<<<<< HEAD
//=======

//>>>>>>> sherin
fetch(API_URL) //this is when we send something to BE
  .then((res) => res.json()) //this is when we receive the data from BE
  .then((data) => {
    // console.log("data", data);
    weatherContainer.innerHTML = `<h1 class="temperature" id="temperature">${data.main.temp}</h1>
        <h2 class="city" id="city">${data.name}</h2>
        <p  class="weather-description" id="weatherDescription">${data.weather[0].description}</p>`;

    /* sunrise & sunset */
    const sunriseSec = data.sys.sunrise;
    const sunsetSec = data.sys.sunset;
    const sunrise = convertUTCToSunTime(sunriseSec, data.timezone);
    const sunset = convertUTCToSunTime(sunsetSec, data.timezone);
    sunContainer.innerHTML = `<h1 class="sunrise" id="sunRise">${sunrise}</h1>
    <h1 class="sunset" id="sunSet">${sunset}</h1>`;
  });

//1. display Mon/Tue/Wed/Thurs [Jin]
//2. update style.css []
//3. jS: icon related weather []
fetch(API_Weather_URL) //this is when we send something to BE
  .then((res) => res.json()) //this is when we receive the data from BE
  .then((data1) => {
    // console.log(data1);
    // const filteredForecast = data1.list.filter((item) =>
    //   item.dt_txt.includes("12:00")
    // );
    // console.log("filteredForecast", filteredForecast);
    // weatherContainer.innerHTML += `<h1 class="weather" id="weather"> Date: ${filteredForecast[0].dt_txt}  ${filteredForecast[0].main.temp_max} /${filteredForecast[0].main.temp_min}</h1>
    //     <h1 class="weather" id="weather">  Date: ${filteredForecast[1].dt_txt}  ${filteredForecast[1].main.temp_max} / ${filteredForecast[1].main.temp_min}</h1>
    //     <h1 class="weather" id="weather"> Date: ${filteredForecast[2].dt_txt}   ${filteredForecast[2].main.temp_max} / ${filteredForecast[2].main.temp_min}</h1>
    //     <h1 class="weather" id="weather">Date: ${filteredForecast[3].dt_txt}     ${filteredForecast[3].main.temp_max} / ${filteredForecast[3].main.temp_min}</h1>
    //     <h1 class="weather" id="weather"> Date: ${filteredForecast[4].dt_txt}   ${filteredForecast[4].main.temp_max} / ${filteredForecast[4].main.temp_min}</h1>`;

    //step 1. split data based on days
    const dataOfFiveDays = data1.list;
    const daysFromData = dataOfFiveDays.map((data) => {
      return new Date(data.dt_txt).toDateString();
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
        const date = new Date(data.dt_txt).toDateString();
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
        const dataHour = new Date(data.dt_txt).getHours();
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
      weatherContainer.innerHTML += `
      <div class="weekly-weather">
        <span class="weekday">${weekdays[i]}</span>
        <img src="http://openweathermap.org/img/wn/${iconsArr[i]}.png" alt="weather icon"/>
        <span class="temperature">${maxTemperature} &#176; /${minTemperature} &#176;C</span>
        </div>
      `;
    }
  });

/* updated */
function convertUTCToSunTime(UTCsec, timezone) {
  const UTCstring = new Date(
    (UTCsec + timezone + new Date().getTimezoneOffset() * 60) * 1000
  ).toTimeString();
  const timeWithSec = UTCstring.split(":");
  return `${timeWithSec[0]}: ${timeWithSec[1]}`;
}
