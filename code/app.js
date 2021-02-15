const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f463a96f9ee6b3233c3a141a391ac3cf"
const mainTemperature = document.getElementById('main-temperature');
const cityName = document.getElementById('city-name');

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={f463a96f9ee6b3233c3a141a391ac3cf}const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f463a96f9ee6b3233c3a141a391ac3cf"

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={f463a96f9ee6b3233c3a141a391ac3cf}

fetch(weatherUrl)

  .then((response) => {
      return response.json();
  })
  .then((json) => {
    console.log(json);
    cityName.innerHTML =`${json.name}`;
    mainTemperature.innerHTML = `${json.main.temp} ºC`;
  })

  