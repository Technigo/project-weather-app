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

// define a variable here..
let city = "Stockholm";
const todayWeather = (city) => {
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
      sunriseText.innerText = `${sunriseTime}`;
      sunsetText.innerText = `${sunsetTime}`;

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
    })

    .catch((error) => {
      console.log("caught error", error);
    });
};

todayWeather();

// create a search function for storing the user input from the search bar
const searchInputCity = () => {
  //fetch input value from user input
  let searchCity = inputField.value;
  todayWeather(searchCity);

  searchCity = "";
};

// start here
todayWeather(`${city}`);

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
