// DOM-SELECTORS
const dailyContent = document.getElementById("dailyContent");
const weeklyContent = document.getElementById("weeklyContent");

const weatherGothenburgToday =
  "https://api.openweathermap.org/data/2.5/weather?q=Gothenburg,Sweden&units=metric&APPID=6f4589c9a1ed485fe713e8f5159a6ff9";

fetch(weatherGothenburgToday)
  .then((res) => res.json())
  .then((data) => {
    console.log(data); // Important console.log
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;

    function convert(t) {
      const dt = new Date(t * 1000);
      const hr = dt.getHours();
      const m = "0" + dt.getMinutes();
      return hr + ":" + m.substr(-2);
    }

    const sunriseTime = convert(sunrise);
    const sunsetTime = convert(sunset);

    dailyContent.innerHTML = `
        <div class="main-daily-info">
         <div class="daily-temp">
          <h1>${Math.round(data.main.temp * 10) / 10}
           <span class="celcius">°C</span>
          </h1>
         </div>
         <h2>${data.name}</h2>
         <h3>${data.weather[0].description}</h3>
        </div>
        <div class="main-sunset-sunrise">
        <h3>Sunrise:</h3>
        <h3>${sunriseTime}</h3>
        <h3>Sunset:</h3>
        <h3>${sunsetTime}</h3>
        </h2>
        </div>
        `;
  });
