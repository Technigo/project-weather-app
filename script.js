const weatherDisplay = document.getElementById("weather-display");
const fiveDays = document.getElementById("five-days");

const API_KEY =
  "https://api.openweathermap.org/data/2.5/weather?q=Oslo,Norway&units=metric&APPID=0783dde9496332573fca5cd853c81369";

const fiveDaysForcast =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=0783dde9496332573fca5cd853c81369";

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
    const [sunriseHour, sunriseMinutes, sunsetHour, sunsetMinutes] = [
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

fetch(fiveDaysForcast) //getting info from api url above
  .then((response) => response.json()) //here we get the info and json converts into

  .then((fiveDaysWeather) => {
    // here we start printing the information we are getting from the api
    //a parameter
    console.log(fiveDaysWeather);
    // since we only want certain values so below we fetch the dates at a specific time
    const filterWeather = fiveDaysWeather.list.filter((item) =>
      item.dt_txt.includes("12:00")
    );
    console.log(filterWeather);
    //create an array with our weekdays
    const weekdays = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ];

    filterWeather.forEach((item) => {
      // convert dt to javascript default date format
      // from seconds => millisecond
      const d = new Date(item.dt * 1000);
      // format the date to a weekday number
      const weekdayNumber = d.getDay();
      console.log(`hello ${weekdays [weekdayNumber]}`);
      // use that number as the index of the array
      // innerHTML = weekdays[weekdayNumber];

    //printing the weekday number with the weekday array above
      fiveDays.innerHTML += ` 
      <div class="daily-forecast"> 
      <p> ${weekdays[weekdayNumber]}</p> 
      <p> Temprature:${item.main.temp}</p>
      </div> 
  
  `;
    });
  });
