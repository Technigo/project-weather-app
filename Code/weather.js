// fetch weather info, current day
fetch('https://api.openweathermap.org/data/2.5/weather?q=Nanaimo,CA&units=metric&APPID=1c52265fbcb1b6630b1b484fdf314634')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        // city, country, current temperature & weather description
        const cityCountry = document.getElementById('city-country');
        const currentTemp = document.getElementById('current-temp');
        const description = document.getElementById('description');

        cityCountry.innerHTML = `${json.name}, ${json.sys.country}`;
        currentTemp.innerHTML = `${json.main.temp.toFixed(1)}°c`;
        description.innerHTML = `${json.weather[0].description}`;

        // sunrise  
        const sunrise = document.getElementById('sunrise');
        const sunriseValue = json.sys.sunrise;
        const sRise = new Date(sunriseValue * 1000); // multiple with 1000 since the data is given in seconds and JS uses milliseconds
        const sunriseHour = sRise.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false});
            
        sunrise.innerHTML = `<img src="./Images/sunrise.png" style="float: left;"> Sunrise: ${sunriseHour}`;


        // sunset
        const sunset = document.getElementById('sunset');
        const sunsetValue = json.sys.sunset
        const sSet = new Date(sunsetValue * 1000);
        const sunsetHour = sSet.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false,});

        sunset.innerHTML = `<img src="./Images/sunset.png" style="float: right;">Sunset: ${sunsetHour}`;
        
    });

    //fetch 5 day forecast
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=Nanaimo,CA&units=metric&appid=1c52265fbcb1b6630b1b484fdf314634')
    .then((response) => {
        return response.json()
    })
    .then((json) => {

        // filter to display temperature from only 12:00 each day
        const forecasts = json.list
        const filteredForecast = forecasts.filter(forecast => forecast.dt_txt.includes("12:00:00"));

        // create weekday and temperature forEach filtered forecast
        filteredForecast.forEach((forecast) => {
            const temp = forecast.main.temp;
            const date = new Date(forecast.dt_txt);
            const options = { weekday: 'short' };
            const localDateString = date.toLocaleDateString('en-EN', options);
            const fiveDays = document.getElementById('five-days');
   
            fiveDays.innerHTML += `<p>${localDateString}. . . . . . . . . . . . . . . . . . .${temp.toFixed(1)}°c</p>`;
            
        });

    })
    
