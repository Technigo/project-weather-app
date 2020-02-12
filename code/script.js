const containerToday = document.getElementById("todays-weather");
const containerFiveDays = document.getElementById("five-day-weather");

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Malmoe,Sweden&units=metric&APPID=778e796f3254363f06afef1bc4ea2b4f"
)
  .then(response => {
    return response.json();
  })
  .then(json => {
    console.log(json);
    const sunrise = new Date(json.sys.sunrise * 1000);
    const sunset = new Date(json.sys.sunset * 1000);

    const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: "short" });
    const sunsetTime = sunset.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

    containerToday.innerHTML = `<h2>${json.name}</h2>`;

    containerToday.innerHTML += `<p>${Math.round(json.main.temp * 10) /
      10}°C and ${json.weather[0].description}
    </p>`;

    containerToday.innerHTML += `<p>Sunrise: ${sunriseTime}<br>
    Sunset: ${sunsetTime}</p>`;
  });
