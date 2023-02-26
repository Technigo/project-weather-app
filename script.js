const sunrise = document.getElementById("sunrise");
const fiveDaysForecast = document.getElementById("fiveDaysForecast");
const sunriseTime = document.getElementById("sunrise-time");
const sunsetTime = document.getElementById("sunset-time");
const weatherContainer = document.getElementById("weatherDescription");

//making the API to a variable instead to make the code easier to read
const API_today =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=2ef247d63e3f61c687ac388e3ba2cd9e";
const API_forecast =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=2ef247d63e3f61c687ac388e3ba2cd9e";

//Baka in API i en const
fetch(API_today)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);

    let round = Math.round(json.main.temp * 10) / 10;
    console.log(round);

    console.log(json.weather[0].description);
    sunrise.innerHTML += `<p>Temp ${round} °C  |  ${json.weather[0].description}</p>`;
  });

//Variable allowing Stockholm to be the city.
let city = `Stockholm`;

//Function fetching the information from the API.
const getSunData = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=2ef247d63e3f61c687ac388e3ba2cd9e`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      //Unix timestamp.
      const sunriseTime = new Date(json.sys.sunrise * 1000); //Gives readable numbers
      const sunriseShort = sunriseTime.toLocaleTimeString([], {
        timeStyle: "short",
      });
      const sunsetTime = new Date(json.sys.sunset * 1000);
      const sunsetShort = sunsetTime.toLocaleTimeString([], {
        timeStyle: "short",
      });

      //HTML modifier.
      sunriseText.innerHTML += `<p class="time-data">Sunrise ${sunriseShort}</p>`;
      sunsetText.innerHTML += `<p class="time-data">Sunset ${sunsetShort}</p>`;
    })
    //Collecting errors.
    .catch((err) => {
      console.log(`error caught:`, err);
    });
};
//Invoke function.
getSunData();


//Weather description of today 
const change = (json) => {
  if (json.weather[0].main === "Clouds") {
    weatherContainer.innerHTML = `
      <img src="/Designs/Design-2/icons/noun_Cloud_1188486.svg" alt="cloud"/>
      <h1>Light a fire and get cosy. ${json.name} is looking grey today.</h1>
    `;
    document.body.style.backgroundColor = "#F4F7F8";
    document.body.style.color = "#F47775";
  } else if (json.weather[0].main === "Rain") {
    weatherContainer.innerHTML = `
      <img src="/Designs/Design-2/icons/noun_Umbrella_1188485.svg" alt="umbrella"/>
      <h1>Don't forget your umbrella. It's wet in ${json.name} today.</h1>
    `;
    document.body.style.backgroundColor = "#A3DEF7";
    document.body.style.color = "#164A68";
  } else if (json.weather[0].main === "Sunny") {
    weatherContainer.innerHTML = `
      <img src="/Designs/Design-2/icons/noun_Sunglasses_2055147.svg" alt="sunglasses"/>
      <h1>Get your sunnies on. ${json.name} is looking rather great today.</h1>
    `;
    document.body.style.backgroundColor = "#F7E9B9";
    document.body.style.color = "#2A5510";
  } else {
    weatherContainer.innerHTML = `    
        <h1> Nothing exceptional with the weather in ${json.name} right now 🤷</h1>`;
      document.body.style.backgroundColor = "#f8ede5";
      document.body.style.color = "#616667";
  }
};

fetch(API_today)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    change(json);
  })
  .catch((err) => {
    console.log(`error caught:`, err);
  });


//Weather in Stockholm for five days
const fiveDayForecast = () => {
  fetch(API_forecast) //fetch the forecast-api
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const filterForecast = data.list.filter(
        (item) => item.dt_txt.includes("12:00") //only the data from 12:00 each day
      );

      filterForecast.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const weatherTemperature = item.main.temp.toFixed(1); //1 decimal number

        fiveDaysForecast.innerHTML += `
          <div class="week-days"> 
            <p>${new Date(date).toLocaleDateString("en", {
              weekday: "long", //Short = prints only the first three letters of the days. Fri for Friday.
            })}
            </p>
            <p>${weatherTemperature}°</p> 
          </div>
    `;
      });
    });
};
fiveDayForecast();//Invoke function
