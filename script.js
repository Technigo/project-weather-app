const container = document.getElementById("weathers");
const sunriseContainer = document.getElementById("sunrise");
const sunsetContainer = document.getElementById("sunset");

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=45a10c27e52d21ffc58df69a934778b7"
)
  .then(response => {
    return response.json();
  })
  .then(json => {
    //const container2 = document.getElementById("description");
    weathers.innerHTML = `<h1> ${json.name}</h1>`;
    container1.innerHTML = `<h2>Temperature today: ${json.main.temp.toFixed(
      1
    )}° ${json.weather[0].description}</h2>`;

    //container2.innerHTML = `<h1>${json.weather[0].description}</h1>`;
    //container3.innerHTML = `<h2>Sunrise ${json.sys.sunriseTime}</h2>`;
    //container4.innerHTML = `<h2>Sunset ${json.sys.sunsetTime}</h2>`;

    const unixTimestampSunrise = json.sys.sunrise;
    let sunrise = new Date(unixTimestampSunrise * 1000);
    let sunriseTime = sunrise.toLocaleString([], { timeStyle: "short" });
    sunriseContainer.innerHTML = `<h2> Sunrise ${sunriseTime}</h2>`;

    const unixTimestampSunset = json.sys.sunset;
    let sunset = new Date(unixTimestampSunset * 1000);
    let sunsetTime = sunset.toLocaleString([], { timeStyle: "short" });
    sunsetContainer.innerHTML = `<h2> Sunset ${sunsetTime}</h2>`;

    //container5.innerHTML = `<h2>MON 1°</h2>`;
    //container6.innerHTML = `<h2>TUE 3°</h2>`;
    //container7.innerHTML = `<h2>WED 2°</h2>`;
    //container8.innerHTML = `<h2>THU 1°</h2>`;
    //container9.innerHTML = `<h2>FRI 2°</h2>`;

    console.log(json);
    //console.log(weatherAsJSON)
  });

fetch(
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&cnt=&APPID=45a10c27e52d21ffc58df69a934778b7"
)
  .then(response => {
    return response.json();
  })
  .then(json => {
    forecast.innerHTML = `<p>Wed min: ${json.list[5].main.temp_min.toFixed(
      1
    )}° - max: ${json.list[8].main.temp_max.toFixed(1)}° ${
      json.list[8].weather[0].description
    }</p><p>Thu min: ${json.list[13].main.temp_min.toFixed(
      1
    )}° - max: ${json.list[16].main.temp_max.toFixed(1)}° ${
      json.list[16].weather[0].description
    } </p><p>Fri min: ${json.list[20].main.temp_min.toFixed(
      1
    )}°  - max: ${json.list[23].main.temp_max.toFixed(1)}° ${
      json.list[23].weather[0].description
    }</p><p>Sat min: ${json.list[28].main.temp_min.toFixed(
      1
    )}° - max: ${json.list[31].main.temp_max.toFixed(1)}° ${
      json.list[31].weather[0].description
    } </p><p>Sun min: ${json.list[36].main.temp_min.toFixed(
      1
    )}° - max: ${json.list[39].main.temp_max.toFixed(1)}° ${
      json.list[39].weather[0].description
    }</p>`;

    const forecastContainer = document.getElementById("forecast");
    console.log(json);
  });

//.catch(err => {
//console.log("caught error", err);
//});

//let weatherAsJSON = JSON;
//console.log(weatherAsJSON)
