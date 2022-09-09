const weatherMain = document.getElementById('weatherMain');
const weatherFiveDays = document.getElementById('weatherFiveDays');
const search = document.getElementById('search');
const searchbar = document.getElementById('searchbar');
const searchBtn = document.getElementById('searchBtn'); 

// const containerYouWantToAddImageTo 

const startUpCity = () => {
fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=39ac623b36ceedc5f50d07bfc1d9ced3')
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        
        weatherMain.innerHTML += `<h1>${json.main.temp.toFixed(1)}</h1><h4>°C</h4>`;
        // console.log(Math.round((json.main.temp * 10) / 10))                  // varför funkar inte det här?
        
        weatherMain.innerHTML += `<img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" alt="" />`;
        
        weatherMain.innerHTML += `<h2>${json.name}</h2>`;

        const weathers = json.weather
            weathers.map((weatherArrary) => {
                weatherMain.innerHTML += `<h3>${weatherArrary.description}</h3>`;
            })  

        weatherMain.innerHTML += `<p>Min ${json.main.temp_min.toFixed(1)} °C</p>`;
        weatherMain.innerHTML += `<p>Max ${json.main.temp_max.toFixed(1)} °C</p>`;
        // console.log(Math.round((json.main.temp_max * 10) / 10))              // varför funkar inte det här?

        const sunrise = new Date(json.sys.sunrise * 1000);
        const sunriseShort = sunrise.toLocaleTimeString([], { timeStyle: 'short' });
        const sunset = new Date(json.sys.sunset * 1000);
        const sunsetShort = sunset.toLocaleTimeString([], { timeStyle: 'short' });

        weatherMain.innerHTML += `<p>sunrise ${sunriseShort}</p>`
        weatherMain.innerHTML += `<p>sunset ${sunsetShort}</p>`

    });
   }

const weatherForecast= () => {
fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=39ac623b36ceedc5f50d07bfc1d9ced3')
    .then((response) => {
        return response.json();
    })
    .then ((json) => {
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
        weatherFiveDays.innerHTML += `<p>${json.list.temp.toFixed(1)}</p>`
    });
}


// fetch the data from the API. Then if you console.log the json
// you'll see that we only care about the array called list.

//const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
// filteredForecast is now an array with only the data from 12:00 each day.


   /*const newCitySearch = (event) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${event.target.value}units=metric&APPID=39ac623b36ceedc5f50d07bfc1d9ced3`)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            weatherMain.innerHTML += `<h1>${json.main.temp.toFixed(1)}</h1>`;
            // console.log(Math.round((json.main.temp * 10) / 10))                  // varför funkar inte det här?
            weatherMain.innerHTML = `<h2>${json.name}</h2>`;
            const weathers = json.weather
                weathers.map((weather) => {
                    weatherMain.innerHTML += `<h3>${weather.description}</h3>`;
                })    
            weatherMain.innerHTML += `<p>Min ${json.main.temp_min.toFixed(1)}</p>`;
            weatherMain.innerHTML += `<p>Max ${json.main.temp_max.toFixed(1)}</p>`;
            // console.log(Math.round((json.main.temp_max * 10) / 10))              // varför funkar inte det här?
    
            const sunrise = new Date(json.sys.sunrise * 1000);
            const sunriseShort = sunrise.toLocaleTimeString([], { timeStyle: 'short' });
            const sunset = new Date(json.sys.sunset * 1000);
            const sunsetShort = sunset.toLocaleTimeString([], { timeStyle: 'short' });
    
            weatherMain.innerHTML += `<p>sunrise ${sunriseShort}</p>`
            weatherMain.innerHTML += `<p>sunset ${sunsetShort}</p>`
    
        });
       }
*/
    startUpCity();

    search.innerHTML += `<button type="button" class="search-button" id="searchBtn">Search</button>`
    //searchBtn.addEventListener('click', newCitySearch)

    searchBtn.addEventListener('click', (event) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${event.searchBtn.name}units=metric&APPID=39ac623b36ceedc5f50d07bfc1d9ced3`)
        .then((response) => {
            return response.json();
    })
        .then(readableResponse => {
        weatherMain.innerHTML += `<h1>${json.main.temp.toFixed(1)}</h1>`;
        // console.log(Math.round((json.main.temp * 10) / 10))                  // varför funkar inte det här?
        weatherMain.innerHTML = `<h2>${json.name}</h2>`;
        const weathers = json.weather
            weathers.map((weather) => {
                weatherMain.innerHTML += `<h3>${weather.description}</h3>`; //kunna koppla bakgrund till?
            })    
        weatherMain.innerHTML += `<p>Min ${json.main.temp_min.toFixed(1)}</p>`;
        weatherMain.innerHTML += `<p>Max ${json.main.temp_max.toFixed(1)}</p>`;
        // console.log(Math.round((json.main.temp_max * 10) / 10))              // varför funkar inte det här?

        const sunrise = new Date(json.sys.sunrise * 1000);
        const sunriseShort = sunrise.toLocaleTimeString([], { timeStyle: 'short' }); 
        const sunset = new Date(json.sys.sunset * 1000);
        const sunsetShort = sunset.toLocaleTimeString([], { timeStyle: 'short' });

        weatherMain.innerHTML += `<p>sunrise ${sunriseShort}</p>` //koppla bakgrund till tid?
        weatherMain.innerHTML += `<p>sunset ${sunsetShort}</p>`
        })

    })
    
    
