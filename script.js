const sunrise = document.getElementById("sunrise");
const sunriseTime = document.getElementById('sunrise-time');
const sunsetTime = document.getElementById('sunset-time');

//making the API to a variable instead to make the code easier to read
const API_today =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=2ef247d63e3f61c687ac388e3ba2cd9e";
//const API_forecast = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=2ef247d63e3f61c687ac388e3ba2cd9e";

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

    sunrise.innerHTML += `<p>City: ${json.name}</p>`;
    sunrise.innerHTML += `<p>Temperature: ${round} °C</p>`;
    sunrise.innerHTML += `<p>Weather: ${json.weather[0].description}</p>`;
  });


//Variable allowing Stockholm to be the city.
let city = `Stockholm`;

//Function fetching the information from the API.
const getSunData = () => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=2ef247d63e3f61c687ac388e3ba2cd9e`)
      .then((response) => {
          return response.json()
      })
      .then((json) => {
          

          //Unix timestamp.
          const sunriseTime = new Date(json.sys.sunrise * 1000);       //Gives readable numbers
          const sunriseShort = sunriseTime.toLocaleTimeString([], { timeStyle: 'short' });  
          const sunsetTime = new Date(json.sys.sunset * 1000);
          const sunsetShort = sunsetTime.toLocaleTimeString([], { timeStyle: 'short' });      

          //HTML modifier.
          sunriseText.innerHTML += `<p>Sunrise</p>
                                      <p class="time-data">${sunriseShort}</p>`;
          sunsetText.innerHTML += `<p>Sunset</p>
                                  <p class="time-data">${sunsetShort}</p>`;
      })
      //Collecting errors.
      .catch((err) => {
          console.log(`error caught:`, err)
      })
}
//Invoke function.
getSunData();
