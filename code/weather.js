const fetchWeather = () => {
  return fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7d01b328e34c450986cb7faef032a771`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      //console.log(json.name);
      //console.log(json.main.temp);
      //const roundedWeather = Math.round(json.main.temp * 10) / 10;
      //console.log(roundedWeather);
      //console.log(json.weather[0].description);
      sthlmWeather(json);
      //return json;
    });
};

const sthlmWeather = (weather) => {
    console.log(weather.main.temp);
    document.getElementById("sthlm").innerHTML += `${weather.main.temp}`
    //console.log(new Date(weather.sys.sunrise * 1000));
    const sunrise = new Date(weather.sys.sunrise * 1000);
    const sunset = new Date(weather.sys.sunset * 1000);
    console.log((new Date(weather.sys.sunset * 1000)).getMinutes());
    document.getElementById("sthlm").innerHTML += `<p>Sunrise: ${(sunrise.getHours()) <= 9 ? `0`:``}${sunrise.getHours()}:${sunrise.getMinutes()}</p>`
    document.getElementById("sthlm").innerHTML += `<p>Sunset: ${(sunset.getHours()) <= 9 ? `0`:``}${sunset.getHours()}:${sunset.getMinutes()}</p>`
    //console.log(sunrise.getHours());
}

/*let sthlmWeather = fetchWeather().then((weather) => {
  // This will be executed later, after the results are received from the server
  sthlmWeather = weather;
  let sunriseSthlm = new Date(sthlmWeather.sys.sunrise);
  console.log(sunriseSthlm.getHours())
  document.getElementById("sthlm").innerHTML += `${sthlmWeather.main.temp}`
});*/

//setTimeout(((console.log(sthlmWeather.main)), 2000));

//document.getElementById("sthlm").innerHTML += `${sthlmWeather.main.temp}`
