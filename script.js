const todayWeather = () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=stockholm,sweden&units=metric&APPID=aa3656bfb4f1c6ee11a76a4ba390afe7"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const city = data.name; //Stockholm
      const weather = data.weather[0].description; //Clouds
      const temp = Math.round(data.main.temp * 10) / 10; //the temperature data to one decimal point, *100)/100 two decimal point
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
    })
    .catch((error) => {
      console.log("caught error", error);
    });
};

todayWeather();
