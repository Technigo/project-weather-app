// API Keys
const API_KEY = "15c9c7801fe68566167373f16cf7590a"
const API = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=15c9c7801fe68566167373f16cf7590a";
const API_FORECAST = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=15c9c7801fe68566167373f16cf7590a"

// DOM
const weather = document.getElementById("weather");
//const city = document.getElementById("city");
const description = document.getElementById("description");
const weatherSummary = document.getElementById("summary-1");
const temperature = document.getElementById("temperature");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const fiveDays = document.getElementById("fiveDays");
const weatherGuidance = document.getElementById("weather-guidance");
const pictureWeather = document.getElementById("weatherImage");
const weatherH1 = document.getElementById("heading1");
const mainSection = document.getElementById("main-section");


// fetch data
fetch (API)
.then((response) => {
 return response.json()
 
})


// show data
.then ((json) => {
  let city = json.name
  //let description = "clear" - Used to check styling for each weather.
  let description = json.weather[0].description
  let temperature = json.main.temp.toFixed(0)
  weatherSummary.innerHTML = `<p>${description} | ${temperature}°C</p>` 
  console.log(json)


//Sunrise  --> from numbers to date
const weatherSunrise = () => {
    const dateSunrise = new Date(json.sys.sunrise * 1000);
    const timeSunrise = dateSunrise.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    sunrise.innerHTML = `<p>Sunrise ${timeSunrise}</p>`;
  };
  weatherSunrise();

//Sunset --> from numbers to date
  const weatherSunset = () => {
    const dateSunset = new Date(json.sys.sunset * 1000);
    const timeSunset = dateSunset.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    sunset.innerHTML = `<p>Sunset ${timeSunset} </p>`;
  };
  weatherSunset();

// main: thunderstorm, drizzle, rain, snow, clear, clouds
if  (description === `clear`) {
  mainSection.classList.add("sunny");
  weatherH1.innerHTML = `Get your sunnies on. ${city} is looking rather great today.`
  pictureWeather.setAttribute(
  "src", 
  "./Designs/Design-2/icons/noun_Sunglasses_2055147.svg"
  );
} else if (description === "thunderstorm" || description === "drizzle" || description === "rain" || description === "snow") {
  mainSection.classList.add("rainy");
  weatherH1.innerHTML = `Don't forget your umbrella. It's wet in ${city} today.`
  pictureWeather.setAttribute(
    "src", 
    "./Designs/Design-2/icons/noun_Umbrella_2030530.svg"
  );
} else {
  mainSection.classList.add("cloudy");
  weatherH1.innerHTML = `Light a fire and get cosy. ${city} is looking grey today.`
  pictureWeather.setAttribute(
    "src", 
    "./Designs/Design-2/icons/noun_Cloud_1188486.svg"
  );
}})

// Five day forecast section
fetch(API_FORECAST)
    .then((response) => {
    return response.json()
   })
   
   .then((fiveForecastjson) => {

// fetch the data from the API. Then if you console.log the json
// you'll see that we only care about the array called list.

const filteredForecast = fiveForecastjson.list.filter(item => item.dt_txt.includes('12:00'))
// filteredForecast is now an array with only the data from 12:00 each day.

const weekdays = [
    "sun",
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
    "sun",
  ];

filteredForecast.forEach((day) => {
    const date = new Date(day.dt_txt);
    let weekdayNumber= date.getDay();
    let roundedTemperature = day.main.temp.toFixed(0)
    //console.log(roundedTemperature);

    fiveDays.innerHTML += ` 
    <div class="daily-forecast"> 
    <p> ${weekdays[weekdayNumber]}</p> 
    <p> ${roundedTemperature}°C </p>
    </div> 
    `;
})
});

// .catch((error) =>
// console.error("There has been a problem with your fetch operation:", error)
// );


