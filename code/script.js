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
  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  console.log(latitude, longitude);
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

// current weather details
const getCurrentWeatherData = (latitude, longitude) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=f60c361b4571fb70c85f29bbd856c13f`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      createElement(
        "h1",
        "temperature",
        "temperature",
        `${data.main.temp} °C`,
        currentWeather
      );
      createElement("div", "city", "city", data.name, currentWeather);
      createElement(
        "h2",
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
    });
};
getCurrentWeatherData();

//forecast
const getForecastWeatherData = (latitude, longitude) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=f60c361b4571fb70c85f29bbd856c13f`;
  fetch(url)
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
          createImage(
            "forecast-img",
            `http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`,
            element.weather[0].main,
            objectElement
          );
        //temp
        const averageTemp =
          (element.main["temp_max"] + element.main["temp_min"]) / 2;
        createElement("p", "", "", `${averageTemp} °C`, objectElement);
      });
    });
};
getForecastWeatherData();
