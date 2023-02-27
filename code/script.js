const currentWeather = document.getElementById("current-weather");
const forecast = document.getElementById("forecast");

//Geolocation
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const success = (pos) => {
  const crd = pos.coords;
  let latitude = crd.latitude;
  let longitude = crd.longitude;
  return (
    getCurrentWeatherData(latitude, longitude),
    getForecastWeatherData(latitude, longitude)
  );
};

const error = (err) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  let latitude = 59.334591;
  let longitude = 18.06324;
  return (
    getCurrentWeatherData(latitude, longitude),
    getForecastWeatherData(latitude, longitude)
  );
};

navigator.geolocation.getCurrentPosition(success, error, options);

// element creators
const createElement = (tag, className, id, textContent, appendTo) => {
  const newElement = document.createElement(tag);
  newElement.className = className;
  newElement.id = id;
  newElement.textContent = textContent;
  appendTo.appendChild(newElement);
};

const createImage = (className, src, alt, appendTo) => {
  const newElement = new Image();
  newElement.className = className;
  newElement.src = src;
  newElement.alt = alt;
  appendTo.appendChild(newElement);
};

// Background images
const weatherTypes = [
  "Thunderstorm",
  "Rain",
  "Snow",
  "Mist",
  "Haze",
  "Fog",
  "Clear",
  "Clouds",
];

const changeBackgroundPicture = (weatherTypeJson) => {
  weatherTypes.forEach((weatherType) => {
    if (weatherType === weatherTypeJson) {
      document.querySelector(
        "body"
      ).style.backgroundImage = `url('images/${weatherType}.jpg')`;

      createImage(
        "current-weather-img",
        `images/${weatherType}.jpg`,
        weatherType,
        currentWeather
      );

      createImage(
        "forecast-background-img",
        `images/${weatherType}.jpg`,
        weatherType,
        forecast
      );
    }
  });
};

// current weather details
const getCurrentWeatherData = (latitude, longitude) => {
  currentWeather.textContent = "";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=f60c361b4571fb70c85f29bbd856c13f`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      createImage(
        "big-icon",
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        data.weather[0].description,
        currentWeather
      );
      createElement(
        "h1",
        "temperature",
        "temperature",
        `${Math.round(data.main.temp)}°C`,
        currentWeather
      );
      createElement(
        "h2",
        "city",
        "city",
        data.name.toUpperCase(),
        currentWeather
      );
      createElement(
        "h3",
        "weather-type",
        "weather-type",
        data.weather[0].description,
        currentWeather
      );
      createElement(
        "div",
        "sunrise-sunset",
        "sunrise-sunset",
        "",
        currentWeather
      );

      const sunriseSunset = document.getElementById("sunrise-sunset");
      createElement(
        "div",
        "sunrise",
        "sunrise",
        `sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`,
        sunriseSunset
      );
      createElement(
        "div",
        "sunset",
        "sunset",
        `sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`,
        sunriseSunset
      );
      changeBackgroundPicture(data.weather[0].main);
    });
};
getCurrentWeatherData();

// forecast
const getForecastWeatherData = (latitude, longitude) => {
  forecast.textContent = "";
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=f60c361b4571fb70c85f29bbd856c13f`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const filteredList = data.list.filter((element) => {
        return (
          new Date(element["dt_txt"]).getHours() === 9 &&
          new Date(element["dt_txt"]).getDay() !== new Date(Date.now()).getDay()
        );
      });

      filteredList.forEach((element) => {
        createElement(
          "div",
          "day",
          `day${filteredList.indexOf(element)}`,
          "",
          forecast
        );

        let dayRow = document.getElementById(
          `day${filteredList.indexOf(element)}`
        );
        //day of the week
        const date = new Date(element["dt_txt"]);

        const getDayName = new Intl.DateTimeFormat("en-US", {
          weekday: "short",
        }).format(date);
        createElement("p", "day-name", "", getDayName, dayRow),
          // img
          createImage(
            "forecast-img",
            `https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`,
            element.weather[0].main,
            dayRow
          );
        //temp
        createElement(
          "p",
          "day-temp",
          "",
          `${Math.round(element.main.temp)} °C`,
          dayRow
        );
      });
    });
};
getForecastWeatherData();
