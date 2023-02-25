const container = document.getElementById('weatherMain');
const sydneyContainer = document.getElementById('sydneyContainer');
const singaporeContainer = document.getElementById('singaporeContainer');
const johannesburgContainer = document.getElementById('johannesburgContainer');
const londonContainer = document.getElementById('londonContainer');
const vancouverContainer = document.getElementById('vancouverContainer')
const minneapolisContainer = document.getElementById('minneapolisContainer');


      // Conditional to show different background colors depending on temperature
      const tempBackground = (tempFormatted, container) => {
        if (tempFormatted >= 25) {
                container.style.background = "linear-gradient(to top, #FF4B2B, #FF416C)";
            } else if (tempFormatted >= 15 && tempFormatted < 25) {
                container.style.background = "linear-gradient(to top, #F37335, #FDC830)";
            } else if (tempFormatted >= 5 && tempFormatted < 15) {
                container.style.background = "linear-gradient(to top, #dce35b, #45b649)";
            } else if (tempFormatted >= -5 && tempFormatted < 5) {
                container.style.background = "linear-gradient(to bottom, #2c3e50, #bdc3c7)";
            } else if (tempFormatted >= -15 && tempFormatted < -4) {
                container.style.background = "linear-gradient(to top, #E4E5E6, #6DD5FA, #2980B9)";
            } else if (tempFormatted < -15) {
                container.style.background = "linear-gradient(to top, #E4E5E6, #00416A)";
            }
        }
    
      // Conditional to show different icons depending on weather
    const weatherIcon = (json, container) => {
        if (json.weather[0].main.includes('Clear')) {
            container.innerHTML += `<img class="weather-clear" src="./Icons/icons8-sun-250.png" alt="Clear sky icon">`;
            } else if (json.weather[0].main.includes('Rain')) {
            container.innerHTML += `<img class="weather-icon" src="./Icons/rain.png" alt="Rain icon">`;
            } else if (json.weather[0].main.includes('Drizzle')) {
            container.innerHTML += `<img class="weather-icon" src="./Icons/showerrain.png" alt="Drizzle icon">`;
            } else if (json.weather[0].main.includes('Clouds')) {
            container.innerHTML += `<img class="weather-icon" src="./Icons/brokenclouds.png" alt="Clouds icon">`;
            } else if (json.weather[0].main.includes('Thunderstorm')) {
            container.innerHTML += `<img class="weather-icon" src="./Icons/thunderstorm.png" alt="Thunder icon">`;
            } else if (json.weather[0].main.includes('Snow')) {
            container.innerHTML += `<img class="weather-icon" src="./Icons/snow.png" alt="Snow icon">`;
            } else {
            container.innerHTML += `<img class="weather-icon" src="./Icons/mist.png" alt="Mist icon">`;
            }
        }
      
//SYDNEY
fetch('https://api.openweathermap.org/data/2.5/weather?q=Sydney,AU&units=metric&APPID=156328eec9b7853e6ecd35c030202c4c') // Fetches current weather for Sydney
    .then((response) => {
        console.log(response)
        return response.json()
    })

    .then((json) => { 
        const tempFormatted = json.main.temp.toFixed(0) // Current temperature shown in Celsius with zero decimals
            sydneyContainer.innerHTML = `<h2>${json.name}</h2>`
            sydneyContainer.innerHTML += `<h1>${tempFormatted}°C</h1>` // Name of the city showing
            tempBackground(tempFormatted, sydneyContainer);
            weatherIcon(json, sydneyContainer);

        const sunrise = json.sys.sunrise; // Sunrise (in local time Sydney, Australia)
        const sunset = json.sys.sunset; // Sunrise (in local time Sydney, Australia)
            let sunsetTime = new Date(sunset*1000).toLocaleTimeString('sv-SE', {hour: '2-digit', minute: '2-digit',timeZone: 'Australia/Sydney'});
            let sunriseTime = new Date(sunrise*1000).toLocaleTimeString('sv-SE', {hour: '2-digit', minute: '2-digit', timeZone: 'Australia/Sydney'});
                sydneyContainer.innerHTML += `<h3>Sunrise ${sunriseTime} / Sunset ${sunsetTime}</h3>` // Time the sun rises
    
            return fetch('https://api.openweathermap.org/data/2.5/forecast?q=Sydney,AU&units=metric&appid=156328eec9b7853e6ecd35c030202c4c') // Forecast for Sydney for the next 5 days
        })

        .then((response) => {
                console.log(response)
                return response.json()
        })

        .then((json) => {
            const filteredForecast = json.list.filter((item) => item.dt_txt.includes('12:00'))
            console.log(filteredForecast)
            filteredForecast.forEach((dailyForecast) => {
                const forecastDay = new Date(dailyForecast.dt*1000);
                const day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(forecastDay); //This changes the index of date to the day of the week
                const minTempFormatted = dailyForecast.main.temp_min.toFixed(0);
                const maxTempFormatted = dailyForecast.main.temp_max.toFixed(0);
                    sydneyContainer.innerHTML += `<p>${day} – ${dailyForecast.weather[0].main}, min ${minTempFormatted}°C / max ${maxTempFormatted}°C</p>`
            });
        })
    

        
 //SINGAPORE
    .then(() => {
        return fetch('https://api.openweathermap.org/data/2.5/weather?q=Singapore&units=metric&APPID=156328eec9b7853e6ecd35c030202c4c') // Current weather in Singapore
    })

    .then((response) => {
        console.log(response)
        return response.json()
    })
    
    .then((json) => { // Updates HTML-container with weather data for Singapore
        const tempFormatted = json.main.temp.toFixed(0)
        singaporeContainer.innerHTML += `<h2>${json.name}</h2>`
        singaporeContainer.innerHTML += `<h1>${tempFormatted}°C</h1>`
        tempBackground(tempFormatted, singaporeContainer);
        weatherIcon(json, singaporeContainer);

        const sunrise = json.sys.sunrise;
        const sunset = json.sys.sunset;
            let sunsetTime = new Date(sunset*1000).toLocaleTimeString('sv-SE', {hour: '2-digit', minute: '2-digit',timeZone: 'Asia/Singapore'});
            let sunriseTime = new Date(sunrise*1000).toLocaleTimeString('sv-SE', {hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Singapore'});
            singaporeContainer.innerHTML += `<h3>Sunrise ${sunriseTime} / Sunset ${sunsetTime}</h3>` 

        return fetch('https://api.openweathermap.org/data/2.5/forecast?q=Singapore&units=metric&appid=156328eec9b7853e6ecd35c030202c4c')// Forecast for Singapore for the next 5 days
        })

    .then((response) => {
        console.log(response)
        return response.json()
    })

    .then(json => {
        const filteredForecast = json.list.filter((item) => item.dt_txt.includes('12:00'))
        console.log(filteredForecast)
        filteredForecast.forEach((dailyForecast) => {
            const forecastDay = new Date(dailyForecast.dt*1000);
            const day = new Intl.DateTimeFormat('en-US', {weekday: 'short' }).format(forecastDay); //This changes the index of date to the day of the week
            const minTempFormatted = dailyForecast.main.temp_min.toFixed(0);
            const maxTempFormatted = dailyForecast.main.temp_max.toFixed(0);
            singaporeContainer.innerHTML += `<p>${day} – ${dailyForecast.weather[0].main}, min ${minTempFormatted}°C / max ${maxTempFormatted}°C</p>`
        });
    })


// JOHANNESBURG
    .then(() => {
        return fetch('https://api.openweathermap.org/data/2.5/weather?q=Johannesburg&units=metric&APPID=156328eec9b7853e6ecd35c030202c4c')
    })

    .then((response) => {
        console.log(response)
        return response.json()
    })

    .then((json) => { // Updates HTML-container with weather data for  JOhannesburg
        const tempFormatted = json.main.temp.toFixed(0) //Change to (0) for no decimals
        johannesburgContainer.innerHTML += `<h2>${json.name}</h2>`
        johannesburgContainer.innerHTML += `<h1>${tempFormatted}°C</h1>`
        tempBackground(tempFormatted, johannesburgContainer);
        weatherIcon(json, johannesburgContainer);

        const sunrise = json.sys.sunrise;
        const sunset = json.sys.sunset;
            let sunsetTime = new Date(sunset*1000).toLocaleTimeString('sv-SE', {hour: '2-digit', minute: '2-digit',timeZone: 'Africa/Johannesburg'});
            let sunriseTime = new Date(sunrise*1000).toLocaleTimeString('sv-SE', {hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Johannesburg'});
            johannesburgContainer.innerHTML += `<h3>Sunrise ${sunriseTime} / Sunset ${sunsetTime}</h3>` 

        return fetch('https://api.openweathermap.org/data/2.5/forecast?q=Johannesburg&units=metric&appid=156328eec9b7853e6ecd35c030202c4c') // Forecast for Johannesburg for the next 5 days
        })

    .then((response) => {
        console.log(response)
        return response.json()
    })

    .then((json) => {
        const filteredForecast = json.list.filter((item) => item.dt_txt.includes('12:00'))
        console.log(filteredForecast)
        filteredForecast.forEach((dailyForecast) => {
            const forecastDay = new Date(dailyForecast.dt*1000);
            const day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(forecastDay); //This changes the index of date to the day of the week
            const minTempFormatted = dailyForecast.main.temp_min.toFixed(0);
            const maxTempFormatted = dailyForecast.main.temp_max.toFixed(0);
            johannesburgContainer.innerHTML += `<p>${day} – ${dailyForecast.weather[0].main}, min ${minTempFormatted}°C / max ${maxTempFormatted}°C</p>`
        });
    })

// LONDON
    .then(() => {
        return fetch('https://api.openweathermap.org/data/2.5/weather?q=London,UK&units=metric&APPID=156328eec9b7853e6ecd35c030202c4c') //Current weather in London
    })

    .then((response) => {
        console.log(response)
        return response.json()
    })

    // Update container with weather data for London
    .then((json) => { 
        const tempFormatted = json.main.temp.toFixed(0) //Change to (0) for no decimals
        londonContainer.innerHTML += `<h2>${json.name}</h2>`
        londonContainer.innerHTML += `<h1>${tempFormatted}°C</h1>`
        tempBackground(tempFormatted, londonContainer);
        weatherIcon(json, londonContainer);

        const sunrise = json.sys.sunrise;
        const sunset = json.sys.sunset;
            let sunsetTime = new Date(sunset*1000).toLocaleTimeString('sv-SE', {hour: '2-digit', minute: '2-digit',timeZone: 'Europe/London'});
            let sunriseTime = new Date(sunrise*1000).toLocaleTimeString('sv-SE', {hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London'});
            londonContainer.innerHTML += `<h3>Sunrise ${sunriseTime} / Sunset ${sunsetTime}</h3>` 

            return fetch('https://api.openweathermap.org/data/2.5/forecast?q=London,UK&units=metric&appid=156328eec9b7853e6ecd35c030202c4c')// Forecast for London for the next 5 days
        })

        .then((response) => {
            console.log(response)
            return response.json()
        })

    .then((json) => {
        const filteredForecast = json.list.filter((item) => item.dt_txt.includes('12:00'))
        console.log(filteredForecast)

        filteredForecast.forEach((dailyForecast) => {
            const forecastDay = new Date(dailyForecast.dt*1000);
            const day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(forecastDay); //This changes the index of date to the day of the week
            const minTempFormatted = dailyForecast.main.temp_min.toFixed(0);
            const maxTempFormatted = dailyForecast.main.temp_max.toFixed(0);
            londonContainer.innerHTML += `<p>${day} – ${dailyForecast.weather[0].main}, min ${minTempFormatted}°C / max ${maxTempFormatted}°C</p>`
        });
    })


//VANCOUVER
.then (() => {
    return fetch('https://api.openweathermap.org/data/2.5/weather?q=Vancouver,CA&units=metric&APPID=156328eec9b7853e6ecd35c030202c4c')//Current weather in Miami
})

.then((response) => {
    console.log(response)
    return response.json()
})

// Update container with weather data for Vancouver
.then((json) => { 
    const tempFormatted = json.main.temp.toFixed(0) //Change to (0) for no decimals
    vancouverContainer.innerHTML += `<h2>${json.name}</h2>`
    vancouverContainer.innerHTML += `<h1>${tempFormatted}°C</h1>`
    tempBackground(tempFormatted, vancouverContainer);
    weatherIcon(json, vancouverContainer);

    const sunrise = json.sys.sunrise;
    const sunset = json.sys.sunset;
        let sunsetTime = new Date(sunset*1000).toLocaleTimeString('sv-SE', {hour: '2-digit', minute: '2-digit',timeZone: 'America/Vancouver'});
        let sunriseTime = new Date(sunrise*1000).toLocaleTimeString('sv-SE', {hour: '2-digit', minute: '2-digit', timeZone: 'America/Vancouver'});
        vancouverContainer.innerHTML += `<h3>Sunrise ${sunriseTime} / Sunset ${sunsetTime}</h3>` 

        return fetch('https://api.openweathermap.org/data/2.5/forecast?q=Vancouver,CA&units=metric&appid=156328eec9b7853e6ecd35c030202c4c') // Forecast for Miami for the next 5 days
    })

    .then((response) => {
        console.log(response)
        return response.json()
    })

    .then((json) => {
        const filteredForecast = json.list.filter((item) => item.dt_txt.includes('12:00'))
        console.log(filteredForecast)
        filteredForecast.forEach((dailyForecast) => {
            const forecastDay = new Date(dailyForecast.dt*1000);
            const day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(forecastDay); //This changes the index of date to the day of the week
            const minTempFormatted = dailyForecast.main.temp_min.toFixed(0);
            const maxTempFormatted = dailyForecast.main.temp_max.toFixed(0);
            vancouverContainer.innerHTML += `<p>${day} – ${dailyForecast.weather[0].main}, min ${minTempFormatted}°C / max ${maxTempFormatted}°C</p>`
        });
    })


// MINNEAPOLIS
    .then (() => {
        return fetch('https://api.openweathermap.org/data/2.5/weather?q=Minneapolis,US&units=metric&APPID=156328eec9b7853e6ecd35c030202c4c') //Current weather in Lima
    })

    .then((response) => {
        console.log(response)
        return response.json()
    })


    // Update container with weather data for Minneapolis
    .then((json) => { 
        const tempFormatted = json.main.temp.toFixed(0) //Change to (0) for no decimals
        minneapolisContainer.innerHTML += `<h2>${json.name}</h2>`
        minneapolisContainer.innerHTML += `<h1>${tempFormatted}°C</h1>`
        tempBackground(tempFormatted, minneapolisContainer);
        weatherIcon(json, minneapolisContainer);

        const sunrise = json.sys.sunrise;
        const sunset = json.sys.sunset;
            let sunsetTime = new Date(sunset*1000).toLocaleTimeString('sv-SE', {hour: '2-digit', minute: '2-digit',timeZone: 'America/Chicago'});
            let sunriseTime = new Date(sunrise*1000).toLocaleTimeString('sv-SE', {hour: '2-digit', minute: '2-digit', timeZone: 'America/Chicago'});
            minneapolisContainer.innerHTML += `<h3>Sunrise ${sunriseTime} / Sunset ${sunsetTime}</h3>` 

        return fetch('https://api.openweathermap.org/data/2.5/forecast?q=Minneapolis,US&units=metric&appid=156328eec9b7853e6ecd35c030202c4c')// Forecast for Lima for the next 5 days
    })

    .then((response) => {
        console.log(response)
        return response.json()
    })

    .then((json) => {
        const filteredForecast = json.list.filter((item) => item.dt_txt.includes('12:00'))
        console.log(filteredForecast)
        filteredForecast.forEach((dailyForecast) => {
            const forecastDay = new Date(dailyForecast.dt*1000);
            const day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(forecastDay); //This changes the index of date to the day of the week
            const minTempFormatted = dailyForecast.main.temp_min.toFixed(0);
            const maxTempFormatted = dailyForecast.main.temp_max.toFixed(0);
            minneapolisContainer.innerHTML += `<p>${day} – ${dailyForecast.weather[0].main}, min ${minTempFormatted}°C / max ${maxTempFormatted}°C</p>`
        });
    });