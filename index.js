
let weatherContainer = document.getElementById("weather-container");

const API_KEY = "SKRIV IN API NYCKEL";

const fetchWeather = async () => {
    try {
    let longUrl = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`;

    const responseFromApi = await fetch(longUrl);
    const coordinatesInfo = await responseFromApi.json();

    let coordinates = coordinatesInfo.coord;

    let weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}`;
    const responseFromApi2 = await fetch(weatherURL);
    const weatherInfo = await responseFromApi2.json();
    //console.log(weatherInfo);
    const weatherList = weatherInfo.list;
    console.log(weatherList);

    weatherList.forEach((dataPoint) => {
        weatherContainer.innerHTML = dataPoint.main.temp;
        console.log(dataPoint.main.temp)
    });

    } catch (error) {
      console.log(error);
    };
};

fetchWeather();