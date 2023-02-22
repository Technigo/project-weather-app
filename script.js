const container = document.getElementById('weatherMain')


fetch('https://api.openweathermap.org/data/2.5/weather?q=Sydney,AU&units=metric&APPID=156328eec9b7853e6ecd35c030202c4c')
    .then((response) => {
        console.log(response)
        return response.json()
    })


// Name of the city showing
    .then((json) => { 
        container.innerHTML = `<p>${json.name}</p>`



// Current temperature shown in Celsius with one decimal
        const tempFormatted = json.main.temp.toFixed(1) //Change to (0) for no decimals
            container.innerHTML += `<p>The temperature is ${tempFormatted} °C</p>`



// Current weather description
        container.innerHTML += `<p>Current weather is ${json.weather[0].description}</p>`



// Sunset and sunrise (in local time Sydney, Australia)
        const sunrise = json.sys.sunrise;
        let sunriseTime = new Date(sunrise*1000).toLocaleTimeString('sv-SE', {hour: '2-digit', minute: '2-digit', timeZone: 'Australia/Sydney'});//This code shows the time as SE-time (ex 08:40/22:40)
     
            container.innerHTML += `<p>
            <img src="/icons8-sunrise-64.png" class="logo-sunrise" alt="Logo of sunrise">
            The sun rises at ${sunriseTime}
            </p>`


        const sunset = json.sys.sunset;
        let sunsetTime = new Date(sunset*1000).toLocaleTimeString('eng-US', {hour: '2-digit', minute: '2-digit',timeZone: 'Australia/Sydney'});////This code shows the time as eng-US (ex 08:40 AM/08:40 PM)
            container.innerHTML += `<p>
            <img src="/icons8-sunset-64.png" class="logo-sunset" alt="Logo of sunset">
            The sun sets at ${sunsetTime}
            </p>`
    });



// Forecast for the next 5 days
fetch('https://api.openweathermap.org/data/2.5/forecast?q=Sydney,Australia&units=metric&appid=156328eec9b7853e6ecd35c030202c4c')
    .then((response) => {
        console.log(response)
        return response.json()
    })

    .then((json) => {
        const filteredForecast = json.list.filter((item) => item.dt_txt.includes('12:00'))
        console.log(filteredForecast)

        filteredForecast.forEach((dailyForecast) => {
            const forecastDay = new Date(dailyForecast.dt*1000);
            const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(forecastDay); //This changes the index of the date to the day of the week
                container.innerHTML += `<p>The weather on ${day} is ${dailyForecast.weather[0].description}</p>`
        });
    });