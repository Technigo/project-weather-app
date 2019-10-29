.then(json => {
  index = 1;
  json.list.forEach(weather => {
    let dt = new Date(0);
    dt.setUTCSeconds(weather.dt);
    document.getElementById("forecast").innerHTML += `<div class="main-forecast" id="section${index}"><div>${dt.getDate()} ${
      monthShortNames[dt.getMonth()]
      } ${("0" + dt.getHours()).slice(-2)}:${("0" + dt.getMinutes()).slice(
        -2
      )}</div><div class="forecast-info">${weather.main.temp.toFixed(
        1
      )}Â°<img src="https://openweathermap.org/img/wn/${
      weather.weather[0].icon
      }.png" alt="Weather representation"> <span id="arrow${index}">&#x25B6;</span></div></div>
    <div class="detail">

    
    <p><b>Weather description:</b> ${weather.weather[0].description}</p>
    <p><b>Wind speed (m/s):</b> ${weather.wind.speed.toFixed(0)}</p>
    <p><b>Wind direction:</b> ${getWindDirection(weather.wind.deg)}</p>
    <p><b>Atmospheric pressure (hPa):</b> ${weather.main.pressure}</p>
    <p><b>Humidity (%):</b> ${weather.main.humidity}</p></div>`;

    index++;
  });