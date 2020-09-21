
const nameContainer = document.getElementById('name');
const tempContainer = document.getElementById('temperature');
const sortContainer = document.getElementById('sort');
const sunriseContainer = document.getElementById('sunrise');
const sunsetContainer = document.getElementById('sunset');


//Console.log test 
fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=54a820a4b63e82050a15212c06998bb0')
    .then((Response) => { 
        return Response.json()
    })
    .then ((json) => {
    console.log(json)   
 })    


//NAME OF CITY 
fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=54a820a4b63e82050a15212c06998bb0')
    .then((Response) => { 
        return Response.json()
    })
    .then ((json) => {
        nameContainer.innerHTML = `<h1>Lets find out how the wheater is in ${json.name}</h1>`
    })         



// TEMPERATURE 
fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=54a820a4b63e82050a15212c06998bb0')
    .then((Response) => { 
        return Response.json()
    })
    .then ((json) => {
        tempContainer.innerHTML = `<h1>The temperature is ${json.main.temp}</h1>` 
    }) 


// SORT OF WEATHER    
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=54a820a4b63e82050a15212c06998bb0')
    .then((Response) => { 
        return Response.json()
    })
    .then ((json) => {
        sortContainer.innerHTML = `<h1>The temperature is ${json.weather[0].description}</h1>` 
    }) 

