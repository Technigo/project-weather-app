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
//const icon = document.getElementById("icon");
//const weatherMessage = document.getElementById("message");

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

      console.log(weatherDoc);
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
      if (weatherConditions === "Clouds") {
        document.getElementById("icon").src = "./images/noun_Cloud_1188486.svg";
        document.getElementById("weatherComment").innerHTML =
          "Light a fire and get cozy, looks like the sky is grey today";
        document.body.style.background = "#F4F7F8";
        document.body.style.color = "#F47775";
      } else if (weatherConditions === "Rain") {
        document.getElementById("icon").src =
          "./images/noun_Umbrella_2030530.svg";
        document.getElementById("weatherComment").innerHTML =
          "Don't forget your umbrella, it is rainy today";
        document.body.style.background = "#A3DEF7";
        document.body.style.color = "#164A68";
      } else {
        document.getElementById("icon").src =
          "./images/noun_Sunglasses_2055147.svg";
        document.getElementById("weatherComment").innerHTML =
          "Get your sunnies on. The weather is looking great today";
        document.body.style.background = "#F7E9B9";
        document.body.style.color = "#2A5510";
      }
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
      //console.log(filteredForecast);
      //function to populate the main container
      filteredForecast.forEach((day) => {
        document.getElementById("weatherByDay").innerHTML += showWeatherByDay(
          day
        );
      });
    });
};

const showWeatherByDay = (day) => {
  const dayFromData = new Date(day.dt_txt);
  const theWeekDay = dayFromData.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  // function for changing icons in each day

  // const conditions = day.weather[0].main;
  // const whichIconToShow = () => {
  // if (conditions === "Clear") {
  //   ("./images/sun.png");
  //   } else if (conditions === "Rain"){
  //     ("./images/umbrella.png");
  //   } else {
  // ("./images/clouds.png");
  // };

  // console.log(whichIconToShow());

  //<img src="${whichIconToShow}"

  return `<p>${theWeekDay}....................${Math.round(
    day.main.temp
  )}ºC</p>`;
};
fetchWeatherForecast();
//${day.main.humidity}%
//${Math.round(day.main.feels_like)}
