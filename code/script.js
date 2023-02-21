const currentWeather = document.getElementById("current-weather");
const forecast = document.getElementById("forecast");

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

// current weather details
const getCurrentWeatherData = () => {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f60c361b4571fb70c85f29bbd856c13f`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      createElement(
        "div",
        "temperature",
        "temperature",
        data.main.temp,
        currentWeather
      );
      createElement("div", "city", "city", data.name, currentWeather);
      createElement(
        "div",
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
        data.sys.sunrise,
        sunriseSunset
      );
      createElement("div", "sunset", "sunset", data.sys.sunset, sunriseSunset);
    });
};

getCurrentWeatherData();

//forecast
const getForecastWeatherData = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&appid=f60c361b4571fb70c85f29bbd856c13f`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      data.list.forEach((element) => {
        createElement(
          "div",
          "day",
          `day${data.list.indexOf(element)}`,
          "",
          forecast
        );

        let objectElement = document.getElementById(
          `day${data.list.indexOf(element)}`
        );
        //day of the week
        createElement("p", "", "", element["dt_txt"], objectElement);
        // img
        createImage("", "assets/test.png", "test image", objectElement);
        //temp
        createElement("p", "", "", element.main.temp, objectElement);
      });
    });
};

getForecastWeatherData();
