const header = document.getElementById("header");
const headerList = document.getElementById("header-list");
const conditionTemp = document.getElementById("condition-temp");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const message = document.getElementById("message");
const messageImg = document.getElementById("message-img");
const messageText = document.getElementById("message-text");
const forecast = document.getElementById("forecast");
const day = document.getElementById("day");
const containerClass = document.querySelector(".container");
const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

let units = "metric";
let apiKey = "5cdf47ce276dd7dd42146ec93c23e3a6";
let apiEndpointWeather =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden";
let apiEndpointForecast =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden";
let apiUrlWeather = `${apiEndpointWeather}&appid=${apiKey}&units=${units}`;
let apiUrlForecast = `${apiEndpointForecast}&appid=${apiKey}&units=${units}`;

containerClass.classList.remove("container-cloudy");
containerClass.classList.remove("container-clear");
containerClass.classList.remove("container-rainy");

//A function that shows different messages, depending on the weather
const showMessage = (weather, city) => {
  console.log(weather);
  if (weather === "Snow") {
    messageImg.innerHTML = `<img src="./images/snow.png" alt="snow-cloud">`;
    messageText.innerHTML = `<h2>Put on a warm coat. It's snowing in ${city} today.</h2>`;
    containerClass.classList.add("container-cloudy");
  } else if (weather === "Clouds") {
    messageImg.innerHTML = `<img src="./images/cloud.svg" alt="Cloud">`;
    messageText.innerHTML = `<h2>Light a fire and get cosy. ${city} is looking grey today.</h2>`;
    containerClass.classList.add("container-cloudy");
  } else if (weather === "Clear") {
    messageImg.innerHTML = `<img src="./images/sunglasses.svg" alt="Sunglasses">`;
    messageText.innerHTML = `<h2>Get your sunnies on. ${city} is looking rather great today.</h2>`;
    containerClass.classList.add("container-clear");
  } else if (weather === "Rain") {
    messageImg.innerHTML = `<img src="./images/umbrella.svg" alt="Umbrella">`;
    messageText.innerHTML = `<h2>Don't forget your umbrella. It's wet in ${city} today.</h2>`;
    containerClass.classList.add("container-rainy");
  } else {
    messageImg.innerHTML = `<img src="./images/sun-cloud.png" alt="Sun and cloud">`;
    messageText.innerHTML = `<h2>Remember, ${city}: No such thing as bad weather, only bad clothing.</h2>`;
  }
};

const fetchWeatherData = () => {
  fetch(`${apiUrlWeather}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      //Header (w. description, current temp, time for sunrise/sunset)
      conditionTemp.innerHTML = `

      ${json.weather[0].description} | ${Math.round(json.main.temp)}°c

      `;
      let sunriseTime = new Date(json.sys.sunrise * 1000);
      sunrise.innerHTML = `
      Sunrise: ${sunriseTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
      `;
      let sunsetTime = new Date(json.sys.sunset * 1000);
      sunset.innerHTML = `
      Sunset: ${sunsetTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
      `;
      //Test override weather condition
      // json.weather[0].main = "Clear";

      //Message: Image and personalised message, depending on the weather.
      showMessage(`${json.weather[0].main}`, `${json.name}`);
    });

  //Forecast
  fetch(`${apiUrlForecast}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      //Filters the response to an array for each day (five days). Data from 12:00 o'clock each day.
      const filteredForecast = json.list.filter((item) =>
        item.dt_txt.includes("12:00")
      );
      day.innerHTML = "";

      filteredForecast.map((forecastDay) => {
        let weekday = new Date(forecastDay.dt_txt).getDay();
        day.innerHTML += `
    <div id="forecastSection" class="forecast-section">
      <div id="weekdaySection" class="weekday-section">
      <h3>${weekdays[weekday]}</h3>
      </div>
      <div id="temperature" class="temperature">
           <h3>${forecastDay.main.temp.toFixed(0)}°</h3>
           </div>
    
    `;
      });
    });
};
fetchWeatherData();
