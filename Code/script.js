//apiKey = "3eb926770233f3bacc440bffc14e56a4"
let cityLocation = document.getElementById("currentCityName");
let tempIcon = document.getElementById("temp-icon");
let tempValue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let sunRiseTime = document.getElementById("sunrise");
let sunSetTime = document.getElementById("sunset");

// GET WEATHER REPORT
let enteredCityLocation = "Stockholm";

const apiOneDay = `https://api.openweathermap.org/data/2.5/weather?q=${enteredCityLocation}&appid=3eb926770233f3bacc440bffc14e56a4`;

fetch(apiOneDay)
  .then((response) => {
    return response.json();
  })
  .then(data => {
    const { name } = data;
    const { feels_like } = data.main;
    const { sunrise } = data.sys;
    const { sunset } = data.sys;
    const { id, main } = data.weather[0];
    cityLocation.textContent = name;
    tempValue.textContent = Math.round(feels_like - 273)
    climate.textContent = main;
    console.log(data);

    var unixSunriseTime = new Date(sunrise * 1000);
    var sunriseHour = unixSunriseTime.getHours();
    var sunriseMinutes = "0" + unixSunriseTime.getMinutes();
    var sunriseSeconds = "0" + unixSunriseTime.getSeconds();
    var formattedSunrise = `Sunrise : ${sunriseHour}:${sunriseMinutes.substr(-2)}:${sunriseSeconds.substr(-2)}`;

    var unixSunsetTime = new Date(sunset * 1000);
    var sunsetHour = unixSunsetTime.getHours();
    var sunsetMinutes = "0" + unixSunsetTime.getMinutes();
    var sunsetSeconds = "0" + unixSunsetTime.getSeconds();
    var formattedSunset = `Sunset : ${sunsetHour}:${sunsetMinutes.substr(-2)}:${sunsetSeconds.substr(-2)}`;

    sunRiseTime.textContent = formattedSunrise;
    sunSetTime.textContent = formattedSunset;

    if (id < 250) {
      tempIcon.src = './images/icons/thunder.png';
    }
    else if (id < 350) {
      tempIcon.src = './images/icons/lightrain.png';
    } else if (id < 550) {
      tempIcon.src = './images/icons/heavyrain.png';
    } else if (id < 650) {
      tempIcon.src = './images/icons/snow.png';
    } else if (id < 700) {
      tempIcon.src = './images/icons/thunder.png';
    } else if (id == 800) {
      tempIcon.src = './images/icons/badweather.png';
    } else if (id > 800) {
      tempIcon.src = './images/icons/cloudy.png';
    } else {
      tempIcon.src = './images/icon/badweather.png';
    };
  })

const apiFiveDays = `https://api.openweathermap.org/data/2.5/forecast?q=${enteredCityLocation}&appid=3eb926770233f3bacc440bffc14e56a4`;

fetch(apiFiveDays)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });

