fetch(
  "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f470af9640f5a3ff24b68ba60ee15c10"
)
  //The Json from the API//

  .then(response => {
    return response.json();
  })

  .then(json => {
    const theCity = document.getElementById("city");
    const theTemp = document.getElementById("temp");
    const theWeather = document.getElementById("weather");
    const theSunrise = document.getElementById("sunrise");
    const theSunset = document.getElementById("sunset");

    //Time of Sunrise and Sunset//

    const sunrise = new Date(json.sys.sunrise * 1000);
    const sunset = new Date(json.sys.sunset * 1000);

    const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: "short" });
    const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: "short" });

    //Today's weather//

    theCity.innerHTML = `${json.name}`;
    theTemp.innerHTML = `${json.main.temp.toFixed(1)} &deg;C`;
    theWeather.innerHTML = `${json.weather[0].description}`;
    theSunrise.innerHTML = `<img src="Assets/noun_sunrise_1550440.png" alt="icon" width=\"60px\""></br>${sunriseTime}`;
    theSunset.innerHTML = `<img src="Assets/noun_sunset_1632877.png" alt="icon" width=\"60px\""></br>${sunsetTime}`;
  });
