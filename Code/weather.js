// fetch for weather info, current day

fetch('http://api.openweathermap.org/data/2.5/weather?q=Nanaimo,CA&units=metric&APPID=1c52265fbcb1b6630b1b484fdf314634')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        //city, country, current temperature & weather description
        const cityCountry = document.getElementById('city-country');
        const currentTemp = document.getElementById('current-temp');

        cityCountry.innerHTML = `${json.name}, ${json.sys.country}`;
        currentTemp.innerHTML = `${json.main.temp}°C, ${json.weather[0].description}`;

        //sunrise
        const sunrise = document.getElementById('sunrise');
        const sunriseValue = json.sys.sunrise
        const sRise = new Date(sunriseValue * 1000); // multiple with 1000 since the data is given in seconds and JS uses milliseconds
        const sunriseHour = sRise.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false});
            
        sunrise.innerHTML = `Sunrise: ${sunriseHour}`;

        //sunset
        const sunset = document.getElementById('sunset');
        const sunsetValue = json.sys.sunset
        const sSet = new Date(sunsetValue * 1000);
        const sunsetHour = sSet.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false,});

        sunset.innerHTML = `Sunset: ${sunsetHour}`;

    });


    
