const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=54a820a4b63e82050a15212c06998bb0";
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
    .then ((weatherArray) => {
         nameContainer.innerHTML = `<h1>Lets find out how the wheater is in ${weatherArray.name}</h1>`
         tempContainer.innerHTML = `<h1>The temperature is ${weatherArray.main.temp}</h1>`
         sortContainer.innerHTML = `<h1>The temperature is ${weatherArray.weather[0].description}</h1>`
    
//This changes the sunrise to readable 
        const sunriseDate = new Date(weatherArray.sys.sunrise);
        const sunriseTimeString = sunriseDate.toLocaleTimeString('en-US', {
            timestyle: 'short',
        });

        sunriseContainer.innerHTML = `<h3>The sunrise ${sunriseTimeString} </h3>`

//this changes the sunset to be readable 
        const sunsetDate = new Date(weatherArray.sys.sunset);
        const sunsetTimesString = sunsetDate.toLocaleTimeString ('en-US', {
            timestyle: 'short',
        });
       
        sunsetContainer.innerHTML =  `<h3>The sun sets at ${sunsetTimesString} </h3>`
})






    //const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
    // filteredForecast is now an array with only the data from 12:00 each day.


