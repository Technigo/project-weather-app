const sunrise = document.getElementById("sunrise");

//making the API to a variable instead to make the code easier to read
const API_today =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=2ef247d63e3f61c687ac388e3ba2cd9e";
// const API_forecast = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=2ef247d63e3f61c687ac388e3ba2cd9e";

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

    sunrise.innerHTML = `<p>City: ${json.name}</p>`;
    sunrise.innerHTML += `<p>Temperature: ${round} °C</p>`;
    sunrise.innerHTML += `<p>Weather: ${json.weather[0].description}</p>`;
  });

//Hannah
