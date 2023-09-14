// all DOM document here...
const mainContainer = document.getElementById("main-container");
const cityName = document.getElementById("city-name");
const weatherDescription = document.getElementById("descriptionWeather");
const mainTemp = document.getElementById("mainTemp");
const sunriseText = document.getElementById("sunrise");
const sunsetText = document.getElementById("sunset");
const topBackground = document.getElementById("topBackground");
const weatherImage = document.getElementById("weatherImage");
const nav = document.querySelector(".nav");
const inputField = document.querySelector(".input-field");
const searchBtn = document.querySelector(".searchBtn");
// define a variable here..
let city = "Stockholm";
const todayWeather = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=aa3656bfb4f1c6ee11a76a4ba390afe7`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const city = data.name; //city name
      cityName.innerText = `${city}`;
      const weather = data.weather[0].description; //Clouds
      weatherDescription.innerText = `${weather}`;
      const temp = Math.round(data.main.temp * 10) / 10; //the temperature data to one decimal point, *100)/100 two decimal point
      mainTemp.innerText = `${temp.toFixed(0)}`;
      //Declare variable for the time of sunrise/sunset
      const unixSunrise = data.sys.sunrise;
      const unixSunset = data.sys.sunset;
      //To get sunrise/sunset time in hours:minutes:seconds
      const sunrise = new Date(unixSunrise * 1000);
      const sunset = new Date(unixSunset * 1000);
      //Declare new variable to show only hh:mm
      const sunriseTime = sunrise.toLocaleTimeString([], {
        timeStyle: "short",
      });
      const sunsetTime = sunset.toLocaleTimeString([], {
        timeStyle: "short",
      });
      // print out the result
      console.log(sunriseTime);
      console.log(sunsetTime);
      sunriseText.innerText = `${sunriseTime}`;
      sunsetText.innerText = `${sunsetTime}`;
      // future warm or cold image here
      const currentTemp = temp.toFixed(0);
      console.log(currentTemp);
      if (currentTemp <= "10") {
        weatherImage.src = "./asserts/cold.jpg";
      } else {
        weatherImage.src = "./asserts/warm.jpg";
      }
    })
    .catch((error) => {
      console.log("caught error", error);
    });
};
todayWeather();
// add event listner here
// control toggling between open and close the search field
searchBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
  inputField.focus();
});

// 5 day Forecast
const weatherForecastDiv = document.getElementById("weatherForecastDiv");

const weatherForecast = (city) => {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=aa3656bfb4f1c6ee11a76a4ba390afe7`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("all the data: ", data);
      const filteredListAtNoon = data.list.filter((forecast) =>
        forecast.dt_txt.includes("12:00:00")
      );
      forecastDay(filteredListAtNoon);
    })
    .catch((error) => {
      console.log("caught error", error);
    });
};

const currentDate = new Date();  // JavaScript Date object representing the current date and time.
const forecastDay = (filteredListAtNoon) => {

  filteredListAtNoon.forEach((day) => {
    const options = { weekday: "short" };
    const dayDate = new Date(day.dt * 1000); //Data from API. Day is the [number] in the datalist)
  
    // For each forecasted day, the function checks if the date from the API data is greater than the current date. If it is, it means it's a future day, and the weekDay is displayed.
    // If the API date and the current date are the same, the code will skip displaying that day's forecast.
    if (dayDate.getDate() > currentDate.getDate()) { 
      const weekDay = dayDate.toLocaleDateString("en-UK", options);
      updateWeatherContent(day, weekDay);
    }
  });
};

const updateWeatherContent = (day, weekDay) => {
  const temp = Math.round(parseInt(day.main.temp));
  const windSpeed = (Math.round(parseFloat(day.wind.speed) * 10) / 10).toFixed(1); // makes sure it's always one decimal displaying. If toFixed is not used, if the wind speed is an integer like 5.0 m/s only 5 will be shown.
  const weatherIcon = day.weather[0].icon;

  weatherForecastDiv.innerHTML += `
  <table class="forecastTable">
  <tr class="forecastTableRow">
  <td class="day" id="day">${weekDay}</td>
  <td id="icon_5days"><img id="forecastImg" src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="weather icon"></td>
  <td class="temp">${temp} °C</td>
  <td class="wind">${windSpeed} m/s</td>
  </tr>
  </table>
`;
}
weatherForecast(city);