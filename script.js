const weatherWrapper  = document.getElementById ('weather-wrapper')

fetch ('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d9838d8630b03a974ed368611cffd256')

.then ((response) => {
    return response.json()
})

.then ((data) => {
    console.log (data)
    weatherWrapper.innerHTML += `
    <div id="city-name" class="city-name"> ${data.name}</div>`

    data.weather.forEach((weatherDescription) => { //.weather comes from the API - it is an object name
        weatherWrapper.innerHTML +=
        `${weatherDescription.description}`
    })
    const roundedTemp = Math.round(data.main.temp * 10)/10;
    //console.log(roundedTemp)
    weatherWrapper.innerHTML +=
    `<div id='main-temp' class='main-temp'>${roundedTemp} Celcius</div>`

})