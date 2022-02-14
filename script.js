const weatherContainer = document.getElementById ('weatherContainer');

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=16decfbdca757a425e796503a595bad8')
    .then((res) => res.json())
    .then((data) => { 
        console.log(data)
        let tempRemoveDecimals = Math.floor(data.main.temp)  // To make the number "round" without decimals. 
    weatherContainer.innerHTML += `
    <h1 id="currentTemp">${tempRemoveDecimals}</h1>
    <p id="city">${data.name}</p>
    <p id="typeOfWeather">${data.weather[0].description}</p>
    ` 
    
        

    }) 
