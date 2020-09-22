const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=54a820a4b63e82050a15212c06998bb0";
const apiUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=54a820a4b63e82050a15212c06998bb0";


const nameContainer = document.getElementById('name');
const tempContainer = document.getElementById('temperature');
const sortContainer = document.getElementById('sort');
const sunriseContainer = document.getElementById('sunrise');
const sunsetContainer = document.getElementById('sunset');
const forecastContainer = document.getElementById('forecast')



//Console.log test 
fetch(apiUrl)
    .then((Response) => { 
        return Response.json()
    })
    .then ((json) => {
    console.log(json)   
 })    


//NAME OF CITY, TEMPERATURE, SORT OF WEATHER, SUNRISE, SUNSET

fetch(apiUrl)
    .then((Response) => { 
        return Response.json()
    })
    .then ((json) => {
        nameContainer.innerHTML = `<h1>Lets find out how the wheater is in ${json.name}</h1>`;
        sortContainer.innerHTML = `<h1>The temperature is ${json.weather[0].description}</h1>`;

         const roundedTemperature = json.main.temp.toFixed(0.1);
         tempContainer.innerHTML += `<h1>The temperature is ${roundedTemperature}°C</h1>`;
         console.log(roundedTemperature)
         
    
//This changes the sunrise/sunset to readable
        const sunrise = new Date(json.sys.sunrise * 1000);
        const sunset = new Date(json.sys.sunset* 1000);

        const sunriseTime = sunrise.toLocaleTimeString([], {timeStyle: 'short'});
        const sunsetTime = sunset.toLocaleTimeString ([], {timeStyle: 'short'});
       
        sunriseContainer.innerHTML = `<h3>Sunrise: ${sunriseTime} </h3>`
        sunsetContainer.innerHTML =  `<h3>Sunset: ${sunsetTime} </h3>` 
    })
    .catch((error) => {
        console.log(error) 
     }) ;



//WEATHER FORECAST 

fetch(apiUrlForecast)
    .then((Response) => { 
        return Response.json()
    })
    .then ((json) => {
        const filteredForecast = json.list.filter(item =>
        item.dt_txt.includes("12:00")
        );
        filteredForecast.forEach(day => {
            let date = new Date(day.dt * 1000);
            let dayName = date.toLocaleDateString("en-US", { weekday: "long" });
            const dayTemp = day.main.temp;
            const weekTemp = dayTemp.toFixed(0.1);

            document.getElementById('forecastDay').innerHTML += `<p>${dayName}</p>`
            document.getElementById('forecastTemp').innerHTML += `<p>${weekTemp}°C</p>`
            document.getElementById('forecastIcon').innerHTML += `<img src=https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png></img>`
    });  
 
});



 //const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))




    //const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
    // filteredForecast is now an array with only the data from 12:00 each day.


