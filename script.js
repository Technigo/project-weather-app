const container = document.getElementById('weatherMain');

      // Conditional to show different background colors depending on temperature
      const tempBackground = (tempFormatted, container) => {
        if (tempFormatted >= 25) {
                container.style.backgroundColor = "#AA0000";
            } else if (tempFormatted >= 15 && tempFormatted < 25) {
                container.style.backgroundColor = "#fb8500";
            } else if (tempFormatted >= 5 && tempFormatted < 15) {
                container.style.backgroundColor = "#ffb703";
            } else if (tempFormatted >= -5 && tempFormatted < 5) {
                container.style.backgroundColor = "#dad7cd";
            } else if (tempFormatted >= -15 && tempFormatted < -4) {
                container.style.backgroundColor = "#bde0fe";
            } else if (tempFormatted < -15) {
                container.style.backgroundColor = "#3a86ff";
            }
        }
    
      // Conditional to show different icons depending on weather
    const weatherIcon = (json, container) => {
        if (json.weather[0].description.includes('Clear')) {
            container.innerHTML += `<p>CLEAR SKY ICON</p>`;
            } else if (json.weather[0].main.includes('Rain')) {
            container.innerHTML += `<p>RAIN ICON</p>`;
            } else if (json.weather[0].main.includes('Drizzle')) {
            container.innerHTML += `<p>DRIZZLE ICON</p>`;
            } else if (json.weather[0].main.includes('Clouds')) {
            container.innerHTML += `<p>CLOUDS ICON</p>`;
            } else if (json.weather[0].main.includes('Thunderstorm')) {
            container.innerHTML += `<p>THUNDERSTORM ICON</p>`;
            } else if (json.weather[0].main.includes('Snow')) {
            container.innerHTML += `<p>SNOW ICON</p>`;
            } else {
            container.innerHTML += `<p>ATMOSPHERE ICON</p>`;
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
            container.innerHTML = `<h1>${tempFormatted}°C</h1>`
            container.innerHTML += `<h2>${json.name}</h2>` // Name of the city showing
            container.innerHTML += `<p>Current weather is ${json.weather[0].description}</p>` // Current weather description
            tempBackground(tempFormatted, container);
            weatherIcon(json, container);

        const sunrise = json.sys.sunrise; // Sunrise (in local time Sydney, Australia)
        const sunset = json.sys.sunset; // Sunrise (in local time Sydney, Australia)
            let sunsetTime = new Date(sunset*1000).toLocaleTimeString('sv-SE', {hour: '2-digit', minute: '2-digit',timeZone: 'Australia/Sydney'});
            let sunriseTime = new Date(sunrise*1000).toLocaleTimeString('sv-SE', {hour: '2-digit', minute: '2-digit', timeZone: 'Australia/Sydney'});
                container.innerHTML += `<p>Sunrise ${sunriseTime} / Sunset ${sunsetTime}</p>` // Time the sun rises
    
            return fetch('https://api.openweathermap.org/data/2.5/forecast?q=Sydney,AU&units=metric&appid=156328eec9b7853e6ecd35c030202c4c') // Forecast for Sydney for the next 5 days
        })

        .then((response) => {
                console.log(response)
                return response.json()
        })

        .then((json) => {
            const filteredForecast = json.list.filter((item) => item.dt_txt.includes('12:00'))
            console.log(filteredForecast)
            container.innerHTML += '<h2>5-Day Forecast for Sydney</h2>';

            filteredForecast.forEach((dailyForecast) => {
                const forecastDay = new Date(dailyForecast.dt*1000);
                const day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(forecastDay); //This changes the index of date to the day of the week
                const minTempFormatted = dailyForecast.main.temp_min.toFixed(0);
                const maxTempFormatted = dailyForecast.main.temp_max.toFixed(0);
                    container.innerHTML += `<p>${day} is ${dailyForecast.weather[0].description}, min ${minTempFormatted}°C / max ${maxTempFormatted}°C</p>`
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
        container.innerHTML += `<h1>${tempFormatted}°C</h1>`
        container.innerHTML += `<h2>${json.name}</h2>`
        container.innerHTML += `<p>Current weather is ${json.weather[0].description}</p>`
        tempBackground(tempFormatted, container);
        weatherIcon(json, container);

        const sunrise = json.sys.sunrise;
        const sunset = json.sys.sunset;
            let sunsetTime = new Date(sunset*1000).toLocaleTimeString('sv-SE', {hour: '2-digit', minute: '2-digit',timeZone: 'Asia/Singapore'});
            let sunriseTime = new Date(sunrise*1000).toLocaleTimeString('sv-SE', {hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Singapore'});
                container.innerHTML += `<p>Sunrise ${sunriseTime} / Sunset ${sunsetTime}</p>` 

        return fetch('https://api.openweathermap.org/data/2.5/forecast?q=Singapore&units=metric&appid=156328eec9b7853e6ecd35c030202c4c')// Forecast for Singapore for the next 5 days
        })

    .then((response) => {
        console.log(response)
        return response.json()
    })

    .then(json => {
        const filteredForecast = json.list.filter((item) => item.dt_txt.includes('12:00'))
        console.log(filteredForecast)
        container.innerHTML += '<h2>5-Day Forecast for Singapore</h2>';

        filteredForecast.forEach((dailyForecast) => {
            const forecastDay = new Date(dailyForecast.dt*1000);
            const day = new Intl.DateTimeFormat('en-US', {weekday: 'short' }).format(forecastDay); //This changes the index of date to the day of the week
            const minTempFormatted = dailyForecast.main.temp_min.toFixed(0);
            const maxTempFormatted = dailyForecast.main.temp_max.toFixed(0);
                container.innerHTML += `<p>${day} is ${dailyForecast.weather[0].description}, min ${minTempFormatted}°C / max ${maxTempFormatted}°C</p>`
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
        container.innerHTML += `<h1>${tempFormatted}°C</h1>`
        container.innerHTML += `<h2>${json.name}</h2>`
        container.innerHTML += `<p>Current weather is ${json.weather[0].description}</p>`
        tempBackground(tempFormatted, container);
        weatherIcon(json, container);

        const sunrise = json.sys.sunrise;
        const sunset = json.sys.sunset;
            let sunsetTime = new Date(sunset*1000).toLocaleTimeString('sv-SE', {hour: '2-digit', minute: '2-digit',timeZone: 'Africa/Johannesburg'});
            let sunriseTime = new Date(sunrise*1000).toLocaleTimeString('sv-SE', {hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Johannesburg'});
                container.innerHTML += `<p>Sunrise ${sunriseTime} / Sunset ${sunsetTime}</p>` 

        return fetch('https://api.openweathermap.org/data/2.5/forecast?q=Johannesburg&units=metric&appid=156328eec9b7853e6ecd35c030202c4c') // Forecast for Johannesburg for the next 5 days
        })

    .then((response) => {
        console.log(response)
        return response.json()
    })

    .then((json) => {
        const filteredForecast = json.list.filter((item) => item.dt_txt.includes('12:00'))
        console.log(filteredForecast)
        container.innerHTML += '<h2>5-Day Forecast for Johannesburg</h2>';

        filteredForecast.forEach((dailyForecast) => {
            const forecastDay = new Date(dailyForecast.dt*1000);
            const day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(forecastDay); //This changes the index of date to the day of the week
            const minTempFormatted = dailyForecast.main.temp_min.toFixed(0);
            const maxTempFormatted = dailyForecast.main.temp_max.toFixed(0);
                container.innerHTML += `<p>${day} is ${dailyForecast.weather[0].description}, min ${minTempFormatted}°C / max ${maxTempFormatted}°C</p>`
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
        container.innerHTML += `<h1>${tempFormatted}°C</h1>`
        container.innerHTML += `<h2>${json.name}</h2>`
        container.innerHTML += `<p>Current weather is ${json.weather[0].description}</p>`
        tempBackground(tempFormatted, container);
        weatherIcon(json, container);

        const sunrise = json.sys.sunrise;
        const sunset = json.sys.sunset;
            let sunsetTime = new Date(sunset*1000).toLocaleTimeString('sv-SE', {hour: '2-digit', minute: '2-digit',timeZone: 'Europe/London'});
            let sunriseTime = new Date(sunrise*1000).toLocaleTimeString('sv-SE', {hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London'});
                    container.innerHTML += `<p>Sunrise ${sunriseTime} / Sunset ${sunsetTime}</p>` 

            return fetch('https://api.openweathermap.org/data/2.5/forecast?q=London,UK&units=metric&appid=156328eec9b7853e6ecd35c030202c4c')// Forecast for London for the next 5 days
        })

        .then((response) => {
            console.log(response)
            return response.json()
        })

    .then((json) => {
        const filteredForecast = json.list.filter((item) => item.dt_txt.includes('12:00'))
        console.log(filteredForecast)
        container.innerHTML += '<h2>5-Day Forecast for London</h2>';

        filteredForecast.forEach((dailyForecast) => {
            const forecastDay = new Date(dailyForecast.dt*1000);
            const day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(forecastDay); //This changes the index of date to the day of the week
            const minTempFormatted = dailyForecast.main.temp_min.toFixed(0);
            const maxTempFormatted = dailyForecast.main.temp_max.toFixed(0);
                container.innerHTML += `<p>${day} is ${dailyForecast.weather[0].description}, min ${minTempFormatted}°C / max ${maxTempFormatted}°C</p>`
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
    container.innerHTML += `<h1>${tempFormatted}°C</h1>`
    container.innerHTML += `<h2>${json.name}</h2>`
    container.innerHTML += `<p>Current weather is ${json.weather[0].description}</p>`
    tempBackground(tempFormatted, container);
    weatherIcon(json, container);

    const sunrise = json.sys.sunrise;
    const sunset = json.sys.sunset;
        let sunsetTime = new Date(sunset*1000).toLocaleTimeString('sv-SE', {hour: '2-digit', minute: '2-digit',timeZone: 'America/Vancouver'});
        let sunriseTime = new Date(sunrise*1000).toLocaleTimeString('sv-SE', {hour: '2-digit', minute: '2-digit', timeZone: 'America/Vancouver'});
            container.innerHTML += `<p>Sunrise ${sunriseTime} / Sunset ${sunsetTime}</p>` 

        return fetch('https://api.openweathermap.org/data/2.5/forecast?q=Vancouver,CA&units=metric&appid=156328eec9b7853e6ecd35c030202c4c') // Forecast for Miami for the next 5 days
    })

    .then((response) => {
        console.log(response)
        return response.json()
    })

    .then((json) => {
        const filteredForecast = json.list.filter((item) => item.dt_txt.includes('12:00'))
        console.log(filteredForecast)
        container.innerHTML += '<h2>5-Day Forecast for Vancouver</h2>';

        filteredForecast.forEach((dailyForecast) => {
            const forecastDay = new Date(dailyForecast.dt*1000);
            const day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(forecastDay); //This changes the index of date to the day of the week
            const minTempFormatted = dailyForecast.main.temp_min.toFixed(0);
            const maxTempFormatted = dailyForecast.main.temp_max.toFixed(0);
                container.innerHTML += `<p>${day} is ${dailyForecast.weather[0].description}, min ${minTempFormatted}°C / max ${maxTempFormatted}°C</p>`
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


    // Update container with weather data for Lima
    .then((json) => { 
        const tempFormatted = json.main.temp.toFixed(0) //Change to (0) for no decimals
        container.innerHTML += `<h1>${tempFormatted}°C</h1>`
        container.innerHTML += `<h2>${json.name}</h2>`
        container.innerHTML += `<p>Current weather is ${json.weather[0].description}</p>`
        tempBackground(tempFormatted, container);
        weatherIcon(json, container);

        const sunrise = json.sys.sunrise;
        const sunset = json.sys.sunset;
            let sunsetTime = new Date(sunset*1000).toLocaleTimeString('sv-SE', {hour: '2-digit', minute: '2-digit',timeZone: 'America/Chicago'});
            let sunriseTime = new Date(sunrise*1000).toLocaleTimeString('sv-SE', {hour: '2-digit', minute: '2-digit', timeZone: 'America/Chicago'});
                container.innerHTML += `<p>Sunrise ${sunriseTime} / Sunset ${sunsetTime}</p>` 

        return fetch('https://api.openweathermap.org/data/2.5/forecast?q=Minneapolis,US&units=metric&appid=156328eec9b7853e6ecd35c030202c4c')// Forecast for Lima for the next 5 days
    })

    .then((response) => {
        console.log(response)
        return response.json()
    })

    .then((json) => {
        const filteredForecast = json.list.filter((item) => item.dt_txt.includes('12:00'))
        console.log(filteredForecast)
        container.innerHTML += '<h2>5-Day Forecast for Minneapolis</h2>';

        filteredForecast.forEach((dailyForecast) => {
            const forecastDay = new Date(dailyForecast.dt*1000);
            const day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(forecastDay); //This changes the index of date to the day of the week
            const minTempFormatted = dailyForecast.main.temp_min.toFixed(0);
            const maxTempFormatted = dailyForecast.main.temp_max.toFixed(0);
                container.innerHTML += `<p>${day} is ${dailyForecast.weather[0].description}, min ${minTempFormatted}°C / max ${maxTempFormatted}°C</p>`
        });
    });