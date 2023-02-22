const searchBar = document.getElementById ('searchBar')
const name = document.getElementById("name");
const tempMax = document.getElementById("tempmax");
const tempMin = document.getElementById("tempmin");
const description = document.getElementById("description");
const sunriseTime = document.getElementById("sunriseTime");
const sunsetTime = document.getElementById("sunsetTime");
const weatherHeader = document.getElementById("weather-header")

// url with our api id / stockholm as default city

const API_WEATHER = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=93834bb23b2a9e80836d0a5415cc4a72`

//url where we can choose position 
const API_FORECAST = `https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=93834bb23b2a9e80836d0a5415cc4a72`



const WeatherData = () => {
  fetch(API_WEATHER)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      name.innerHTML = json.name;
      tempMax.innerHTML = json.main.temp_max;
      tempMin.innerHTML = json.main.temp_min;
      description.innerHTML = json.weather[0].description;
      
      const sunriseStart = new Date (json.sys.sunrise); 
      const sunsetStart = new Date (json.sys.sunset); 
      sunriseTime.innerHTML = sunriseStart.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}); 
      sunsetTime.innerHTML = sunsetStart.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}); 

    })
    .catch((error) => {
      console.error(error);
    });
};
WeatherData();










/*

// previous version

const searchBar = document.getElementById ('searchBar')
const container = document.getElementById ('weatherDisplay')
const weekForecast = document.getElementById ('weekForecast')
const weatherHeader = document.getElementById ('weatherHeader')



// url with our api id / stockholm as default city

//const API_WEATHER= `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=93834bb23b2a9e80836d0a5415cc4a72`

//url where we can choose position 
//const API_FORECAST = `https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=93834bb23b2a9e80836d0a5415cc4a72`

// global variables 
//let WEATHER_API_URL
//calls current weather for our chosen position
//let FORECAST_API_URL
//calls weather forecast for our chosen position
//let city = 'Stockholm'


//const fetchWeatherData = () => {
fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=93834bb23b2a9e80836d0a5415cc4a72")
  .then((present) => {
    console.log(present);
    return present.json();
  })
  .then ((json) => {
   container.innerHTML = `<h4>${json.name} </h4>`


   json.
    container.innerHTML += `<h4> ${weather.temp}</h4>`
 
    //this is to create an H1 saying how many people there are in space on our page. The inside of what's gonna be in that container will be put on the inside of the strung after =.
    //We console log it to make sure it works. 
    //console.log(json)
    //json.people.forEach((person) => { //this is to print the names inside of the people array
        //We now want to add on this information to the container and to do that we do this: 
        //We don't use = since it will overwrite the contents of every personm so we'll only see the next person. We use +=
       // container.innerHTML += `<p> ${person.name} is on the ${person.craft} </p>`
    }) 
  });
};
  
  fetchWeatherData();








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



