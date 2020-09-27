const API_KEY = "f54ca9831c8974c87fd4826fae420a1a"
const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=Malmo,Sweden&units=metric&APPID=${API_KEY}`
const API_URL_5DAYS = `https://api.openweathermap.org/data/2.5/forecast?q=Malmo,Sweden&units=metric&APPID=${API_KEY}`


fetch(API_URL)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        const cityContainer = document.getElementById('city');
        cityContainer.innerHTML = `<h1>Light a fire and get cosy. ${json.name} is looking grey today.</h1>`

        const weatherContainer = document.getElementById('weather')
        json.weather.forEach((weather) => {
            const sunrise = new Date(json.sys.sunrise * 1000);
            const sunRiseTime = sunrise.toLocaleTimeString('se-SV', { hour: '2-digit', minute: '2-digit' });
            const sunset = new Date(json.sys.sunset * 1000);
            const sunSetTime = sunset.toLocaleTimeString('se-SV', { hour: '2-digit', minute: '2-digit' });

            weatherContainer.innerHTML += `<p>${weather.main.toLowerCase()} | ${json.main.temp.toFixed(1)}° </p>`
            weatherContainer.innerHTML += `<p>sunrise ${sunRiseTime}</p>`
            weatherContainer.innerHTML += `<p>sunset ${sunSetTime}</p>`

            // WEATHER IMAGE DEPENDING ON WEATHER
            const cloudImage = document.getElementById('cloud-image')
            const sunImage = document.getElementById('sunglasses-image')
            const rainImage = document.getElementById('umbrella-image')
            const weatherType = weather.main
            const setWeatherImages = () => {
                if (weatherType === 'Clouds') {
                    cloudImage.classList.add("visible");
                    cloudImage.classList.remove("hidden");
                    sunImage.classList.add("hidden");
                    sunImage.classList.remove("visible");
                    rainImage.classList.add("hidden");
                    rainImage.classList.remove("visible");
                } else if (weatherType === 'Clear') {
                    sunImage.classList.add("visible");
                    sunImage.classList.remove("hidden");
                    cloudImage.classList.add("hidden");
                    cloudImage.classList.remove("visible");
                    rainImage.classList.add("hidden");
                    rainImage.classList.remove("visible");
                } else if (weatherType === 'Rain' || weather.main === 'Drizzle') {
                    rainImage.classList.add("visible");
                    rainImage.classList.remove("hidden");
                    sunImage.classList.add("hidden");
                    sunImage.classList.remove("visible");
                    cloudImage.classList.add("hidden");
                    cloudImage.classList.remove("visible");
                }
            }

            setWeatherImages()
            
        });

    })




fetch(API_URL_5DAYS)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        const forecastUl = document.getElementById('forecast');
        const forecastDegrees = document.getElementById('forecast-degrees');
        const filteredForecastMidDay = json.list.filter(item => item.dt_txt.includes('12:00'));

            filteredForecastMidDay.forEach((forecast) => {
            const forecastDate = new Date(forecast.dt * 1000);
            const options = { weekday: 'short' };
            const weekdayString = new Intl.DateTimeFormat('en-US', options).format(forecastDate);

            forecastUl.innerHTML += `<li>${weekdayString.toLowerCase()} </li>`
            forecastDegrees.innerHTML += `<li>${forecast.main.temp.toFixed(0)}°</li>`
        });
    }) 