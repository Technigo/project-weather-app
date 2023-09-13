const mainContainer = document.getElementById("main-container");
const cityName = document.getElementById("city-name");
const weatherDescription = document.getElementById("descriptionWeather");
const mainTemp = document.getElementById("mainTemp");
const sunriseText = document.getElementById("sunrise");
const sunsetText = document.getElementById("sunset");
const topBackground = document.getElementById("topBackground");
const weatherImage = document.getElementById("weatherImage");
console.log(weatherImage);
// define a variable here
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
