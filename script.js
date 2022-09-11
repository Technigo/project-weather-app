document.addEventListener('DOMContentLoaded', () => {

    const weatherMain = document.getElementById('weatherMain');
    const weatherFiveDays = document.getElementById('weatherFiveDays');
    const searchbar = document.getElementById('searchbar');
       
    // the defult main weather-forcast 
    const startUpCity = () => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=39ac623b36ceedc5f50d07bfc1d9ced3')
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            
            // Default city temperature right now
            weatherMain.innerHTML = `<h1>${json.main.temp.toFixed(1)}</h1><h4>°C</h4>`;
        
            // Default city icon-representation of the weather
            weatherMain.innerHTML += `<img src='https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png' alt='' />`;
            
            // Default city 
            weatherMain.innerHTML += `<h2>${json.name}</h2>`;
            
            // Default city weather description
            const weathers = json.weather;
                weathers.map((weatherArrary) => {
                    weatherMain.innerHTML += `<h3>${weatherArrary.description}</h3>`;
                });     
            
            // Default city temperature max/min today
            weatherMain.innerHTML += `
                <div class='temp'>
                    <p>Min ${json.main.temp_min.toFixed(1)} °C</p>
                    <p>Max ${json.main.temp_max.toFixed(1)} °C</p>
                </div>
            `;

            // Default city sunrise/sunset
            const sunrise = new Date(json.sys.sunrise * 1000); 
            const sunriseShort = sunrise.toLocaleTimeString([], { timeStyle: 'short' });
            const sunset = new Date(json.sys.sunset * 1000);
            const sunsetShort = sunset.toLocaleTimeString([], { timeStyle: 'short' });

            weatherMain.innerHTML += `
                <div class='sunmovement'>    
                    <p>sunrise ${sunriseShort}</p>
                    <p>sunset ${sunsetShort}</p>
                </div>
            `;

        });
    }

    // the weather forecast for the next 5 days
    const weatherForecast = () => {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=39ac623b36ceedc5f50d07bfc1d9ced3')
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            
            // The Function that filters out the days, because every new day starts with 00:00:00
            const fiveDayForecast = json.list.filter((newDay) =>
                newDay.dt_txt.includes('00:00:00')
            );

            // Sorts out the dates so every timeslot of a certain day is bundled together in their own array 
            const objectDate = {};

            json.list.map((item) => {
                const date = item.dt_txt.split(' ')[0];
                if (objectDate[date]) {
                    objectDate[date].push(item);
                } else {
                    objectDate[date] = [item];
                }
            });

            // The function that creates the HTML elements for the temperature and finds the daily min and max temperatures 
            fiveDayForecast.map((item) => {
                const dailyRows = document.createElement('div');
                
                const date = item.dt_txt.split(' ')[0];
                const weatherData = objectDate[date];

                // For-loop that gets the icon for the dailyRow from data for 12:00
                let icon = '02d';
                let i;
                for (i=0; i<weatherData.length; i++) {
                    if (weatherData[i].dt_txt.split(' ')[1] === '12:00:00') {
                        icon = weatherData[i].weather[0].icon;
                    }
                }

                // The day
                let day = new Date(item.dt * 1000).getDay();
                const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
                
                // Calculate the temperature for the day
                const temps = weatherData.map((value) => value.main.temp);           
                const minTemp = Math.min(...temps);
                const maxTemp = Math.max(...temps);

                dailyRows.innerHTML += `
                    <div>${days[day]}</div>
                    <img src='https://openweathermap.org/img/wn/${icon}@2x.png' alt='' />
                    <div>${maxTemp.toFixed(0)}° / ${minTemp.toFixed(0)} °C</div>
                `;
            
                dailyRows.classList.add(`forecast-day`);
                weatherFiveDays.appendChild(dailyRows);
            });
        })
    }

    startUpCity();
    weatherForecast();  

    // Search new city
    searchbar.addEventListener('change', () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchbar.value}&units=metric&APPID=39ac623b36ceedc5f50d07bfc1d9ced3`)
            .then((response) => {
                if(response.status === 200) {
                    weatherMain.innerHTML = '';
                    return response.json();
                } else {
                    weatherMain.innerHTML = '';
                    weatherMain.innerHTML = `<h2 class='error'>Sorry, We can't find ${searchbar.value}.</h2><h2 class='error'>Did you spell it correctly?</h2>`
                    throw(new Error('bad response'))
                }
                
            })
            .then((json) => {
                    searchbar.value = '';
            
                    weatherMain.innerHTML += `<h1>${json.main.temp.toFixed(1)}</h1><h4>°C</h4>`;
                
                    weatherMain.innerHTML += `<img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" alt="" />`;
                    
                    weatherMain.innerHTML += `<h2>${json.name}</h2>`;
                    
                    const weathers = json.weather
                        weathers.map((weatherArrary) => {
                            weatherMain.innerHTML += `<h3>${weatherArrary.description}</h3>`;
                        })  

                    weatherMain.innerHTML += `
                    <div class='temp'>
                        <p>Min ${json.main.temp_min.toFixed(1)} °C</p>
                        <p>Max ${json.main.temp_max.toFixed(1)} °C</p>
                    </div>
                    `;

                    const sunrise = new Date(json.sys.sunrise * 1000);
                    const sunriseShort = sunrise.toLocaleTimeString([], { timeStyle: 'short' });
                    const sunset = new Date(json.sys.sunset * 1000);
                    const sunsetShort = sunset.toLocaleTimeString([], { timeStyle: 'short' });

                    weatherMain.innerHTML += `
                        <div class='sunmovement'>    
                            <p>sunrise ${sunriseShort}</p>
                            <p>sunset ${sunsetShort}</p>
                        </div>
                    `;

            });

        // the weather forecast for the next 5 days for the new city
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchbar.value}&units=metric&APPID=39ac623b36ceedc5f50d07bfc1d9ced3`)
            .then((response) => {
                if(response.status === 200) {
                    weatherFiveDays.innerHTML = '';
                    return response.json();
                } else {
                    throw(new Error('bad response'))
                } 
            })
            .then((json) => {
                
                // The Function that filters out the days, because every new day starts with 00:00:00
                const fiveDayForecast = json.list.filter((newDay) =>
                    newDay.dt_txt.includes('00:00:00')
                );
        
                // Sorts out the dates so every timeslot of a certain day is bundled together in their own array
                const objectDate = {};
        
                json.list.map((item) => {
                    const date = item.dt_txt.split(' ')[0];
                    if (objectDate[date]) {
                        objectDate[date].push(item);
                    } else {
                        objectDate[date] = [item];
                    }
                });
        
                // The function that creates the HTML elements for the temperature and finds the daily min and max temperatures 
                fiveDayForecast.map((item) => {
                    let dailyRows = document.createElement('div');
                    
                    const date = item.dt_txt.split(' ')[0];
                    const weatherData = objectDate[date];
        
                    // For-loop that gets the icon for the dailyRow from data for 12:00
                    let icon = '02d';
                    let i;
                    for (i=0; i<weatherData.length; i++) {
                        if (weatherData[i].dt_txt.split(' ')[1] === '12:00:00') {
                            icon = weatherData[i].weather[0].icon;
                        }
                    }
        
                    // The day
                    let day = new Date(item.dt * 1000).getDay();
                    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
                    
                    // Calculate the temperature for the day
                    const temps = weatherData.map((value) => value.main.temp);           
                    const minTemp = Math.min(...temps);
                    const maxTemp = Math.max(...temps);
        
                    dailyRows.innerHTML += `
                        <div>${days[day]}</div>
                        <img src='https://openweathermap.org/img/wn/${icon}@2x.png' alt='' />
                        <div>${maxTemp.toFixed(0)}° / ${minTemp.toFixed(0)} °C</div>
                    `;
                
                    dailyRows.classList.add(`forecast-day`);
                    weatherFiveDays.appendChild(dailyRows);
                });
            })
    })  

})
