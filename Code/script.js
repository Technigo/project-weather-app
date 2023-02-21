 // All the DOM selectors stored as variables
 const header = document.getElementById("head")
 const aboutWeather = document.querySelector(".about-weather")
 const weatherProg = document.querySelector(".weather-prog")

 // Fetching the data from the API
 fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8d66acab5dd718723a370e1b64f22f8c")
  .then((response) => {
     console.log(response);
     return response.json();
   })
  .then ((data) => {
     console.log(data);
     return data;
   });