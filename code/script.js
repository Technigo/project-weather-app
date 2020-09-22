const url1 =
  "https://api.openweathermap.org/data/2.5/weather?q=Barcelona,Spain&units=metric&APPID=65baa001e8c7b91e12c081e5f04cb9a6";
const url2 =
  "http://api.openweathermap.org/data/2.5/forecast?q=Barcelona,Spain&units=metric&APPID=65baa001e8c7b91e12c081e5f04cb9a6";

//variables that will be used to display the results in html
const weatherNow = document.getElementById("description");
const degreesNow = document.getElementById("degrees");
const sunriseTime = document.getElementById("sunrise");
const sunsetTime = document.getElementById("sunset");
const city = document.getElementById("cityName");
const icon = document.getElementById("icon");
const weatherMessage = document.getElementById("message");
const container = document.getElementById("main");

//function that fetches the weather information at the moment
const fetchWeather = () => {
  fetch(url1)
    .then((response) => {
      return response.json();
    })
    .then((weatherDoc) => {
      //weather conditions description at the moment
      weatherNow.innerHTML = weatherDoc.weather[0].description;
      //information on degreees at the moment
      degreesNow.innerHTML = Math.round(weatherDoc.main.temp);

      //console.log(weatherDoc);
      //sunrise time in the city
      sunriseTime.innerHTML = weatherDoc.sys.sunrise;
      //sunset time in the city
      sunsetTime.innerHTML = weatherDoc.sys.sunset;
      //city name
      city.innerHTML = weatherDoc.name;
    });
};
fetchWeather();

//function that fetches the weather from the second weather forecast url
const fetchWeatherForecast = () => {
  fetch(url2)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      //filter data and get the array that includes only extracted data for 12:00pm each day
      const filteredForecast = json.list.filter((item) =>
        item.dt_txt.includes("12:00")
      );
      console.log(filteredForecast);
    });
};
fetchWeatherForecast();
