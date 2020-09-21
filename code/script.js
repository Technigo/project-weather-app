// API key: 607d94111f1f9c343f38c10112b16e3c
// REMOVE BEFORE SUBMISSION

const city = document.getElementById("city");
const country = document.getElementById("country");
const localtime = document.getElementById("localtime");
const temperature = document.getElementById("temperature");
const tempFeelsLike = document.getElementById("tempfeelslike");
const description = document.getElementById("description");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const weatherType = document.getElementById("weathertype");



const fetchData = () => {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=607d94111f1f9c343f38c10112b16e3c').then((response) => {
    console.log("Inside the response");
    console.log(typeof response);
    return response.json();
  }).then((weatherObject) => {
    // This is the promise.
    console.log("Here's the data 👇")
    console.log(weatherObject)


    city.innerHTML = weatherObject.name;
    country.innerHTML = weatherObject.sys.country;
    localtime.innerHTML = weatherObject.dt;
    temperature.innerHTML = weatherObject.main.temp;
    tempFeelsLike.innerHTML = weatherObject.main.feels_like;
    weatherType.innerHTML = weatherObject.weather[0].main;
    description.innerHTML = weatherObject.weather[0].description;
    sunrise.innerHTML = weatherObject.sys.sunrise;
    sunset.innerHTML = weatherObject.sys.sunset;

    
    // weatherObject.weather.forEach(weather => {
    //   console.log(weather.main)
    //   console.log(weather.description)
    // });
  })
}

fetchData();



// http://api.open-notify.org/astros.json

// Define the container where we should put the content.
// const container = document.getElementById("astros")

// fetch('http://api.open-notify.org/astros.json')
//     .then((response) => {
//         console.log(typeof response)
//         return response.json()
//     })
//     .then((astros) => {
//         console.log(typeof astros)
//         container.innerHTML = `<h1>${astros.number} people are in space right now</h1>`

//         astros.people.forEach((person) => {
//             container.innerHTML += `<p>${person.name} is on the ${person.craft}</p>`
//         })
//     })



// i) fetch
// 2) .then(response)()