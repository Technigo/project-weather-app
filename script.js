const weatherWrapper  = document.getElementById ('weather-wrapper')

fetch ('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d9838d8630b03a974ed368611cffd256')

.then ((response) => {
    return response.json()
})

.then ((data) => {
    console.log (data)
    weatherWrapper.innerHTML += `
    <div id="city-name" class="city-name"> ${data.name}</div>`

    // data.weather.forEach((weatherDescription) => { //.weather comes from the API - it is an object name
    //     weatherWrapper.innerHTML +=
    //     `${weatherDescription.description}`
    // })
    
    const mainWeather = (data.weather[0].main);
    //console.log(mainWeather)
    const roundedTemp = Math.round(data.main.temp * 10)/10;
    //console.log(roundedTemp)
    const sunriseDateAndTime = new Date(data.sys.sunrise * 1000); //*1000 makes it correct date and time, but don't know why
    let hoursrise = sunriseDateAndTime.getHours();
    let minutesrise = sunriseDateAndTime.getMinutes(); 
    console.log(sunriseDateAndTime);
    console.log(hoursrise);
    console.log(minutesrise);

    weatherWrapper.innerHTML +=
    `<p><span id='weather-description' class = 'weather-description'>${mainWeather}</span> | <span id='main-temp' class='main-temp'>${roundedTemp}°C</span>
    <p><span id='sunrise' class = 'sunrise'>Sunrise:</span><p>
    <p><span id='sunset' class = 'sunset'>Sunset:</span><p>
     `
})