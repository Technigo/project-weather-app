

// const types = document.getElementById("types");
const apiKey = "19e3f1df0b9dcbf3b903658b9bf5177c";
let URL = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${apiKey}`;


const fetchWeather = async () => {
  try {
    // Handle the response data here
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error
    }

    const resJson = await response.json();
    //console.log(resJson);


    // FORCAST -----------------------------------
    const forcastToday = resJson.weather[0].description;

    // Temperature rounded to one decimal
    let temperature = resJson.main.temp;
    let tempRounded = Math.round(temperature * 10) / 10 + "°";

    // Combines daily forcast and temperature
    weatherConditions = `${forcastToday} | ${tempRounded}`;
    document.getElementById('weatherConditions').innerText += weatherConditions;



    // SUNSET/SUNRISE -----------------------------------
    // Sunrise
    const unixSunrise = resJson.sys.sunrise;
    // Sunset
    const unixSunset = resJson.sys.sunset;


    // Function convertring unix time to utc
    const convertTime = (unixTimestamp) => {
      // Convert the Unix timestamp to milliseconds
      const timestampInMilliseconds = unixTimestamp * 1000;

      // Create a new Date object from the timestamp
      const time = new Date(timestampInMilliseconds);


      // Check for the timezone difference
      let timeZone = new Date();

      // Time difference between UTC and local time in hours
      let timeDiff = timeZone.getTimezoneOffset();
      timeDiffHours = timeDiff / 60 * -1;


      // Get the UTC hours and minutes
      const hours = time.getUTCHours() + timeDiffHours;
      const minutes = time.getUTCMinutes() + timeDiffHours;

      // Format the result as a string
      const utcTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

      return utcTime;
    };

    // UTC times converted in function
    const utcSunrise = convertTime(unixSunrise);
    const utcSunset = convertTime(unixSunset);

    // Updating HTML elements with time
    document.getElementById('sunrise').innerText += `sunrise ${utcSunrise}`
    document.getElementById('sunset').innerText += `sunset ${utcSunset}`





    // HEADING SECTION -----------------------------------
    const weatherMessageContainer = document.getElementById("weatherMessageContainer");

    // City
    const currentCity = resJson.name;
    const forcastTodayMain = resJson.weather[0].main;

    switch (forcastTodayMain) {
      case "Clear":
        document.getElementById('mainHeading').innerText += `Get your sunnies on. ${currentCity} is looking rather great today`
        // Updates colors
        body.className = "sunshine-colorscheme";

        // Change class to updates colors
        document.getElementById('weatherIcon').innerHTML = `<img src="design/design2/icons/noun_Sunglasses_2055147.svg">`
        break

      case "Rain":
      case "Thunderstorm":
      case "Drizzle":
        document.getElementById('mainHeading').innerText += `Don't forget your umbrella. It's wet in ${currentCity} today.`
        // Updates colors
        body.className = "rain-colorscheme";

        // Change class to updates colors
        document.getElementById('weatherIcon').innerHTML = `<img src="design/design2/icons/noun_Umbrella_2030530.svg">`
        break

      case "Clouds":
      case "Mist":
      case "Snow":
      case "Haze":
      case "Fog":
        document.getElementById('mainHeading').innerText += `Light a fire and get cosy. ${currentCity} is looking grey today.`
        // Change class to updates colors
        body.className = "cloudy-colorscheme";

        // Updates weather icon
        document.getElementById('weatherIcon').innerHTML = `<img src="design/design2/icons/noun_Cloud_1188486.svg">`
        break

      default:
        console.log(`The weather is uncertain in ${currentCity}`);
    };

  } catch (error) {
    weatherMessageContainer.innerText = error;
  }
};

fetchWeather();

const forcastURL = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${apiKey}`


// Forecast html containers
const forcast = document.getElementById("forcast");
const forecastDay = document.getElementById("forecastDay");
const temperature = document.getElementById("temperature");

const fetchForcastWeather = async () => {
  try {
    // Handle the response data here
    const response = await fetch(forcastURL);
    if (!response.ok) {
      throw new Error
    }

    const resForcastJson = await response.json();



    console.log(resForcastJson);

    let forecastTemp1 = Math.round(resForcastJson.list[0].main.temp) + " °C";
    let forecastTemp2 = Math.round(resForcastJson.list[1].main.temp) + " °C";
    let forecastTemp3 = Math.round(resForcastJson.list[2].main.temp) + " °C";
    let forecastTemp4 = Math.round(resForcastJson.list[3].main.temp) + " °C";
    let forecastTemp5 = Math.round(resForcastJson.list[4].main.temp) + " °C";
    document.getElementById('forecastTemperature1').innerText += forecastTemp1;
    document.getElementById('forecastTemperature2').innerText += forecastTemp2;
    document.getElementById('forecastTemperature3').innerText += forecastTemp3;
    document.getElementById('forecastTemperature4').innerText += forecastTemp4;
    document.getElementById('forecastTemperature5').innerText += forecastTemp5;
  } catch (error) {
    weatherMessageContainer.innerText = error;
  }
};

fetchForcastWeather()

// Generate forecast day names
function forecastDayNames() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  const newDays = [];
  const today = new Date();
  todayName = today.getDay();
  console.log(todayName)
  for (let step = 0; step < 5; step++) {
    newDays[step] = days[todayName + step + 1];

  }
  document.getElementById('forecastDay0').innerText += newDays[0];
  document.getElementById('forecastDay1').innerText += newDays[1];
  document.getElementById('forecastDay2').innerText += newDays[2];
  document.getElementById('forecastDay3').innerText += newDays[3];
  document.getElementById('forecastDay4').innerText += newDays[4];
}
forecastDayNames()

