const weatherMainElement = document.getElementById('weatherMainId')
const temperatureElement = document.getElementById('temperatureId')
const sunriseElement = document.getElementById('sunriseId')
const sunsetElement = document.getElementById('sunsetId')


const fetchWeatherData = async () => {
  try {
    let url = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=29e7c1a3b2d9e92ed27e8c3d97d654cd";

    const responseFromApi = await fetch(url);
    const weatherData = await responseFromApi.json();
    console.log(weatherData)
    // testResult.innerHTML = JSON.stringify(weatherData)

    weatherMainElement.innerHTML = weatherData.weather[0].main
    temperatureElement.innerHTML = weatherData.main.temp
    sunriseElement.innerHTML = weatherData.sys.sunrise
    sunsetElement.innerHTML = weatherData.sys.sunset
  } catch (error) {
    console.log(error);
  }
};

fetchWeatherData()

