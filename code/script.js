console.log('Vamos a la playa')

// https://api.openweathermap.org/data/2.5/weather?q=Malmo,Sweden&units=metric&APPID=f6ea1936f0499b177ea24494f76ba447

// https://api.openweathermap.org/data/2.5/forecast?q=Malmo,Sweden&units=metric&APPID=f6ea1936f0499b177ea24494f76ba447

const myCity = document.getElementById('cityWeather')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Malmo,Sweden&units=metric&APPID=f6ea1936f0499b177ea24494f76ba447')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const temperature = json.main.temp; // Get the actual temperature
    const cityName = json.name;

    const temperatureDisplay = document.getElementById('cityWeather');
    cityWeather.innerHTML = `The temperature in ${cityName}, Sweden is ${temperature.toFixed(1)}°C`;

    console.log(temperature.toFixed(1))


  })