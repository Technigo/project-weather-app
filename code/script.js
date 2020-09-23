const url1 =
  "https://api.openweathermap.org/data/2.5/weather?q=Barcelona,Spain&units=metric&APPID=65baa001e8c7b91e12c081e5f04cb9a6";
const url2 =
  "http://api.openweathermap.org/data/2.5/forecast?q=Barcelona,Spain&units=metric&APPID=65baa001e8c7b91e12c081e5f04cb9a6";

//variables that will be used to display the results in html
//const weatherNow = document.getElementById("description");
//const degreesNow = document.getElementById("degrees");
//const sunriseTimeToday = document.getElementById("sunrise");
//const sunsetTimeToday = document.getElementById("sunset");
//const city = document.getElementById("cityName");
const icon = document.getElementById("icon");
const weatherMessage = document.getElementById("message");

//function that fetches the weather information at the moment
const fetchWeather = () => {
  fetch(url1)
    .then((response) => {
      return response.json();
    })
    .then((weatherDoc) => {
      //weather conditions description at the moment
      document.getElementById("description").innerHTML =
        weatherDoc.weather[0].description;
      //information on degreees at the moment
      document.getElementById("degrees").innerHTML = Math.round(
        weatherDoc.main.temp
      );

      //console.log(weatherDoc);
      //sunrise time in the city
      const sunrise = () => {
        const newSunrise = new Date(weatherDoc.sys.sunrise * 1000);
        const sunriseTime = newSunrise.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        document.getElementById("sunrise").innerHTML = sunriseTime;
      };
      sunrise();
      //sunset time in the city
      const sunset = () => {
        const newSunset = new Date(weatherDoc.sys.sunset * 1000);
        const sunsetTime = newSunset.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        document.getElementById("sunset").innerHTML = sunsetTime;
      };
      sunset();
      //city name
      document.getElementById("cityName").innerHTML = weatherDoc.name;
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
      //function to populate the main container
      filteredForecast.forEach((day) => {
        //console.log(day);
        const dayFromData = new Date(day.dt_txt);
        //const options = { weekday: "short", day: "numeric", month: "short" };
        const theWeekDay = dayFromData.toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
        });
        document.getElementById(
          "weatherByDay"
        ).innerHTML += `<p>${theWeekDay}....................${Math.round(
          day.main.temp
        )}ºC</p>`;
      });
    });
};
fetchWeatherForecast();

//${day.main.humidity}%
//${Math.round(day.main.feels_like)}
