const urlWeatherApi = "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=15bf5917de6dcee70bd79af38a8e3b9d";
const weatherForecastContainer = document.getElementById("weather-forecast");

console.log('API Fetch Starting');

fetch(urlWeatherApi)
    .then((response)=> {
        return response.json();
    })
    .then((json) => {
        console.log(json);
        const cityName = json.name;
        const temp = json.main.temp;
        const weahterType = json.weather[0].description;
        long milli
        const sunriseMillisec = json.sys.sunrise;
        const sunsetMillisec = json.sys.sunset;

        const sunriseTime = Instant.ofEpochMilli(sunriseMillisec).atZone(ZoneId.of("CET")).toLocalDateTime();
        //const sunsetTime = LocalDateTime.ofInstant(Instant.ofEpochMilli(sunsetMillisec), CET.systemDefault());

       weatherForecastContainer.innerHTML = `
        <section class="weatherToday">
            <p>Todays weather in:</p>
            <h1>${json.name}</h1>
            <h2>Temperature: ${json.main.temp}</h2>
            <h2>${json.weather[0].description}</h2>
        </section>
        <section clas="sunRiseSet">
            <h2>Hi sun at ${sunriseTime}</h2>
            <h2>Bye sun at ${sunsetTime}</h2>
        </section>
        `
    });
