


const searchBar = document.getElementById ('searchBar')
const weatherDisplay  = document.getElementById ('weatherDisplay')
const weekForecast = document.getElementById ('weekForecast')



// url with our api id / stockhoml as city in the default

https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=93834bb23b2a9e80836d0a5415cc4a72

//url where we can choose position 
//https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=93834bb23b2a9e80836d0a5415cc4a72

// global variables 
let WEATHER_API_URL
//calls current weather for our chosen position
let FORECAST_API_URL
//calls weather forecast for our chosen position
let city = 'Bucaramanga'



// 1.

// 2. present some data on your web app:

    // the city name

    // the temperature (rounded to 1 decimal place)

    // what type of weather it is (the "description" in the JSON)

// 3. Feature: Sunrise and sunset






// 4. Feature: Weather forecast of the next days


























// daniel class structure


//https://www.omdbapi.com/?t=nightmare-alley&apikey=e170d343

// I have a present for you - the fetch(url)
/// .then I'm giving you the present, but you don't know what's inside yet
// .then you're unwrappping the present, so now you can take a look what is inside
/*
fetch("https://www.omdbapi.com/?t=nightmare-alley&apikey=e170d343")
  .then((present) => {
    console.log(present);
    return present.json();
  })
  .then((unwrappedPresent) => {
    console.log(unwrappedPresent);
    return unwrappedPresent;
  });
  // can't get value from here
const getMovieDetailsFromAPI = (movieTitle) => {
  fetch(`https://www.omdbapi.com/?t=${movieTitle}&apikey=e170d343`)
    .then((present) => {
      console.log(present);
      return present.json();
    })
    .then((unwrappedPresent) => {
      console.log(unwrappedPresent);
      result = unwrappedPresent;
    });

  return result;
};
const form = document.getElementById("main-form");
const formInput = document.getElementById("movie-search");
const movieDescription = document.querySelector(".movie-body");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // V1
//   fetch(`https://www.omdbapi.com/?t=${formInput.value}&apikey=e170d343`)
//     .then((present) => {
//       console.log(present);
//       return present.json();
//     })
//     .then((unwrappedPresent) => {
//       console.log(unwrappedPresent);
//       movieDescription.innerText = unwrappedPresent.Plot;
//       formInput.value = "";
//     });

// V2 - extratcted everything to an outside function
getMovieDetailsFromAPI2()
});


// can set values 
const getMovieDetailsFromAPI2 = (movieTitle) => {
    fetch(`https://www.omdbapi.com/?t=${movieTitle}&apikey=e170d343`)
      .then((present) => {
        console.log(present);
        return present.json();
      })
      .then((unwrappedPresent) => {
        console.log(unwrappedPresent);
        result = unwrappedPresent;
        movieDescription.innerText = unwrappedPresent.Plot;
        formInput.value = "";
      });
  };
*/



