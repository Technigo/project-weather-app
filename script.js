const weatherForecast = document.getElementById('weatherForecast')
const todaysDate = document.getElementById('todaysDate')
const city = document.getElementById('city')
const temperature = document.getElementById('temperature')
const condition = document.getElementById('condition')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')


fetch('https://api.openweathermap.org/data/2.5/weather?q=Piteå,Sweden&units=metric&APPID=bcc357d81ce23673e3a8e92322d840f2')
    
    .then((response) => {
        return response.json()
    })
    
    .then((json) => {
        city.innerHTML = `<h1>${json.name}</h1>`
        temperature.innerHTML = `<h2>${Math.round(json.main.temp * 10) / 10}°C</h2>`;
        condition.innerHTML = `<h2>with ${json.weather[0].description}</h2>`;

    const setSunrise = json.sys.sunrise;
    const sunriseTime = new Date(setSunrise * 1000);
    const sunriseHour = sunriseTime.toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12:false,
})

        sunrise.innerHTML =`<p>The sun rises at ${sunriseHour}</p>`

    const setSunset = json.sys.sunset;
    const sunsetTime = new Date(setSunset * 1000);
    const sunsetHour = sunsetTime.toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12:false,
})

        sunset.innerHTML =`<p>and it sets at ${sunsetHour}</p>`

        console.log(json)
    })



    
//5-week Forecast:
   
const weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
