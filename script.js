const city = document.getElementById("city");
const weather = document.getElementById("typeOfWeather");
const temperature = document.getElementById("temperature");

const API_KEY = "64856650e6321cbb411769554b46b8ad";
// Reserve API KEY = "421db630ea3e3aeb0cb64db6a500c27b"

const url =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID";

const API_CALL = `${url}=${API_KEY}`;

// fetch(`${API_CALL}`)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//     city.innerHTML = `${data.name}`;
//     weather.innerHTML = `${data.weather[0].description}`;
//     temperature.innerHTML = `${data.main.temp}`;
//   });

const forecast = () => {
  let cityName = "Tokyo";

  //Functionality for searching for a specific city's weather
  /* --------------------------------------------------
    const citySearch = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
         --------------------------------------------------*/
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      const localTimeZone = data.city.timezone;
      console.log(data);
      let lat = data.city.coord.lat;
      let lon = data.city.coord.lon;
      const part = "current,minutely,hourly,alerts";
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&cnt=6&exclude=${part}&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          let localTime = new Date((data.daily.dt + localTimeZone) * 1000);
          console.log(data);
          // console.log(localTime);
          // console.log(`The coming week's weather in ${cityName}:`);
          //working display of daily dates
          data.daily.forEach((day) => {
            let converted = new Date(day.dt * 1000);
            let dayMax = day.temp.max.toFixed(0);
            let dayMin = day.temp.min.toFixed(0);
            let weekday = converted.toUTCString().substring(0, 3);
            // console.log(converted.toUTCString());
            // console.log(`${weekday} ${dayMax}°C / ${dayMin}°C`);
          });
        });
    });
};
forecast();
// .throw((error) => console.log(error));
//.toFixed(1)
