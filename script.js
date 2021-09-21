const weatherDisplay = document.getElementById("weather-display");

const API_KEY =
  "https://api.openweathermap.org/data/2.5/weather?q=Oslo,Norway&units=metric&APPID=0783dde9496332573fca5cd853c81369";

fetch(API_KEY)
  .then((response) => {
    return response.json();
  })

  .then((json) => {
    const sunriseTime = json.sys.sunrise; //a varible for sunrise time in miliseconds
    const sunsetTime = json.sys.sunset; //a varible for sunset time in miliseconds
    const sunriseRealTime = new Date(sunriseTime * 1000); // converts the sunrise miliseconds time to normaltime
    const sunsetRealTime = new Date(sunsetTime * 1000); // converts the sunset miliseconds time to normaltime
    //calling the functions to get only hours and minutes. 
    const [sunriseHour, sunriseMinutes, sunsetHour, sunsetMinutes, ] = [
      sunriseRealTime.getHours(),
      sunriseRealTime.getMinutes(),
      sunsetRealTime.getHours(),
      sunsetRealTime.getMinutes(),
    ];
    

    console.log(json);
    weatherDisplay.innerHTML = `
    <div>
    <p>city: ${json.name}</p>
    <p>Temperature: ${json.main.temp}</p>
    <p>Type of weather: ${json.weather[0].description}</p>
    <p>Sunrise: ${sunriseHour}:${sunriseMinutes}</p>
    <p>Sunset: ${sunsetHour}:${sunsetMinutes}</p>
  
    </div>
    `;
  });
