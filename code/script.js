const API_KEY = "65baa001e8c7b91e12c081e5f04cb9a6";

//this function helps to pass city name as the value to both fetches
const selectFunction = (event) => {
  fetchWeather(event.target.value);
  //document.getElementById("weatherByDay").innerHTML = "";
  fetchWeatherForecast(event.target.value);
};

//function that fetches the weather information at the moment
const fetchWeather = (city) => {
  const API_URL1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`;
  fetch(API_URL1)
    .then((response) => response.json())
    .then((weatherDoc) => {
      //weather conditions description at the moment
      document.getElementById("description").innerHTML =
        weatherDoc.weather[0].description;
      //degreees at the moment
      document.getElementById("degrees").innerHTML = Math.round(
        weatherDoc.main.temp
      );
      //sunrise time in the city
      const sunrise = () => {
        const newSunrise = new Date(weatherDoc.sys.sunrise * 1000);
        const sunriseTime = newSunrise.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
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
          hour12: false,
        });
        document.getElementById("sunset").innerHTML = sunsetTime;
      };
      sunset();
      //if statement to change the main icon, the text of the message, the background and font colors according to the weather conditions
      const weatherConditions = weatherDoc.weather[0].main;
      if (weatherConditions === "Clear" || weatherConditions === "Sunny") {
        document.getElementById("icon").src =
          "./images/noun_Sunglasses_2055147.svg";
        document.getElementById("weatherComment").innerHTML =
          "Get your sunnies on. The weather is looking great today";
        document.body.style.background = "#F7E9B9";
        document.body.style.color = "#2A5510";
      } else if (
        weatherConditions === "Rain" ||
        weatherConditions === "Thunderstorm"
      ) {
        document.getElementById("icon").src =
          "./images/noun_Umbrella_2030530.svg";
        document.getElementById("weatherComment").innerHTML =
          "Don't forget your umbrella, it is rainy today";
        document.body.style.background = "#A3DEF7";
        document.body.style.color = "#164A68";
      } else {
        document.getElementById("icon").src = "./images/noun_Cloud_1188486.svg";
        document.getElementById("weatherComment").innerHTML =
          "Light a fire and get cozy, looks like the sky is grey today";
        document.body.style.background = "#F4F7F8";
        document.body.style.color = "#F47775";
      }
      //city name
      document.getElementById("cityName").innerHTML = weatherDoc.name;
    });
};
fetchWeather("Stockholm");

//function that fetches the weather from the second weather forecast url
const fetchWeatherForecast = (city) => {
  const API_URL2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${API_KEY}`;
  fetch(API_URL2)
    .then((response) => response.json())
    .then((json) => {
      //filter data and get the array that includes only extracted data for 12:00pm each day
      const filteredForecast = json.list.filter((item) =>
        item.dt_txt.includes("12:00")
      );

      //function to populate the main container
      filteredForecast.forEach((item) => {
        const dayFromData = new Date(item.dt_txt);
        const theWeekDay = dayFromData.toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
        });
        // function for changing icons in each day
        const showSmallIcon = () => {
          const conditions = item.weather[0].main;
          if (conditions === "Clear") {
            return "./images/sun.png";
          } else if (conditions === "Rain") {
            return "./images/umbrella.png";
          } else {
            return "./images/clouds.png";
          }
        };

        document.getElementById(
          "forecastDay"
        ).innerHTML += `<p>${theWeekDay}</p>`;
        document.getElementById(
          "forecastIcons"
        ).innerHTML += `<img class="little-icons" src=${showSmallIcon()}>`;
        document.getElementById("forecastTemp").innerHTML += `<p>${Math.round(
          item.main.temp
        )}°C</p>`;
      });
    });
};
fetchWeatherForecast("Stockholm");
