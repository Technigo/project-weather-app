const weatherMain = document.getElementById('weatherMain');
const weatherFiveDays = document.getElementById('weatherFiveDays');
const searchbar = document.getElementById('searchbar');




fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=39ac623b36ceedc5f50d07bfc1d9ced3')
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        weatherMain.innerHTML += `<h1>${json.main.temp.toFixed(1)}</h1>`;
        // console.log(Math.round((json.main.temp * 10) / 10))                  // varför funkar inte det här?
        weatherMain.innerHTML = `<h2>${json.name}</h2>`;
        weatherMain.innerHTML += `<h3>${json.weather[0].description}</h3>`;
        weatherMain.innerHTML += `<p>${json.main.temp_min.toFixed(1)}</p>`;
        weatherMain.innerHTML += `<p>${json.main.temp_max.toFixed(1)}</p>`;
        // console.log(Math.round((json.main.temp_max * 10) / 10))              // varför funkar inte det här?
        
  
        const sunrise = new Date(json.sys.sunrise * 1000);
        const sunriseShort = sunrise.toLocaleTimeString([], { timeStyle: 'short' });
        const sunset = new Date(json.sys.sunset * 1000);
        const sunsetShort = sunset.toLocaleTimeString([], { timeStyle: 'short' });

        weatherMain.innerHTML += `<p>${sunriseShort}</p>`
        weatherMain.innerHTML += `<p>${sunsetShort}</p>`
        // const weatherDescription = json.weather.map(description => {        // varför funkar inte det här?
        //     console.log(description); 
        //     description.map(innerArray => {
        //         console.log(innerArray); 
        //     })
        //     return json.weather.description
      
        // })
        // weatherMain.innerHTML += `<p>${weatherDescription}</p>`;
        
    });


   


