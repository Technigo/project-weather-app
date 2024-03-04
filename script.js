const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=bogo,&units=metric&APPID=764dd5634dc2ea4c9de71e7b62436c65

`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=764dd5634dc2ea4c9de71e7b62436c65

`;

// Stockholm
// const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=764dd5634dc2ea4c9de71e7b62436c65`;
// const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=764dd5634dc2ea4c9de71e7b62436c65`;

const container = document.getElementById("container");
const weather = document.getElementById("weather");
const forecast = document.getElementById("forecast");

//fetch json data from url variable
const weatherData = () => {
  fetch(weatherUrl)
    .then((response) => {
      return response.json();
    })
    .then(
      (json) => {
        // This works!!
        // console.log(json);

        //DOM values from json
        const city = json.name;
        const country = json.sys.country;
        const mainDescription = json.weather[0].main;
        const description = json.weather[0].description;
        const temperature = json.main.temp.toFixed(1);

        const sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        );
        const sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        let weatherIcon = "";

        // Check the weather type and set theme colors
        
        if (mainDescription === "Clear") {
          container.style.background = "#f7e9b9";
          container.style.color = "#2a5510";
          weatherIcon = "sunglassestest";
        } else if (mainDescription === "Rain") {
          container.style.background = "#bde8fa" 
          container.style.color = "#164a68";
          weatherIcon = "umbrellatest";
        } else if (mainDescription === "Clouds") {
          container.style.background = "white"; 
          container.style.color = "#f47775";
          weatherIcon = "cloud";
        }



        weather.innerHTML += `
        <div id=${mainDescription.toLowerCase()}>
          <h2>${city}, ${country}</h2>
          <h4>${description} | ${temperature}°c</h4>
          <h4>sunrise: ${sunrise}</h4> 
          <h4>sunset: ${sunset}</h4>
          <img class="weather-icon" src="./design/icons/${weatherIcon}.png"/>
          <h1>Get your sunnies on. ${city} is looking rather great today.</h1>
        </div>
        `;

      
       
        //function to display todays weather from description value
        //  if (mainDescription === "Clear") {
        //    container.innerHTML += `
        //    <div id="clear">
        //    <h2>${city}, ${country}</h2>
        //    <h4>${description} | ${temperature}°c</h4>
        //    <h4>sunrise: ${sunrise}</h4>
        //    <h4>sunset: ${sunset}</h4>
        //    <img class="weather-icon" src="./design/icons/sunglassestest.png"/>
        //    <h1>Get your sunnies on. ${city} is looking rather great today.</h1></div>`
        //  }
        //   else if (mainDescription === "Rain") {
        //   container.innerHTML +=`
        //   <div id ="rain">
        //   <h2>${city}, ${country}</h2>
        //   <h4>${description} | ${temperature}°</h4>
        //   <h4>sunrise: ${sunrise}</h4>
        //   <h4>sunset: ${sunset}</h4>
        //   <img class="weather-icon" src="./design/icons/umbrellatest.png"/>
        //   <h1>Don’t forget your umbrella. It’s wet in ${city}today.</h1></div>`
        //  }
        //   else if (mainDescription === "Clouds") {
        //    container.innerHTML += `
        //    <div id ="cloud">
        //    <h2>${city}, ${country}</h2>
        //    <h4>${description} | ${temperature}°c</h4>
        //    <h4>sunrise: ${sunrise}</h4>
        //    <h4>sunset: ${sunset}</h4>
        //    <img class="weather-icon" src="./design/icons/cloud.png"/> <h1>Light a fire and get cosy. ${city} is looking grey today.</h1></div>
        //    `
      }
      //}
    );
};
//call on function weatherData
weatherData();

//function to display 5-day forecast

const forecastData = () => {
  fetch(forecastUrl)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      //console.log(json)
      const filterForecast = json.list.filter((item) =>
        item.dt_txt.includes("12:00")
      );
      console.log(filterForecast);

      filterForecast.forEach((day) => {
        const date = new Date(day.dt_txt);
        const days = date.toLocaleDateString("en-US", { weekday: "short" });
        forecast.innerHTML += `
        <p>${days}</p>
        <p>${day.main.temp.toFixed(1)}</p>`;
        //console.log(days)
      });

      // filterForecast.map((forecast)=> {
      //   console.log(forecast)
      //   forecast.innerHTML += `
      //   <p> </p>`
      // })
    });
};

forecastData();
