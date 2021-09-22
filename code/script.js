// Object with all emoji
// https://stackoverflow.com/questions/37103988/is-it-possible-to-set-an-image-source-on-a-javascript-object-property
const emojiObject = {
  cloudy: Object.assign(new Image(), {
    src: "/Designs/Design-1/assets/Group16.png",
  }),
};
console.log(emojiObject.cloudy.src);

// /sdfsadfsdf
/****Grid of the Weather App ****/

// Main placeholder for the whole weather app
const wrapperContainer = document.getElementById("wrapper-container");
// https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
// Main container for todays weather forecast
const weatherContainer = document.createElement("section");
// https://developer.mozilla.org/en-US/docs/Web/API/Element/prepend
wrapperContainer.prepend(weatherContainer);
// Assigning a class to HTLM element
weatherContainer.className = "weather-container";
// creating 2 divs to separate the Weather container in half
// upper half div
const upperHalfWeatherContainer = document.createElement("div");
upperHalfWeatherContainer.className = "upper-half-weather-container";
weatherContainer.prepend(upperHalfWeatherContainer);
// lower half div
const lowerHalfWeatherContainer = document.createElement("div");
lowerHalfWeatherContainer.className = "lower-half-weather-container";
weatherContainer.append(lowerHalfWeatherContainer);
// creation of the wrapper for the hamburger and current temperature
const iconsAndCurrentTempWrapper = document.createElement("div");
upperHalfWeatherContainer.prepend(iconsAndCurrentTempWrapper);
iconsAndCurrentTempWrapper.className = "icons-and-current-temp-wrapper";
// creation of the wrapper for the current weather picture
const weatherPictureWrapper = document.createElement("div");
weatherPictureWrapper.className = "current-weather-picture-container";
upperHalfWeatherContainer.append(weatherPictureWrapper);
// creation of sunset/sunrise div
const sunriseAndSunsetWrapper = document.createElement("div");
sunriseAndSunsetWrapper.className = "sunrise-sunset-wrapper";

//  Container for next 5 days weather forecast

const weekdayContainer = document.createElement("section");
// https://developer.mozilla.org/en-US/docs/Web/API/Element/append
wrapperContainer.append(weekdayContainer);
weekdayContainer.className = "weekday-container";

// creation of hamburger div
const hamburger = document.createElement("div");
hamburger.className = "hamburger";
iconsAndCurrentTempWrapper.append(hamburger);

// TEST VARIABLES
let dayWeatherPicture = document.createElement("img");
dayWeatherPicture.src = "/Designs/Design-1/assets/Group36.png";

// ********The generic rendering function for drawing current weather container information *******//
const renderCurrentWeather = (
  currentTemp,
  weatherPic,
  cityname,
  status,
  sunrise,
  sunset
) => {
  // current temp div creation
  const currentTemperature = document.createElement("div");
  currentTemperature.className = "current-temperature";
  iconsAndCurrentTempWrapper.append(currentTemperature);
  // adding dynamic data to the current temperature
  currentTemperature.innerHTML = `${currentTemp}`;

  // creation of the div for the sun/mon picture
  const currentWeatherPicture = document.createElement("div");
  currentWeatherPicture.className = "current-weather-picture";
  weatherPictureWrapper.append(currentWeatherPicture);

  // adding dynamic weather picture
  currentWeatherPicture.append(weatherPic);

  // creation of cityname div
  const cityName = document.createElement("div");
  cityName.className = "city-name";
  // adding dynamic city name data
  cityName.innerHTML = `${cityname}`;

  // creation of weather status div
  const currentWeatherStatus = document.createElement("div");
  currentWeatherStatus.className = "current-weather-status";
  // adding dynamic weather status data
  currentWeatherStatus.innerHTML = `${status}`;

  // creation of inner divs to display sunset and sunrise data
  const sunriseContainer = document.createElement("div");
  const sunsetContainer = document.createElement("div");
  sunriseContainer.className = "sunrise";
  sunsetContainer.className = "sunset";
  // adding dynamic  sunrise/sunset data
  sunriseContainer.innerHTML = `sunrise : ${sunrise}°C`;
  sunsetContainer.innerHTML = `sunset : ${sunset}°C`;

  sunriseAndSunsetWrapper.append(sunriseContainer, sunsetContainer);

  // appending city name , weather status and sunset/sunrise divs to the lower half of the weather container
  lowerHalfWeatherContainer.append(
    cityName,
    currentWeatherStatus,
    sunriseAndSunsetWrapper
  );
};

// ********The generic rendering function for drawing the weakday container information *******//
const renderWeekdayData = (weekday, emoji, tempNight, tempDay) => {
  const weekDayRow = document.createElement("div");
  const weekDay = document.createElement("div");
  const weatherEmoji = document.createElement("div");
  const weekDayTemp = document.createElement("div");
  weekDayRow.className = "weekday-row";
  weekDay.className = "forecast-content";
  weatherEmoji.className = "forecast-content";
  weekDayTemp.className = "forecast-content";
  weekdayContainer.append(weekDayRow);
  weekDayRow.append(weekDay, weatherEmoji, weekDayTemp);
  weekDay.innerHTML = `${weekday}`;
  weatherEmoji.append(emoji);
  weekDayTemp.innerHTML = `${tempNight}°/${tempDay}°C`;
};

renderWeekdayData("monday", emojiObject.cloudy, "12", "25");
renderWeekdayData("tue", "emoji", "12", "25");
renderWeekdayData("mwed", "emoji", "12", "25");
renderWeekdayData("thuers", "emoji", "12", "25");
renderWeekdayData("friday", "emoji", "12", "25");

<<<<<<< HEAD
// const renderAll = (weekday, emoji, temp) => {
//   const weekDayRow = document.createElement("div");
//   const weekDay = document.createElement("div");
//   const weatherEmoji = document.createElement("div");
//   const weekDayTemp = document.createElement("div");
//   weekDayRow.className = "weekday-row";
//   weekdayContainer.append(weekDayRow);
//   weekDayRow.append(weekDay, weatherEmoji, weekDayTemp);
//   assignWeekDay(weekDay, weekday);
//   assignWeatherEmoji(weatherEmoji, emoji);
//   assignWeekDayTemp(weekDayTemp, temp);
// };

// const assignWeekDay = (weekDay, weekday) => {
//   const weekDay = document.createElement("div");
//   weekDay.className = "forecast-content";
//   weekDay.innerHTML = `${weekday}`;
// };

// const assignWeatherEmoji = (weatherEmoji, emoji) => {
//   const weatherEmoji = document.createElement("div");
//   weatherEmoji.className = "forecast-content";
//   weatherEmoji.innerHTML = `${emoji}`;
// };

// const assignWeekDayTemp = (weekDayTemp, temp) => {
//   const weekDayTemp = document.createElement("div");
//   weekDayTemp.className = "forecast-content";
//   weekDayTemp.innerHTML = `${temp}`;
// };

renderCurrentWeather("20", dayWeatherPicture, "Stockholm", "Clear", "07.00", "20.30");
=======
const fetchWeather = () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f9773f2491f9348664665c65e8d966c3"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("The data from the json:", data);
      // console.log("max tem", Math.floor(data.main.temp_max));
      const sunrise = data.sys.sunrise;
      const sunset = data.sys.sunset;
      renderCurrentWeather(
        Math.floor(data.main.temp),
        dayWeatherPicture,
        data.name,
        data.weather[0].description,
        Date.prototype.getTime(sunrise),
        Date.prototype.getTime(sunset)
      );
    })
    .catch((error) => console.error(error));
};

fetchWeather();
>>>>>>> 727c291247c022ad2b8c6fe11e7b19c841da13c4

//  sunrise
// 1632329324 sunset
// Date.prototype.getMilliseconds(1632285134)
// Date.prototype.getMilliseconds(1632329324)
