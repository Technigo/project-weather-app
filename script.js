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
const switchBtn = document.getElementById("switch");
const loader = document.getElementById("loader");
const container = document.querySelector(".container");
const weatherForecastDiv = document.getElementById("weatherForecastDiv");
const currentTimeHeader = document.getElementById("currentTimeHeader");

// define a variable here....
let city = "Stockholm";
// show loading()
const loading = () => {
  loader.hidden = false;
  container.hidden = true;
};

// hide loading()
const complete = () => {
  loader.hidden = true;
  container.hidden = false;
};
// create today weather function, Stockholm as the initial value
const todayWeather = (city) => {
  loading();
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=aa3656bfb4f1c6ee11a76a4ba390afe7`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      complete();
      const city = String(data.name); //city name
      // console.log(typeof city);
      // console.log(city);
      if (city === "undefined") {
        alert(`Please type the correct city name! 😁 This image will refresh`);
        // todayWeather("Stockholm");
        weatherForecast("Stockholm");
      } else {
        cityName.innerText = `${city}`;

        const weather = data.weather[0].description;
        // weather Icon
        const weatherIcon = data.weather[0].icon;
        weatherDescription.innerText = `${weather}`;
        weatherDescription.innerHTML += `<img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png " class="weatherIcon"/>`;
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
        sunriseText.innerHTML = `<p>sunrise ${sunriseTime}</p>`;
        sunsetText.innerHTML = `<p>sunset ${sunsetTime}</p>`;
        // background change based on the weather
        const weatherMain = data.weather[0].main;
        if (weatherMain === "Clouds") {
          weatherImage.src = "./asserts/clouds.jpg";
          switchBtn.style.backgroundColor = "rgb(117, 172, 220)";
        } else if (weatherMain === "Clear") {
          weatherImage.src = "./asserts/clear.jpg";
          switchBtn.style.backgroundColor = "rgb(66, 108, 245)";
        } else if (weatherMain === "Rain") {
          weatherImage.src = "./asserts/rain.jpg";
          switchBtn.style.backgroundColor = "rgb(26, 50, 49)";
        } else if (weatherMain === "Snow") {
          weatherImage.src = "./asserts/snow.jpg";
          switchBtn.style.backgroundColor = "rgb(87, 85, 85)";
        } else {
          weatherImage.src = "./asserts/sun.jpg";
          switchBtn.style.backgroundColor = "rgb(232, 113, 63)";
        }
      }
    })
    .catch((error) => {
      console.log("caught error", error);
    });
};

// Show current time with leading zeros for hours and minutes
const currentHour = new Date().getHours();
const currentMinutes = new Date().getMinutes();
// Function to add leading zeros
const addLeadingZero = (number) =>
  number < 10 ? "0" + number : number.toString();

const currentTime =
  addLeadingZero(currentHour) + ":" + addLeadingZero(currentMinutes);

currentTimeHeader.innerText = `Time: ${currentTime}`;
console.log(currentTime);

// create a search function for storing the user input from the search bar
const searchInputCity = () => {
  weatherForecastDiv.innerHTML = "";
  //fetch input value from user input
  let searchCity = inputField.value;
  console.log(searchCity);
  todayWeather(searchCity);
  weatherForecast(searchCity);

  //clear data from user input
  searchCity = "";
};
// create the favorite city when click the switch button
const switchFavoriteCity = () => {
  weatherForecastDiv.innerHTML = "";
  if (city === "Stockholm") {
    todayWeather("London");
    weatherForecast("London");
    city = "London";
  } else if (city === "London") {
    todayWeather("Berlin");
    weatherForecast("Berlin");
    city = "Berlin";
  } else if (city === "Berlin") {
    todayWeather("Kyoto");
    weatherForecast("Kyoto");
    city = "Kyoto";
  } else if (city === "Kyoto") {
    todayWeather("Geneva");
    weatherForecast("Geneva");
    city = "Geneva";
  } else if (city === "Geneve") {
    todayWeather("Beijing");
    weatherForecast("Beijing");
    city = "Beijing";
  } else {
    todayWeather("Stockholm");
    weatherForecast("Stockholm");
    city = "Stockholm";
  }
};

// 5 day Forecast
const weatherForecast = (city) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=aa3656bfb4f1c6ee11a76a4ba390afe7`
  )
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

const currentDate = new Date(); // JavaScript Date object representing the current date and time.
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
  const windSpeed = (Math.round(parseFloat(day.wind.speed) * 10) / 10).toFixed(
    1
  ); // makes sure it's always one decimal displaying. If toFixed is not used, if the wind speed is an integer like 5.0 m/s only 5 will be shown.
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
};
// start here
todayWeather("Stockholm");
weatherForecast("Stockholm");

// add event listner here
// control toggling between open and close the search field
searchBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
  inputField.focus();
});

inputField.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    searchInputCity();
  }
});

switchBtn.addEventListener("click", switchFavoriteCity);
