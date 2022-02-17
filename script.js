const weatherContainer = document.getElementById("weatherContainer");
const today = document.getElementById("today");
const temperature = document.getElementById("temperature");
const city = document.getElementById("city");
const weatherDescription = document.getElementById("weatherDescription");
const weatherForecast = document.getElementById("weatherForecast");
const sunContainer = document.getElementById("sunContainer");
const mainContainer = document.getElementById("mainContainer");
const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=856500266ed2a8bc92cf454b0800d15c";
const API_Weather_URL =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=856500266ed2a8bc92cf454b0800d15c";
const timeInHr = new Date().getHours();

fetch(API_URL) //this is when we send something to BE
  .then((res) => res.json()) //this is when we receive the data from BE
  .then((data) => {
    /* sunrise & sunset */
    const sunriseSec = data.sys.sunrise;
    const sunsetSec = data.sys.sunset;
    const sunrise = convertUTCToSunTime(sunriseSec, data.timezone);
    const sunset = convertUTCToSunTime(sunsetSec, data.timezone);
    sunContainer.innerHTML = `
     <h3 class="sunrise" id="sunRise" >${sunrise} </h3>`;
    console.log("data", data);
    const weatherIcon = data.weather[0].icon;
    weatherContainer.innerHTML = ` <h1 class="today" id="today">Today</h1> 
    <h1 class="temperature" id="temperature">${data.main.temp}°C</h1>
        <h2 class="city" id="city">${data.name} </h2>
        <h2  class="weather-description" id="weatherDescription"> ${data.weather[0].icon} ${data.weather[0].description}  </h2>`;
    // weather icons
    if (data.weather[0].main === "Clouds") {
      weatherContainer.innerHTML += `  <h2  class="weather-description" id="weatherDescription"><img class="clouds-icon" src="./images/clouds.png">  ${data.weather[0].description}</h2>`;
    } else if (data.weather[0].main === "Rain") {
      weatherContainer.innerHTML += `<h2  class="weather-description" id="weatherDescription"><img class="rain-icon" src="./images/rain.png">  ${data.weather[0].description}</h2>`;
    } else if (data.weather[0].main === "Clear") {
      weatherContainer.innerHTML += `<h2  class="weather-description" id="weatherDescription"><img class="sun-icon" src="./images/sun.png">  ${data.weather[0].description}</h2>`;
    } else if (data.weather[0].main === "Snow") {
      weatherContainer.innerHTML += `<h2  class="weather-description" id="weatherDescription"><img class="snow-icon" src="./images/clouds.png">  ${data.weather[0].description}</h2>`;
    } else {
      weatherContainer.innerHTML += `<h2  class="weather-description" id="weatherDescription"><img class="other-icon" src="./images/clouds.png">  ${data.weather[0].description}</h2>`;
    }

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
  });

fetch(API_Weather_URL)
  .then((res) => res.json())
  .then((data) => {
    const dataOfFiveDays = data.list;
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
      weatherForecast.innerHTML += `
  <div class="weekly-weather">
    <span class="weekday">${weekdays[i]}</span>
    <img src="http://openweathermap.org/img/wn/${iconsArr[i]}.png" alt="weather icon"/>
    <span class="temperature">${maxTemperature} &#176; /${minTemperature} &#176;C</span>
    </div>
  `;
    }
  });

/* updated */
