const weatherWrapper  = document.getElementById ('weather-wrapper')

fetch ('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d9838d8630b03a974ed368611cffd256')

.then ((response) => {
    return response.json()
})

.then ((data) => {
    console.log (data)
   
 /*    weatherWrapper.innerHTML += `
    <div id="city-name" class="city-name"> ${data.name}</div>` */

    data.weather.forEach((weatherDescription) => { //.weather comes from the API - it is an object name
    
    if (weatherDescription.main === 'Clear') {
        weatherWrapper.innerHTML = `
        <div class="clear">
        <img src="./img/sunglasses.svg" alt="sun-glasses icon"></img>
        <p> Get your sunnies on. ${data.name} is looking rather great today.
        </p>
        </div>`;
       
    } 
    else if (weatherDescription.main === 'Clouds') {
        weatherWrapper.innerHTML = `
        <div class="clouds">
        <img src="./img/cloud.svg" alt="cloud icon"></img>
        <p> Light a fire and get cosy. ${data.name} looks grey today.
        </p>
        </div>`;
    } 
    else if (weatherDescription.main === 'Rain' | "Drizzle") {
        weatherWrapper.innerHTML = `
        <img src="./img/rain.svg" alt="rain icon"></img>
        <p> Don’t forget your umbrella. It’s wet in ${data.name} today.
        </p>`;
    } 
    else if (weatherDescription.main === 'Snow') {
        weatherWrapper.innerHTML = `
        <img src="./img/snow.svg" alt="snow icon"></img>
        <p> Light a fire and get cosy. ${data.name} looks snowy today.
        </p>`;
    } 
    else {
        weatherWrapper.innerHTML =
        `<p> Go to the window and find out! </p>`
    }
    })
    const roundedTemp = Math.round(data.main.temp * 10)/10;
    //console.log(roundedTemp)
    weatherWrapper.innerHTML +=
    `<div id='main-temp' class='main-temp'>${roundedTemp} Celcius</div>`
})