//
const getWeatherData = async () => {
    const forecastResponse = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=966881349119fc14f6f3831c44ff9b53", { method: 'GET' });

    const weatherResponse = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=966881349119fc14f6f3831c44ff9b53", { method: 'GET' });

    const weatherData = await weatherResponse.json();
    //console.log(weatherData)

    const forecastData = await forecastResponse.json();
    //console.log(forecastData)

    return {
        city: weatherData.name,
        weatherDescription: weatherData.weather[0].description,
        sunrise: forecastData.city.sunrise,
        sunset: forecastData.city.sunset,
        temperature: weatherData.main.temp,
        forecast: []
    }
}

// Fetching weather data and converted to json.
const getWeather = async () => {
    try {
        const data = await getWeatherData();
        console.log(data)
    } catch (error) {
        console.error(error);
    }
}
getWeather();