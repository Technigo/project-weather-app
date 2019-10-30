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
    weathers.innerHTML = `<h1> ${json.name} </h1>`;
    description.innerHTML = `<h2> Today ${json.main.temp.toFixed(1)}°c ${
      json.weather[0].description
      }</h2>`;

    const unixTimestampSunrise = json.sys.sunrise;
    let sunrise = new Date(unixTimestampSunrise * 1000);
    let sunriseTime = sunrise.toLocaleString([], { timeStyle: "short" });
    sunriseContainer.innerHTML = `<h3> Sunrise ${sunriseTime}</h3>`;

    const unixTimestampSunset = json.sys.sunset;
    let sunset = new Date(unixTimestampSunset * 1000);
    let sunsetTime = sunset.toLocaleString([], { timeStyle: "short" });
    sunsetContainer.innerHTML = `<h3> Sunset ${sunsetTime}</h3>`;

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
    forecast.innerHTML = `<p>WED   ${json.list[5].main.temp_min.toFixed(
      1
    )}°  /  ${json.list[8].main.temp_max.toFixed(1)}°C ${
      json.list[8].weather[0].description
      }</p><br><p>THU    ${json.list[13].main.temp_min.toFixed(
        1
      )}°  /  ${json.list[16].main.temp_max.toFixed(1)}°C ${
      json.list[16].weather[0].description
      } </p><br><p>FRI   ${json.list[20].main.temp_min.toFixed(
        1
      )}°  /  ${json.list[23].main.temp_max.toFixed(1)}°C ${
      json.list[23].weather[0].description
      }</p><br><p>SAT   ${json.list[26].main.temp_min.toFixed(
        1
      )}°  /  ${json.list[29].main.temp_max.toFixed(1)}°C ${
      json.list[28].weather[0].description
      } </p><br><p>SUN  ${json.list[34].main.temp_min.toFixed(
        1
      )}°  /  ${json.list[37].main.temp_max.toFixed(1)}°C ${
      json.list[36].weather[0].description
      }</p>`;

    const forecastContainer = document.getElementById("forecast");
    console.log(json);
  });

let weatherIcon = document.getElementById('documentIconImg');

weatherIcon.src = 'http://openweathermap.org/img/wn/' + json.main.weather[0].icon + '.png';
description.innerText = resultDescription.CharAt(0).toUpperCase() + resultDescription.slice(1);
//.catch(err => {
//console.log("caught error", err);
//});

//let weatherAsJSON = JSON;
//console.log(weatherAsJSON)
