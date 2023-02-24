const weatherWrapper = document.getElementById ('weather-wrapper')
const searchBar = document.getElementById ('searchbar')

fetch ('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d9838d8630b03a974ed368611cffd256')

.then ((response) => {
    return response.json()
})

.then ((data) => {
    console.log (data)

    //Showing different text depending on the main descritption of the weather
    //.style to apply different styling to the statements

    data.weather.forEach((weatherDescription) => { //.weather comes from the API - it is an object name
    
    if (weatherDescription.main === 'Clear') {
        const gradientClear = 'linear-gradient(#F7E9B9 10%, #FC7200)' // Sets color and direction of gradient
        weatherWrapper.style.background = gradientClear; 
        weatherWrapper.style.color = "#2A5510"; // Color for the text
        weatherWrapper.innerHTML = `
        <div class="clear">
        <img src="./img/sunglasses.svg" alt="sun-glasses icon"></img>
        <p> Get your sunnies on. ${data.name} is looking rather great today.
        </p>
        </div>`;
       
    } 
     else if (weatherDescription.main === 'Clouds') {
     const gradientClouds = 'linear-gradient(#F4F7F8 10%, #BDC4C6)'
        weatherWrapper.style.background = gradientClouds;
        weatherWrapper.style.color = "#F47775";
        weatherWrapper.innerHTML = `
        <div class="clouds">
        <img src="./img/cloud.svg" alt="cloud icon"></img>
        <p> Light a fire and get cosy. ${data.name} looks grey today.
        </p>
        </div>`;
    }  
    else if (weatherDescription.main === 'Rain' | "Drizzle") {
       const gradientClouds = 'linear-gradient(#164A68 10%, #A3DEF7)'
        weatherWrapper.style.background = gradientClouds;
        weatherWrapper.style.color = "#164A68";
        weatherWrapper.innerHTML = `
        <div class="rain">
        <img src="./img/umbrella.svg" alt="rain icon"></img>
        <p> Don’t forget your umbrella. It’s wet in ${data.name} today.
        </p>
        </div>`;
    } 
    else if (weatherDescription.main === 'Snow') {
        const gradientSnow = 'linear-gradient(#A3DEF7 10%, #F4F7F8)'
        weatherWrapper.style.background = gradientSnow;
        weatherWrapper.style.color = "#AEB6FF";
        weatherWrapper.innerHTML = `
        <div class="snow">
        <img src="./img/snow-01.svg" alt="snow icon"></img>
        <p> Light a fire and get cosy. ${data.name} looks snowy today.
        </p>
        </div>`;
    } 
    else {
        const gradientOther= 'linear-gradient(#000000 10%, #F4F7F8)'
        weatherWrapper.style.background = gradientOther;
        weatherWrapper.style.color = "#F47775";
        weatherWrapper.innerHTML =
        `<div class="other">
        <p> Go to the window and find out! </p>
        </div>`
    }
 
    })

    const roundedTemp = Math.round(data.main.temp * 10)/10;
    console.log(roundedTemp)
    weatherWrapper.innerHTML +=
    `<div id='main-temp' class='main-temp'><p>${roundedTemp}°C</p></div>`
})


    //Same function as above but changes depending on what you type in the searcbar
    searchbar.addEventListener('change', () => {

    fetch (`https://api.openweathermap.org/data/2.5/weather?q=${searchbar.value}&units=metric&APPID=d9838d8630b03a974ed368611cffd256`)

    .then ((response) => {
    return response.json()
})

.then ((data) => {
    console.log (data)
     searchbar.value = '';

    //Showing different text depending on the main descritption of the weather
    //.style to apply different styling to the statements

    data.weather.forEach((weatherDescription) => { //.weather comes from the API - it is an object name
    
    if (weatherDescription.main === 'Clear') {
        const gradientClear = 'linear-gradient(#F7E9B9 10%, #FC7200)' // Sets color and direction of gradient
        weatherWrapper.style.background = gradientClear;
        weatherWrapper.style.color = "#2A5510"; // Color for the text
        weatherWrapper.innerHTML = `
        <div class="clear">
        <img src="./img/sunglasses.svg" alt="sun-glasses icon"></img>
        <p> Get your sunnies on. ${data.name} is looking rather great today.
        </p>
        </div>`;
       
    } 
     else if (weatherDescription.main === 'Clouds') {
     const gradientClouds = 'linear-gradient(#F4F7F8 10%, #BDC4C6)'
        weatherWrapper.style.background = gradientClouds;
        weatherWrapper.style.color = "#F47775";
        weatherWrapper.innerHTML = `
        <div class="clouds">
        <img src="./img/cloud.svg" alt="cloud icon"></img>
        <p> Light a fire and get cosy. ${data.name} looks grey today.
        </p>
        </div>`;
    }  
    else if (weatherDescription.main === 'Rain' | "Drizzle") {
       const gradientClouds = 'linear-gradient(#164A68 10%, #A3DEF7)'
        weatherWrapper.style.background = gradientClouds;
        weatherWrapper.style.color = "#164A68";
        weatherWrapper.innerHTML = `
        <div class="rain">
        <img src="./img/umbrella.svg" alt="rain icon"></img>
        <p> Don’t forget your umbrella. It’s wet in ${data.name} today.
        </p>
        </div>`;
    } 
    else if (weatherDescription.main === 'Snow') {
        const gradientSnow = 'linear-gradient(#A3DEF7 10%, #F4F7F8)'
        weatherWrapper.style.background = gradientSnow;
        weatherWrapper.style.color = "#AEB6FF";
        weatherWrapper.innerHTML = `
        <div class="snow">
        <img src="./img/snow-01.svg" alt="snow icon"></img>
        <p> Light a fire and get cosy. ${data.name} looks snowy today.
        </p>
        </div>`;
    } 
    else {
        const gradientOther= 'linear-gradient(#000000 10%, #F4F7F8)'
        weatherWrapper.style.background = gradientOther;
        weatherWrapper.style.color = "#F47775";
        weatherWrapper.innerHTML =
        `<div class="other">
        <p> Go to the window and find out! </p>
        </div>`
    }
    })
        const roundedTemp = Math.round(data.main.temp * 10)/10;
    console.log(roundedTemp)
    weatherWrapper.innerHTML +=
    `<div id='main-temp' class='main-temp'><p>${roundedTemp}°C</p></div>`
})
    })