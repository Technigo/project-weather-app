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
         nameContainer.innerHTML = `<h1>Lets find out how the wheater is in ${json.name}</h1>`
         tempContainer.innerHTML = `<h1>The temperature is ${json.main.temp}</h1>`
         sortContainer.innerHTML = `<h1>The temperature is ${json.weather[0].description}</h1>`
    
//This changes the sunrise/sunset to readable
        const sunrise = new Date(json.sys.sunrise * 1000);
        const sunset = new Date(json.sys.sunset* 1000);

        const sunriseTime = sunrise.toLocaleTimeString([], {timeStyle: 'short'});
        const sunsetTime = sunset.toLocaleTimeString ([], {timeStyle: 'short'});
       
        sunriseContainer.innerHTML = `<h3>The sunrise ${sunriseTime} </h3>`
        sunsetContainer.innerHTML =  `<h3>The sun sets ${sunsetTime} </h3>` 
    });



//WEATHER FORECAST 

fetch(apiUrlForecast)
    .then((Response) => { 
        return Response.json()
    })
    .then ((json) => {
        console.log(json)  
        const limitedArray = json.list.splice(1,5,)
        console.log(limitedArray) 

        forecastContainer.innerHTML = `<h4>  ${limitedArray}  </h4>`
 })   



 //const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))




    //const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
    // filteredForecast is now an array with only the data from 12:00 each day.


