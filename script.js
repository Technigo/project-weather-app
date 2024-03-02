const weatherContainer = document.getElementById("weather-container");
const cityContainer = document.getElementById("city-container");



  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=18169ba1f8859ef1f0186e26f6fac435"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const sunrise = new Date(json.sys.sunrise * 1000);
      const timeForSunrise = sunrise.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const sunset = new Date(json.sys.sunset * 1000);
      const timeForSunset = sunset.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      weatherContainer.innerHTML = `
    ${json.weather[0].description} | ${json.main.temp.toFixed(1)}º 
    <p>Sunrise ${timeForSunrise}</p><p>Sunset ${timeForSunset}</p>
    `;
      cityContainer.innerHTML = `
    ${json.name}
    `
  })
}
fetchCity()


//clear | 23grader
//sunrise 08.00
//sunset 22.30