//Weather from API
const apiWeatherToday = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=e33f1cc192401277e601a6aed3a82800';
const apiForecast = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=e33f1cc192401277e601a6aed3a82800";

//Catching id's from html
const weatherLocation = document.getElementById('location');
const weatherDescription = document.getElementById('description');
const weatherTemperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('icon');

// Fetch function
const fetchWeather = () => {
    fetch(apiWeatherToday)
    .then((response) => {
    return response.json();
    })
    .then((json) => {
    weatherLocation.innerHTML = json.name;
    weatherDescription.innerHTML = json.weather[0].description
    weatherTemperature.innerHTML = Math.round(json.main.temp)

// Sunrise
    const weatherSunrise = () => {
        const dateSunrise = new Date(json.sys.sunrise * 1000);
        const timeSunrise = dateSunrise.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
        document.getElementById('sunrise').innerHTML = timeSunrise;
  };

    weatherSunrise();

// Sunset
    const weatherSunset = () => {
      document.getElementById('sunset').innerHTML += `<p>Sunset</p>`;
        const dateSunset = new Date(json.sys.sunset * 1000);
        const timeSunset = dateSunset.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });

        document.getElementById('sunset').innerHTML = timeSunset;
    };

    weatherSunset();
 });
};

fetchWeather();

// Forecast for the next 5 days
fetch(apiForecast)
    .then((Response) => { 
        return Response.json()
    })
    .then ((json) => {
        const filteredForecast = json.list.filter(item =>
        item.dt_txt.includes("12:00")
        );

        filteredForecast.forEach(day => {
            const date = new Date(day.dt * 1000);

            const dayName = date.toLocaleDateString("en-EN", { weekday: "short" });

            const dayTemp = day.main.temp;
            const weekTemp = dayTemp.toFixed(0.1);

            document.getElementById('weekday').innerHTML += `<p>${dayName}</p>`
            document.getElementById('weekTemp').innerHTML += `<p>${weekTemp}°C</p>`
    });
});