//store API+KEY in variable
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=764dd5634dc2ea4c9de71e7b62436c65

`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=764dd5634dc2ea4c9de71e7b62436c65

`;

//DOM
const text = document.getElementById("text");
const container = document.getElementById("container");
const weather = document.getElementById("weather");
const forecast = document.getElementById("forecast");

//fetch json data from url variable
const weatherData = () => {
  fetch(weatherUrl)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      //collect values from json
      const city = json.name;
      const country = json.sys.country;
      const mainDescription = json.weather[0].main;
      const description = json.weather[0].description;
      const temperature = json.main.temp.toFixed(1); //temp value and round of to one decimal
      const sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      let weatherIcon = ""; //set empty variable for icon

      // statements to check the weather type and set styling colors + city + icon
      if (mainDescription === "Clear") {
        container.style.background = "#f7e9b9";
        container.style.color = "#2a5510";
        document.getElementById(
          "text"
        ).innerHTML = `<h1>Get your sunnies on. ${city} is looking rather great today.</h1>`;
        weatherIcon = "sunglassestest";
      } else if (mainDescription === "Rain") {
        container.style.background = "#bde8fa";
        container.style.color = "#164a68";
        text.innerHTML = `<h1>Don’t forget your umbrella. It’s wet in ${city}today.</h1>`;
        weatherIcon = "umbrellatest";
      } else if (mainDescription === "Clouds") {
        container.style.background = "white";
        container.style.color = "#f47775";
        text.innerHTML = `<h1>Light a fire and get cosy. ${city} is looking grey today.</h1>`;
        weatherIcon = "cloud";
      }

      //innerHTML for weather div
      weather.innerHTML += `
        <div id=${mainDescription.toLowerCase()}>
          <h2>${city}, ${country}</h2>
          <h4>${description} | ${temperature}°c</h4>
          <h4>sunrise: ${sunrise}</h4> 
          <h4>sunset: ${sunset}</h4>
          <img class="weather-icon" src="./icons/${weatherIcon}.png"/>
        </div>
        `;
    });
};

//fetch json data from url (to get 5-day forecast)
const forecastData = () => {
  fetch(forecastUrl)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const filterForecast = json.list.filter((item) =>
        item.dt_txt.includes("12:00")
      ); //filter json to get temperature at (12.00) for every array item 5 days forward
      console.log(filterForecast);
      filterForecast.forEach((day) => {
        const date = new Date(day.dt_txt);
        const days = date.toLocaleDateString("en-US", { weekday: "short" }); //covert dates to weekdays

        //innerHTML to show days + temp
        forecast.innerHTML += `
        <div id="forecast-list">
        <p>${days}</p>
        <p>${day.main.temp.toFixed(1)}°</p></div>`;
      });
    });
};

//calling on functions to run
forecastData();

weatherData();
