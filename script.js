
const container = document.getElementById('city');
const forecastDate = document.getElementById('forecastDate')
const forecastTemp = document.getElementById('forecastTemp')
const forecastFeels = document.getElementById('forecastFeels')
const forecastMinMax = document.getElementById('forecastMinMax')


// Get the user's current location
navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;

  // Fetch the current weather data for the user's location
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=ddf98774bfc0041a16a7d95948e68934`)
    .then((response) => response.json())
    .then((json) => {
      // Convert Unix timestamps to date objects
      const sunrise = new Date(json.sys.sunrise * 1000);
      const sunset = new Date(json.sys.sunset * 1000);

      // Update the HTML content with the current weather data for the user's location
      container.innerHTML = `
        <h1> ${json.name} </h1>
        <h2> ${(Math.round(json.main.temp))}°C</h2>
        <h3> ${json.weather[0].main}</h3>
<<<<<<< HEAD
        <h4> 🌅 sunrise ${sunrise.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })}</h4>
        <h4> 🌇 sunset ${sunset.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })}</h4>
=======
        <h4> <img src="./images/sunrise.png" alt="Sunrise"> ${sunrise.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })}</h4>
        <h4> <img src="./images/sunset.png" alt="Sunset"> ${sunset.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })}</h4>
>>>>>>> play-with-styling
      `;
    });

  // Fetch the weather forecast data for the user's location
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&APPID=ddf98774bfc0041a16a7d95948e68934`)
    .then((response) => response.json())
    .then((json) => {
      // Filter the forecast data to only show the information for 12:00 PM each day
      const filteredForecast = json.list.filter((item) => item.dt_txt.includes('12:00'));

            console.log(filteredForecast)
            filteredForecast.forEach((weeklyForecast) => {
                forecastTemp.innerHTML += `<span>${weeklyForecast.main.temp.toFixed(0)}\u00B0C</span> `
                forecastFeels.innerHTML += `<span>${weeklyForecast.main.feels_like.toFixed(0)}\u00B0C</span> `
                forecastMinMax.innerHTML += `<span>${weeklyForecast.main.temp_min.toFixed(0)}\u00B0C/${weeklyForecast.main.temp_max.toFixed(0)}\u00B0C</span> `
            })
            filteredForecast.forEach((day) => {
                const date = new Date(day.dt * 1000)
                let dayName = date.toLocaleDateString("en-US", {weekday: "short"})
                forecastDate.innerHTML += `<span>${dayName}</span>`
                })
             })
            })