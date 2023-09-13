//fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=6cf9113cc039128887bea41cc4117942")

const getWeather = async () => {
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=966881349119fc14f6f3831c44ff9b53");

    const data = await response.json();

    console.log(data)
}
getWeather();
