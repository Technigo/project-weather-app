///////////////////////////// DOM selectors /////////////////////////////

const body = document.getElementById("body");
const cityName = document.getElementById("city-name");
const weather = document.getElementById("weather");
const degrees = document.getElementById("degrees");
const smallWeatherIcon = document.getElementById("weather-icon");
const largeWeatherIcon = document.getElementById("large-weather-icon");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const forecastTable = document.getElementById("forecast-table");
const selectCityDropdown = document.getElementById("select-city-dropdown");

/////////////////////////// Global Variables ////////////////////////////

const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = "5f9b0149e7c813c77ba22f081321a0c1";
const weatherData = "weather";
const forecastData = "forecast";
let locale = "Stockholm,Sweden";
const units = "metric";
let URL = `${BASE_URL}${weatherData}?q=${locale}&units=${units}&APPID=${API_KEY}`;
let forecastURL = `${BASE_URL}${forecastData}?q=${locale}&units=${units}&APPID=${API_KEY}`;
const currentDay = new Date(Date.now()).getDay();
let localCity = "";
let weekday = "";

////////////////////////////// Functions ///////////////////////////////

// Function that changes the design for cloudy days
const setCloudyDesign = () => {
  smallWeatherIcon.src = "./design/design2/icons/noun_Cloud_1188486.svg";
  largeWeatherIcon.src = "./design/design2/icons/noun_Cloud_1188486.svg";
  body.className = "cloudy";
  cityName.innerHTML = `Light a fire and get cosy. ${localCity} is looking grey today.`;
};

// Function that changes the design for clear days
const setClearDesign = () => {
  smallWeatherIcon.src = "./design/design2/icons/noun_Sunglasses_2055147.svg";
  largeWeatherIcon.src = "./design/design2/icons/noun_Sunglasses_2055147.svg";
  body.className = "clear";
  cityName.innerHTML = `Get your sunnies on. ${localCity} is looking rather great today.`;
};

// Function that changes the design for rainy days
const setRainDesign = () => {
  smallWeatherIcon.src = "./design/design2/icons/noun_Umbrella_2030530.svg";
  largeWeatherIcon.src = "./design/design2/icons/noun_Umbrella_2030530.svg";
  body.className = "rain";
  cityName.innerHTML = `Don't forget your umbrella. It's wet in ${localCity} today.`;
};

// Function that changes teh design for hazy/misty/foggy days
const setHazyDesign = () => {
  smallWeatherIcon.src = "./design/design2/icons/cloud-fog-icon.svg";
  largeWeatherIcon.src = "./design/design2/icons/cloud-fog-icon.svg";
  body.className = "hazy";
  cityName.innerHTML = `Watch your step. Visibility in ${localCity} is not great today.`;
};

// Function that checks if a number is less than 10
// If so, it adds a 0 in front of the number
// This is for formatting reasons when displaying time
const isItLessThanTen = (number) => {
  if (number < 10) {
    number = "0" + number;
  }
  return number;
};

// Function that fetches data from the weather url
const fetchData = () => {
  fetch(URL)
    .then((response) => response.json())
    .then((json) => {
      // Fetch the name of the city
      localCity = json.name;

      // Fetch the weather condition at the local city.
      // Depending on the weather, a function corresponding to the
      // specific weather condition is called
      const localWeather = json.weather[0].main;
      weather.innerText = localWeather;
      if (localWeather === "Clouds") {
        setCloudyDesign();
      } else if (localWeather === "Clear") {
        setClearDesign();
      } else if (localWeather === "Rain" || localWeather === "Drizzle") {
        setRainDesign();
      } else if (
        localWeather === "Haze" ||
        localWeather === "Fog" ||
        localWeather === "Mist"
      ) {
        setHazyDesign();
      } else {
        image.src = "./design/design2/icons/icons8-placeholder-50.png";
      }

      // Fetch the temperature of the local city
      const localDegrees = json.main.temp;
      // The temperatue is rounded to 1 decimal
      const roundedLocalDegrees = localDegrees.toFixed(1);
      degrees.innerText = `${roundedLocalDegrees}°`;

      // Sunrise
      // Add json.timezone to get local timezone and multipy by 1000 because of UNIX
      const sunriseData = new Date((json.sys.sunrise + json.timezone) * 1000);
      let sunriseHours = sunriseData.getHours();
      sunriseHours = isItLessThanTen(sunriseHours); // Check if the hour number is less than 10
      let sunriseMinutes = sunriseData.getMinutes();
      sunriseMinutes = isItLessThanTen(sunriseMinutes); // Check if the minute number is less than 10
      sunrise.innerText = `${sunriseHours}.${sunriseMinutes}`;

      // Sunset
      const sunsetData = new Date((json.sys.sunset + json.timezone) * 1000);
      let sunsetHours = sunsetData.getHours();
      sunsetHours = isItLessThanTen(sunsetHours);
      let sunsetMinutes = sunsetData.getMinutes();
      sunsetMinutes = isItLessThanTen(sunsetMinutes);
      sunset.innerText = `${sunsetHours}.${sunsetMinutes}`;
    })
    .catch((error) => {
      cityName.innerText = "Something went wrong";
      console.error(error);
    });
};

// Function that checks the get.Day() number and assigns the corresponding
// name of the day to the weekday variable
const whatDayIsIt = (dayNumber) => {
  switch (dayNumber) {
    case 0:
      weekday = "sun";
      break;
    case 1:
      weekday = "mon";
      break;
    case 2:
      weekday = "tue";
      break;
    case 3:
      weekday = "wed";
      break;
    case 4:
      weekday = "thu";
      break;
    case 5:
      weekday = "fri";
      break;
    case 6:
      weekday = "sat";
      break;
    default:
      weekday = "unknown";
      break;
  }
};

// Function that fetches the forecast for the next 4-5 days
const getForecast = () => {
  fetch(forecastURL)
    .then((response) => response.json())
    .then((json) => {
      // Filters the array to get the objects with the timestamp 12:00
      const forecastArray = json.list.filter((item) =>
        item.dt_txt.includes("12:00")
      );
      // Create an array with the temperatures of the filtered objects
      const dailyTemperatures = forecastArray.map(
        (degrees) => degrees.main.temp
      );
      // Create an array with the timestamps of the filtered objects
      const timestampArray = forecastArray.map((times) => times.dt);
      timestampArray.forEach((timestamp, index) => {
        const dayDate = new Date(timestamp * 1000);
        weekday = dayDate.getDay();
        // Check so that the forecast for the current day is not included
        if (weekday !== currentDay) {
          whatDayIsIt(weekday);
          // Takes the current index of the element (timestamp), checks what
          // the value at the corresponding index in the dailyTemperatures
          // array is and adds the value to the dayTemperature variable
          const dayTemperature = dailyTemperatures[index].toFixed(1);
          forecastTable.innerHTML += `<tr>
        <td>${weekday}</td>
        <td class="last-col">${dayTemperature}°</td>
      </tr>`;
        }
      });
    });
};

// Functions that runs all the other functions
const displayInfo = () => {
  fetchData();
  getForecast();
};

//////////////////////////// Eventlisters //////////////////////////////

// Run all functions when page is loaded
window.onload = (event) => {
  displayInfo();
};

// Change the locale variable based on the selected option in the dropdown
selectCityDropdown.addEventListener("change", () => {
  let selectedCity =
    selectCityDropdown.options[selectCityDropdown.selectedIndex].text;
  if (selectedCity === "Karlstad") {
    locale = "Karlstad,Sweden";
  } else if (selectedCity === "Taipei") {
    locale = "Taipei,Taiwan";
  } else if (selectedCity === "London") {
    locale = "London,UK";
  } else if (selectedCity === "Stockholm") {
    locale = "Stockholm,Sweden";
  }
  // Empty the forcast table so it won't stack
  forecastTable.innerHTML = "";

  // Update the urls and reload the info
  URL = `${BASE_URL}${weatherData}?q=${locale}&units=${units}&APPID=${API_KEY}`;
  forecastURL = `${BASE_URL}${forecastData}?q=${locale}&units=${units}&APPID=${API_KEY}`;
  displayInfo();
});
