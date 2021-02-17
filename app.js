// Global variables
const API_KEY = '4b089f476bd9961f1c727a0625472b1f'
const weather = document.getElementById('weather');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const city = document.getElementById('city');
const fiveDaysForecast = document.getElementById('5-days-forecast');

fetch(`http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        const sunriseTime = new Date(json.sys.sunrise * 1000);
        const sunsetTime = new Date(json.sys.sunset * 1000);
        const sunriseReadableTime = sunriseTime.toLocaleTimeString([], { timeStyle: 'short'})
        const sunsetReadableTime = sunsetTime.toLocaleTimeString([], { timeStyle: 'short'})

        city.innerHTML = `${json.name}`;
        weather.innerHTML = `${json.weather[0].main} | ${Math.floor(json.main.temp)}°C`;
        sunrise.innerHTML = `Sun Up: ${sunriseReadableTime}`;
        sunset.innerHTML = ` Sun Down: ${sunsetReadableTime}`;
    })

    

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`)
    .then((response) => {
        return response.json();
        })
        .then((json) => {
                // A variable that saves information each day at 12.00
            const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'));

            // A loop for the filteredForecast variable
            filteredForecast.forEach((item) => {
                //A variable that saves the date and time each day
                const weekDays = new Date(item.dt_txt);
                // A variable that svaes a shorter version of the date each day
                const weekDayNames = weekDays.toLocaleDateString('en-US', {weekday: 'short'});
                // A variable that saves the temperature each day
                const temperature = Math.floor(item.main.temp);

  
                fiveDaysForecast.innerHTML +=`
                    <div>
                        <h5>${weekDayNames} ${temperature} °C</h5>
                    </div>
                    `;             


        });




    })


