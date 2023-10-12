// FOUNDATION //
// Step 1 - Get started with the weather API //


// TOP SECTION -----------------------------------

// const types = document.getElementById("types"); //
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
    console.log(resJson);

    // Sunrise
    const sunrise = resJson.sys.sunrise;
    //console.log(`sunrise ${sunrise}`)
    //document.getElementById('sunrise').innerText += `sunrise ${sunrise}`

    function convertTimestamptoTime() {
      let unixTimestamp = sunrise;
      // Convert to milliseconds and
      // then create a new Date object
      let dateObj = new Date(unixTimestamp * 1000);
      let utcString = dateObj.toUTCString();

      let sunriseTime = utcString.slice(-11, -4);

      document.getElementById('sunrise').innerText += `sunrise ${sunriseTime}`
      console.log(sunriseTime);
    }

    convertTimestamptoTime();


    // Sunset
    const sunset = resJson.sys.sunset;
    console.log(`sunset ${sunset}`)
    document.getElementById('sunset').innerText += `sunset ${sunset}`

    // City
    const currentCity = resJson.name;
    console.log(currentCity)
    document.getElementById('mainHeading').innerText += `The weather is nice in ${currentCity}`

    // Forcast today
    const forcastToday = "test";

    // Temperature rounded to one decimal
    let temperature = resJson.main.temp;
    let tempRounded = Math.round(temperature * 10) / 10 + "°";
    console.log(tempRounded)

    // Combines daily forcast and temperature
    weatherConditions = `${forcastToday} | ${tempRounded}`;
    document.getElementById('weatherConditions').innerText += weatherConditions;

  } catch (error) {
    weatherMessageContainer.innerText = error;
  }
};

fetchWeather();


const weatherMessage = "";





// MIDDLE SECTION -----------------------------------
const weatherMessageContainer = document.getElementById("weatherMessageContainer");

/*switch (forcastToday) {
  case "clear sky" || "few clouds" || "scattered clouds":
    console.log(`The weather is nice in ${currentCity}`);
    break

  default:
    console.log(`The weather is bad in ${currentCity}`);
}*/
/*
- clear sky
- few clouds
- scattered clouds

- shower rain
- rain 
- thunderstorm

- broken clouds
- mist
- snow
*/

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

  } catch (error) {
    weatherMessageContainer.innerText = error;
  }
};

fetchForcastWeather()