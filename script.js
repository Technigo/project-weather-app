
//API KEY 
const apiKey = '54a820a4b63e82050a15212c06998bb0';

//API Stockholm 
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${apiKey}`;
const apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${apiKey}`;

//API Oslo 
const apiUrlOslo = `https://api.openweathermap.org/data/2.5/weather?q=Oslo,Norway&units=metric&APPID=${apiKey}`;
const apiUrlForecastOslo = `https://api.openweathermap.org/data/2.5/forecast?q=Oslo,Norway&units=metric&APPID=${apiKey}`;

//API Alicante 
const apiUrlAlicante = `https://api.openweathermap.org/data/2.5/weather?q=Alicante,Spain&units=metric&APPID=${apiKey}`;
const apiUrlForecastAlicante = `https://api.openweathermap.org/data/2.5/forecast?q=Alicante,Spain&units=metric&APPID=${apiKey}`;

//API BERLIN
const apiUrlBerlin = `https://api.openweathermap.org/data/2.5/weather?q=Berlin,Germany&units=metric&APPID=${apiKey}`;
const apiUrlForecastBerlin= `https://api.openweathermap.org/data/2.5/forecast?q=Berlin,Germany&units=metric&APPID=${apiKey}`;


const nameContainer = document.getElementById('name');
const tempContainer = document.getElementById('temperature');
const sortContainer = document.getElementById('sort');
const sunriseContainer = document.getElementById('sunrise');
const sunsetContainer = document.getElementById('sunset');
const forecastContainer = document.getElementById('forecast')
 
 
//NAME OF CITY, TEMPERATURE, SORT OF WEATHER, SUNRISE, SUNSET

fetch(apiUrl)
    .then((Response) => { 
        return Response.json()
    })
    .then ((json) => {
        console.log(json)
        nameContainer.innerHTML = `<h1>${json.name}</h1>`;
        sortContainer.innerHTML = `<h2>${json.weather[0].description}</h2>`;

         const roundedTemperature = json.main.temp.toFixed(0.1);
         tempContainer.innerHTML += `<h1> ${roundedTemperature}°C</h1>`;         
    
//This changes the sunrise/sunset to readable
        const sunrise = new Date(json.sys.sunrise * 1000);
        const sunset = new Date(json.sys.sunset* 1000);

        const sunriseTime = sunrise.toLocaleTimeString([], {timeStyle: 'short'});
        const sunsetTime = sunset.toLocaleTimeString ([], {timeStyle: 'short'});
       
        sunriseContainer.innerHTML = `<h3>Sunrise: ${sunriseTime} </h3>`
        sunsetContainer.innerHTML =  `<h3>Sunset: ${sunsetTime} </h3>` 

//Todays weather icon
        document.getElementById('todaysWeatherIcon').innerHTML = `<img src=https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png></img>` 
    })
    .catch((error) => {
        console.log(error) 

});


//WEATHER FORECAST 

fetch(apiUrlForecast)
    .then((Response) => { 
        return Response.json()
    })
    .then ((json) => {
        console.log(json)
        const filteredForecast = json.list.filter(item =>
        item.dt_txt.includes('12:00')
        );

        filteredForecast.forEach(item  => {
            let date = new Date(item.dt * 1000);
            let dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
            const dayTemp = item.main.temp;
            const weekTemp = dayTemp.toFixed(0.1);

            document.getElementById('forecastDay').innerHTML += `<p>${dayName}</p>`
            document.getElementById('forecastTemp').innerHTML += `<p>${weekTemp}°C</p>`
            document.getElementById('forecastIcon').innerHTML += `<img src=http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png></img>`
            
    });  
});



 // RED LEVEL, ADD NEW CITY OSLO 

 const nameContainerOslo = document.getElementById('nameOslo');
 const tempContainerOslo = document.getElementById('temperatureOslo');
 const forecastContainerOslo = document.getElementById('forecastOslo');
 const osloIcon = document.getElementById('todaysWeatherIconOslo');

//NAME OF CITY, TEMPERATURE

fetch(apiUrlOslo)
    .then((Response) => { 
        return Response.json()
    })
    .then ((json) => {
        console.log(json)
        nameContainerOslo.innerHTML = `<p>${json.name}</p>`;
        const roundedTemperature = json.main.temp.toFixed(0.1);
        tempContainerOslo.innerHTML += `<p> ${roundedTemperature}°C</p>`;        
    })
    .catch((error) => {
        console.log(error) 
});
 

//TODAYS WEATHER AND ICON

fetch(apiUrlForecastOslo)
    .then((Response) => { 
        return Response.json()
    })
    .then ((json) => {
        console.log(json)
        const filteredForecastOslo = json.list.filter(item =>
        item.dt_txt.includes('12:00')
        );
        filteredForecastOslo.forEach(day => {
            let date = new Date(day.dt * 1000);
            const dayTemp = day.main.temp;
            const weekTemp = dayTemp.toFixed(0.1);
            osloIcon.innerHTML = `<img src=https://openweathermap.org/img/wn/${json.list[1].weather[0].icon}@2x.png></img>` 
    });  
});


 // ADD NEW CITY ALICANTE 

 const nameContainerAlicante = document.getElementById('nameAlicante');
 const tempContainerAlicante = document.getElementById('temperatureAlicante');
 const forecastContainerAlicante = document.getElementById('forecastAlicante');
 const AlicanteIcon = document.getElementById('todaysWeatherIconAlicante')
 

//NAME OF CITY, TEMPERATURE

fetch(apiUrlAlicante)
    .then((Response) => { 
        return Response.json()
    })
    .then ((json) => {
        console.log(json)
        nameContainerAlicante.innerHTML = `<p>${json.name}</p>`;
        const roundedTemperature = json.main.temp.toFixed(0.1);
        tempContainerAlicante.innerHTML += `<p> ${roundedTemperature}°C</p>`;        
    })
    .catch((error) => {
        console.log(error) 
});

//TODAYS WEATHER AND ICON

     fetch(apiUrlForecastAlicante)
     .then((Response) => { 
         return Response.json()
     })
     .then ((json) => {
         const filteredForecastAlicante = json.list.filter(item =>
         item.dt_txt.includes('12:00')
         );
         filteredForecastAlicante.forEach(day => {
             let date = new Date(day.dt * 1000);
             const dayTemp = day.main.temp;
             const weekTemp = dayTemp.toFixed(0.1);
             AlicanteIcon.innerHTML = `<img src=https://openweathermap.org/img/wn/${json.list[1].weather[0].icon}@2x.png></img>` 
     });   
 });     

 //ADD CITY, BERLIN

 const nameContainerBerlin = document.getElementById('nameBerlin');
 const tempContainerBerlin = document.getElementById('temperatureBerlin');
 const forecastContainerBerlin = document.getElementById('forecastBerlin');
 const berlinIcon = document.getElementById('todaysWeatherIconBerlin')
 

//NAME OF CITY, TEMPERATURE

fetch(apiUrlBerlin)
    .then((Response) => { 
        return Response.json()
    })
    .then ((json) => {
        console.log(json)
        nameContainerBerlin.innerHTML = `<p>${json.name}</p>`;
        const roundedTemperature = json.main.temp.toFixed(0.1);
        tempContainerBerlin.innerHTML += `<p> ${roundedTemperature}°C</p>`;        
    })
    .catch((error) => {
        console.log(error) 
});

//TODAYS WEATHER AND ICON

     fetch(apiUrlForecastBerlin)
     .then((Response) => { 
         return Response.json()
     })
     .then ((json) => {
         const filteredForecastBerlin = json.list.filter(item =>
         item.dt_txt.includes('12:00')
         );
         filteredForecastBerlin.forEach(day => {
             let date = new Date(day.dt * 1000);
             const dayTemp = day.main.temp;
             const weekTemp = dayTemp.toFixed(0.1);
             berlinIcon.innerHTML = `<img src=https://openweathermap.org/img/wn/${json.list[1].weather[0].icon}@2x.png></img>` 
     });  
 });       


