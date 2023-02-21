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
        new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sunriseSunset
      );
      createElement(
        "div",
        "sunset",
        "sunset",
        new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sunriseSunset
      );
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
      const filteredList = data.list.filter((element) => {
        return (
          new Date(element["dt_txt"]).getHours() === 0 &&
          new Date(element["dt_txt"]).getDay() !== new Date(Date.now()).getDay()
        );
      });
      console.log(filteredList);

      filteredList.forEach((element) => {
        createElement(
          "div",
          "day",
          `day${filteredList.indexOf(element)}`,
          "",
          forecast
        );

        let objectElement = document.getElementById(
          `day${filteredList.indexOf(element)}`
        );
        //day of the week
        const date = new Date(element["dt_txt"]);
        const getDayName = new Intl.DateTimeFormat("en-US", {
          weekday: "short",
        }).format(date);

        createElement("p", "", "", getDayName, objectElement),
          // img
          createImage("", "assets/test.png", "test image", objectElement);
        //temp
        createElement(
          "p",
          "",
          "",
          `${element.main["temp_max"]} °C / ${element.main["temp_min"]} °C`,
          objectElement
        );
      });
    });
};

getForecastWeatherData();
