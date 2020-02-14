const container = document.getElementById("weather");
// const container2 = document.getElementById("weather-5day")
// const sunStatus = document.getElementById("sunStatus")
const sunRise = document.getElementById("sunRise");
const sunSet = document.getElementById("sunSet");

const weatherForecast = document.getElementById("weather-5day");

// -------------- API link variables:
const weatherOneDayApi =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,se&units=metric&APPID=44527f8be39feab9d034d48604c6b81d&lang=en";
const weatherForecastApi =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,se&units=metric&APPID=44527f8be39feab9d034d48604c6b81d&lang=en";
// console.log(weatherForecast)

fetch(weatherOneDayApi)
  .then(response => {
    return response.json();
  })
  .then(json => {
    //console.log(json) // checking the json from open weather
    container.innerHTML = `<h1>${json.name} & Temp: ${json.main.temp.toFixed(
      1
    )}°c (using toFixed)</h1>`;
    json.weather.forEach(sky => {
      container.innerHTML += `<h1>Weather: ${sky.description} </h1>`;
    });
    // sunStatus.innerHTML = `<h1>Sunrise: ${json.sys.sunrise} and Sunset: ${json.sys.sunset}</h1>`
    // console.log(weather.sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { timeStyle: 'short' }))
    // console.log(weather.sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { timeStyle: 'short' }))
    sunRise.innerHTML = weather.sunrise = new Date(
      json.sys.sunrise * 1000
    ).toLocaleTimeString([], {
      timeStyle: "short"
    });
    sunSet.innerHTML = weather.sunset = new Date(
      json.sys.sunset * 1000
    ).toLocaleTimeString([], {
      timeStyle: "short"
    });
  });
// the weatherForecast - Step 4 - Array med en for Each for att plocka ur infon:

fetch(weatherForecastApi)
  .then(response => {
    return response.json();
  })
  .then(json => {
    console.log(json); // checking the json weatherForecast

    // weatherForecast.innerHTML = `<h1>weatherForecast: ${json.city.name} </h1>`
    /*
    json.list.forEach((forecast) => {
      weatherForecast.innerHTML += `<h1>Weather forecast Stockholm: ${forecast.main.temp}°C ${forecast.dt_txt} </h1>`
    });
*/
    const filteredForecast = json.list.filter(item =>
      item.dt_txt.includes("12:00")
    );
    console.log(filteredForecast);

    // weatherForecast.innerHTML = `<h1>weatherForecast: ${filteredForecast.main.temp} </h1>`

    filteredForecast.forEach(forecast => {
      weatherForecast.innerHTML += `<h3>${forecast.dt_txt} : ${forecast.main.temp.toFixed(1)}°C </h3>`;
    });

    // console.log(filteredForecast.forecast.main.temp);
  });