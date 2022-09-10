/****DOM Elements****/
const container = document.getElementById("todaySummary");
const mainWeather = document.getElementById("mainWeather");
const weeklyWeather = document.getElementById("weeklyForcastWrapper");
const dailyForcast = document.getElementById("dailyForcastRow");
const selectCity = document.getElementById("cities");

/**** Weather APIs****/
const stockholmWeather =
  "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=64d2a624607147029ae4574d21f5c6d9";
const sidneyWeather =
  "http://api.openweathermap.org/data/2.5/weather?q=Sidney,Australia&units=metric&APPID=dd119be9d07ede14a0d4a2a07b6dd18e";
const londonWeather =
  "http://api.openweathermap.org/data/2.5/weather?q=London,England&units=metric&APPID=9131d7e10e3d4c4db50d9536233dc980";
const bangkokWeather =
  "http://api.openweathermap.org/data/2.5/weather?q=Bangkok,Thailand&units=metric&APPID=c0ec35bd685cdcb888f10c443a6c14d5";

/**** Forcast APIs****/
const stockholmForcast =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=4c7a468589eea9cb94d5053a081d05ba";
const sidneyForcast =
  "https://api.openweathermap.org/data/2.5/forecast?q=Sidney,Australia&units=metric&APPID=e36d2706d1322106e3c5ea16b89992f1";
const londonForcast =
  "https://api.openweathermap.org/data/2.5/forecast?q=London,England&units=metric&APPID=002b38ff95d0ef8bad1f429f9b600f39";
const bangkokForcast =
  "https://api.openweathermap.org/data/2.5/forecast?q=Bangkok,Thailand&units=metric&APPID=e83c1059f8d8dd4be2de6612bd0cae22";

/**** Provide todays day****/
let returnWeekDay = (date) => {
  let daysInWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let inputDate = new Date(date.replace());
  return daysInWeek[inputDate.getDay()];
};

/**** Fetching Forecast****/
const fetchForcast = (forcastApi) => {
  const forcastPromise = fetch(forcastApi)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  return forcastPromise;
};

//**** Fetching Weather****/

const fetchWeather = (weatherApi) => {
  const weatherPromise = fetch(weatherApi)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  return weatherPromise;
};

/**** Display the weather****/

const ShowCityWeather = (data) => {
  /*Description*/
  mainWeather.innerHTML = `<p>${
    data.weather[0].description
  } | ${data.main.temp.toFixed(1)} ° C</p>`;

  /*Sunrise*/
  const unixTimestampSunrise = data.sys.sunrise; //To get sunrise/sunset time in hours:minutes:seconds
  let sunrise = new Date(unixTimestampSunrise * 1000); //Declare new variable to show only hh:mm
  let sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: "short" });
  mainWeather.innerHTML += `<p>sunrise: ${sunriseTime}</p>`;

  /*Sunset*/
  const unixTimestampSunset = data.sys.sunset;
  let sunset = new Date(unixTimestampSunset * 1000);
  let sunsetTime = sunset.toLocaleTimeString([], { timeStyle: "short" });
  mainWeather.innerHTML += `<p>sunset: ${sunsetTime}</p>`;

  /*Change apperance depending on weather*/
  if (data.weather[0].main === "Cloudy") {
    document.body.style.backgroundColor = "#CFD2CF";
    document.body.style.color = "#5F6F94";
    container.innerHTML += `<i class="fa-solid fa-cloud"></i>
    <h1>It looks rather cloudy in ${data.name} today &#x1F325;</h1>`;
    container.classList.add("cloudy");
  } else if (data.weather[0].main === "Rain") {
    document.body.style.backgroundColor = "#DAEAF1";
    document.body.style.color = "#5F6F94";
    container.innerHTML += `<i class="fa-solid fa-cloud-rain"></i>
    <h1>Get your umbrella, it looks rather wet in ${data.name} today &#9748;</h1>`;
    container.classList.add("rainy");
  } else if (data.weather[0].main === "Clear") {
    document.body.style.backgroundColor = "#FFB3B3";
    document.body.style.color = "#B270A2";
    container.innerHTML += `<i class="fa-solid fa-sun"></i>
    <h1>Get your sunnies on, ${data.name} is looking rather great today. &#128526</h1>`;
    container.classList.add("sunny");
  } else {
    document.body.style.backgroundColor = "#E4DCCF";
    document.body.style.color = "#7D9D9C";
    container.innerHTML += `<i class="fa-solid fa-cloud"></i>
    <h1>You can chillout, it is neutral weather in ${data.name} today.</h1>`;
    container.classList.add("natural");
  }
};

/**** Display the 5 days forcast****/

function ShowCityForcast(data) {
  const filteredForecast = data.list.filter((item) =>
    item.dt_txt.includes("12:00")
  );
  filteredForecast.forEach((filteredForecast) => {
    let dayInWeek = returnWeekDay(filteredForecast.dt_txt);
    let temp5Days = `${filteredForecast.main.temp}`;
    let temp5DaysRounded = Math.round(temp5Days);
    weeklyWeather.innerHTML += `
      <div class="forecast-row">
        <p> ${dayInWeek}:</p>
        <p> ${temp5DaysRounded}°C </p>
      </div>
      `;
  });
}
/**** Select the right data from each city****/

const selectCityData = (city) => {
  weeklyWeather.innerHTML = "";
  mainWeather.innerHTML = "";
  todaySummary.innerHTML = "";
  let apiUrl = "";
  let apiUrlForcast = "";

  if (city === "Stockholm") {
    apiUrl = stockholmWeather;
    apiUrlForcast = stockholmForcast;
  } else if (city === "Sidney") {
    apiUrl = sidneyWeather;
    apiUrlForcast = sidneyForcast;
  } else if (city === "London") {
    apiUrl = londonWeather;
    apiUrlForcast = londonForcast;
  } else {
    apiUrl = bangkokWeather;
    apiUrlForcast = bangkokForcast;
  }
  fetchWeather(apiUrl).then((data) => {
    ShowCityWeather(data);
  });
  fetchForcast(apiUrlForcast).then((data) => {
    ShowCityForcast(data);
  });
};

selectCityData("Stockholm");

selectCity.addEventListener("change", (event) =>
  selectCityData(event.target.value)
);
