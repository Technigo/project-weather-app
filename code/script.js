//Elements
const navigation = document.getElementById("navigation");
const toggleNav = document.getElementById("toggle-nav");
const topRightIcon = document.getElementById("weather-icon-container");
const currentCity = document.getElementById("current-city");
const currentTemp = document.getElementById("current-temp");
const currentWeather = document.getElementById("current-weather");
const cityList = document.getElementById("city-list");
const myLocation = document.getElementById("my-location");
const cityOne = document.getElementById("city-one");
const cityTwo = document.getElementById("city-two");
const cityThree = document.getElementById("city-three");
const sunUpTime = document.getElementById("sun-up-time");
const sunDownTime = document.getElementById("sun-down-time");
const arrowButton = document.getElementById("arrow-button");
const weekList = document.getElementById("week-list");
const bodyContainer = document.querySelector(".body-container");
const feelsLikeTemp = document.getElementById("feels-like-temp");

//Global variables
let apiResponse, nightTemp, crd, latitude, longitude;

let date = new Date();

const stylingTimer = () => {
  if (date.getHours() >= 7 && date.getHours() <= 18) {
    bodyContainer.classList.add("day");
  } else {
    bodyContainer.classList.add("night");
  }
};
stylingTimer();


const weatherFetch = (lat, lon) => {
  const apiKey = "191f229fc0a6e0f86812a75292074cb9";
  latitude = lat;
  longitude = lon;
  fetch(
    // `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&APPID=${apiKey}`
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      apiResponse = data;
      const sunriseTime = new Date(apiResponse.sys.sunrise * 1000);
      sunGoesUp = sunriseTime.toLocaleTimeString("en-GB", {timeStyle: "short"}); 
      const sunSetTime = new Date(apiResponse.sys.sunset * 1000);
      sunGoesDown = sunSetTime.toLocaleTimeString("en-GB", {timeStyle: "short"});
      getForecastData(lat, lon);
    })
    .then(() => {
      loadHtml();
    });
};

//Updates the html after 1000ms
const loadHtml = () => {
    currentCity.innerHTML = `${apiResponse.name}`;
    currentTemp.innerHTML = `${Math.round(apiResponse.main.temp * 10) / 10} °C`;
    feelsLikeTemp.innerHTML += `feels like ${Math.round(apiResponse.main.feels_like * 10) / 10} °C`;
    currentWeather.innerHTML = `${apiResponse.weather.map((weather) => {
      return weather.description;
    })}`;
    sunUpTime.innerHTML = `${sunGoesUp}`;
    sunDownTime.innerHTML = `${sunGoesDown}`;
    topRightIcon.innerHTML = `<img id="top-right-icon" src="http://openweathermap.org/img/wn/${apiResponse.weather[0].icon}@4x.png">`;
  }

let clearWeekList = () => {
  weekList.innerHTML = ``;
};

let clearFeelsLikeTemp = () => {
  feelsLikeTemp.innerHTML = ``;
}; 

//API Forecast 
const getForecastData = (lat, lon) => {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=191f229fc0a6e0f86812a75292074cb9`)
    .then((response) => response.json())
    .then((data) => {
      const filteredForecast = data.list.filter((item) =>
        item.dt_txt.includes("09:00")
      ); //Makes an array of days with temp read at 9

      const filteredForecastNight = data.list.filter((item) =>
        item.dt_txt.includes("21:00")
      );

      filteredForecast.forEach((day) => {
        const date = new Date(day.dt * 1000);
        let dayName = date.toLocaleDateString("en", { weekday: "short" }); //gives the name of each day

        filteredForecastNight.map((day) => {
          nightTemp = day.main.temp;
        });

        weekList.innerHTML += `<div class="weekDayRow"><p>${dayName}</p>
      <img id="week-list-icon" src="http://openweathermap.org/img/wn/${
        day.weather[0].icon
      }@4x.png">
      <p>${Math.round(day.main.temp * 10) / 10} / ${
          Math.round(nightTemp * 10) / 10
        } °C</p></div>`;
      });
    });
};

//Event listeners
toggleNav.addEventListener("click", () => {
  cityList.classList.toggle("hidden");
});

cityOne.addEventListener("click", () => {
  cityList.classList.toggle("hidden");
  weatherFetch("57.708870", "11.974560");
  loadHtml();
  clearWeekList();
  clearFeelsLikeTemp();
});

cityTwo.addEventListener("click", () => {
  cityList.classList.toggle("hidden");
  weatherFetch("60.192059", "24.945831");
  loadHtml();
  clearWeekList();
  clearFeelsLikeTemp();
});

cityThree.addEventListener("click", () => {
  cityList.classList.toggle("hidden");
  weatherFetch("59.6173", "16.5422");
  loadHtml();
  clearWeekList();
  clearFeelsLikeTemp();
});

arrowButton.addEventListener("click", () => {
  arrowButton.classList.toggle("rotate");
  weekList.classList.toggle("hidden");
});

//Loads the weather
weatherFetch("59.6173", "16.5422");
loadHtml();

