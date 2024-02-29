///////////////////////////// DOM selectors /////////////////////////////
const body = document.getElementById("body");
const cityName = document.getElementById("city-name");
const weather = document.getElementById("weather");
const degrees = document.getElementById("degrees");
const image = document.getElementById("image");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const forecastTable = document.getElementById("forecast-table");

/////////////////////////// Global Variables ////////////////////////////
const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = "5f9b0149e7c813c77ba22f081321a0c1";
const weatherData = "weather";
const forecastData = "forecast";
const locale = "Stockholm,Sweden";
const units = "metric";
const URL = `${BASE_URL}${weatherData}?q=${locale}&units=${units}&APPID=${API_KEY}`;
const forecastURL = `${BASE_URL}${forecastData}?q=${locale}&units=${units}&APPID=${API_KEY}`;
const currentDay = new Date(Date.now()).getDay();
let localCity = "";
let weekday = "";

////////////////////////////// Functions ///////////////////////////////

// Function that fetches data from a url
const fetchData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      cityName.innerText = "Something went wrong";
    });
};

// Function that changes the design for cloudy days
const setCloudyDesign = () => {
  image.src = "./design/design2/icons/noun_Cloud_1188486.svg";
  body.className = "cloudy";
  cityName.innerHTML = `Light a fire and get cosy. ${localCity} is looking grey today.`;
};

// Function that changes the design for clear days
const setClearDesign = () => {
  image.src = "./design/design2/icons/noun_Sunglasses_2055147.svg";
  body.className = "clear";
  cityName.innerHTML = `Get your sunnies on. ${localCity} is looking rather great today.`;
};

// Function that changes the design for rainy days
const setRainDesign = () => {
  image.src = "./design/design2/icons/noun_Umbrella_2030530.svg";
  body.className = "rain";
  cityName.innerHTML = `Don't forget your umbrella. It's wet in ${localCity} today.`;
};

// Function that fetches the name of the local city
const getCityName = () => {
  fetchData(URL).then((json) => {
    localCity = json.name;
  });
};

// Function that fetches the weather condition at the local city
// Depending on the weather, a function corresponding to the
// specific weather condition is called
const getCityWeather = () => {
  fetchData(URL).then((json) => {
    const localWeather = json.weather[0].main;
    weather.innerText = localWeather + " |";
    if (localWeather === "Clouds") {
      setCloudyDesign();
    } else if (localWeather === "Clear") {
      setClearDesign();
    } else if (localWeather === "Rain") {
      setRainDesign();
    } else {
      image.src = "./design/design2/icons/icons8-placeholder-50.png";
    }
  });
};

// Function that fetches the temperature at the local city
const getCityDegrees = () => {
  fetchData(URL).then((json) => {
    const localDegrees = json.main.temp;
    // The temperatue is rounded to 1 decimal
    const roundedLocalDegrees = localDegrees.toFixed(1);
    degrees.innerText = `${roundedLocalDegrees}°`;
  });
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

// Function that fetches the time for sunrise and sunset at the local city
const getSunriseSunset = () => {
  fetchData(URL).then((json) => {
    // Sunrise
    const sunriseData = new Date(json.sys.sunrise * 1000); // Multipy by 1000 because of UNIX
    let sunriseHours = sunriseData.getHours();
    sunriseHours = isItLessThanTen(sunriseHours); // Check if the hour number is less than 10
    let sunriseMinutes = sunriseData.getMinutes();
    sunriseMinutes = isItLessThanTen(sunriseMinutes); // Check if the minute number is less than 10
    sunrise.innerText = `${sunriseHours}:${sunriseMinutes}`;

    // Sunset
    const sunsetData = new Date(json.sys.sunset * 1000);
    let sunsetHours = sunsetData.getHours();
    sunsetHours = isItLessThanTen(sunsetHours);
    let sunsetMinutes = sunsetData.getMinutes();
    sunsetMinutes = isItLessThanTen(sunsetMinutes);
    sunset.innerText = `${sunsetHours}:${sunsetMinutes}`;
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
  fetchData(forecastURL).then((json) => {
    // Filters the array to get the objects with the timestamp 12:00
    const forecastArray = json.list.filter((item) =>
      item.dt_txt.includes("12:00")
    );
    // Create an array with the temperatures of the filtered objects
    const dailyTemperatures = forecastArray.map((degrees) => degrees.main.temp);
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
        <td>${dayTemperature}°</td>
      </tr>`;
      }
    });
  });
};

getCityName();
getCityWeather();
getCityDegrees();
getSunriseSunset();
getForecast();
