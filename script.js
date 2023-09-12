const todayWeather = () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=stockholm,sweden&units=metric&APPID=aa3656bfb4f1c6ee11a76a4ba390afe7"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const city = data.name;
      console.log(city); //Stockholm
      const weather = data.weather[0].description;
      console.log(weather); //Clouds
      const temp = Math.round(data.main.temp * 10) / 10;
      console.log(temp);
    })
    .catch((error) => {
      console.log("caught error", error);
    });
};

todayWeather();
